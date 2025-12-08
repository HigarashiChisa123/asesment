import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import jwt from "jsonwebtoken";

console.log('👤 === PROFILE API LOADED ===');

// Helper function untuk mendapatkan user dari token
function getUserFromToken(request) {
  try {
    // Coba dari cookies.get() untuk Next.js 15
    let token;
    if (request.cookies && request.cookies.get) {
      token = request.cookies.get("token")?.value;
    }
    
    // Fallback untuk Next.js 14 atau jika cookies.get tidak ada
    if (!token) {
      const cookieHeader = request.headers.get('cookie');
      if (cookieHeader) {
        const tokenMatch = cookieHeader.match(/token=([^;]+)/);
        token = tokenMatch ? tokenMatch[1] : null;
      }
    }
    
    if (!token) {
      console.log('❌ No token found in cookies');
      return null;
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'rahasia');
    console.log('✅ Token decoded successfully:', { 
      id: decoded.id, 
      username: decoded.username 
    });
    
    return decoded;
  } catch (error) {
    console.error('❌ Token verification error:', error.message);
    return null;
  }
}

export async function GET(req) {
  console.log('🔍 === GET PROFILE API CALLED ===');
  
  try {
    // Dapatkan user dari token
    const user = getUserFromToken(req);
    
    if (!user) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Tidak terautentikasi",
          debug: { hasToken: false }
        },
        { status: 401 }
      );
    }
    
    const userId = user.id;
    console.log('👤 User ID from token:', userId);

    try {
      console.log('🔍 Querying database for user profile and settings...');
      
      // Get user profile dengan settings
      const [users] = await db.query(
        `SELECT 
          u.id, 
          u.email, 
          u.username, 
          COALESCE(u.full_name, '') as full_name,
          COALESCE(u.bio, '') as bio,
          u.profile_picture,
          u.background_picture,
          COALESCE(u.class, 'Grade 11 RPL 5') as class,
          DATE_FORMAT(u.birthday, '%d/%m/%Y') as birthday,
          COALESCE(u.hobby, 'Reading Books') as hobby,
          u.role,
          u.created_at,
          -- User settings
          COALESCE(us.language, 'en') as language,
          COALESCE(us.theme, 'light') as theme,
          COALESCE(us.profile_visibility, 'public') as profile_visibility,
          COALESCE(us.email_notifications, 1) as email_notifications,
          COALESCE(us.push_notifications, 1) as push_notifications,
          COALESCE(us.borrow_reminders, 1) as borrow_reminders,
          COALESCE(us.return_reminders, 1) as return_reminders,
          COALESCE(us.new_book_alerts, 1) as new_book_alerts,
          COALESCE(us.wishlist_updates, 1) as wishlist_updates,
          COALESCE(us.show_reading_history, 1) as show_reading_history,
          COALESCE(us.show_wishlist, 1) as show_wishlist,
          COALESCE(us.allow_recommendations, 1) as allow_recommendations,
          COALESCE(us.auto_renew, 1) as auto_renew,
          COALESCE(us.default_borrow_duration, 14) as default_borrow_duration,
          COALESCE(us.download_quality, 'medium') as download_quality
        FROM users u
        LEFT JOIN user_settings us ON u.id = us.user_id
        WHERE u.id = ?`,
        [userId]
      );

      console.log('📊 Database query result:', {
        rowCount: users.length,
        userFound: users.length > 0
      });

      if (users.length === 0) {
        console.log('❌ User not found in database');
        return NextResponse.json(
          { 
            success: false, 
            message: "User tidak ditemukan",
            debug: { userId }
          },
          { status: 404 }
        );
      }

      const userData = users[0];
      
      console.log('✅ User found:', {
        id: userData.id,
        username: userData.username,
        email: userData.email,
        full_name: userData.full_name
      });

      // Get borrowing stats
      console.log('📊 Fetching borrowing stats...');
      const [borrowingStats] = await db.query(`
        SELECT 
          COUNT(*) as total_borrowed,
          SUM(CASE WHEN status = 'returned' THEN 1 ELSE 0 END) as completed,
          SUM(CASE WHEN status = 'borrowed' THEN 1 ELSE 0 END) as currently_reading,
          SUM(CASE WHEN status = 'overdue' THEN 1 ELSE 0 END) as overdue
        FROM borrowed_books 
        WHERE user_id = ?
      `, [userId]);

      console.log('📈 Borrowing stats:', borrowingStats[0]);

      // Format response
      const response = {
        success: true,
        profile: {
          id: userData.id,
          email: userData.email,
          username: userData.username,
          full_name: userData.full_name,
          bio: userData.bio,
          profile_picture: userData.profile_picture,
          background_picture: userData.background_picture,
          class: userData.class,
          birthday: userData.birthday,
          hobby: userData.hobby,
          role: userData.role,
          created_at: userData.created_at
        },
        settings: {
          language: userData.language,
          theme: userData.theme,
          profile_visibility: userData.profile_visibility,
          email_notifications: Boolean(userData.email_notifications),
          push_notifications: Boolean(userData.push_notifications),
          borrow_reminders: Boolean(userData.borrow_reminders),
          return_reminders: Boolean(userData.return_reminders),
          new_book_alerts: Boolean(userData.new_book_alerts),
          wishlist_updates: Boolean(userData.wishlist_updates),
          show_reading_history: Boolean(userData.show_reading_history),
          show_wishlist: Boolean(userData.show_wishlist),
          allow_recommendations: Boolean(userData.allow_recommendations),
          auto_renew: Boolean(userData.auto_renew),
          default_borrow_duration: userData.default_borrow_duration,
          download_quality: userData.download_quality
        },
        borrowing_stats: {
          total_borrowed: borrowingStats[0]?.total_borrowed || 0,
          completed: borrowingStats[0]?.completed || 0,
          currently_reading: borrowingStats[0]?.currently_reading || 0,
          overdue: borrowingStats[0]?.overdue || 0
        },
        debug: {
          userId,
          tokenValid: true,
          hasProfilePicture: !!userData.profile_picture,
          hasSettings: !!userData.language
        }
      };
      
      console.log('✅ Response ready:', {
        profile: response.profile.username,
        settingsCount: Object.keys(response.settings).length,
        hasStats: response.borrowing_stats.total_borrowed > 0
      });
      
      const userPayload = {
        ...response.profile,
        settings: response.settings,
        borrowing_stats: response.borrowing_stats
      };
      
      return NextResponse.json({
        ...response,
        user: userPayload
      });
      
    } catch (dbError) {
      console.error('❌ Database query error:', dbError);
      return NextResponse.json(
        { 
          success: false, 
          message: "Database error",
          debug: { 
            error: dbError.message,
            code: dbError.code 
          }
        },
        { status: 500 }
      );
    }
    
  } catch (err) {
    console.error("💥 GET PROFILE ERROR:", err);
    return NextResponse.json(
      { 
        success: false, 
        message: "Kesalahan server",
        debug: { error: err.message }
      },
      { status: 500 }
    );
  }
}

