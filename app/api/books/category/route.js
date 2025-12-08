import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';

export async function GET() {
  let connection;
  try {
    connection = await connectToDatabase();
    
    const [categories] = await connection.execute(`
      SELECT DISTINCT category 
      FROM books 
      WHERE category IS NOT NULL AND category != ''
      ORDER BY category
    `);
    
    return NextResponse.json({
      success: true,
      categories: categories.map(cat => cat.category)
    });
    
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch categories' },
      { status: 500 }
    );
  } finally {
    if (connection?.release) connection.release();
  }
}
