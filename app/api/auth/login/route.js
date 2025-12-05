import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: "Username dan password wajib diisi" },
        { status: 400 }
      );
    }

    // Ambil user dengan data profil lengkap
    const [rows] = await db.query(
      `SELECT 
        id, username, password, email, role,
        COALESCE(full_name, username) as full_name,
        COALESCE(profile_picture, '/default-avatar.png') as profile_picture,
        background_picture,
        COALESCE(bio, '') as bio
      FROM users WHERE username = ? LIMIT 1`,
      [username]
    );

    if (!rows || rows.length === 0) {
      return NextResponse.json(
        { success: false, message: "Username tidak ditemukan" },
        { status: 400 }
      );
    }

    const user = rows[0];

    // Verifikasi password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return NextResponse.json(
        { success: false, message: "Password salah" },
        { status: 400 }
      );
    }

    // Buat token JWT
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
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
      role: user.role,
    };

    const response = NextResponse.json({
      success: true,
      message: "Login berhasil",
      user: userData,
    });

    // Set token cookie (httpOnly untuk keamanan)
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 hari
    });

    // Set user data cookie (bisa diakses client)
    response.cookies.set("user", JSON.stringify(userData), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return NextResponse.json(
      { success: false, message: "Kesalahan server" },
      { status: 500 }
    );
  }
}