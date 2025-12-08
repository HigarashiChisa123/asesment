// lib/db.js
import mysql from 'mysql2/promise';

// Create a connection pool (global instance)
let pool;

function createPool() {
  if (!pool) {
    console.log('=== DATABASE CONFIG ===');
    console.log('DB Host:', process.env.DB_HOST || 'localhost');
    console.log('DB Name:', process.env.DB_NAME || 'perpustakaan');
    console.log('DB User:', process.env.DB_USER || 'root');

    pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'perpustakaan',
      port: process.env.DB_PORT || 3306,
      waitForConnections: true,
      connectionLimit: 5,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 10000,
    });
  }
  return pool;
}

// Test connection
export async function testConnection() {
  try {
    const pool = createPool();
    const connection = await pool.getConnection();
    console.log('✅ Database connected successfully');
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.log('Please check:');
    console.log('1. MySQL server is running');
    console.log('2. Database name is correct');
    console.log('3. Username/password is correct');
    return false;
  }
}

// Query helper (returns [results, fields] like mysql2)
async function query(sql, params) {
  const pool = createPool();
  try {
    const [results, fields] = await pool.query(sql, params);
    return [results, fields];  // FIX
  } catch (error) {
    console.error('Database Query Error:', error.message);
    throw error;
  }
}

// Execute helper (returns [results, fields])
async function execute(sql, params) {
  const pool = createPool();
  try {
    const [results, fields] = await pool.execute(sql, params);
    return [results, fields];  // FIX
  } catch (error) {
    console.error('Database Execute Error:', error.message);
    throw error;
  }
}

// Direct connection helper (use pool to avoid exhausting connections)
export async function connectToDatabase() {
  const pool = createPool();
  return pool.getConnection();
}

// Export db object
export const db = {
  query,
  execute,
  getConnection: () => createPool().getConnection(),
};
