import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request) {
  try {
    const cookieHeader = request.headers.get('cookie');
    const tokenCookie = cookieHeader?.match(/token=([^;]+)/)?.[1];
    
    if (!tokenCookie) {
      return NextResponse.json(
        { success: false, message: "No token" },
        { status: 401 }
      );
    }
    
    const decoded = jwt.verify(tokenCookie, process.env.JWT_SECRET);
    
    // Juga cek user cookie
    const userCookie = cookieHeader?.match(/user=([^;]+)/)?.[1];
    if (!userCookie) {
      return NextResponse.json(
        { success: false, message: "No user data" },
        { status: 401 }
      );
    }
    
    return NextResponse.json({
      success: true,
      user: JSON.parse(decodeURIComponent(userCookie))
    });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { success: false, message: "Invalid token" },
      { status: 401 }
    );
  }
}