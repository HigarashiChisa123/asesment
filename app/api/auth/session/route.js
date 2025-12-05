import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'perpustakaan',
  port: process.env.DB_PORT || 3306,
});

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Fetch user dari database perpustakaan
    const [users] = await db.query(
      `SELECT 
        id, 
        username, 
        email, 
        full_name as fullName,
        class,
        birthday,
        hobby,
        bio,
        profile_picture as avatarUrl,
        background_picture as backgroundUrl,
        role,
        created_at as createdAt
      FROM users WHERE id = ?`,
      [decoded.userId]
    );

    if (!users || users.length === 0) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const user = users[0];
    
    // Format data user
    const formattedUser = {
      id: user.id,
      username: user.username,
      email: user.email,
      full_name: user.fullName || user.username,
      class: user.class || 'Grade 11 RPL 5',
      birthday: user.birthday || '2008-12-15',
      hobby: user.hobby || 'Reading Books',
      bio: user.bio || 'I Like Reads Books',
      avatar_url: user.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`,
      background_url: user.backgroundUrl || '',
      role: user.role || 'user',
      created_at: user.createdAt
    };

    return NextResponse.json({ user: formattedUser });
  } catch (error) {
    console.error('Session error:', error);
    return NextResponse.json({ user: null }, { status: 401 });
  }
}