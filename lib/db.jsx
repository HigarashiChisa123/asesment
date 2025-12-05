import mysql from 'mysql2/promise';

console.log('=== DATABASE CONFIG ===');
console.log('DB Host:', process.env.DB_HOST || 'localhost');
console.log('DB Name:', process.env.DB_NAME || 'perpustakaan');
console.log('DB User:', process.env.DB_USER || 'root');

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'perpustakaan',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

const pool = mysql.createPool(dbConfig);

// Test connection on startup
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Database connected successfully!');
    connection.release();
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.log('Please check:');
    console.log('1. MySQL server is running');
    console.log('2. Database name is correct');
    console.log('3. Username/password is correct');
  }
})();

export { pool as db };