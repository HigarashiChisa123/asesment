import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-for-development';

function getUserId(request, fallbackUserId) {
  if (fallbackUserId) return fallbackUserId;
  try {
    const token =
      request.cookies?.get?.('token')?.value ||
      request.headers.get('cookie')?.match(/token=([^;]+)/)?.[1];
    if (!token) return null;
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded.id;
  } catch {
    return null;
  }
}

export async function POST(request, { params }) {
  const bookId = params?.id;
  const body = await request.json().catch(() => ({}));
  const userId = getUserId(request, body.userId);
  const durationDays = [7, 14, 21].includes(Number(body.durationDays))
    ? Number(body.durationDays)
    : 14;

  if (!userId) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }

  if (!bookId) {
    return NextResponse.json(
      { success: false, message: 'Book ID is required' },
      { status: 400 }
    );
  }

  let connection;
  try {
    connection = await db.getConnection();

    // Pastikan buku ada dan cek availability
    const [books] = await connection.execute(
      `SELECT id, available FROM books WHERE id = ? LIMIT 1`,
      [bookId]
    );
    if (!books.length) {
      return NextResponse.json(
        { success: false, message: 'Book not found' },
        { status: 404 }
      );
    }

    // Cek apakah user sudah meminjam buku ini dan belum selesai
    const [[existing]] = await connection.execute(
      `SELECT id FROM borrowed_books WHERE user_id = ? AND book_id = ? AND status = 'borrowed' LIMIT 1`,
      [userId, bookId]
    );
    if (existing) {
      return NextResponse.json(
        { success: false, message: 'You have already borrowed this book' },
        { status: 400 }
      );
    }

    // Insert pinjaman
    const [result] = await connection.execute(
      `INSERT INTO borrowed_books 
        (user_id, book_id, borrowed_date, due_date, status) 
       VALUES (?, ?, CURDATE(), DATE_ADD(CURDATE(), INTERVAL ? DAY), 'borrowed')`,
      [userId, bookId, durationDays]
    );

    // Opsional tandai buku tidak tersedia
    await connection.execute('UPDATE books SET available = 0 WHERE id = ?', [bookId]);

    return NextResponse.json({
      success: true,
      message: 'Book borrowed successfully',
      borrowId: result.insertId,
      dueDate: new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0],
      durationDays
    });
  } catch (error) {
    console.error('Error borrowing book:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error', error: error.message },
      { status: 500 }
    );
  } finally {
    if (connection) connection.release?.();
  }
}
