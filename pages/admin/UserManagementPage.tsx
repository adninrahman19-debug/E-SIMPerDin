
import React, { useState } from 'react';
import { useAuth } from '../../App';
import { MOCK_USERS, MOCK_INSTITUTIONS } from '../../constants';
import { UserRole, User } from '../../types';
import { 
  UserPlus, 
  MoreVertical, 
  Shield, 
  ShieldAlert, 
  Mail, 
  Search, 
  Filter, 
  Lock, 
  Unlock, 
  History, 
  KeyRound, 
  X,
  Building2,
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  Activity,
  User as UserIcon,
  Zap,
  ShieldCheck,
  UserCog,
  UserCheck,
  Layers,
  Trash2,
  Fingerprint,
  ToggleRight,
  Info,
  Users,
  Save,
  RefreshCw,
  MoreHorizontal,
  Edit3
} from 'lucide-react';

const UserManagementPage: React.FC = () => {
  const { user: currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [viewMode, setViewMode] = useState<'LIST' | 'FORM' | 'LOGS' | 'RESET_PASS'>('LIST');

  const isSuperAdmin = currentUser?.role === UserRole.SUPER_ADMIN;

  // Mock Work Units (Dapat diintegrasikan dengan profil instansi)
  const MOCK_WORK_UNITS = [
    { id: 'wu-1', name: 'Sekretariat' },
    { id: 'wu-2', name: 'Bidang Angkutan' },
    { id: 'wu-3', name: 'Bidang Lalu Lintas' },
    { id: 'wu-4', name: 'Bagian Umum & Kepegawaian' }
  ];

  // Filter users based on role and institution
  const filteredUsers = MOCK_USERS.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         u.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (isSuperAdmin) {
      return matchesSearch; 
    } else {
      return u.institutionId === currentUser?.institutionId && matchesSearch;
    }
  });

  const getRoleBadge = (role: UserRole) => {
    switch(role) {
      case UserRole.SUPER_ADMIN: 
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black bg-red-50 text-red-600 uppercase tracking-widest border border-red-100">Master Admin</span>;
      case UserRole.ADMIN_INSTANSI: 
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black bg-blue-50 text-blue-900 uppercase tracking-widest border border-blue-100">Admin Utama</span>;
      case UserRole.PEJABAT_PENYETUJU:
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black bg-amber-50 text-amber-700 uppercase tracking-widest border border-amber-100">Pejabat Penyetuju</span>;
      case UserRole.OPERATOR:
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black bg-indigo-50 text-indigo-700 uppercase tracking-widest border border-indigo-100">Operator Sistem</span>;
      default: 
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black bg-gray-50 text-gray-500 uppercase tracking-widest border border-gray-100">Pegawai</span>;
    }
  };

  const handleOpenForm = (user: User | null = null) => {
    setSelectedUser(user);
    setViewMode('FORM');
    setIsModalOpen(true);
  };

  const handleOpenReset = (user: User) => {
    setSelectedUser(user);
    setViewMode('RESET_PASS');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    setViewMode('LIST');
  };

  const generateCredentials = () => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const suggestedUsername = `user_${randomSuffix}`;
    const suggestedPassword = `Pass@${randomSuffix}`;
    alert(`Rekomendasi Kredensial:\nUsername: ${suggestedUsername}\nPassword: ${suggestedPassword}\n\nHarap salin dan berikan kepada pegawai terkait.`);
  };

  const toggleAccountStatus = (u: User) => {
    const action = u.active === false ? 'mengaktifkan' : 'menonaktifkan';
    if(confirm(`Apakah Anda yakin ingin ${action} akun ${u.name}?`)) {
       alert(`Status akun ${u.name} berhasil diubah.`);
    }
  };

  return (
    <div className="animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">
            {isSuperAdmin ? 'Manajemen User Global' : 'Manajemen Pengguna Instansi'}
          </h2>
          <p className="text-gray-500 text-sm font-medium mt-1">
            {isSuperAdmin 
              ? 'Pusat kontrol otoritas administratif seluruh tenant platform.' 
              : 'Kelola pendaftaran pegawai, penetapan unit kerja, dan kontrol akses sistem.'}
          </p>
        </div>
        <button 
          onClick={() => handleOpenForm()}
          className="bg-blue-900 text-white px-8 py-4 rounded-2xl flex items-center space-x-3 hover:bg-blue-800 transition-all font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-900/20"
        >
          <UserPlus size={18} />
          <span>Registrasi User Baru</span>
        </button>
      </div>

      {/* Stats Summary for Admin */}
      {!isSuperAdmin && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
           <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-900 rounded-2xl flex items-center justify-center">
                 <Users size={24} />
              </div>
              <div>
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Total SDM</p>
                 <h4 className="text-xl font-black text-gray-900 mt-1">{filteredUsers.length} Orang</h4>
              </div>
           </div>
           <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center space-x-4">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                 <ShieldCheck size={24} />
              </div>
              <div>
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Akun Aktif</p>
                 <h4 className="text-xl font-black text-emerald-600 mt-1">{filteredUsers.filter(u => u.active !== false).length} Akun</h4>
              </div>
           </div>
           <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center space-x-4">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
                 <UserCheck size={24} />
              </div>
              <div>
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Penyetuju</p>
                 <h4 className="text-xl font-black text-amber-600 mt-1">{filteredUsers.filter(u => u.role === UserRole.PEJABAT_PENYETUJU).length} Pejabat</h4>
              </div>
           </div>
        </div>
      )}

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Cari Nama NIP, atau Email..."
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-900/10 font-medium text-sm transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-3">
          <button className="p-3 text-gray-400 hover:text-blue-900 bg-gray-50 rounded-xl border border-gray-100 transition-all">
            <Filter size={18} />
          </button>
          <select className="bg-white border border-gray-100 text-gray-700 text-[10px] font-black uppercase px-6 py-3 rounded-xl outline-none shadow-sm cursor-pointer">
            <option>Semua Peran</option>
            <option>Pejabat Penyetuju</option>
            <option>Operator</option>
            <option>Pegawai</option>
          </select>
        </div>
      </div>

      {/* User Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredUsers.map((u) => {
          const isSuspended = u.active === false;
          return (
            <div key={u.id} className={`bg-white rounded-[2.5rem] border ${isSuspended ? 'border-red-100 opacity-80' : 'border-gray-100'} shadow-sm overflow-hidden group hover:shadow-2xl hover:border-blue-200 transition-all duration-300 flex flex-col h-full`}>
              <div className="p-8 flex-1">
                <div className="flex items-start justify-between mb-6">
                  <div className="relative">
                    <div className={`w-16 h-16 bg-gradient-to-br ${isSuspended ? 'from-gray-400 to-gray-600' : 'from-blue-900 to-indigo-800'} text-white rounded-[1.5rem] flex items-center justify-center font-black text-2xl shadow-lg`}>
                      {u.name.charAt(0)}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-6 h-6 border-4 border-white rounded-full ${isSuspended ? 'bg-red-500' : 'bg-emerald-500'}`}></div>
                  </div>
                  <div className="flex flex-col items-end space-y-3">
                    {getRoleBadge(u.role)}
                    <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-all">
                      <button 
                        onClick={() => handleOpenReset(u)}
                        className="p-2 text-gray-400 hover:text-amber-600 bg-gray-50 rounded-lg hover:bg-white hover:shadow-sm" 
                        title="Reset Password"
                      >
                        <KeyRound size={16} />
                      </button>
                      <button 
                        onClick={() => handleOpenForm(u)}
                        className="p-2 text-gray-400 hover:text-blue-900 bg-gray-50 rounded-lg hover:bg-white hover:shadow-sm" 
                        title="Ubah Profil"
                      >
                        <Edit3 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-gray-900 leading-tight line-clamp-1">{u.name}</h3>
                  <p className="text-sm font-bold text-blue-900">@{u.username}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2 flex items-center">
                    <Layers size={12} className="mr-1.5" /> {MOCK_WORK_UNITS[0].name}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-50 space-y-3">
                  <div className="flex items-center text-xs font-bold text-gray-500">
                    <Mail size={14} className="mr-3 text-gray-300" />
                    {u.email}
                  </div>
                  <div className="flex items-center text-xs font-bold text-gray-500">
                    <Fingerprint size={14} className="mr-3 text-gray-300" />
                    NIP: {u.nip || '-'}
                  </div>
                </div>
              </div>
              
              <div className={`px-8 py-4 border-t flex items-center justify-between ${isSuspended ? 'bg-red-50/30' : 'bg-gray-50'}`}>
                <button 
                  onClick={() => toggleAccountStatus(u)}
                  className={`text-[10px] font-black uppercase tracking-widest flex items-center hover:underline ${isSuspended ? 'text-red-600' : 'text-emerald-600'}`}
                >
                  <ToggleRight size={14} className={`mr-1.5 ${isSuspended ? 'rotate-180' : ''} transition-transform`} />
                  {isSuspended ? 'Account Disabled' : 'Account Active'}
                </button>
                <button className="p-1.5 text-gray-300 hover:text-blue-900 transition-all">
                  <MoreHorizontal size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Form User */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-blue-900/60 backdrop-blur-md flex items-center justify-center z-[100] p-4">
          <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300 flex flex-col max-h-[90vh]">
            
            <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
              <div>
                <h4 className="text-2xl font-black text-gray-900">
                  {viewMode === 'RESET_PASS' ? 'Otorisasi Reset Akses' : 
                   selectedUser ? 'Ubah Informasi Pegawai' : 'Registrasi Pegawai Baru'}
                </h4>
                <p className="text-sm text-gray-500 font-medium mt-1">
                   {viewMode === 'RESET_PASS' ? `Mengatur ulang kredensial login untuk ${selectedUser?.name}` : 'Lengkapi data sesuai format kepegawaian resmi.'}
                </p>
              </div>
              <button onClick={closeModal} className="p-3 bg-white border border-gray-100 hover:bg-gray-100 rounded-2xl text-gray-400 shadow-sm transition-all">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
              {viewMode === 'FORM' && (
                <div className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nama Lengkap & Gelar</label>
                       <div className="relative">
                          <UserIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                          <input type="text" defaultValue={selectedUser?.name} className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-900/10 font-bold" placeholder="E.g. Andi Pratama, S.T." />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">NIP (Identitas Unik)</label>
                       <div className="relative">
                          <Fingerprint size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                          <input type="text" defaultValue={selectedUser?.nip} className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-900/10 font-mono font-bold" placeholder="19XXXXXXXXXXXXXX" />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Penugasan Peran</label>
                       <select className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-900/10 font-bold text-sm" defaultValue={selectedUser?.role || UserRole.PEGAWAI}>
                          <option value={UserRole.PEGAWAI}>Pegawai (Staff)</option>
                          <option value={UserRole.PEJABAT_PENYETUJU}>Pejabat Penyetuju (Kadin/Kabid)</option>
                          <option value={UserRole.OPERATOR}>Operator (Admin Teknis)</option>
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Unit Kerja / Bidang</label>
                       <select className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-900/10 font-bold text-sm">
                          <option value="">-- Pilih Unit --</option>
                          {MOCK_WORK_UNITS.map(wu => <option key={wu.id} value={wu.id}>{wu.name}</option>)}
                       </select>
                    </div>
                    <div className="md:col-span-2 space-y-2">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Alamat Email Dinas</label>
                       <div className="relative">
                          <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                          <input type="email" defaultValue={selectedUser?.email} className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-900/10 font-bold" placeholder="email@instansi.go.id" />
                       </div>
                    </div>
                  </div>

                  {!selectedUser && (
                    <div className="p-8 bg-gray-900 rounded-[2.5rem] shadow-xl space-y-8">
                       <div className="flex items-center justify-between">
                          <h5 className="text-[10px] font-black text-indigo-300 uppercase tracking-widest flex items-center leading-none">
                            <Lock size={14} className="mr-2" /> Keamanan & Akses
                          </h5>
                          <button 
                            type="button"
                            onClick={generateCredentials}
                            className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border border-white/5"
                          >
                             Oto-Generate Kredensial
                          </button>
                       </div>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                             <label className="block text-[9px] font-black text-gray-500 uppercase mb-3 ml-1">Username Akses</label>
                             <input type="text" placeholder="E.g. andi_pratama" className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-mono text-sm outline-none focus:border-blue-500 transition-all" />
                          </div>
                          <div>
                             <label className="block text-[9px] font-black text-gray-500 uppercase mb-3 ml-1">Initial Password</label>
                             <input type="password" placeholder="••••••••" className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-bold outline-none focus:border-blue-500 transition-all" />
                          </div>
                       </div>
                    </div>
                  )}
                </div>
              )}

              {viewMode === 'RESET_PASS' && (
                <div className="space-y-10">
                   <div className="text-center py-6">
                      <div className="w-24 h-24 bg-amber-50 text-amber-600 rounded-[2rem] flex items-center justify-center mx-auto shadow-inner mb-6">
                         <KeyRound size={48} className="ml-1" />
                      </div>
                      <h5 className="text-2xl font-black text-gray-900">Force Password Reset?</h5>
                      <p className="text-gray-500 text-sm max-w-md mx-auto mt-2 leading-relaxed">
                        Anda akan mereset password akun <span className="text-blue-900 font-black">@{selectedUser?.username}</span> secara paksa. Password baru sementara akan dikirimkan ke email terdaftar.
                      </p>
                   </div>
                   <div className="space-y-6">
                      <div className="p-6 bg-gray-50 border border-gray-100 rounded-[2rem]">
                         <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Password Sementara (Manual)</label>
                         <input type="text" className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl font-mono text-xl font-black text-center tracking-[0.3em] uppercase text-blue-900" defaultValue="SIMPERDIN-2024" />
                      </div>
                      <div className="flex items-start space-x-4 p-6 bg-blue-50 rounded-[2rem] border border-blue-100">
                         <Info size={20} className="text-blue-900 shrink-0 mt-0.5" />
                         <p className="text-[10px] text-blue-800 font-bold uppercase leading-relaxed tracking-tight">Wajibkan pengguna merubah password pada saat login berikutnya guna menjamin privasi pegawai.</p>
                      </div>
                   </div>
                </div>
              )}
            </div>

            <div className="p-10 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
               <div className="flex items-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  <ShieldCheck size={18} className="mr-2 text-blue-900" /> Platform Security Compliance v2.5
               </div>
               <div className="flex space-x-4">
                  <button onClick={closeModal} className="px-8 py-3.5 font-black text-[10px] uppercase tracking-widest text-gray-400 hover:text-gray-700 transition-all">Batalkan</button>
                  <button className="bg-blue-900 text-white px-10 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-blue-900/20 hover:bg-blue-800 transition-all flex items-center">
                    <Save size={16} className="mr-2" />
                    <span>{viewMode === 'RESET_PASS' ? 'Konfirmasi Reset' : 'Simpan Perubahan'}</span>
                  </button>
               </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagementPage;
