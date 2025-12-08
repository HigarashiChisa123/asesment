import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
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
    return decoded.id || decoded.userId || null;
  } catch {
    return null;
  }
}

export async function GET(request) {
  let connection;
  try {
    const { searchParams } = new URL(request.url);
    const userId = getUserId(request, searchParams.get('userId'));
    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }
    const status = searchParams.get('status') || 'all';

    connection = await connectToDatabase();

    // Build query based on status
    let query = `
      SELECT bb.*, b.book_name, b.creator, b.category, b.cover_url, b.rating
      FROM borrowed_books bb
      JOIN books b ON bb.book_id = b.id
      WHERE bb.user_id = ?
    `;

    const params = [userId];

    if (status !== 'all') {
      query += ' AND bb.status = ?';
      params.push(status);
    }

    query += ' ORDER BY bb.borrowed_date DESC, bb.created_at DESC';

    const [books] = await connection.execute(query, params);

    // Format dates for frontend
    const formattedBooks = books.map(book => ({
      id: book.id,
      book_id: book.book_id,
      book_name: book.book_name,
      creator: book.creator,
      category: book.category,
      cover_url: book.cover_url,
      rating: book.rating,
      status: book.status,
      borrowed_date: book.borrowed_date,
      due_date: book.due_date,
      return_date: book.return_date,
      fine_amount: book.fine_amount,
      fine_paid: book.fine_paid,
      created_at: book.created_at,
      days_remaining: book.due_date 
        ? Math.max(0, Math.ceil((new Date(book.due_date) - new Date()) / (1000 * 60 * 60 * 24)))
        : null
    }));

    return NextResponse.json({
      success: true,
      books: formattedBooks,
      count: formattedBooks.length
    });

  } catch (error) {
    console.error('Error fetching borrowed books:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch borrowed books', error: error.message },
      { status: 500 }
    );
  } finally {
    if (connection && connection.release) connection.release();
  }
}

export async function DELETE(request) {
  let connection;
  try {
    const body = await request.json();
    const userIdFromToken = getUserId(request);
    const { bookIds, userId: bodyUserId, bookId, bookIdsAlt } = body || {};
    const effectiveUserId = userIdFromToken || bodyUserId;
    
    if (!effectiveUserId) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const combinedIds = [
      ...(Array.isArray(bookIds) ? bookIds : []),
      ...(bookId ? [bookId] : []),
      ...(Array.isArray(bookIdsAlt) ? bookIdsAlt : [])
    ]
      .filter(Boolean)
      .map((v) => Number(v));

    if (!combinedIds.length) {
      return NextResponse.json(
        { success: false, message: 'No books selected for deletion' },
        { status: 400 }
      );
    }

    connection = await connectToDatabase();

    const idPlaceholders = combinedIds.map(() => '?').join(', ');

    // Cari pinjaman berdasarkan loan id (utama)
    let [rows] = await connection.execute(
      `SELECT id, book_id 
       FROM borrowed_books 
       WHERE id IN (${idPlaceholders}) AND user_id = ?`,
      [...combinedIds, effectiveUserId]
    );

    // Jika tidak ada, coba fallback: treat input sebagai book_id
    if (!rows.length) {
      [rows] = await connection.execute(
        `SELECT id, book_id 
         FROM borrowed_books 
         WHERE book_id IN (${idPlaceholders}) AND user_id = ? AND status = "borrowed"`,
        [...combinedIds, effectiveUserId]
      );
    }

    if (!rows.length) {
      return NextResponse.json({
        success: false,
        message: 'No matching loans found for this user.'
      });
    }

    // Tandai sebagai returned & set return_date
    const loanIds = rows.map(r => r.id);
    const loanPlaceholders = loanIds.map(() => '?').join(', ');

    const [result] = await connection.execute(
      `UPDATE borrowed_books 
       SET status = 'returned',
           return_date = CURDATE(),
           updated_at = NOW()
       WHERE id IN (${loanPlaceholders}) AND user_id = ?`,
      [...loanIds, effectiveUserId]
    );

    // Set buku kembali tersedia
    const bookIdsToUpdate = rows.map(r => Number(r.book_id)).filter(Boolean);
    if (bookIdsToUpdate.length) {
      const bookPlaceholders = bookIdsToUpdate.map(() => '?').join(', ');
      await connection.execute(
        `UPDATE books SET available = 1 WHERE id IN (${bookPlaceholders})`,
        bookIdsToUpdate
      );
    }

    if (result.affectedRows > 0) {
      return NextResponse.json({
        success: true,
        message: `Successfully returned ${result.affectedRows} book(s)`,
        deletedCount: result.affectedRows
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'No books were updated. They may not exist or you do not have permission.'
      });
    }

  } catch (error) {
    console.error('Error deleting borrowed books:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete books', error: error.message },
      { status: 500 }
    );
  } finally {
    if (connection && connection.release) connection.release();
  }
}
