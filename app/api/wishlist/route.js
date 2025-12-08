import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import jwt from "jsonwebtoken";

// Helper untuk mendapatkan user dari token
function getUserFromToken(request) {
  try {
    const cookieHeader = request.headers.get('cookie');
    const tokenCookie = cookieHeader?.match(/token=([^;]+)/)?.[1];
    
    if (!tokenCookie) {
      return null;
    }
    
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

    // Get wishlist with book details
    const [wishlist] = await db.query(`
      SELECT 
        b.id,
        b.book_name AS title,
        b.creator AS author,
        b.category,
        b.cover_url,
        b.rating,
        b.reviews,
        b.available,
        w.liked,
        DATE(w.added_date) as addedDate
      FROM wishlist w
      JOIN books b ON w.book_id = b.id
      WHERE w.user_id = ?
      ORDER BY w.added_date DESC
    `, [user.id]);

    // Format data
    const formattedWishlist = wishlist.map(item => ({
      id: item.id,
      title: item.title,
      author: item.author,
      category: item.category || 'General',
      cover_url: item.cover_url || `https://via.placeholder.com/300x400/667eea/ffffff?text=${encodeURIComponent((item.title || 'BK').substring(0, 10))}`,
      rating: parseFloat(item.rating) || 4.0,
      reviews: item.reviews || 0,
      available: Boolean(item.available),
      liked: Boolean(item.liked),
      addedDate: item.addedDate || new Date().toISOString().split('T')[0]
    }));

    return NextResponse.json({
      success: true,
      wishlist: formattedWishlist
    });
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const user = getUserFromToken(request);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { bookId } = await request.json();
    if (!bookId) {
      return NextResponse.json(
        { success: false, message: "Book ID is required" },
        { status: 400 }
      );
    }

    // Cek apakah buku sudah ada di wishlist
    const [existing] = await db.query(
      'SELECT * FROM wishlist WHERE user_id = ? AND book_id = ?',
      [user.id, bookId]
    );

    if (existing.length > 0) {
      // Update liked status
      await db.query(
        'UPDATE wishlist SET liked = NOT liked WHERE user_id = ? AND book_id = ?',
        [user.id, bookId]
      );
    } else {
      // Insert new wishlist item
      await db.query(
        'INSERT INTO wishlist (user_id, book_id, liked) VALUES (?, ?, TRUE)',
        [user.id, bookId]
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating wishlist:', error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const user = getUserFromToken(request);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const bookId = searchParams.get('bookId');

    if (!bookId) {
      return NextResponse.json(
        { success: false, message: "Book ID is required" },
        { status: 400 }
      );
    }

    // Remove from wishlist
    await db.query(
      'DELETE FROM wishlist WHERE user_id = ? AND book_id = ?',
      [user.id, bookId]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
