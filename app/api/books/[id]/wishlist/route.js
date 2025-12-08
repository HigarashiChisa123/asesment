import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { db } from '@/lib/db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-for-development';

function getUserId(request) {
  try {
    const token = request.cookies?.get?.('token')?.value ||
      request.headers.get('cookie')?.match(/token=([^;]+)/)?.[1];
    if (!token) return null;
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded.id;
  } catch {
    return null;
  }
}

export async function POST(request, { params }) {
  const userId = getUserId(request);
  const bookId = params?.id;

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

  try {
    const [[exists]] = await db.query(
      'SELECT 1 FROM books WHERE id = ? LIMIT 1',
      [bookId]
    );

    if (!exists) {
      return NextResponse.json(
        { success: false, message: 'Book not found' },
        { status: 404 }
      );
    }

    const [[current]] = await db.query(
      'SELECT liked FROM wishlist WHERE user_id = ? AND book_id = ? LIMIT 1',
      [userId, bookId]
    );

    let isInWishlist = true;

    if (current) {
      const newLiked = !Boolean(current.liked);
      await db.query(
        'UPDATE wishlist SET liked = ? WHERE user_id = ? AND book_id = ?',
        [newLiked ? 1 : 0, userId, bookId]
      );
      isInWishlist = newLiked;
    } else {
      await db.query(
        'INSERT INTO wishlist (user_id, book_id, liked) VALUES (?, ?, 1)',
        [userId, bookId]
      );
      isInWishlist = true;
    }

    return NextResponse.json({
      success: true,
      isInWishlist,
      message: isInWishlist ? 'Added to wishlist' : 'Removed from wishlist'
    });
  } catch (error) {
    console.error('Error updating wishlist:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update wishlist', error: error.message },
      { status: 500 }
    );
  }
}
