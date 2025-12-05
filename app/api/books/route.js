import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const [books] = await db.query(`
      SELECT 
        id,
        title,
        author,
        category,
        cover_url,
        rating,
        reviews,
        available,
        created_at
      FROM books
      ORDER BY title ASC
    `);

    // Format data
    const formattedBooks = books.map(book => ({
      id: book.id,
      title: book.title,
      author: book.author,
      category: book.category || 'General',
      cover_url: book.cover_url || `https://via.placeholder.com/300x400/667eea/ffffff?text=${encodeURIComponent(book.title.substring(0, 10))}`,
      rating: parseFloat(book.rating) || 4.0,
      reviews: book.reviews || 0,
      available: Boolean(book.available),
      created_at: book.created_at
    }));

    return NextResponse.json({
      success: true,
      books: formattedBooks
    });
  } catch (error) {
    console.error('Error fetching books:', error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}