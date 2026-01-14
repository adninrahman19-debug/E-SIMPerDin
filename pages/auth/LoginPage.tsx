
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../App';
import { LOGIN_DEMO_INFO } from '../../constants';
import { 
  KeyRound, 
  User as UserIcon, 
  AlertCircle, 
  Info, 
  ShieldAlert, 
  Shield, 
  UserCog, 
  UserCheck, 
  User as EmployeeIcon,
  Zap,
  ArrowLeft
} from 'lucide-react';

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

  const handleQuickLogin = (user: string) => {
    login(user);
  };

  const getRoleIcon = (roleName: string) => {
    switch (roleName.toLowerCase()) {
      case 'super admin': return <ShieldAlert size={16} />;
      case 'admin instansi': return <Shield size={16} />;
      case 'operator': return <UserCog size={16} />;
      case 'pejabat penyetuju': return <UserCheck size={16} />;
      default: return <EmployeeIcon size={16} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center p-4 relative">
      
      {/* Tombol Kembali ke Landing Page (Floating) */}
      <Link 
        to="/" 
        className="absolute top-8 left-8 flex items-center space-x-2 text-white/80 hover:text-white transition-all font-semibold group"
      >
        <div className="p-2 bg-white/10 rounded-full group-hover:bg-white/20 transition-all">
          <ArrowLeft size={20} />
        </div>
        <span>Kembali ke Beranda</span>
      </Link>

      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-500">
        
        {/* Sisi Kiri: Informasi & Kredensial Demo */}
        <div className="hidden md:flex flex-col justify-between p-12 bg-gray-50 text-blue-900 border-r border-gray-100">
          <div>
            <div className="w-16 h-16 bg-blue-900 rounded-xl flex items-center justify-center text-white mb-4 shadow-lg">
              <KeyRound size={32} />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">E-SIMPerDin</h1>
            <p className="text-gray-600 mt-2 font-medium">Sistem Informasi Manajemen Perjalanan Dinas Elektronik</p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm">
              <div className="flex items-center space-x-2 text-blue-900 font-bold mb-3">
                <Info size={18} />
                <span>Kredensial Demo</span>
              </div>
              <div className="space-y-2">
                {LOGIN_DEMO_INFO.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs pb-2 border-b border-gray-50 last:border-0 last:pb-0">
                    <span className="text-gray-500 font-medium">{item.role}</span>
                    <span className="font-mono bg-blue-50 px-2 py-0.5 rounded text-blue-800">{item.user}</span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-gray-400 mt-4 italic">* Password untuk semua akun demo adalah: <span className="font-bold">admin123</span></p>
            </div>
            <p className="text-xs text-gray-400">© 2024 Portal Manajemen Perjalanan Dinas Terpadu. Seluruh hak cipta dilindungi.</p>
          </div>
        </div>

        {/* Sisi Kanan: Formulir Login & Akses Cepat */}
        <div className="p-8 md:p-12 flex flex-col justify-center bg-white relative">
          
          {/* Mobile Back Link */}
          <Link to="/" className="md:hidden flex items-center space-x-2 text-blue-900 font-bold mb-6">
            <ArrowLeft size={16} />
            <span>Beranda</span>
          </Link>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Selamat Datang</h2>
            <p className="text-gray-500 text-sm mt-1">Silakan masuk menggunakan akun Anda atau gunakan akses cepat demo.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5 mb-10">
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
          </form>

          {/* Akses Cepat Demo */}
          <div className="pt-6 border-t border-gray-100">
            <div className="flex items-center space-x-2 text-blue-900 font-bold text-sm mb-4 uppercase tracking-widest">
              <Zap size={16} className="text-amber-500 fill-amber-500" />
              <span>Akses Cepat Demo</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {LOGIN_DEMO_INFO.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickLogin(item.user)}
                  className="flex items-center space-x-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-left hover:border-blue-900 hover:bg-blue-50 transition-all group"
                >
                  <div className="p-1.5 bg-white rounded border border-gray-100 text-gray-400 group-hover:text-blue-900 group-hover:border-blue-200 shadow-sm">
                    {getRoleIcon(item.role)}
                  </div>
                  <span className="text-[10px] font-bold text-gray-600 uppercase group-hover:text-blue-900 leading-tight">
                    {item.role.replace('Penyetuju', '')}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
