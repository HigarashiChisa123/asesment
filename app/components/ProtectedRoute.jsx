'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAuthToken } from '@/lib/auth';

export default function ProtectedRoute({ children }) {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = getAuthToken();
      
      if (!token) {
        // Redirect ke login jika tidak ada token
        router.push('/login');
        return;
      }

      // Verifikasi token dengan server
      try {
        const response = await fetch('/api/auth/session', {
          credentials: 'include'
        });
        
        if (!response.ok) {
          // Token invalid, clear dan redirect
          document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
          localStorage.removeItem('authToken');
          router.push('/login');
        }
      } catch (error) {
        console.error('Auth check error:', error);
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  return <>{children}</>;
}