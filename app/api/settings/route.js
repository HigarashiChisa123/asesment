import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import jwt from "jsonwebtoken";

function getUserFromToken(request) {
  try {
    const cookieHeader = request.headers.get('cookie');
    const tokenCookie = cookieHeader?.match(/token=([^;]+)/)?.[1];
    
    if (!tokenCookie) return null;
    
    const decoded = jwt.verify(tokenCookie, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    console.error('Token verification error:', error);
    return null;
  }
}

export async function GET(request) {
  try {
    const user = getUserFromToken(request);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get user settings
    const [settings] = await db.query(
      'SELECT * FROM user_settings WHERE user_id = ?',
      [user.id]
    );

    // Get user profile data
    const [profile] = await db.query(
      `SELECT 
        id, username, email, full_name, class, birthday, hobby, bio,
        profile_picture, background_picture, role
      FROM users WHERE id = ?`,
      [user.id]
    );

    if (!settings[0]) {
      // Create default settings if not exists
      const [newSettings] = await db.query(
        'INSERT INTO user_settings (user_id) VALUES (?)',
        [user.id]
      );
      
      // Fetch created settings
      const [createdSettings] = await db.query(
        'SELECT * FROM user_settings WHERE id = ?',
        [newSettings.insertId]
      );
      
      return NextResponse.json({
        success: true,
        settings: createdSettings[0],
        profile: profile[0]
      });
    }

    return NextResponse.json({
      success: true,
      settings: settings[0],
      profile: profile[0]
    });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const user = getUserFromToken(request);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const data = await request.json();
    
    // Update settings
    const result = await db.query(
      `UPDATE user_settings SET 
        language = ?,
        theme = ?,
        email_notifications = ?,
        push_notifications = ?,
        borrow_reminders = ?,
        return_reminders = ?,
        new_book_alerts = ?,
        wishlist_updates = ?,
        profile_visibility = ?,
        show_reading_history = ?,
        show_wishlist = ?,
        allow_recommendations = ?,
        auto_renew = ?,
        default_borrow_duration = ?,
        download_quality = ?
      WHERE user_id = ?`,
      [
        data.language || 'en',
        data.theme || 'light',
        data.email_notifications ?? true,
        data.push_notifications ?? true,
        data.borrow_reminders ?? true,
        data.return_reminders ?? true,
        data.new_book_alerts ?? true,
        data.wishlist_updates ?? true,
        data.profile_visibility || 'public',
        data.show_reading_history ?? true,
        data.show_wishlist ?? true,
        data.allow_recommendations ?? true,
        data.auto_renew ?? true,
        data.default_borrow_duration || 14,
        data.download_quality || 'medium',
        user.id
      ]
    );

    return NextResponse.json({
      success: true,
      message: "Settings updated successfully"
    });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}