'use client';
import { Search } from 'lucide-react';

export const SupportHero = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-white text-center mb-8">
      <h2 className="text-4xl font-bold mb-4">How can we help you?</h2>
      <p className="text-blue-100 mb-8 text-lg">Search our knowledge base or contact our support team</p>
      
      <div className="max-w-2xl mx-auto relative">
        <input
          type="text"
          placeholder="Search for help..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-6 py-4 pl-14 rounded-full text-gray-800 focus:outline-none focus:ring-4 focus:ring-white/30 text-lg"
        />
        <Search className="w-6 h-6 text-gray-400 absolute left-5 top-4" />
      </div>
    </div>
  );
};

export default SupportHero;