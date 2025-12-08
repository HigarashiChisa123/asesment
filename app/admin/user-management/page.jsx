'use client'
import React, { useEffect, useState } from 'react';
import { Search, MoreVertical } from 'lucide-react';

const UsersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [targetUser, setTargetUser] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [actionMessage, setActionMessage] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/admin/users', { credentials: 'include' });
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.message || 'Failed to load users');
        setUsers(data.users || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filteredUsers = users.filter(user =>
    (user.full_name || user.username || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.email || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openDeleteConfirm = (user) => {
    setTargetUser(user);
    setActionMessage('');
    setConfirmOpen(true);
  };

  const closeConfirm = () => {
    if (deleting) return;
    setConfirmOpen(false);
    setTargetUser(null);
  };

  const handleDelete = async () => {
    if (!targetUser) return;
    try {
      setDeleting(true);
      setActionMessage('');
      const res = await fetch(`/api/admin/users/${targetUser.id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to delete user');
      }
      setUsers((prev) => prev.filter((u) => u.id !== targetUser.id));
      setActionMessage('User deleted successfully.');
      setConfirmOpen(false);
      setTargetUser(null);
    } catch (err) {
      setActionMessage(err.message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="p-8">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        {error && <div className="p-4 text-red-600 text-sm">{error}</div>}
        {loading ? (
          <div className="p-4 text-sm text-gray-600">Loading users...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">User</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Contact</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Join Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Role</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Loans</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">
                            {(user.full_name || user.username || 'U').substring(0, 2).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{user.full_name || user.username}</p>
                          <p className="text-gray-500 text-sm">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-700 text-sm">{user.bio || '-'}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-700 text-sm">{user.created_at?.split('T')[0]}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.role === 'admin' 
                          ? 'bg-purple-100 text-purple-700' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {user.loans} loans
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.is_active 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {user.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openDeleteConfirm(user)}
                          className="px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          Delete
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <MoreVertical className="w-5 h-5 text-gray-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {confirmOpen && targetUser && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Delete user?</h3>
            <p className="text-sm text-gray-600 mb-4">
              You are about to delete <span className="font-semibold">{targetUser.full_name || targetUser.username}</span>.
              This action cannot be undone.
            </p>

            {actionMessage && (
              <div className={`mb-4 text-sm px-3 py-2 rounded-lg ${
                actionMessage.toLowerCase().includes('fail')
                  ? 'bg-red-50 text-red-700 border border-red-200'
                  : 'bg-green-50 text-green-700 border border-green-200'
              }`}>
                {actionMessage}
              </div>
            )}

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={closeConfirm}
                disabled={deleting}
                className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition disabled:opacity-60"
              >
                Keep account
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition disabled:opacity-60"
              >
                {deleting ? 'Deleting...' : 'Delete account'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
