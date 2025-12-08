import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';

function getUserFromToken(request) {
  try {
    const token =
      request.cookies?.get?.('token')?.value ||
      request.headers.get('cookie')?.match(/token=([^;]+)/)?.[1];
    if (!token) return null;
    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('utf8'));
    return payload;
  } catch {
    return null;
  }
}

export async function DELETE(req, { params }) {
  let conn;
  try {
    const adminUser = getUserFromToken(req);
    if (!adminUser || adminUser.role !== 'admin') {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const userId = parseInt(params.id, 10);
    if (Number.isNaN(userId)) {
      return NextResponse.json({ success: false, message: 'Invalid user id' }, { status: 400 });
    }

    // Prevent deleting own account to avoid locking out admin
    if (adminUser.id === userId) {
      return NextResponse.json(
        { success: false, message: 'You cannot delete your own account' },
        { status: 400 }
      );
    }

    conn = await connectToDatabase();

    const [result] = await conn.execute('DELETE FROM users WHERE id = ?', [userId]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'User deleted' });
  } catch (err) {
    console.error('Admin delete user error:', err);
    return NextResponse.json(
      { success: false, message: 'Failed to delete user' },
      { status: 500 }
    );
  } finally {
    conn?.release?.();
  }
}
