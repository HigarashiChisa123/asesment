import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';

// Simple guard to avoid exposing admin data without token/role.
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

    // Stats
    const [[counts]] = await conn.execute(`
      SELECT
        (SELECT COUNT(*) FROM users) AS total_users,
        (SELECT COUNT(*) FROM users WHERE role = 'admin') AS admins,
        (SELECT COUNT(*) FROM users WHERE is_active = 1) AS active_users,
        (SELECT COUNT(*) FROM books) AS books,
        (SELECT COUNT(*) FROM borrowed_books) AS total_loans,
        (SELECT COUNT(*) FROM borrowed_books WHERE status = 'borrowed') AS active_loans,
        (SELECT COUNT(*) FROM borrowed_books WHERE status = 'overdue') AS overdue_loans
    `);

    const [recentUsers] = await conn.execute(
      `SELECT id, username, email, role, is_active, created_at
       FROM users
       ORDER BY created_at DESC
       LIMIT 6`
    );

    const [recentBorrow] = await conn.execute(
      `SELECT bb.id, bb.user_id, bb.book_id, bb.status, bb.borrowed_date, bb.due_date, bb.created_at,
              u.username, u.email, b.book_name, b.category
       FROM borrowed_books bb
       JOIN users u ON bb.user_id = u.id
       JOIN books b ON bb.book_id = b.id
       ORDER BY bb.created_at DESC
       LIMIT 6`
    );

    return NextResponse.json({
      success: true,
      stats: {
        totalUsers: counts.total_users,
        admins: counts.admins,
        activeUsers: counts.active_users,
        books: counts.books,
        totalLoans: counts.total_loans,
        activeLoans: counts.active_loans,
        overdueLoans: counts.overdue_loans
      },
      recentUsers,
      recentBorrow
    });
  } catch (err) {
    console.error('Admin stats error:', err);
    return NextResponse.json({ success: false, message: 'Failed to load admin stats' }, { status: 500 });
  } finally {
    conn?.release?.();
  }
}
