// app/api/books/category/[category]/route.js
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';

export async function GET(request, { params }) {
  let connection;
  try {
    const { category } = params;
    connection = await connectToDatabase();
    
    const [books] = await connection.execute(
      'SELECT * FROM books WHERE category = ? ORDER BY rating DESC, book_name ASC',
      [category]
    );
    
    return NextResponse.json(books);
    
  } catch (error) {
    console.error(`Error fetching ${category} books:`, error);
    return NextResponse.json(
      { error: `Failed to fetch ${category} books` },
      { status: 500 }
    );
  } finally {
    if (connection?.release) connection.release();
  }
}
