import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

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
    
    // Gunakan JWT yang sama dengan profile API
    const jwt = require("jsonwebtoken");
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'rahasia');
    return decoded;
  } catch (error) {
    console.error('❌ Token verification error:', error.message);
    return null;
  }
}

export async function POST(request) {
  console.log('🔐 === CHANGE PASSWORD API CALLED ===');
  
  try {
    const user = getUserFromToken(request);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { currentPassword, newPassword, confirmPassword } = await request.json();
    console.log('🔐 Password change request for user:', user.id);
    
    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }
    
    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { success: false, message: "New passwords do not match" },
        { status: 400 }
      );
    }
    
    if (newPassword.length < 6) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Get current user with password
    const [users] = await db.query(
      'SELECT id, password FROM users WHERE id = ?',
      [user.id]
    );
    
    if (!users[0]) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Verify current password
    const valid = await bcrypt.compare(currentPassword, users[0].password);
    if (!valid) {
      return NextResponse.json(
        { success: false, message: "Current password is incorrect" },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    
    // Update password
    await db.query(
      'UPDATE users SET password = ? WHERE id = ?',
      [hashedPassword, user.id]
    );

    console.log('✅ Password updated successfully for user:', user.id);
    
    return NextResponse.json({
      success: true,
      message: "Password updated successfully"
    });
  } catch (error) {
    console.error('💥 Error changing password:', error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}