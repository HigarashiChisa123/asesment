import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const rawPassword = "amane0978"; // password admin asli
    const hashed = await bcrypt.hash(rawPassword, 10);

    await db.query(
      "UPDATE users SET password = ? WHERE username = 'admin'",
      [hashed]
    );

    return NextResponse.json({
      success: true,
      message: "Password admin berhasil di-hash",
      hashed,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
