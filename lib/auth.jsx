'use client';

// Get user data from cookie
export function getUserFromCookie() {
  if (typeof window === 'undefined') return null;
  
  const userCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('user='));
    
  if (!userCookie) return null;
  
  try {
    const userData = JSON.parse(decodeURIComponent(userCookie.split('=')[1]));
    return userData;
  } catch {
    return null;
  }
}

// Set user data to cookie
export function setUserCookie(userData) {
  if (typeof window === 'undefined') return;
  
  const userString = JSON.stringify(userData);
  document.cookie = `user=${encodeURIComponent(userString)}; path=/; max-age=${60 * 60 * 24 * 7}`;
}

// Clear user cookie
export function clearUserCookie() {
  if (typeof window === 'undefined') return;
  document.cookie = 'user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
}