// Update profile dan settings
export async function PUT(req) {
  console.log('✏️ === UPDATE PROFILE API CALLED ===');
  
  try {
    const user = getUserFromToken(req);
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Tidak terautentikasi" },
        { status: 401 }
      );
    }
    
    const userId = user.id;
    const updates = await req.json();
    
    console.log('📝 Update request:', { userId, updates });

    // Pisahkan updates untuk profile dan settings
    const profileUpdates = {};
    const settingsUpdates = {};
    
    Object.keys(updates).forEach(key => {
      if (updates[key] !== undefined && updates[key] !== null) {
        if (key.startsWith('settings_')) {
          // Ini adalah setting
          const settingKey = key.replace('settings_', '');
          settingsUpdates[settingKey] = updates[key];
        } else if (key.startsWith('profile_')) {
          // Ini adalah profile update
          const profileKey = key.replace('profile_', '');
          profileUpdates[profileKey] = updates[key];
        } else {
          // Default: anggap sebagai setting
          settingsUpdates[key] = updates[key];
        }
      }
    });

    const results = [];

    // Update profile jika ada
    if (Object.keys(profileUpdates).length > 0) {
      // Remove fields that shouldn't be updated
      delete profileUpdates.id;
      delete profileUpdates.email;
      delete profileUpdates.role;
      delete profileUpdates.created_at;
      delete profileUpdates.password;

      if (Object.keys(profileUpdates).length > 0) {
        const updateFields = [];
        const values = [];
        
        Object.keys(profileUpdates).forEach(key => {
          if (profileUpdates[key] !== undefined) {
            updateFields.push(`${key} = ?`);
            values.push(profileUpdates[key]);
          }
        });

        values.push(userId);

        const updateQuery = `
          UPDATE users 
          SET ${updateFields.join(', ')}
          WHERE id = ?
        `;

        console.log('📝 Profile update query:', updateQuery);
        console.log('📝 Profile values:', values);

        const [result] = await db.query(updateQuery, values);
        results.push({ type: 'profile', affectedRows: result.affectedRows });
      }
    }

    // Update settings jika ada
    if (Object.keys(settingsUpdates).length > 0) {
      console.log('🔧 Settings to update:', settingsUpdates);
      
      // Check if user_settings exists
      const [existingSettings] = await db.query(
        'SELECT id FROM user_settings WHERE user_id = ?',
        [userId]
      );

      if (existingSettings.length === 0) {
        // Create settings record dengan default values
        console.log('📝 Creating new settings record');
        await db.query(
          'INSERT INTO user_settings (user_id) VALUES (?)',
          [userId]
        );
      }

      // Build update query for settings
      const updateFields = [];
      const values = [];
      
      // Map boolean values to 1/0 untuk MySQL
      Object.keys(settingsUpdates).forEach(key => {
        if (settingsUpdates[key] !== undefined) {
          updateFields.push(`${key} = ?`);
          
          // Convert boolean to number for MySQL
          if (typeof settingsUpdates[key] === 'boolean') {
            values.push(settingsUpdates[key] ? 1 : 0);
          } else {
            values.push(settingsUpdates[key]);
          }
        }
      });

      if (updateFields.length > 0) {
        values.push(userId);

        const updateQuery = `
          UPDATE user_settings 
          SET ${updateFields.join(', ')}
          WHERE user_id = ?
        `;

        console.log('📝 Settings update query:', updateQuery);
        console.log('📝 Settings values:', values);

        const [result] = await db.query(updateQuery, values);
        results.push({ type: 'settings', affectedRows: result.affectedRows });
      }
    }

    if (results.length === 0) {
      return NextResponse.json(
        { success: false, message: "Tidak ada data yang diupdate" },
        { status: 400 }
      );
    }

    // Get updated user dengan settings
    const [updatedUsers] = await db.query(
      `SELECT 
        u.*,
        us.language, us.theme, us.profile_visibility,
        us.email_notifications, us.push_notifications,
        us.borrow_reminders, us.return_reminders,
        us.new_book_alerts, us.wishlist_updates,
        us.show_reading_history, us.show_wishlist,
        us.allow_recommendations, us.auto_renew,
        us.default_borrow_duration, us.download_quality
      FROM users u
      LEFT JOIN user_settings us ON u.id = us.user_id
      WHERE u.id = ?`,
      [userId]
    );

    if (updatedUsers.length === 0) {
      return NextResponse.json(
        { success: false, message: "User tidak ditemukan setelah update" },
        { status: 404 }
      );
    }

    const updatedUser = updatedUsers[0];
    
    // Remove password from response
    delete updatedUser.password;

    // Get borrowing stats
    const [borrowingStats] = await db.query(`
      SELECT 
        COUNT(*) as total_borrowed,
        SUM(CASE WHEN status = 'returned' THEN 1 ELSE 0 END) as completed,
        SUM(CASE WHEN status = 'borrowed' THEN 1 ELSE 0 END) as currently_reading,
        SUM(CASE WHEN status = 'overdue' THEN 1 ELSE 0 END) as overdue
      FROM borrowed_books 
      WHERE user_id = ?
    `, [userId]);

    console.log('✅ Profile updated successfully:', {
      profileUpdated: results.find(r => r.type === 'profile')?.affectedRows || 0,
      settingsUpdated: results.find(r => r.type === 'settings')?.affectedRows || 0
    });

    const response = {
      success: true,
      message: "Profile updated successfully",
      profile: {
        id: updatedUser.id,
        email: updatedUser.email,
        username: updatedUser.username,
        full_name: updatedUser.full_name,
        bio: updatedUser.bio,
        profile_picture: updatedUser.profile_picture,
        background_picture: updatedUser.background_picture,
        class: updatedUser.class,
        birthday: updatedUser.birthday,
        hobby: updatedUser.hobby,
        role: updatedUser.role,
        created_at: updatedUser.created_at
      },
      settings: {
        language: updatedUser.language || 'en',
        theme: updatedUser.theme || 'light',
        profile_visibility: updatedUser.profile_visibility || 'public',
        email_notifications: Boolean(updatedUser.email_notifications ?? true),
        push_notifications: Boolean(updatedUser.push_notifications ?? true),
        borrow_reminders: Boolean(updatedUser.borrow_reminders ?? true),
        return_reminders: Boolean(updatedUser.return_reminders ?? true),
        new_book_alerts: Boolean(updatedUser.new_book_alerts ?? true),
        wishlist_updates: Boolean(updatedUser.wishlist_updates ?? true),
        show_reading_history: Boolean(updatedUser.show_reading_history ?? true),
        show_wishlist: Boolean(updatedUser.show_wishlist ?? true),
        allow_recommendations: Boolean(updatedUser.allow_recommendations ?? true),
        auto_renew: Boolean(updatedUser.auto_renew ?? true),
        default_borrow_duration: updatedUser.default_borrow_duration || 14,
        download_quality: updatedUser.download_quality || 'medium'
      },
      borrowing_stats: {
        total_borrowed: borrowingStats[0]?.total_borrowed || 0,
        completed: borrowingStats[0]?.completed || 0,
        currently_reading: borrowingStats[0]?.currently_reading || 0,
        overdue: borrowingStats[0]?.overdue || 0
      }
    };

    console.log('📤 Sending response:', {
      profile: response.profile.username,
      settings: response.settings
    });

    const userPayload = {
      ...response.profile,
      settings: response.settings,
      borrowing_stats: response.borrowing_stats
    };

    return NextResponse.json({
      ...response,
      user: userPayload
    });
    
  } catch (err) {
    console.error("💥 UPDATE PROFILE ERROR:", err);
    return NextResponse.json(
      { 
        success: false, 
        message: "Kesalahan server", 
        error: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
      },
      { status: 500 }
    );
  }
}
