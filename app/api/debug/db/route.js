'use client';
import { useState, useEffect } from 'react';

export default function DatabaseDebugPage() {
  const [status, setStatus] = useState('Checking...');
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkDatabase();
  }, []);

  const checkDatabase = async () => {
    try {
      setLoading(true);
      setStatus('Checking database connection...');
      
      const response = await fetch('/api/db/check');
      const data = await response.json();
      
      setDetails(data);
      
      if (data.success) {
        setStatus('✅ Database connected successfully');
      } else {
        setStatus(`❌ ${data.message}`);
      }
    } catch (error) {
      setStatus('❌ Failed to check database');
      setDetails({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  const testRegistration = async () => {
    try {
      setStatus('Testing registration...');
      
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'testuser_' + Date.now(),
          email: `test${Date.now()}@test.com`,
          password: 'password123',
          full_name: 'Test User',
          class: 'Grade 11 RPL 5',
          hobby: 'Reading Books'
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setStatus('✅ Registration test successful!');
      } else {
        setStatus(`❌ Registration failed: ${data.message}`);
      }
      
      setDetails(data);
    } catch (error) {
      setStatus('❌ Registration test error');
      setDetails({ error: error.message });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Database Debug</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Database Status</h2>
          
          <div className={`p-4 rounded mb-4 ${
            status.includes('✅') ? 'bg-green-100 text-green-800' : 
            status.includes('❌') ? 'bg-red-100 text-red-800' : 
            'bg-yellow-100 text-yellow-800'
          }`}>
            <div className="flex items-center">
              {loading && (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-3"></div>
              )}
              <span className="font-medium">{status}</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={checkDatabase}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              Check Database Again
            </button>
            
            <button
              onClick={testRegistration}
              disabled={loading}
              className="ml-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
            >
              Test Registration
            </button>
          </div>
        </div>
        
        {details && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Details</h2>
            <pre className="bg-gray-50 p-4 rounded overflow-auto text-sm">
              {JSON.stringify(details, null, 2)}
            </pre>
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">Troubleshooting Steps</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Pastikan MySQL server berjalan di komputer Anda</li>
            <li>Cek kredensial database di file `.env`</li>
            <li>Pastikan database `perpustakaan` sudah dibuat</li>
            <li>Jalankan SQL setup script untuk membuat tabel</li>
            <li>Cek port MySQL (default: 3306)</li>
            <li>Cek apakah ada firewall yang memblokir koneksi</li>
          </ol>
          
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Cek MySQL Status:</h3>
            <pre className="bg-gray-800 text-white p-4 rounded">
{`# Windows (Command Prompt sebagai Administrator)
net start mysql

# Windows (PowerShell sebagai Administrator)
Get-Service mysql*

# Linux/Mac
sudo systemctl status mysql
# atau
sudo service mysql status`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}