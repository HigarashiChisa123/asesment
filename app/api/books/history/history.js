import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import jwt from "jsonwebtoken";

console.log('📚 === HISTORY BOOKS API LOADED ===');

// GET: Mendapatkan history books user
export async function GET(req) {
  console.log('🔍 === GET HISTORY BOOKS API CALLED ===');
  
  try {
    const { searchParams } = new URL(req.url);
    const userIdFromParam = searchParams.get('userId');
    
    console.log('Request params:', { userIdFromParam });
    
    let userId;
    
    // Jika userId diberikan via query param
    if (userIdFromParam) {
      userId = parseInt(userIdFromParam);
      console.log('✅ Using userId from param:', userId);
    } else {
      // Ambil dari token
      const token = req.cookies.get("token")?.value;
      
      if (!token) {
        console.log('❌ No token found in cookies');
        return NextResponse.json(
          { 
            success: false, 
            message: "Tidak terautentikasi",
            debug: { hasToken: false }
          },
          { status: 401 }
        );
      }

      console.log('🔑 Token found, verifying...');
      
      let decoded;
      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET || 'rahasia');
        console.log('✅ Token decoded:', decoded);
      } catch (jwtError) {
        console.error('❌ Token verification failed:', jwtError);
        return NextResponse.json(
          { 
            success: false, 
            message: "Token tidak valid",
            debug: { jwtError: jwtError.message }
          },
          { status: 401 }
        );
      }
      
      userId = decoded.id;
      console.log('✅ Using userId from token:', userId);
    }

    if (!userId || isNaN(userId)) {
      console.log('❌ Invalid userId:', userId);
      return NextResponse.json(
        { 
          success: false, 
          message: "User ID tidak valid",
          debug: { userId }
        },
        { status: 400 }
      );
    }

    try {
      // Cek apakah tabel borrowed_books ada
      console.log('🔍 Checking for borrowed_books table...');
      const [tables] = await db.query(
        `SHOW TABLES LIKE 'borrowed_books'`
      );
      
      if (tables.length === 0) {
        console.log('⚠️ Table borrowed_books not found');
        return NextResponse.json({
          success: true,
          books: [],
          message: "Tabel borrowed_books belum dibuat",
          debug: { userId, tableExists: false }
        });
      }

      console.log('✅ Table borrowed_books exists, querying...');
      
      // Cek apakah ada data untuk user ini
      const [userCheck] = await db.query(
        `SELECT COUNT(*) as count FROM borrowed_books WHERE user_id = ?`,
        [userId]
      );
      
      console.log(`📊 User ${userId} has ${userCheck[0]?.count || 0} borrowed books`);

      // Query untuk mendapatkan books yang dipinjam user
      const [books] = await db.query(
        `SELECT 
          b.id,
          b.book_id,
          COALESCE(bk.title, 'Unknown Book') as title,
          COALESCE(bk.author, 'Unknown Author') as author,
          COALESCE(bk.category, 'General') as category,
          bk.cover_url as coverImage,
          DATE_FORMAT(b.borrowed_date, '%Y-%m-%d') as borrowedDate,
          DATE_FORMAT(b.due_date, '%Y-%m-%d') as dueDate,
          DATE_FORMAT(b.return_date, '%Y-%m-%d') as returnDate,
          COALESCE(b.status, 'returned') as status,
          b.created_at
        FROM borrowed_books b
        LEFT JOIN books bk ON b.book_id = bk.id
        WHERE b.user_id = ?
        ORDER BY b.borrowed_date DESC
        LIMIT 100`,
        [userId]
      );

      console.log(`✅ Found ${books.length} book records for user ${userId}`);

      // Format data sesuai kebutuhan frontend
      const formattedBooks = books.map(book => ({
        id: book.id,
        title: book.title,
        author: book.author,
        category: book.category || 'General',
        status: book.status || 'returned',
        borrowedDate: formatDate(book.borrowedDate),
        returnDate: formatDate(book.returnDate),
        dueDate: formatDate(book.dueDate),
        daysAgo: calculateDaysAgo(book.borrowedDate),
        coverImage: book.coverImage || `https://via.placeholder.com/300x400/667eea/ffffff?text=${encodeURIComponent(book.title.substring(0, 10))}`
      }));

      console.log('📦 Formatted books:', formattedBooks.length);
      
      return NextResponse.json({
        success: true,
        books: formattedBooks,
        count: formattedBooks.length,
        debug: {
          userId,
          rawCount: books.length,
          tableExists: true
        }
      });
      
    } catch (dbError) {
      console.error('❌ Database query error:', dbError);
      
      // Return error details for debugging
      return NextResponse.json({
        success: false,
        books: [],
        message: "Database error",
        debug: {
          userId,
          error: dbError.message,
          code: dbError.code
        }
      }, { status: 500 });
    }
    
  } catch (err) {
    console.error("💥 GET HISTORY BOOKS ERROR:", err);
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

// DELETE: Menghapus books dari history
export async function DELETE(req) {
  console.log('🗑️ === DELETE HISTORY BOOKS API CALLED ===');
  
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
    const { bookIds } = await req.json();
    
    if (!bookIds || !Array.isArray(bookIds) || bookIds.length === 0) {
      return NextResponse.json(
        { success: false, message: "ID buku tidak valid" },
        { status: 400 }
      );
    }

    console.log(`🗑️ Deleting ${bookIds.length} books for user ${userId}`);

    // Hapus books dari database
    const [result] = await db.query(
      `DELETE FROM borrowed_books 
       WHERE id IN (?) AND user_id = ?`,
      [bookIds, userId]
    );

    console.log(`✅ Deleted ${result.affectedRows} books`);
    
    return NextResponse.json({
      success: true,
      message: `Berhasil menghapus ${result.affectedRows} buku dari history`,
      deletedCount: result.affectedRows
    });
    
  } catch (err) {
    console.error("💥 DELETE HISTORY BOOKS ERROR:", err);
    return NextResponse.json(
      { success: false, message: "Kesalahan server" },
      { status: 500 }
    );
  }
}

// Helper functions
function formatDate(dateString) {
  if (!dateString) return 'N/A';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch (error) {
    return 'Invalid Date';
  }
}

function calculateDaysAgo(dateString) {
  if (!dateString) return 'some time ago';
  
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'today';
    if (diffDays === 1) return 'yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  } catch (error) {
    return 'some time ago';
  }
}