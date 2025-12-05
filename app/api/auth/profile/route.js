import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import jwt from "jsonwebtoken";

console.log('👤 === PROFILE API LOADED ===');

export async function GET(req) {
  console.log('🔍 === GET PROFILE API CALLED ===');
  
  try {
    // Check token from cookies
    const token = req.cookies.get("token")?.value;
    
    console.log('🍪 Cookies:', req.cookies);
    console.log('🔑 Token from cookies:', token ? 'Present' : 'Missing');
    
    if (!token) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Tidak terautentikasi",
          debug: { hasToken: false }
        },
        { status: 401 }
      );
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'rahasia');
      console.log('✅ Token decoded successfully:', decoded);
    } catch (jwtError) {
      console.error('❌ Token verification failed:', jwtError.message);
      return NextResponse.json(
        { 
          success: false, 
          message: "Token tidak valid",
          debug: { jwtError: jwtError.message }
        },
        { status: 401 }
      );
    }
    
    const userId = decoded.id;
    console.log('👤 User ID from token:', userId);

    try {
      console.log('🔍 Querying database for user:', userId);
      
      const [users] = await db.query(
        `SELECT 
          id, 
          email, 
          username, 
          COALESCE(full_name, '') as full_name,
          COALESCE(bio, '') as bio,
          profile_picture,
          background_picture,
          COALESCE(class, 'Grade 11 RPL 5') as class,
          DATE_FORMAT(birthday, '%d/%m/%Y') as birthday,
          COALESCE(hobby, 'Reading Books') as hobby,
          role,
          created_at
        FROM users WHERE id = ?`,
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

      const user = users[0];
      
      console.log('✅ User found:', {
        id: user.id,
        username: user.username,
        email: user.email,
        full_name: user.full_name
      });
      
      return NextResponse.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          full_name: user.full_name,
          bio: user.bio,
          profile_picture: user.profile_picture,
          background_picture: user.background_picture,
          class: user.class,
          birthday: user.birthday,
          hobby: user.hobby,
          role: user.role,
          created_at: user.created_at
        },
        debug: {
          userId,
          tokenValid: true,
          hasProfilePicture: !!user.profile_picture
        }
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

// Update profile
export async function PUT(req) {
  console.log('✏️ === UPDATE PROFILE API CALLED ===');
  
  try {
    const token = req.cookies.get("token")?.value;
    
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Tidak terautentikasi" },
        { status: 401 }
      );
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'rahasia');
    } catch (jwtError) {
      return NextResponse.json(
        { success: false, message: "Token tidak valid" },
        { status: 401 }
      );
    }
    
    const userId = decoded.id;
    const updates = await req.json();
    
    console.log('📝 Update request:', { userId, updates });

    // Remove fields that shouldn't be updated
    delete updates.id;
    delete updates.email;
    delete updates.role;
    delete updates.created_at;

    // Build dynamic update query
    const updateFields = [];
    const values = [];
    
    Object.keys(updates).forEach(key => {
      if (updates[key] !== undefined) {
        updateFields.push(`${key} = ?`);
        values.push(updates[key]);
      }
    });

    if (updateFields.length === 0) {
      return NextResponse.json(
        { success: false, message: "Tidak ada data yang diupdate" },
        { status: 400 }
      );
    }

    values.push(userId); // For WHERE clause

    const updateQuery = `
      UPDATE users 
      SET ${updateFields.join(', ')}
      WHERE id = ?
    `;

    console.log('📝 Update query:', updateQuery);
    console.log('📝 Values:', values);

    const [result] = await db.query(updateQuery, values);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { success: false, message: "Tidak ada perubahan" },
        { status: 400 }
      );
    }

    // Get updated user
    const [updatedUsers] = await db.query(
      `SELECT * FROM users WHERE id = ?`,
      [userId]
    );

    const updatedUser = updatedUsers[0];
    
    // Remove password from response
    delete updatedUser.password;

    console.log('✅ Profile updated successfully');

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser
    });
    
  } catch (err) {
    console.error("💥 UPDATE PROFILE ERROR:", err);
    return NextResponse.json(
      { success: false, message: "Kesalahan server" },
      { status: 500 }
    );
  }
}