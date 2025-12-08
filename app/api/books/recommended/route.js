// app/api/books/recommended/route.js
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';

export async function GET() {
  let connection;
  try {
    connection = await connectToDatabase();
    
    // Ambil buku dengan rating tertinggi
    const [books] = await connection.execute(
      'SELECT * FROM books WHERE rating >= 4.5 ORDER BY rating DESC, RAND() LIMIT 10'
    );
    
    return NextResponse.json(books);
    
  } catch (error) {
    console.error('Error fetching recommended books:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recommended books' },
      { status: 500 }
    );
  } finally {
    if (connection?.release) connection.release();
  }
}
