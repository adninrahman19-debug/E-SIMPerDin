
import React, { useState } from 'react';
import { useAuth } from '../../App';
import { 
  User as UserIcon, 
  Mail, 
  Fingerprint, 
  Shield, 
  Building2, 
  Layers, 
  Save, 
  KeyRound, 
  Camera, 
  ChevronRight,
  ShieldCheck,
  Zap,
  Info,
  Clock,
  Briefcase,
  // Added missing CheckCircle2 import
  CheckCircle2
} from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [isSaving, setIsSaving] = useState(false);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      alert('Informasi profil berhasil diperbarui!');
      setIsSaving(false);
    }, 1000);
  };

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Profil Saya</h2>
          <p className="text-gray-500 font-medium mt-1">Kelola informasi akun dan pengaturan keamanan personal Anda.</p>
        </div>
        <div className="flex items-center space-x-3 text-xs font-bold text-gray-400 bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm">
           <Clock size={14} className="text-blue-900" />
           <span>Login Terakhir: {new Date().toLocaleDateString('id-ID')} - 09:42 WIB</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left: Account Summary & Photo */}
        <div className="lg:col-span-1 space-y-8">
           <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-10 text-center overflow-hidden relative group">
              <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-blue-900 to-indigo-800"></div>
              <div className="relative z-10 pt-4">
                 <div className="relative inline-block">
                    <div className="w-32 h-32 bg-white rounded-[2rem] border-4 border-white shadow-xl flex items-center justify-center font-black text-5xl text-blue-900 overflow-hidden">
                       {user?.name.charAt(0)}
                    </div>
                    <button className="absolute -bottom-2 -right-2 p-3 bg-blue-900 text-white rounded-2xl shadow-lg hover:scale-110 transition-transform">
                       <Camera size={18} />
                    </button>
                 </div>
                 <h3 className="text-2xl font-black text-gray-900 mt-6">{user?.name}</h3>
                 <p className="text-blue-600 font-bold uppercase text-[10px] tracking-[0.2em] mt-2">{user?.role.replace('_', ' ')}</p>
              </div>

              <div className="mt-10 space-y-4">
                 <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 transition-all hover:bg-white hover:border-blue-900/10">
                    <div className="flex items-center space-x-3">
                       <Building2 size={16} className="text-blue-900" />
                       <span className="text-[10px] font-black text-gray-500 uppercase tracking-tight">Instansi</span>
                    </div>
                    <span className="text-xs font-bold text-gray-900">DISHUB PROV</span>
                 </div>
                 <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 transition-all hover:bg-white hover:border-blue-900/10">
                    <div className="flex items-center space-x-3">
                       <Layers size={16} className="text-emerald-600" />
                       <span className="text-[10px] font-black text-gray-500 uppercase tracking-tight">Unit Kerja</span>
                    </div>
                    <span className="text-xs font-bold text-gray-900">Sekretariat</span>
                 </div>
              </div>

              <button className="w-full mt-10 py-4 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-gray-900/10">
                 Unggah Tanda Tangan
              </button>
           </div>

           <div className="p-8 bg-blue-900 text-white rounded-[2.5rem] shadow-xl relative overflow-hidden group">
              <div className="relative z-10">
                 <ShieldCheck size={32} className="text-amber-400 mb-6" />
                 <h4 className="text-lg font-black mb-2 tracking-tight">Keamanan Akun</h4>
                 <p className="text-blue-100 text-[10px] font-bold uppercase leading-relaxed tracking-tight opacity-80 mb-8">
                   Akun Anda dilindungi dengan enkripsi end-to-end. Jangan pernah memberikan kredensial login kepada siapapun untuk menjaga integritas dokumen dinas.
                 </p>
                 <button className="w-full flex items-center justify-between p-4 bg-white/10 rounded-2xl font-bold text-xs hover:bg-white/20 transition-all border border-white/10">
                    <span>Ganti Password</span>
                    <ChevronRight size={16} />
                 </button>
              </div>
              <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
           </div>
        </div>

        {/* Right: Detailed Info Form */}
        <div className="lg:col-span-2 space-y-8">
           <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
                 <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-900 text-white rounded-lg shadow-lg">
                       <UserIcon size={18} />
                    </div>
                    <h4 className="text-xl font-black text-gray-900 tracking-tight">Rincian Data Diri</h4>
                 </div>
                 <div className="flex items-center space-x-2 text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase">
                    <CheckCircle2 size={12} />
                    <span>Akun Terverifikasi</span>
                 </div>
              </div>

              <form onSubmit={handleUpdateProfile} className="p-10 space-y-10">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nama Lengkap</label>
                       <div className="relative">
                          <UserIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                          <input 
                             type="text" 
                             defaultValue={user?.name}
                             className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-900/10 font-bold text-gray-800 transition-all" 
                          />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">NIP / Nomor Pegawai</label>
                       <div className="relative">
                          <Fingerprint size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                          <input 
                             type="text" 
                             defaultValue={user?.nip}
                             readOnly
                             className="w-full pl-12 pr-4 py-3.5 bg-gray-100 border border-gray-100 rounded-2xl outline-none font-mono font-bold text-gray-500 cursor-not-allowed" 
                          />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Alamat Email</label>
                       <div className="relative">
                          <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                          <input 
                             type="email" 
                             defaultValue={user?.email}
                             className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-900/10 font-bold text-gray-800 transition-all" 
                          />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Jabatan Sekarang</label>
                       <div className="relative">
                          <Briefcase size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                          <input 
                             type="text" 
                             defaultValue={user?.position}
                             className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-900/10 font-bold text-gray-800 transition-all" 
                          />
                       </div>
                    </div>
                 </div>

                 <div className="pt-6 border-t border-gray-50 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center space-x-3 text-xs font-bold text-gray-400 italic leading-relaxed max-w-md">
                       <Info size={16} className="text-blue-900 shrink-0" />
                       <span>Informasi kepegawaian tertentu hanya dapat diubah oleh Admin Instansi melalui modul Manajemen Pengguna.</span>
                    </div>
                    <button 
                       type="submit"
                       disabled={isSaving}
                       className="w-full md:w-auto px-10 py-4 bg-blue-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-800 transition-all shadow-xl shadow-blue-900/20 flex items-center justify-center space-x-2"
                    >
                       {isSaving ? <Zap size={16} className="animate-spin" /> : <Save size={16} />}
                       <span>Simpan Profil</span>
                    </button>
                 </div>
              </form>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-emerald-50 border border-emerald-100 rounded-[2.5rem] p-8 flex items-start space-x-5">
                 <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
                    <Zap size={24} />
                 </div>
                 <div>
                    <h5 className="text-sm font-black text-emerald-900 uppercase">Integrasi SIMPEG</h5>
                    <p className="text-[10px] text-emerald-700 font-bold leading-relaxed uppercase mt-1">Akun Anda tersinkronisasi otomatis dengan data Kepegawaian Pusat.</p>
                 </div>
              </div>
              <div className="bg-amber-50 border border-amber-100 rounded-[2.5rem] p-8 flex items-start space-x-5">
                 <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center shrink-0">
                    <Shield size={24} />
                 </div>
                 <div>
                    <h5 className="text-sm font-black text-amber-900 uppercase">Log Aktivitas</h5>
                    <p className="text-[10px] text-amber-700 font-bold leading-relaxed uppercase mt-1">Setiap akses login dan pembuatan dokumen dicatat secara otomatis dalam Audit Trail.</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
