// Utility functions untuk fetch wishlist
export const fetchWishlistBooks = async () => {
  try {
    const response = await fetch('/api/wishlist', {
      credentials: 'include',
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch wishlist');
    }
    
    const data = await response.json();
    return data.wishlist || [];
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    return [];
  }
};

export const fetchUserData = async () => {
  try {
    const response = await fetch('/api/auth/profile', { credentials: 'include' });
    if (!response.ok) return null;
    const data = await response.json();
    return data.user || data.profile || null;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};

export const fetchAllBooks = async () => {
  try {
    const response = await fetch('/api/books', { cache: 'no-store' });
    
    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }
    
    const data = await response.json();
    return data.books || [];
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
};
