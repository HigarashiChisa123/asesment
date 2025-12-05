// app/user/components/dashboard/BookCard.jsx
'use client';

export const BookCard = ({ title, author, image }) => {
  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-2">
      <div className="aspect-[3/4] bg-gradient-to-br from-purple-100 to-blue-100 relative overflow-hidden">
        <img 
          src={image || "https://via.placeholder.com/300x400/667eea/ffffff?text=Book+Cover"} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute bottom-4 left-4 right-4">
            <button className="w-full bg-white text-blue-600 py-2 rounded-lg font-semibold hover:bg-blue-50 transition">
              Read Now
            </button>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2 group-hover:text-blue-600 transition">{title}</h3>
        <p className="text-sm text-gray-500">{author}</p>
      </div>
    </div>
  );
};

export default BookCard;