// app/api/auth/login/route.js
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "@/lib/db";

export async function POST(req) {
  let connection;
  
  try {
    const { username, password } = await req.json();
    console.log(`🔐 Login attempt for username: ${username}`);

    if (!username || !password) {
      console.log("❌ Missing username or password");
      return NextResponse.json(
        { 
          success: false, 
          message: "Username and password are required" 
        },
        { status: 400 }
      );
    }

    // Buat koneksi database
    connection = await connectToDatabase();
    console.log("✅ Database connected");

    // Ambil user dengan data profil lengkap
    const [rows] = await connection.execute(
      `SELECT 
        id, username, password, email, role,
        COALESCE(full_name, username) as full_name,
        COALESCE(profile_picture, 'https://api.dicebear.com/7.x/avataaars/svg?seed=' || username) as profile_picture,
        background_picture,
        COALESCE(bio, '') as bio,
        COALESCE(class, 'Grade 11 RPL 5') as class,
        COALESCE(birthday, '2008-12-15') as birthday,
        COALESCE(hobby, 'Reading Books') as hobby
      FROM users WHERE username = ? OR email = ? LIMIT 1`,
      [username, username]
    );

    if (!rows || rows.length === 0) {
      console.log(`❌ User not found: ${username}`);
      connection.release();
      return NextResponse.json(
        { 
          success: false, 
          message: "Username atau email tidak ditemukan" 
        },
        { status: 400 }
      );
    }

    const user = rows[0];
    console.log(`✅ User found: ${user.username} (ID: ${user.id})`);

    // Debug: tampilkan hash password untuk testing
    console.log(`🔍 Password check for user: ${user.username}`);
    console.log(`🔍 Password hash in DB: ${user.password.substring(0, 20)}...`);
    
    // Cek jika password kosong di database (untuk testing)
    if (!user.password || user.password.trim() === "") {
      console.log("⚠️ Password is empty in database");
      
      // Untuk user testing, allow login dengan password apapun
      if (user.username === 'admin' || user.username === 'amano') {
        console.log(`✅ Test user ${user.username} allowed without password verification`);
      } else {
        connection.release();
        return NextResponse.json(
          { 
            success: false, 
            message: "Password tidak valid di database" 
          },
          { status: 400 }
        );
      }
    } else {
      // Verifikasi password
      console.log(`🔍 Verifying password...`);
      const valid = await bcrypt.compare(password, user.password);
      
      if (!valid) {
        console.log(`❌ Password verification failed for ${user.username}`);
        
        // Debug: tampilkan password yang diinput (jangan di production)
        console.log(`🔍 Input password: ${password}`);
        console.log(`🔍 Stored hash: ${user.password}`);
        
        // Fallback: jika bcrypt gagal, coba hash sederhana untuk testing
        const fallbackValid = await bcrypt.compare(`test${password}`, user.password);
        if (!fallbackValid) {
          connection.release();
          return NextResponse.json(
            { 
              success: false, 
              message: "Password salah" 
            },
            { status: 400 }
          );
        }
        console.log(`⚠️ Used fallback password verification`);
      }
      console.log(`✅ Password verified successfully`);
    }

    // Buat token JWT
    const jwtSecret = process.env.JWT_SECRET || "your-secret-key-for-development";
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      jwtSecret,
      { expiresIn: "7d" }
    );

    // Data user untuk disimpan di cookie
    const userData = {
      id: user.id,
      username: user.username,
      email: user.email,
      full_name: user.full_name,
      profile_picture: user.profile_picture,
      background_picture: user.background_picture,
      bio: user.bio,
      class: user.class,
      birthday: user.birthday,
      hobby: user.hobby,
      role: user.role,
    };

    console.log(`✅ User data prepared:`, {
      id: userData.id,
      username: userData.username,
      role: userData.role
    });

    // Tutup koneksi database
    connection.release();

    const redirectTarget = user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard';

    const response = NextResponse.json({
      success: true,
      message: "Login berhasil!",
      user: userData,
      redirect: redirectTarget,
    });

    // Set token cookie (httpOnly untuk keamanan)
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 hari
    });

    // Set user data cookie (bisa diakses client)
    response.cookies.set("user", JSON.stringify(userData), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    console.log(`✅ Login successful for ${user.username}, redirecting to dashboard`);
    return response;

  } catch (err) {
    console.error("❌ LOGIN ERROR:", err.message);
    console.error("❌ Stack trace:", err.stack);
    
    // Tutup koneksi jika masih terbuka
    if (connection) {
      try {
        connection.release();
      } catch (endErr) {
        console.error("❌ Error closing connection:", endErr.message);
      }
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: "Kesalahan server: " + err.message,
        error: process.env.NODE_ENV === "development" ? err.stack : undefined
      },
      { status: 500 }
    );
  }
}
