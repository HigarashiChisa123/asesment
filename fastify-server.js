// fastify-server.js
const fastify = require('fastify')({ logger: true });
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Register routes
fastify.get('/api/books', async (request, reply) => {
    try {
        const [rows] = await pool.query('SELECT * FROM books ORDER BY id');
        return { success: true, data: rows };
    } catch (error) {
        reply.code(500);
        return { success: false, error: error.message };
    }
});

fastify.get('/api/books/:id', async (request, reply) => {
    try {
        const [rows] = await pool.query('SELECT * FROM books WHERE id = ?', [request.params.id]);
        
        if (rows.length === 0) {
            reply.code(404);
            return { success: false, error: 'Book not found' };
        }
        
        return { success: true, data: rows[0] };
    } catch (error) {
        reply.code(500);
        return { success: false, error: error.message };
    }
});

fastify.get('/', async (request, reply) => {
    reply.type('text/html');
    return `
        <h1>📚 Perpustakaan API (Fastify)</h1>
        <p>Server Fastify berjalan dengan baik!</p>
        <ul>
            <li><a href="/api/books">/api/books</a></li>
            <li><a href="/api/books/1">/api/books/1</a></li>
        </ul>
    `;
});

// Start server
const start = async () => {
    try {
        await fastify.listen({ port: 3000 });
        console.log(`🚀 Fastify server berjalan di http://localhost:3000`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();