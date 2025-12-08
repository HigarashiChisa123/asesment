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

const placeholderCover = (title = 'Book') =>
  `https://via.placeholder.com/300x400/667eea/ffffff?text=${encodeURIComponent(title.substring(0, 15))}`;

const normalizeCover = (coverUrl, title) => {
  if (!coverUrl || !coverUrl.trim()) return placeholderCover(title);
  const trimmed = coverUrl.trim();
  if (trimmed.startsWith('http')) return trimmed;
  if (trimmed.startsWith('/uploads/covers/')) return trimmed;
  return `/uploads/covers/${trimmed}`;
};

export async function GET(request, { params }) {
  const userId = getUserId(request);
  const bookId = params?.id;

  if (!bookId) {
    return NextResponse.json(
      { success: false, message: 'Book ID is required' },
      { status: 400 }
    );
  }

  try {
    const [books] = await db.query(
      `SELECT 
        id,
        book_name AS title,
        creator AS author,
        rating,
        description,
        category,
        cover_url AS coverUrl,
        publisher,
        pages,
        publication_year AS year,
        language,
        available,
        format,
        reviews,
        created_at AS createdAt
      FROM books
      WHERE id = ?`,
      [bookId]
    );

    if (!books.length) {
      return NextResponse.json(
        { success: false, message: 'Book not found' },
        { status: 404 }
      );
    }

    const bookRow = books[0];
    const cover = normalizeCover(bookRow.coverUrl, bookRow.title);

    let isInWishlist = false;
    let loanInfo = null;

    if (userId) {
      const [[wishlistHit]] = await db.query(
        'SELECT 1 FROM wishlist WHERE user_id = ? AND book_id = ? LIMIT 1',
        [userId, bookId]
      );
      isInWishlist = Boolean(wishlistHit);

      const [loanRows] = await db.query(
        `SELECT status, borrowed_date, due_date, return_date
         FROM borrowed_books
         WHERE user_id = ? AND book_id = ?
         ORDER BY created_at DESC
         LIMIT 1`,
        [userId, bookId]
      );
      if (loanRows.length) {
        const loan = loanRows[0];
        loanInfo = {
          status: loan.status,
          borrowedDate: loan.borrowed_date,
          dueDate: loan.due_date,
          returnDate: loan.return_date
        };
      }
    }

    const [reviewRows] = await db.query(
      `SELECT 
        br.id,
        br.rating,
        br.review,
        br.created_at AS createdAt,
        u.username,
        u.profile_picture AS avatar
      FROM book_reviews br
      LEFT JOIN users u ON br.user_id = u.id
      WHERE br.book_id = ?
      ORDER BY br.created_at DESC
      LIMIT 10`,
      [bookId]
    );

    const [similarRows] = await db.query(
      `SELECT 
        id,
        book_name AS title,
        creator AS author,
        rating,
        category,
        cover_url AS coverUrl
      FROM books
      WHERE category = ? AND id != ?
      ORDER BY rating DESC, created_at DESC
      LIMIT 6`,
      [bookRow.category, bookId]
    );

    const book = {
      id: bookRow.id,
      title: bookRow.title || 'Untitled Book',
      author: bookRow.author || 'Unknown Author',
      rating: parseFloat(bookRow.rating) || 4.0,
      description: bookRow.description || '',
      category: bookRow.category || 'General',
      cover,
      coverUrl: cover,
      image: cover,
      publisher: bookRow.publisher || 'Unknown Publisher',
      pages: bookRow.pages || 0,
      year: bookRow.year || new Date().getFullYear(),
      language: bookRow.language || 'English',
      available: Boolean(bookRow.available),
      format: bookRow.format || 'digital',
      totalReviews: bookRow.reviews || reviewRows.length || 0,
      isInWishlist,
      status: bookRow.available ? 'available' : 'unavailable'
    };

    const reviews = reviewRows.map(r => ({
      id: r.id,
      rating: r.rating,
      review: r.review,
      user: r.username,
      avatar: r.avatar,
      createdAt: r.createdAt
    }));

    const similarBooks = similarRows.map(b => ({
      id: b.id,
      title: b.title,
      author: b.author,
      rating: parseFloat(b.rating) || 4.0,
      category: b.category || 'General',
      cover: normalizeCover(b.coverUrl, b.title),
      coverUrl: normalizeCover(b.coverUrl, b.title),
      image: normalizeCover(b.coverUrl, b.title)
    }));

    return NextResponse.json({
      success: true,
      book,
      reviews,
      similarBooks,
      loanInfo
    });
  } catch (error) {
    console.error('Error fetching book detail:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch book detail', error: error.message },
      { status: 500 }
    );
  }
}
