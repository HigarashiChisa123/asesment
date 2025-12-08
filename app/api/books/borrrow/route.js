// app/api/books/[id]/borrow/route.js
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import jwt from 'jsonwebtoken';

// POST: Borrow a book
export async function POST(request, { params }) {
  let connection;
  
  try {
    const { id } = await params;
    const body = await request.json().catch(() => ({}));

    // Ambil user dari token httpOnly
    const token = request.cookies.get('token')?.value || null;
    let userId = body.userId;
    if (!userId && token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key-for-development');
        userId = decoded.id;
      } catch (e) {
        console.error('Token decode error:', e.message);
      }
    }
    
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 401 }
      );
    }

    // Durasi pinjam (7/14/21), default 14
    const durationDays = [7, 14, 21].includes(Number(body.durationDays)) ? Number(body.durationDays) : 14;
    
    console.log(`📚 Borrowing book ${id} for user ${userId}`);
    
    connection = await connectToDatabase();
    
    // Cek apakah buku tersedia
    const [book] = await connection.execute(
      `SELECT 
        b.*,
        COUNT(CASE WHEN bb.status = 'borrowed' THEN 1 END) as currently_borrowed
       FROM books b
       LEFT JOIN borrowed_books bb ON b.id = bb.book_id AND bb.status = 'borrowed'
       WHERE b.id = ?
       GROUP BY b.id`,
      [id]
    );
    
    if (book.length === 0) {
      await connection.release();
      return NextResponse.json(
        { success: false, error: 'Book not found' },
        { status: 404 }
      );
    }
    
    const bookData = book[0];
    
    // Cek apakah user sudah meminjam buku ini
    const [existingBorrow] = await connection.execute(
      'SELECT id FROM borrowed_books WHERE user_id = ? AND book_id = ? AND status = "borrowed"',
      [userId, id]
    );
    
    if (existingBorrow.length > 0) {
      await connection.release();
      return NextResponse.json({
        success: false,
        error: 'You have already borrowed this book'
      }, { status: 400 });
    }
    
    // Cek ketersediaan buku
    // Asumsi: Setiap buku hanya memiliki 1 copy untuk sekarang
    if (bookData.currently_borrowed > 0) {
      await connection.release();
      return NextResponse.json({
        success: false,
        error: 'This book is currently unavailable'
      }, { status: 400 });
    }
    
    // Tambahkan data peminjaman
    const [result] = await connection.execute(
      `INSERT INTO borrowed_books 
       (user_id, book_id, borrowed_date, due_date, status) 
       VALUES (?, ?, CURDATE(), DATE_ADD(CURDATE(), INTERVAL ${durationDays} DAY), 'borrowed')`,
      [userId, id]
    );
    
    // Update statistik buku
    await connection.execute(
      'UPDATE books SET available = 0 WHERE id = ?',
      [id]
    );
    
    connection.release();
    
    return NextResponse.json({
      success: true,
      message: 'Book borrowed successfully',
      borrowId: result.insertId,
      dueDate: new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      durationDays
    }, { status: 201 });
    
  } catch (error) {
    console.error('❌ Error borrowing book:', error);
    
    if (connection?.release) connection.release();
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Internal server error',
        message: error.message 
      },
      { status: 500 }
    );
  }
}
