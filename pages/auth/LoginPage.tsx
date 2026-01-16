
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../App';
import { LOGIN_DEMO_INFO } from '../../constants';
import { 
  KeyRound, 
  User as UserIcon, 
  AlertCircle, 
  Info, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  Zap,
  Lock,
  CheckCircle2,
  RefreshCw,
  ArrowLeft
} from 'lucide-react';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('Harap masukkan kredensial Anda dengan lengkap.');
      return;
    }

    setIsLoading(true);
    // Simulate network delay
    setTimeout(() => {
      const success = login(username);
      if (success) {
        // Set flag for success toast in dashboard
        sessionStorage.setItem('just_logged_in', 'true');
      } else {
        setError('Nama Pengguna atau Kata Sandi tidak terdaftar di sistem.');
        setIsLoading(false);
      }
    }, 800);
  };

  const handleQuickLogin = (user: string) => {
    sessionStorage.setItem('just_logged_in', 'true');
    login(user);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-500">
        
        {/* Left Panel: Branding & Security Info */}
        <div className="hidden md:flex flex-col justify-between p-16 bg-blue-900 text-white relative">
          <div className="relative z-10">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8 border border-white/20 backdrop-blur-sm">
              <ShieldCheck size={40} className="text-blue-300" />
            </div>
            <h1 className="text-4xl font-black tracking-tight leading-tight">
              Sistem Informasi Manajemen <span className="text-blue-300 italic">Perjalanan Dinas</span>
            </h1>
            <p className="text-blue-100/70 mt-6 text-lg font-medium leading-relaxed">
              Platform terintegrasi untuk pengelolaan administrasi SPPD yang aman, transparan, dan akuntabel bagi instansi pemerintah dan perusahaan.
            </p>
          </div>
          
          <div className="relative z-10 space-y-6">
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-md">
              <div className="flex items-center space-x-3 mb-4 text-blue-300 font-black text-xs uppercase tracking-widest">
                <Info size={16} />
                <span>Informasi Keamanan</span>
              </div>
              <p className="text-xs text-blue-100/60 leading-relaxed">
                Akses sistem ini dilindungi oleh enkripsi end-to-end. Pastikan Anda tidak membagikan kredensial login kepada pihak ketiga.
              </p>
            </div>
            <p className="text-[10px] text-blue-300/50 font-bold uppercase tracking-widest">© 2024 E-SIMPerDin Pro • Enterprise V2.5</p>
          </div>

          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-800 rounded-full -mr-32 -mt-32 blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-800 rounded-full -ml-32 -mb-32 blur-3xl opacity-50"></div>
        </div>

        {/* Right Panel: Login Form */}
        <div className="p-10 md:p-16 flex flex-col justify-center bg-white relative">
          {/* Back to Home Link */}
          <div className="absolute top-8 left-10 md:left-16">
            <Link to="/" className="inline-flex items-center text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] hover:text-blue-900 transition-all group">
              <ArrowLeft size={14} className="mr-2 group-hover:-translate-x-1 transition-transform" />
              Kembali ke Beranda
            </Link>
          </div>

          <div className="mb-12 mt-4">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Selamat Datang</h2>
            <p className="text-gray-500 font-medium mt-2 italic">Silakan masuk untuk melanjutkan akses operasional.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nama Pengguna (Username)</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-900 transition-colors">
                  <UserIcon size={18} />
                </div>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-900/5 focus:bg-white focus:border-blue-900 outline-none transition-all font-bold text-gray-800"
                  placeholder="E.g. nip_anda atau username"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Kata Sandi</label>
                <button type="button" className="text-[10px] font-black text-blue-700 uppercase hover:underline">Lupa Sandi?</button>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-900 transition-colors">
                  <Lock size={18} />
                </div>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-900/5 focus:bg-white focus:border-blue-900 outline-none transition-all font-bold text-gray-800"
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-blue-900 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center px-1">
              <label className="flex items-center cursor-pointer group">
                <div className="relative">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-5 h-5 bg-gray-100 border-2 border-gray-200 rounded-lg peer-checked:bg-blue-900 peer-checked:border-blue-900 transition-all"></div>
                  <CheckCircle2 size={12} className="absolute top-1 left-1 text-white opacity-0 peer-checked:opacity-100 transition-all" />
                </div>
                <span className="ml-3 text-xs font-bold text-gray-500 group-hover:text-gray-700">Ingat Sesi Saya</span>
              </label>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-100 text-red-700 px-5 py-4 rounded-2xl flex items-center space-x-3 text-xs font-bold animate-in fade-in slide-in-from-top-2">
                <AlertCircle size={18} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-900 text-white font-black py-5 px-6 rounded-2xl shadow-xl shadow-blue-900/20 hover:bg-blue-800 transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-70"
            >
              {isLoading ? <RefreshCw size={20} className="animate-spin" /> : <KeyRound size={20} />}
              <span className="uppercase tracking-[0.2em] text-sm">Masuk Sistem</span>
            </button>
          </form>

          {/* Quick Demo Access - Updated to flex-wrap for 5 items */}
          <div className="mt-12 pt-10 border-t border-gray-100">
            <div className="flex items-center space-x-3 mb-6 text-gray-400 font-black text-[10px] uppercase tracking-widest">
              <Zap size={14} className="text-amber-500 fill-amber-500" />
              <span>Akses Cepat Demo</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {LOGIN_DEMO_INFO.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickLogin(item.user)}
                  className="flex flex-col items-center p-3 bg-gray-50 border border-gray-100 rounded-2xl hover:bg-blue-50 hover:border-blue-900/20 transition-all group"
                >
                  <span className="text-[8px] font-black text-gray-400 group-hover:text-blue-900 transition-colors uppercase leading-none mb-2 text-center h-4">{item.role.split(' ')[0]}</span>
                  <div className="w-8 h-8 bg-white rounded-xl shadow-sm flex items-center justify-center text-gray-400 group-hover:text-blue-900 transition-colors border border-gray-100">
                    <UserIcon size={14} />
                  </div>
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
