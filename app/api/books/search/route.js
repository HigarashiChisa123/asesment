// app/api/books/search/route.js
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    
    if (!query.trim()) {
      return NextResponse.json({
        success: true,
        count: 0,
        books: []
      });
    }
    
    const searchPattern = `%${query}%`;
    
    const [books] = await db.query(
      `SELECT 
        id,
        book_name as title,
        creator as author,
        category,
        cover_url,
        rating,
        description,
        pages
      FROM books 
      WHERE book_name LIKE ? 
         OR creator LIKE ? 
         OR description LIKE ? 
         OR category LIKE ?
      ORDER BY rating DESC
      LIMIT 20`,
      [searchPattern, searchPattern, searchPattern, searchPattern]
    );
    
    const formattedBooks = books.map(book => ({
      ...book,
      cover_url: book.cover_url && !book.cover_url.startsWith('/') && !book.cover_url.startsWith('http')
        ? `/uploads/covers/${book.cover_url}`
        : book.cover_url
    }));
    
    return NextResponse.json({
      success: true,
      query: query,
      count: formattedBooks.length,
      books: formattedBooks
    });
  } catch (error) {
    console.error('Error searching books:', error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}