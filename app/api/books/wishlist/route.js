// app/api/wishlist/route.js
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';

// Helper function untuk memproses URL cover
function processCoverUrl(coverUrl, bookTitle = 'Book') {
  if (!coverUrl || coverUrl.trim() === '') {
    const shortTitle = bookTitle.substring(0, 15);
    return `https://via.placeholder.com/300x400/667eea/ffffff?text=${encodeURIComponent(shortTitle)}`;
  }
  
  coverUrl = coverUrl.trim();
  
  if (coverUrl.startsWith('http://') || coverUrl.startsWith('https://')) {
    return coverUrl;
  }
  
  if (coverUrl.startsWith('/uploads/covers/')) {
    return coverUrl;
  }
  
  return `/uploads/covers/${coverUrl}`;
}

// GET: Get user's wishlist
export async function GET(request) {
  let connection;
  
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      );
    }
    
    console.log(`📋 Fetching wishlist for user ${userId}`);
    
    connection = await connectToDatabase();
    
    const [wishlist] = await connection.execute(
      `SELECT 
        w.*,
        b.book_name,
        b.creator,
        b.rating,
        b.description,
        b.category,
        b.cover_url,
        b.publisher,
        b.pages,
        b.publication_year,
        b.language,
        b.available,
        b.format,
        DATE_FORMAT(w.added_date, '%Y-%m-%d') as added_date_formatted
       FROM wishlist w
       JOIN books b ON w.book_id = b.id
       WHERE w.user_id = ?
       ORDER BY w.added_date DESC`,
      [userId]
    );
    
    // Format data wishlist
    const formattedWishlist = wishlist.map(item => ({
      id: item.id,
      bookId: item.book_id,
      userId: item.user_id,
      liked: Boolean(item.liked),
      addedDate: item.added_date_formatted,
      book: {
        id: item.book_id,
        title: item.book_name,
        author: item.creator,
        rating: parseFloat(item.rating) || 4.0,
        description: item.description || '',
        category: item.category || 'General',
        cover: processCoverUrl(item.cover_url, item.book_name),
        publisher: item.publisher || 'Unknown',
        pages: item.pages || 0,
        year: item.publication_year || 2023,
        language: item.language || 'English',
        available: Boolean(item.available),
        format: item.format || 'digital'
      }
    }));
    
    connection.release();
    
    return NextResponse.json({
      success: true,
      count: formattedWishlist.length,
      wishlist: formattedWishlist
    });
    
  } catch (error) {
    console.error('❌ Error fetching wishlist:', error);
    
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

// POST: Add multiple books to wishlist or clear wishlist
export async function POST(request) {
  let connection;
  
  try {
    const body = await request.json();
    const { userId, bookIds, action = 'add' } = body;
    
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      );
    }
    
    connection = await connectToDatabase();
    
    if (action === 'clear') {
      // Clear user's wishlist
      await connection.execute(
        'DELETE FROM wishlist WHERE user_id = ?',
        [userId]
      );
      
      connection.release();
      return NextResponse.json({
        success: true,
        message: 'Wishlist cleared successfully'
      });
    }
    
    if (!bookIds || !Array.isArray(bookIds) || bookIds.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Book IDs are required' },
        { status: 400 }
      );
    }
    
    // Add multiple books to wishlist
    const values = bookIds.map(bookId => [userId, bookId, 1]);
    
    await connection.execute(
      `INSERT IGNORE INTO wishlist (user_id, book_id, liked) VALUES ?`,
      [values]
    );
    
    connection.release();
    
    return NextResponse.json({
      success: true,
      message: `${bookIds.length} books added to wishlist`
    });
    
  } catch (error) {
    console.error('❌ Error updating wishlist:', error);
    
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
