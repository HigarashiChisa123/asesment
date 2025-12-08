'use client';
import { Book, User, Heart, History, Settings, HelpCircle, LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuth } from '@/app/context/auth-context';

export const SimpleSidebar = ({ activePage = 'dashboard', onLogoutClick }) => {
  const { user: authUser, loading: authLoading } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;

    if (authUser) {
      setUser(authUser);
      localStorage.setItem('userData', JSON.stringify(authUser));
      setLoading(false);
      return;
    }

    const cachedUser = localStorage.getItem('userData');
    if (cachedUser) {
      try {
        setUser(JSON.parse(cachedUser));
      } catch (e) {
        console.error('❌ Failed to parse cached user:', e);
        localStorage.removeItem('userData');
      }
    }
    setLoading(false);
  }, [authUser, authLoading]);

  const getDisplayName = () => {
    if (user?.full_name && user.full_name.trim() !== '') {
      return user.full_name;
    }
    if (user?.username) {
      return user.username;
    }
    return 'User';
  };

  const getClass = () => {
    return user?.class || 'Grade 11 RPL 5';
  };

  if (loading) {
    return (
      <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-xl z-50">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <Book className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="h-5 w-20 bg-gray-200 rounded animate-pulse mb-1"></div>
              <div className="h-3 w-12 bg-gray-100 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="h-16 bg-gray-100 rounded-xl animate-pulse mb-6"></div>
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-12 bg-gray-100 rounded-lg animate-pulse mb-2"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-xl z-50">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <img
            src="/image/LogoTb.jpg"
            alt="TB Digital Reads"
            className="w-12 h-12 rounded-lg object-cover border border-blue-200 shadow-sm"
          />
          <div>
            <h1 className="text-xl font-bold text-gray-800">TB Digital</h1>
            <p className="text-sm text-gray-500">Reads</p>
          </div>
        </div>

       

        {/* Navigation */}
        <nav className="space-y-1">
          <NavItem 
            href="/user/dashboard" 
            active={activePage === 'dashboard'}
            icon={
              <div className="w-5 h-5 grid grid-cols-2 gap-0.5">
                <div className={`${activePage === 'dashboard' ? 'bg-white' : 'bg-gray-400'} rounded-sm`}></div>
                <div className={`${activePage === 'dashboard' ? 'bg-white' : 'bg-gray-400'} rounded-sm`}></div>
                <div className={`${activePage === 'dashboard' ? 'bg-white' : 'bg-gray-400'} rounded-sm`}></div>
                <div className={`${activePage === 'dashboard' ? 'bg-white' : 'bg-gray-400'} rounded-sm`}></div>
              </div>
            }
            label="Home"
          />

          <NavItem 
            href="/user/profile" 
            active={activePage === 'profile'}
            icon={<User className="w-5 h-5" />}
            label="Profile"
          />

          <NavItem 
            href="/user/history" 
            active={activePage === 'history'}
            icon={<History className="w-5 h-5" />}
            label="History"
          />

          <NavItem 
            href="/user/wishlist" 
            active={activePage === 'wishlist'}
            icon={<Heart className="w-5 h-5" />}
            label="Wishlist"
          />

          <NavItem 
            href="/user/settings" 
            active={activePage === 'settings'}
            icon={<Settings className="w-5 h-5" />}
            label="Settings"
          />
        </nav>
      </div>

      <div className="absolute bottom-6 left-6 right-6">
        <NavItem 
          href="/user/support" 
          active={activePage === 'support'}
          icon={<HelpCircle className="w-5 h-5" />}
          label="Support"
        />
        
        <button 
          onClick={onLogoutClick} 
          className="flex items-center gap-3 px-4 py-3 w-full text-red-600 hover:bg-red-50 rounded-lg transition mt-2"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Log Out</span>
        </button>
      </div>
    </div>
  );
};

const NavItem = ({ href, active, icon, label }) => (
  <a 
    href={href} 
    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
      active 
        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md' 
        : 'text-gray-600 hover:bg-gray-100'
    }`}
  >
    {icon}
    <span className={active ? 'font-semibold' : ''}>{label}</span>
  </a>
);

export default SimpleSidebar;
