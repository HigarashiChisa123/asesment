import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { username, email, password } = await req.json();

    // 🔍 Validasi input
    if (!username || !email || !password) {
      return NextResponse.json(
        { success: false, message: "Semua file harus diisi" },
        { status: 400 }
      );
    }

    // 🔍 Validasi email harus Gmail
    if (!email.endsWith("@gmail.com")) {
      return NextResponse.json(
        { success: false, message: "Email harus menggunakan Gmail" },
        { status: 400 }
      );
    }

    // 🔍 Cek username sudah ada atau belum
    const [cekUser] = await db.query(
      "SELECT username FROM users WHERE username = ?",
      [username]
    );

    if (cekUser.length > 0) {
      return NextResponse.json(
        { success: false, message: "Username sudah digunakan" },
        { status: 400 }
      );
    }

    // 🔍 Cek email sudah ada atau belum
    const [cekEmail] = await db.query(
      "SELECT email FROM users WHERE email = ?",
      [email]
    );

    if (cekEmail.length > 0) {
      return NextResponse.json(
        { success: false, message: "Email sudah terdaftar" },
        { status: 400 }
      );
    }

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 💾 Simpan ke database
    await db.query(
      "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, 'user')",
      [username, email, hashedPassword]
    );

    return NextResponse.json({
      success: true,
      message: "Akun berhasil dibuat!",
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan server",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
