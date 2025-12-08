// app/api/auth/register/route.js
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { email, username, password, full_name, class: userClass, birthday, hobby, bio } = await req.json();

    console.log("📝 Register attempt:", { email, username });

    // Validasi input dasar
    if (!email || !username || !password) {
      console.log("❌ Missing required fields");
      return NextResponse.json(
        { 
          success: false, 
          message: "Email, username, dan password wajib diisi" 
        },
        { status: 400 }
      );
    }

    // Validasi email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("❌ Invalid email format:", email);
      return NextResponse.json(
        { 
          success: false, 
          message: "Format email tidak valid" 
        },
        { status: 400 }
      );
    }

    // Validasi password
    if (password.length < 6) {
      console.log("❌ Password too short");
      return NextResponse.json(
        { 
          success: false, 
          message: "Password minimal 6 karakter" 
        },
        { status: 400 }
      );
    }

    // Validasi username (hanya huruf, angka, underscore)
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(username)) {
      console.log("❌ Invalid username format:", username);
      return NextResponse.json(
        { 
          success: false, 
          message: "Username hanya boleh mengandung huruf, angka, dan underscore" 
        },
        { status: 400 }
      );
    }

    // Cek koneksi database
    try {
      await db.query("SELECT 1");
      console.log("✅ Database connection OK");
    } catch (dbError) {
      console.error("❌ Database connection error:", dbError);
      return NextResponse.json(
        { 
          success: false, 
          message: "Kesalahan koneksi database" 
        },
        { status: 500 }
      );
    }

    // Cek email duplikat
    const [existingEmail] = await db.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existingEmail && existingEmail.length > 0) {
      console.log("❌ Email already exists:", email);
      return NextResponse.json(
        { 
          success: false, 
          message: "Email sudah terdaftar" 
        },
        { status: 400 }
      );
    }

    // Cek username duplikat
    const [existingUsername] = await db.query(
      "SELECT id FROM users WHERE username = ?",
      [username]
    );

    if (existingUsername && existingUsername.length > 0) {
      console.log("❌ Username already exists:", username);
      return NextResponse.json(
        { 
          success: false, 
          message: "Username sudah digunakan" 
        },
        { status: 400 }
      );
    }

    // Hash password
    console.log("🔐 Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 12);

    // Parse tanggal lahir jika ada
    let parsedBirthday = '2008-12-15'; // default value
    if (birthday) {
      try {
        // Coba beberapa format tanggal
        if (birthday.includes('/')) {
          const [day, month, year] = birthday.split('/');
          parsedBirthday = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        } else if (birthday.includes('-')) {
          // Sudah dalam format YYYY-MM-DD
          parsedBirthday = birthday;
        }
      } catch (dateError) {
        console.warn("⚠️ Date parsing failed, using default:", dateError);
      }
    }

    // Insert user baru
    console.log("📝 Inserting new user to database...");
    const [result] = await db.query(
      `INSERT INTO users 
      (email, username, password, full_name, class, birthday, hobby, bio) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        email, 
        username, 
        hashedPassword, 
        full_name || username, 
        userClass || 'Grade 11 RPL 5', 
        parsedBirthday, 
        hobby || 'Reading Books', 
        bio || 'I Like Reads Books'
      ]
    );

    console.log("✅ User created successfully, ID:", result.insertId);

    return NextResponse.json({
      success: true,
      message: "Registrasi berhasil! Silakan login.",
      data: {
        userId: result.insertId,
        username,
        email
      }
    }, { status: 201 });

  } catch (err) {
    console.error("❌ REGISTER ERROR:", err);
    
    // Berikan pesan error yang lebih spesifik
    let errorMessage = "Kesalahan server";
    
    if (err.code === 'ER_DUP_ENTRY') {
      errorMessage = "Email atau username sudah terdaftar";
    } else if (err.code === 'ER_NO_SUCH_TABLE') {
      errorMessage = "Tabel database tidak ditemukan";
    } else if (err.code === 'ER_BAD_FIELD_ERROR') {
      errorMessage = "Kolom database tidak ditemukan";
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: errorMessage,
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
      },
      { status: 500 }
    );
  }
}

// OPTIONAL: Tambahkan GET untuk testing
export async function GET() {
  return NextResponse.json({
    message: "Register endpoint is working",
    method: "POST",
    required_fields: ["email", "username", "password"]
  });
}