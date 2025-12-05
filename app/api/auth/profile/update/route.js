import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import jwt from "jsonwebtoken";
import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";

async function uploadFile(file, folder) {
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const ext = path.extname(file.name) || '.jpg';
    const filename = `${uuidv4()}${ext}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', folder);
    
    await fs.mkdir(uploadDir, { recursive: true });
    const filepath = path.join(uploadDir, filename);
    await fs.writeFile(filepath, buffer);
    
    return `/uploads/${folder}/${filename}`;
  } catch (error) {
    console.error(`❌ Error uploading file:`, error);
    throw error;
  }
}

export async function PUT(req) {
  console.log('=== UPDATE PROFILE API CALLED ===');
  
  try {
    const token = req.cookies.get("token")?.value;
    
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Tidak terautentikasi" },
        { status: 401 }
      );
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'rahasia');
    } catch (jwtError) {
      return NextResponse.json(
        { success: false, message: "Token tidak valid" },
        { status: 401 }
      );
    }
    
    const userId = decoded.id;
    const formData = await req.formData();
    
    // Ambil semua field yang bisa diedit
    const full_name = formData.get("full_name") || '';
    const bio = formData.get("bio") || '';
    const birthday = formData.get("birthday") || '';
    const hobby = formData.get("hobby") || 'Reading Books';
    const profile_picture = formData.get("profile_picture");
    const background_picture = formData.get("background_picture");
    
    console.log('📝 Data received for update:');
    console.log('  full_name:', `"${full_name}"`);
    console.log('  bio:', `"${bio}"`);
    console.log('  birthday:', `"${birthday}"`);
    console.log('  hobby:', `"${hobby}"`);

    try {
      const updates = [];
      const values = [];

      // Field yang bisa diedit
      updates.push("full_name = ?");
      values.push(full_name);
      
      updates.push("bio = ?");
      values.push(bio);
      
      // PERBAIKAN: Handle birthday dengan benar
      let birthdayFormatted = null;
      if (birthday) {
        // Jika birthday datang dari date input (YYYY-MM-DD)
        if (birthday.includes('-')) {
          const [year, month, day] = birthday.split('-');
          birthdayFormatted = `${year}-${month}-${day}`;
        } 
        // Jika birthday datang dari display format (DD/MM/YYYY)
        else if (birthday.includes('/')) {
          const [day, month, year] = birthday.split('/');
          birthdayFormatted = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        }
      }
      
      // Jika birthday kosong atau invalid, gunakan default
      if (!birthdayFormatted) {
        birthdayFormatted = '2008-12-15';
      }
      
      updates.push("birthday = ?");
      values.push(birthdayFormatted);
      console.log('📅 Birthday for DB:', birthdayFormatted);
      
      updates.push("hobby = ?");
      values.push(hobby);
      
      // Handle file uploads
      let profilePath = null;
      if (profile_picture && profile_picture.size > 0) {
        try {
          profilePath = await uploadFile(profile_picture, "profile");
          updates.push("profile_picture = ?");
          values.push(profilePath);
        } catch (uploadError) {
          console.error('❌ Profile picture upload failed:', uploadError);
        }
      }
      
      let backgroundPath = null;
      if (background_picture && background_picture.size > 0) {
        try {
          backgroundPath = await uploadFile(background_picture, "background");
          updates.push("background_picture = ?");
          values.push(backgroundPath);
        } catch (uploadError) {
          console.error('❌ Background picture upload failed:', uploadError);
        }
      }
      
      // Tambah userId untuk WHERE clause
      values.push(userId);
      
      // Eksekusi query UPDATE
      const query = `UPDATE users SET ${updates.join(", ")} WHERE id = ?`;
      console.log('🔍 Executing UPDATE query:', query);
      
      const [result] = await db.query(query, values);
      console.log('✅ Database update result:', result.affectedRows, 'rows affected');

      // Ambil data user yang sudah diupdate
      const [users] = await db.query(
        `SELECT 
          id, 
          email, 
          username, 
          COALESCE(full_name, '') as full_name,
          COALESCE(bio, '') as bio,
          profile_picture,
          background_picture,
          COALESCE(class, 'Grade 11 RPL 5') as class,
          DATE_FORMAT(birthday, '%d/%m/%Y') as birthday,
          COALESCE(hobby, 'Reading Books') as hobby,
          role
        FROM users WHERE id = ?`,
        [userId]
      );

      const updatedUser = users[0];
      console.log('📊 Updated user data:', {
        full_name: updatedUser.full_name,
        birthday: updatedUser.birthday,
        hobby: updatedUser.hobby,
        bio: updatedUser.bio
      });
      
      // Format response
      const responseUser = {
        id: updatedUser.id,
        email: updatedUser.email,
        username: updatedUser.username,
        full_name: updatedUser.full_name,
        bio: updatedUser.bio,
        profile_picture: updatedUser.profile_picture,
        background_picture: updatedUser.background_picture,
        class: updatedUser.class,
        birthday: updatedUser.birthday,
        hobby: updatedUser.hobby,
        role: updatedUser.role
      };

      // Update cookie dan kirim response
      const response = NextResponse.json({
        success: true,
        message: "Profile updated successfully",
        user: responseUser,
      });

      response.cookies.set("user", JSON.stringify(responseUser), {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      console.log('✅ Profile update completed successfully!');
      return response;

    } catch (dbError) {
      console.error('❌ Database update error:', dbError);
      return NextResponse.json(
        { 
          success: false, 
          message: "Database update failed",
          error: dbError.message,
          sqlError: dbError.code
        },
        { status: 500 }
      );
    }
    
  } catch (err) {
    console.error("❌ UPDATE PROFILE ERROR:", err);
    return NextResponse.json(
      { success: false, message: "Server error", error: err.message },
      { status: 500 }
    );
  }
}