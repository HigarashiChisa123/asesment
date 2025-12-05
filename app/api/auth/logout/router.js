import { NextResponse } from "next/server";

export async function POST() {
  console.log('=== LOGOUT API CALLED ===');
  
  try {
    const response = NextResponse.json({
      success: true,
      message: "Logout berhasil"
    });

    // Hapus cookies
    response.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      expires: new Date(0) // Expire immediately
    });

    response.cookies.set("user", "", {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      expires: new Date(0)
    });

    return response;
  } catch (err) {
    console.error("LOGOUT ERROR:", err);
    return NextResponse.json(
      { success: false, message: "Kesalahan server" },
      { status: 500 }
    );
  }
}