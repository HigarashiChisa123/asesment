// app/api/books/route.js
import { NextResponse } from "next/server";
import mysql from 'mysql2/promise';

// Konfigurasi database - sesuaikan dengan database Anda
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'perpustakaan',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Pool koneksi
let pool;

// Fungsi untuk mendapatkan koneksi database
async function getDb() {
  if (!pool) {
    pool = mysql.createPool(dbConfig);
  }
  return pool;
}

// Helper function untuk memproses URL cover
function processCoverUrl(coverUrl, bookTitle = 'Book') {
  console.log(`Processing cover URL: ${coverUrl}`);
  
  // Jika cover_url kosong atau null, gunakan placeholder
  if (!coverUrl || coverUrl.trim() === '') {
    const shortTitle = bookTitle ? bookTitle.substring(0, 15) : 'Book';
    return `https://via.placeholder.com/300x400/667eea/ffffff?text=${encodeURIComponent(shortTitle)}`;
  }
  
  // Trim spasi
  coverUrl = coverUrl.trim();
  
  // Periksa jika sudah URL lengkap
  if (coverUrl.startsWith('http://') || coverUrl.startsWith('https://')) {
    return coverUrl;
  }
  
  // Periksa jika sudah path lengkap dengan uploads/covers
  if (coverUrl.startsWith('/uploads/covers/')) {
    return coverUrl;
  }
  
  // Jika dimulai dengan slash tapi tanpa uploads/covers
  if (coverUrl.startsWith('/')) {
    // Cek jika mengandung uploads
    if (!coverUrl.includes('uploads')) {
      return `/uploads/covers${coverUrl}`;
    }
    return coverUrl;
  }
  
  // Jika mengandung ekstensi gambar (jpg, png, jpeg)
  const imageExtensions = ['.jpg', '.png', '.jpeg', '.gif', '.webp'];
  const hasImageExtension = imageExtensions.some(ext => 
    coverUrl.toLowerCase().endsWith(ext)
  );
  
  if (hasImageExtension) {
    // Jika mengandung path, pisahkan
    const parts = coverUrl.split('/');
    const fileName = parts[parts.length - 1];
    
    // Cek jika file mengandung spasi, replace dengan %20
    const encodedFileName = fileName.replace(/ /g, '%20');
    
    return `/uploads/covers/${encodedFileName}`;
  }
  
  // Jika tidak ada ekstensi yang dikenali, coba tambahkan .jpg
  if (!hasImageExtension) {
    // Cek jika mengandung path
    const parts = coverUrl.split('/');
    let fileName = parts[parts.length - 1];
    
    // Tambahkan ekstensi .jpg jika belum ada
    if (!fileName.includes('.')) {
      fileName += '.jpg';
    }
    
    // Encode spasi
    const encodedFileName = fileName.replace(/ /g, '%20');
    
    return `/uploads/covers/${encodedFileName}`;
  }
  
  // Fallback ke placeholder
  const shortTitle = bookTitle ? bookTitle.substring(0, 15) : 'Book';
  return `https://via.placeholder.com/300x400/667eea/ffffff?text=${encodeURIComponent(shortTitle)}`;
}

