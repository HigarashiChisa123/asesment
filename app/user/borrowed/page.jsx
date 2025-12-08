'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/app/user/components/layout/SideBar';
import Footer from '@/app/user/components/shared/Footer';
import { useAuth } from '@/app/context/auth-context';
import { ArrowLeft, CheckCircle, Calendar, BookOpen } from 'lucide-react';

const ReturnSuccessModal = ({ isOpen, onClose, bookTitle }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-6 max-w-sm w-full mx-4 shadow-2xl text-center">
        <div className="flex flex-col items-center gap-3">
          <CheckCircle className="w-14 h-14 text-green-500" />
          <h3 className="text-xl font-bold text-gray-900">Book returned!</h3>
          <p className="text-gray-600">"{bookTitle}" has been removed from your active loans.</p>
          <button
            onClick={onClose}
            className="w-full mt-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const ConfirmReturnModal = ({ isOpen, onConfirm, onCancel, bookTitle }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-6 max-w-md w-full mx-4 shadow-2xl">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center animate-pulse">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Return this book?</h3>
              <p className="text-gray-600">"{bookTitle}" will be marked as returned.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition"
            >
              Not yet
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold hover:shadow-lg transition"
            >
              Yes, return
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function BorrowedPage() {
  const { user, loading: authLoading } = useAuth();
  const [borrowed, setBorrowed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successTitle, setSuccessTitle] = useState('');
  const [confirmTarget, setConfirmTarget] = useState(null);

  useEffect(() => {
    if (!authLoading) {
      loadBorrowed();
    }
  }, [authLoading]);

  const loadBorrowed = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/borrowed-books?status=borrowed', {
        credentials: 'include',
        cache: 'no-store'
      });
      const data = await res.json();
      if (res.ok && data.success) {
        const mapped = (data.books || []).map((b) => ({
          id: b.id,
          bookId: b.book_id || b.bookId,
          title: b.book_name || b.title,
          author: b.creator || b.author,
          category: b.category || 'General',
          cover: b.cover_url,
          borrowedDate: b.borrowed_date
            ? new Date(b.borrowed_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            : '-',
          dueDate: b.due_date
            ? new Date(b.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            : '-'
        }));
        setBorrowed(mapped);
      } else {
        setBorrowed([]);
      }
    } catch (err) {
      console.error('Failed to load borrowed books:', err);
      setBorrowed([]);
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = async (borrowId, title, bookId) => {
    try {
      const res = await fetch('/api/borrowed-books', {
        method: 'DELETE',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookIds: [borrowId],
          bookId,
          userId: user?.id
        })
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || 'Return failed');
      setBorrowed((prev) => prev.filter((b) => b.id !== borrowId));
      setSuccessTitle(title);
      setShowSuccess(true);
    } catch (err) {
      alert(err.message || 'Failed to return the book');
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-gray-600">Loading your active loans...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Sidebar activePage="history" />
      <ReturnSuccessModal isOpen={showSuccess} onClose={() => setShowSuccess(false)} bookTitle={successTitle} />
      <div className="ml-64 px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Active Loans</h1>
            <p className="text-sm text-gray-500">Books you are currently borrowing.</p>
          </div>
          <a href="/user/history" className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to History
          </a>
        </div>

        {borrowed.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-xl p-10 text-center">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-800 mb-2">No active loans</h3>
            <p className="text-gray-600 mb-4">Borrow a book from its detail page, then see it here.</p>
            <a
              href="/user/dashboard"
              className="inline-block px-5 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg"
            >
              Browse Books
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {borrowed.map((b) => (
              <div key={b.id} className="bg-white rounded-3xl shadow-xl overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3">
                  <div className="md:col-span-1 relative">
                    <img
                      src={b.cover || `https://via.placeholder.com/300x400/667eea/ffffff?text=${encodeURIComponent(b.title?.substring(0, 10) || 'BK')}`}
                      alt={b.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://via.placeholder.com/300x400/667eea/ffffff?text=${encodeURIComponent(b.title?.substring(0, 10) || 'BK')}`;
                      }}
                    />
                  </div>
                  <div className="md:col-span-2 p-6 flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs uppercase text-blue-500 font-semibold mb-1">{b.category}</p>
                        <h3 className="text-xl font-bold text-gray-800">{b.title}</h3>
                        <p className="text-sm text-gray-500">by {b.author}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-500" />
                        <span>Borrowed: {b.borrowedDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-pink-500" />
                        <span>Due: {b.dueDate}</span>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-auto">
                      <button
                        onClick={() => setConfirmTarget({ id: b.id, title: b.title, bookId: b.bookId })}
                        className="w-full py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition"
                      >
                        Return Book
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <ConfirmReturnModal
        isOpen={!!confirmTarget}
        bookTitle={confirmTarget?.title}
        onCancel={() => setConfirmTarget(null)}
        onConfirm={() => {
          const target = confirmTarget;
          setConfirmTarget(null);
          if (target) {
            handleReturn(target.id, target.title, target.bookId);
          }
        }}
      />
      <Footer />
    </div>
  );
}
