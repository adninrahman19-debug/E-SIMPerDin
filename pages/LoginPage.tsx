
import React, { useState } from 'react';
import { useAuth } from '../App';
import { LOGIN_DEMO_INFO } from '../constants';
import { KeyRound, User as UserIcon, AlertCircle, Info } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('Silakan masukkan username dan password.');
      return;
    }

    const success = login(username);
    if (!success) {
      setError('Kredensial tidak valid. Silakan coba lagi.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-500">
        
        {/* Left: Info Section */}
        <div className="hidden md:flex flex-col justify-center p-12 bg-gray-50 text-blue-900 border-r border-gray-100">
          <div className="mb-8">
            <div className="w-16 h-16 bg-blue-900 rounded-xl flex items-center justify-center text-white mb-4 shadow-lg">
              <KeyRound size={32} />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">E-SIMPerDin</h1>
            <p className="text-gray-600 mt-2 font-medium">Sistem Informasi Manajemen Perjalanan Dinas Elektronik</p>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="mt-1 text-blue-600"><Info size={18} /></div>
              <div>
                <p className="font-semibold">Kredensial Demo</p>
                <div className="mt-2 space-y-1">
                  {LOGIN_DEMO_INFO.map((item, idx) => (
                    <div key={idx} className="text-sm">
                      <span className="text-gray-500 italic">{item.role}:</span> {item.user} / {item.pass}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-400 border-t pt-4">© 2024 Portal Manajemen Perjalanan Dinas Terpadu. Seluruh hak cipta dilindungi.</p>
          </div>
        </div>

        {/* Right: Login Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="md:hidden text-center mb-8">
            <h1 className="text-2xl font-bold text-blue-900">E-SIMPerDin</h1>
            <p className="text-sm text-gray-500">Masuk ke Sistem</p>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-6 hidden md:block">Selamat Datang Kembali</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <UserIcon size={18} />
                </div>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                  placeholder="Masukkan username anda"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <KeyRound size={18} />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center space-x-3 text-sm">
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            <button 
              type="submit"
              className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Masuk Sekarang
            </button>
            
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 text-gray-600">
                <input type="checkbox" className="rounded border-gray-300 text-blue-900 focus:ring-blue-900" />
                <span>Ingat Saya</span>
              </label>
              <a href="#" className="text-blue-700 hover:underline font-medium">Lupa Password?</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