export async function GET(request) {
  let connection;
  
  try {
    console.log('🔍 Fetching books from database...');
    
    // Dapatkan koneksi database
    const db = await getDb();
    connection = await db.getConnection();
    
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = searchParams.get('limit') || 100;
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');
    const popular = searchParams.get('popular');
    const newArrival = searchParams.get('new_arrival');
    
    console.log('Query params:', { category, limit, search, featured, popular, newArrival });
    
    // Build query
    let query = `
      SELECT 
        id,
        book_name as title,
        creator as author,
        rating,
        description,
        category,
        cover_url as coverUrl,
        publisher,
        pages,
        publication_year as year,
        language,
        file_url as fileUrl,
        reviews,
        available,
        featured,
        popular,
        new_arrival as newArrival,
        format,
        file_size as fileSize,
        file_format as fileFormat,
        created_at as createdAt,
        updated_at as updatedAt
      FROM books 
      WHERE 1=1
    `;
    
    const params = [];
    
    // Filter by category
    if (category && category !== 'All' && category !== 'all') {
      query += ' AND category = ?';
      params.push(category);
    }
    
    // Filter by search
    if (search) {
      query += ' AND (book_name LIKE ? OR creator LIKE ? OR description LIKE ?)';
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }
    
    // Filter by featured
    if (featured === 'true') {
      query += ' AND featured = 1';
    }
    
    // Filter by popular
    if (popular === 'true') {
      query += ' AND popular = 1';
    }
    
    // Filter by new arrival
    if (newArrival === 'true') {
      query += ' AND new_arrival = 1';
    }
    
    // Order and limit
    query += ' ORDER BY rating DESC, created_at DESC LIMIT ?';
    params.push(parseInt(limit));
    
    console.log('Executing query:', query);
    console.log('With params:', params);
    
    const [books] = await connection.execute(query, params);
    
    console.log(`✅ Found ${books.length} books`);
    
    // Process books data
    const processedBooks = books.map(book => {
      console.log(`Processing book: ${book.title}`);
      console.log(`Original coverUrl: ${book.coverUrl}`);
      
      // Process cover URL
      const processedCoverUrl = processCoverUrl(book.coverUrl, book.title);
      console.log(`Processed coverUrl: ${processedCoverUrl}`);
      
      // Determine flags
      const isFeatured = book.featured === 1 || book.rating >= 4.8;
      const isPopular = book.popular === 1 || (book.reviews && book.reviews > 10);
      const isNewArrival = book.newArrival === 1 || 
        (book.createdAt && new Date(book.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));
      
      // Get a short description for preview
      const shortDescription = book.description 
        ? book.description.length > 150 
          ? book.description.substring(0, 150) + '...' 
          : book.description
        : 'No description available.';
      
      return {
        id: book.id,
        title: book.title || 'Untitled Book',
        author: book.author || 'Unknown Author',
        rating: parseFloat(book.rating) || 4.0,
        description: book.description || 'No description available.',
        shortDescription: shortDescription,
        category: book.category || 'General',
        coverUrl: processedCoverUrl,
        image: processedCoverUrl, // Duplicate for compatibility
        publisher: book.publisher || 'Unknown Publisher',
        pages: book.pages || 0,
        year: book.year || 2023,
        language: book.language || 'English',
        fileUrl: book.fileUrl || null,
        reviews: book.reviews || 0,
        available: Boolean(book.available),
        featured: Boolean(isFeatured),
        popular: Boolean(isPopular),
        newArrival: Boolean(isNewArrival),
        format: book.format || 'digital',
        fileSize: book.fileSize,
        fileFormat: book.fileFormat,
        createdAt: book.createdAt,
        updatedAt: book.updatedAt,
        // Additional metadata
        tags: [book.category, book.language].filter(Boolean),
        status: book.available ? 'available' : 'unavailable'
      };
    });

    // Ensure 8 comics available, 2 unavailable (deterministic toggle)
    const comicIndexes = processedBooks
      .map((b, idx) => ({ idx, isComic: b.category === 'Comics' }))
      .filter(({ isComic }) => isComic)
      .map(({ idx }) => idx);

    // Mark first 2 comics as unavailable if present
    comicIndexes.slice(0, 2).forEach(i => {
      processedBooks[i].available = false;
      processedBooks[i].status = 'unavailable';
    });
    
    // Group by category for statistics
    const categoryStats = processedBooks.reduce((acc, book) => {
      const category = book.category;
      if (!acc[category]) {
        acc[category] = {
          count: 0,
          avgRating: 0,
          totalRating: 0
        };
      }
      acc[category].count++;
      acc[category].totalRating += book.rating;
      return acc;
    }, {});
    
    // Calculate average rating per category
    Object.keys(categoryStats).forEach(category => {
      categoryStats[category].avgRating = 
        categoryStats[category].totalRating / categoryStats[category].count;
    });
    
    // Kembalikan koneksi ke pool
    if (connection) {
      connection.release();
    }
    
    return NextResponse.json({
      success: true,
      message: `Successfully fetched ${processedBooks.length} books`,
      count: processedBooks.length,
      books: processedBooks,
      categories: Object.keys(categoryStats),
      stats: {
        totalBooks: processedBooks.length,
        categories: categoryStats,
        avgRating: processedBooks.reduce((sum, book) => sum + book.rating, 0) / processedBooks.length,
        featuredCount: processedBooks.filter(book => book.featured).length,
        popularCount: processedBooks.filter(book => book.popular).length,
        newArrivalsCount: processedBooks.filter(book => book.newArrival).length
      },
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Error fetching books:', error);
    
    // Kembalikan koneksi ke pool jika ada error
    if (connection) {
      connection.release();
    }
    
    // Return error dengan detail
    return NextResponse.json(
      { 
        success: false, 
        message: "Failed to fetch books from database",
        error: error.message,
        code: error.code,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

// Optional: Add POST method for creating books
export async function POST(request) {
  let connection;
  
  try {
    const body = await request.json();
    
    console.log('📝 Creating new book:', body.title);
    
    // Validasi input
    if (!body.title || !body.author) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Title and author are required" 
        },
        { status: 400 }
      );
    }
    
    // Dapatkan koneksi database
    const db = await getDb();
    connection = await db.getConnection();
    
    // Process cover URL before saving
    const processedCoverUrl = processCoverUrl(body.coverUrl, body.title);
    
    const [result] = await connection.query(
      `INSERT INTO books 
       (book_name, creator, category, rating, description, pages, publisher, 
        publication_year, language, cover_url, format, file_url, file_size, file_format) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        body.title,
        body.author,
        body.category || 'General',
        body.rating || 4.0,
        body.description || '',
        body.pages || 0,
        body.publisher || '',
        body.year || new Date().getFullYear(),
        body.language || 'English',
        processedCoverUrl,
        body.format || 'digital',
        body.fileUrl || null,
        body.fileSize || null,
        body.fileFormat || null
      ]
    );
    
    // Get the inserted book
    const [insertedBook] = await connection.query(
      'SELECT * FROM books WHERE id = ?',
      [result.insertId]
    );
    
    // Kembalikan koneksi ke pool
    connection.release();
    
    return NextResponse.json({
      success: true,
      message: "Book created successfully",
      bookId: result.insertId,
      book: insertedBook[0]
    }, { status: 201 });
    
  } catch (error) {
    console.error('❌ Error creating book:', error);
    
    // Kembalikan koneksi ke pool jika ada error
    if (connection) {
      connection.release();
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: "Failed to create book",
        error: error.message 
      },
      { status: 500 }
    );
  }
}

// Optional: Add other HTTP methods
export async function PUT(request) {
  let connection;
  
  try {
    const body = await request.json();
    
    if (!body.id) {
      return NextResponse.json(
        { success: false, message: "Book ID is required" },
        { status: 400 }
      );
    }
    
    console.log(`✏️ Updating book ID: ${body.id}`);
    
    const db = await getDb();
    connection = await db.getConnection();
    
    // Process cover URL if provided
    let coverUrl = body.coverUrl;
    if (coverUrl) {
      coverUrl = processCoverUrl(coverUrl, body.title);
    }
    
    const [result] = await connection.query(
      `UPDATE books SET 
        book_name = ?, 
        creator = ?, 
        category = ?, 
        rating = ?, 
        description = ?, 
        cover_url = ?,
        publisher = ?,
        pages = ?,
        publication_year = ?,
        language = ?,
        format = ?,
        available = ?,
        featured = ?,
        popular = ?,
        new_arrival = ?
       WHERE id = ?`,
      [
        body.title,
        body.author,
        body.category,
        body.rating,
        body.description,
        coverUrl,
        body.publisher,
        body.pages,
        body.year,
        body.language,
        body.format,
        body.available,
        body.featured,
        body.popular,
        body.newArrival,
        body.id
      ]
    );
    
    connection.release();
    
    return NextResponse.json({
      success: true,
      message: "Book updated successfully",
      affectedRows: result.affectedRows
    });
    
  } catch (error) {
    console.error('❌ Error updating book:', error);
    if (connection) {
      connection.release();
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: "Failed to update book",
        error: error.message 
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  let connection;
  
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: "Book ID is required" },
        { status: 400 }
      );
    }
    
    console.log(`🗑️ Deleting book ID: ${id}`);
    
    const db = await getDb();
    connection = await db.getConnection();
    
    const [result] = await connection.query(
      'DELETE FROM books WHERE id = ?',
      [id]
    );
    
    connection.release();
    
    return NextResponse.json({
      success: true,
      message: "Book deleted successfully",
      affectedRows: result.affectedRows
    });
    
  } catch (error) {
    console.error('❌ Error deleting book:', error);
    if (connection) {
      connection.release();
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: "Failed to delete book",
        error: error.message 
      },
      { status: 500 }
    );
  }
}

// GET endpoint untuk mendapatkan buku berdasarkan ID
export async function dynamicGET(request, { params }) {
  let connection;
  
  try {
    const { id } = params;
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: "Book ID is required" },
        { status: 400 }
      );
    }
    
    console.log(`🔍 Fetching book with ID: ${id}`);
    
    const db = await getDb();
    connection = await db.getConnection();
    
    const [books] = await connection.query(
      `SELECT 
        id,
        book_name as title,
        creator as author,
        rating,
        description,
        category,
        cover_url as coverUrl,
        publisher,
        pages,
        publication_year as year,
        language,
        file_url as fileUrl,
        reviews,
        available,
        featured,
        popular,
        new_arrival as newArrival,
        format,
        file_size as fileSize,
        file_format as fileFormat,
        created_at as createdAt,
        updated_at as updatedAt
      FROM books 
      WHERE id = ?`,
      [id]
    );
    
    if (books.length === 0) {
      connection.release();
      return NextResponse.json(
        { 
          success: false, 
          message: "Book not found" 
        },
        { status: 404 }
      );
    }
    
    const book = books[0];
    
    // Process cover URL
    book.coverUrl = processCoverUrl(book.coverUrl, book.title);
    book.image = book.coverUrl; // Duplicate for compatibility
    
    connection.release();
    
    return NextResponse.json({
      success: true,
      message: "Book found",
      book: book
    });
    
  } catch (error) {
    console.error('❌ Error fetching book by ID:', error);
    if (connection) {
      connection.release();
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: "Failed to fetch book",
        error: error.message 
      },
      { status: 500 }
    );
  }
}
