import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';

function getUserFromToken(request) {
  try {
    const token =
      request.cookies?.get?.('token')?.value ||
      request.headers.get('cookie')?.match(/token=([^;]+)/)?.[1];
    if (!token) return null;
    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('utf8'));
    return payload;
  } catch {
    return null;
  }
}

export async function GET(req) {
  let conn;
  try {
    const user = getUserFromToken(req);
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    conn = await connectToDatabase();
    const [rows] = await conn.execute(`
      SELECT 
        u.id,
        u.username,
        u.email,
        u.role,
        u.is_active,
        u.created_at,
        COALESCE(u.full_name, '') as full_name,
        COALESCE(u.bio, '') as bio,
        (SELECT COUNT(*) FROM borrowed_books bb WHERE bb.user_id = u.id) AS loans,
        (SELECT COUNT(*) FROM wishlist w WHERE w.user_id = u.id) AS wishlist_count
      FROM users u
      ORDER BY u.created_at DESC
    `);

    return NextResponse.json({ success: true, users: rows });
  } catch (err) {
    console.error('Admin users error:', err);
    return NextResponse.json({ success: false, message: 'Failed to load users' }, { status: 500 });
  } finally {
    conn?.release?.();
  }
}
