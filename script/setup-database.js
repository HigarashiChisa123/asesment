const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function setupDatabase() {
  console.log('🚀 Starting database setup...');
  
  const config = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    port: process.env.DB_PORT || 3306
  };
  
  try {
    // Connect to MySQL server
    console.log(`🔌 Connecting to MySQL at ${config.host}:${config.port}...`);
    const connection = await mysql.createConnection(config);
    
    // Create database if not exists
    console.log('📦 Creating database...');
    await connection.query(`CREATE DATABASE IF NOT EXISTS perpustakaan CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    
    console.log('✅ Database created successfully');
    
    // Read SQL file
    const sqlPath = path.join(__dirname, '../database-setup.sql');
    const sqlContent = fs.readFileSync(sqlPath, 'utf8');
    
    // Split SQL into individual statements
    const statements = sqlContent
      .split(';')
      .filter(statement => statement.trim().length > 0);
    
    console.log(`📝 Found ${statements.length} SQL statements to execute`);
    
    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      console.log(`⚡ Executing statement ${i + 1}/${statements.length}...`);
      
      try {
        await connection.query(statement);
        console.log(`✅ Statement ${i + 1} executed successfully`);
      } catch (error) {
        console.error(`❌ Error executing statement ${i + 1}:`, error.message);
      }
    }
    
    console.log('🎉 Database setup completed successfully!');
    
    await connection.end();
    
  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    console.error('Error details:', error);
    
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('\n💡 Tips: Cek username dan password MySQL Anda');
      console.log('   - Default XAMPP: username="root", password="" (kosong)');
      console.log('   - Default MAMP: username="root", password="root"');
    } else if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Tips: Pastikan MySQL server berjalan');
      console.log('   - XAMPP: Start Apache dan MySQL');
      console.log('   - MAMP: Start servers');
      console.log('   - Linux/Mac: sudo systemctl start mysql');
    }
    
    process.exit(1);
  }
}

// Run setup
setupDatabase();