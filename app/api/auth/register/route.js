import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { email, username, password, full_name, class: userClass, birthday, hobby, bio } = await req.json();

    // Validasi input
    if (!email || !username || !password) {
      return NextResponse.json(
        { success: false, message: "Email, username, dan password wajib diisi" },
        { status: 400 }
      );
    }

    // Validasi email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Format email tidak valid" },
        { status: 400 }
      );
    }

    // Validasi password
    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: "Password minimal 6 karakter" },
        { status: 400 }
      );
    }

    // Cek email duplikat
    const [existingEmail] = await db.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existingEmail.length > 0) {
      return NextResponse.json(
        { success: false, message: "Email sudah terdaftar" },
        { status: 400 }
      );
    }

    // Cek username duplikat
    const [existingUsername] = await db.query(
      "SELECT id FROM users WHERE username = ?",
      [username]
    );

    if (existingUsername.length > 0) {
      return NextResponse.json(
        { success: false, message: "Username sudah digunakan" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Parse tanggal lahir jika ada
    let parsedBirthday = null;
    if (birthday) {
      const [day, month, year] = birthday.split('/');
      parsedBirthday = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }

    // Insert user baru
    await db.query(
      `INSERT INTO users 
      (email, username, password, full_name, class, birthday, hobby, bio, role) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'user')`,
      [email, username, hashedPassword, full_name || username, userClass || 'Grade 11 RPL 5', 
       parsedBirthday, hobby || 'Reading Books', bio || 'I Like Reads Books']
    );

    return NextResponse.json({
      success: true,
      message: "Registrasi berhasil! Silakan login.",
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    return NextResponse.json(
      { success: false, message: "Kesalahan server", error: err.message },
      { status: 500 }
    );
  }
}