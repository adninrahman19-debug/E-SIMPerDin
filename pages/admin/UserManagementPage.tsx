
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
  MapPin, 
  Search, 
  Filter, 
  RefreshCcw, 
  Lock, 
  Unlock, 
  UserX, 
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
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

const UserManagementPage: React.FC = () => {
  const { user: currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [viewMode, setViewMode] = useState<'LIST' | 'FORM' | 'LOGS' | 'RESET_PASS'>('LIST');

  const isSuperAdmin = currentUser?.role === UserRole.SUPER_ADMIN;

  // Mock Work Units (In real app, fetch from institution context)
  const MOCK_WORK_UNITS = [
    { id: 'wu-1', name: 'Sekretariat' },
    { id: 'wu-2', name: 'Bidang Angkutan' },
    { id: 'wu-3', name: 'Bidang Lalu Lintas' },
    { id: 'wu-4', name: 'UPT Pengelola Terminal' }
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
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black bg-red-50 text-red-600 uppercase tracking-widest border border-red-100"><ShieldAlert size={10} className="mr-1"/> Super Admin</span>;
      case UserRole.ADMIN_INSTANSI: 
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black bg-blue-50 text-blue-900 uppercase tracking-widest border border-blue-100"><Shield size={10} className="mr-1"/> Admin Instansi</span>;
      case UserRole.OPERATOR:
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black bg-indigo-50 text-indigo-600 uppercase tracking-widest border border-indigo-100"><UserCog size={10} className="mr-1"/> Operator</span>;
      case UserRole.PEJABAT_PENYETUJU:
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black bg-amber-50 text-amber-700 uppercase tracking-widest border border-amber-100"><UserCheck size={10} className="mr-1"/> Penyetuju</span>;
      default: 
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black bg-gray-50 text-gray-500 uppercase tracking-widest border border-gray-100"><UserIcon size={10} className="mr-1"/> Pegawai</span>;
    }
  };

  const handleOpenLogs = (user: User) => {
    setSelectedUser(user);
    setViewMode('LOGS');
    setIsModalOpen(true);
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

  const toggleAccountStatus = (userId: string) => {
    alert(`Status akun ${userId} berhasil diperbarui!`);
  };

  const generateCredentials = () => {
    alert("Username & Password otomatis telah dibuat untuk pengguna ini.");
  };

  const handleDeleteUser = (name: string) => {
    if(confirm(`Apakah Anda yakin ingin menghapus akun ${name}? Data histori SPPD akan tetap tersimpan di arsip namun akun tidak dapat digunakan lagi.`)) {
      alert(`User ${name} berhasil dihapus.`);
    }
  };

  return (
    <div className="animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">
            {isSuperAdmin ? 'Manajemen User Global' : 'Manajemen Pengguna Instansi'}
          </h2>
          <p className="text-gray-500 text-sm font-medium">
            {isSuperAdmin 
              ? 'Kelola otoritas Admin Instansi dan kontrol akses lintas tenant.' 
              : 'Kelola peran Operator, Pegawai, dan Pejabat Penyetuju di institusi Anda.'}
          </p>
        </div>
        <button 
          onClick={() => handleOpenForm()}
          className="bg-blue-900 text-white px-6 py-3 rounded-xl flex items-center space-x-2 hover:bg-blue-800 transition-all font-bold shadow-lg shadow-blue-900/20"
        >
          <UserPlus size={18} />
          <span>{isSuperAdmin ? 'Buat Admin Instansi' : 'Tambah User Baru'}</span>
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total SDM</p>
           <h4 className="text-2xl font-black text-gray-900">{filteredUsers.length} <span className="text-xs text-gray-400 font-bold uppercase">Orang</span></h4>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Pejabat Penyetuju</p>
           <h4 className="text-2xl font-black text-amber-600">{filteredUsers.filter(u => u.role === UserRole.PEJABAT_PENYETUJU).length} <span className="text-xs text-gray-400 font-bold uppercase">Akun</span></h4>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Operator / Admin</p>
           <h4 className="text-2xl font-black text-indigo-600">{filteredUsers.filter(u => [UserRole.OPERATOR, UserRole.ADMIN_INSTANSI].includes(u.role)).length} <span className="text-xs text-gray-400 font-bold uppercase">Akun</span></h4>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Akun Aktif</p>
           <h4 className="text-2xl font-black text-emerald-600">{filteredUsers.length} <span className="text-xs text-gray-400 font-bold uppercase">Online</span></h4>
        </div>
      </div>

      {/* Control Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Cari Nama, NIP, atau Email..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-900/10 outline-none text-sm font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2.5 text-gray-500 hover:text-blue-900 hover:bg-blue-50 rounded-xl border border-gray-100 transition-all">
            <Filter size={18} />
          </button>
          <select className="bg-gray-50 border border-gray-100 text-gray-600 text-xs font-bold px-4 py-2.5 rounded-xl outline-none">
            <option>Semua Peran</option>
            <option>Penyetuju</option>
            <option>Operator</option>
            <option>Pegawai</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredUsers.map((u) => {
          const instansi = MOCK_INSTITUTIONS.find(i => i.id === u.institutionId);
          return (
            <div key={u.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden group hover:border-blue-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-900 to-indigo-800 text-white rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg group-hover:rotate-6 transition-transform">
                      {u.name.charAt(0)}
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-emerald-500 border-4 border-white rounded-full" title="Online"></div>
                  </div>
                  <div className="flex flex-col items-end">
                    {getRoleBadge(u.role)}
                    <div className="flex mt-4 space-x-1">
                      <button 
                        onClick={() => handleOpenReset(u)}
                        className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all" 
                        title="Reset Password"
                      >
                        <KeyRound size={16} />
                      </button>
                      <button 
                        onClick={() => handleOpenForm(u)}
                        className="p-2 text-gray-400 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-all" 
                        title="Edit User"
                      >
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-gray-900 leading-tight">{u.name}</h3>
                  <p className="text-sm font-bold text-blue-900">@{u.username}</p>
                  <p className="text-xs font-medium text-gray-400 mt-2 flex items-center">
                    <Layers size={12} className="mr-1.5" />
                    Sekretariat (Unit Kerja)
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-50 grid grid-cols-1 gap-3">
                  <div className="flex items-center text-xs font-bold text-gray-500">
                    <Mail size={14} className="mr-3 text-gray-300" />
                    {u.email}
                  </div>
                  {u.nip && (
                    <div className="flex items-center text-xs font-bold text-gray-500">
                      <Fingerprint size={14} className="mr-3 text-gray-300" />
                      NIP: {u.nip}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bg-gray-50 px-8 py-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                   <button 
                    onClick={() => toggleAccountStatus(u.id)}
                    className="text-[10px] font-black text-emerald-600 uppercase tracking-widest hover:underline flex items-center"
                   >
                      <ToggleRight size={14} className="mr-1.5" /> Aktif
                   </button>
                   <button 
                    onClick={() => handleDeleteUser(u.name)}
                    className="text-[10px] font-black text-red-600 uppercase tracking-widest hover:underline flex items-center"
                   >
                      <Trash2 size={12} className="mr-1.5" /> Hapus
                   </button>
                </div>
                <button 
                  onClick={() => handleOpenLogs(u)}
                  className="p-1.5 bg-white text-gray-400 rounded-lg border border-gray-200 hover:text-blue-900 hover:border-blue-900 transition-all"
                  title="Lihat Audit Log"
                >
                   <History size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modals */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-blue-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            <div className="p-8 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h4 className="text-2xl font-black text-gray-900">
                  {viewMode === 'LOGS' ? `Aktivitas Keamanan: ${selectedUser?.name}` : 
                   viewMode === 'RESET_PASS' ? `Reset Password: ${selectedUser?.name}` :
                   selectedUser ? 'Perbarui Akses Pengguna' : 'Tambah Pengguna Baru'}
                </h4>
                <p className="text-sm text-gray-500 font-medium">
                  {viewMode === 'LOGS' ? 'Monitoring jejak digital dan login session.' : 
                   viewMode === 'RESET_PASS' ? 'Berikan password sementara yang aman.' :
                   'Tentukan identitas, jabatan, dan hak akses sistem.'}
                </p>
              </div>
              <button onClick={closeModal} className="p-3 bg-gray-50 hover:bg-gray-100 rounded-2xl text-gray-400 transition-all">
                <X size={24} />
              </button>
            </div>

            <div className="p-8 max-h-[70vh] overflow-y-auto">
              {viewMode === 'FORM' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Nama Lengkap & Gelar</label>
                      <input type="text" defaultValue={selectedUser?.name} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-900/10 font-bold" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">NIP / Nomor Registrasi</label>
                      <input type="text" defaultValue={selectedUser?.nip} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-900/10 font-mono font-bold" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Role / Hak Akses</label>
                      <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none font-bold text-sm">
                        {!isSuperAdmin && (
                          <>
                            <option value={UserRole.PEGAWAI}>Pegawai (Standard)</option>
                            <option value={UserRole.OPERATOR}>Operator Administrasi</option>
                            <option value={UserRole.PEJABAT_PENYETUJU}>Pejabat Penyetuju</option>
                          </>
                        )}
                        {isSuperAdmin && <option value={UserRole.ADMIN_INSTANSI}>Admin Instansi</option>}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Unit Kerja / Bidang</label>
                      <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none font-bold text-sm">
                        <option>Pilih Unit Kerja...</option>
                        {MOCK_WORK_UNITS.map(wu => (
                          <option key={wu.id} value={wu.id}>{wu.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 space-y-4">
                    <div className="flex items-center justify-between mb-2">
                       <h5 className="text-[10px] font-black text-blue-900 uppercase tracking-widest flex items-center">
                        <KeyRound size={14} className="mr-2" /> 
                        Kredensial Login
                       </h5>
                       {!selectedUser && (
                         <button 
                          onClick={generateCredentials}
                          className="text-[10px] font-black text-blue-900 underline uppercase"
                         >
                           Generate Otomatis
                         </button>
                       )}
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Username</label>
                        <input type="text" placeholder="E.g. andi_pratama" defaultValue={selectedUser?.username} className="w-full px-3 py-2 bg-white border border-blue-200 rounded-lg outline-none font-mono text-xs font-bold" />
                      </div>
                      {!selectedUser && (
                        <div>
                          <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Password Awal</label>
                          <input type="password" placeholder="••••••••" className="w-full px-3 py-2 bg-white border border-blue-200 rounded-lg outline-none font-bold text-xs" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-3 cursor-pointer group">
                      <div className="relative">
                        <input type="checkbox" className="sr-only peer" defaultChecked={true} />
                        <div className="w-10 h-6 bg-gray-200 rounded-full peer peer-checked:bg-emerald-500 transition-all"></div>
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:left-5"></div>
                      </div>
                      <span className="text-sm font-bold text-gray-700 group-hover:text-blue-900">Akun Aktif (Dapat Login)</span>
                    </label>
                  </div>
                </div>
              )}

              {viewMode === 'RESET_PASS' && (
                <div className="space-y-8">
                  <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl flex items-start space-x-4">
                    <div className="p-3 bg-amber-100 text-amber-600 rounded-xl">
                      <Lock size={24} />
                    </div>
                    <div>
                      <h5 className="font-bold text-amber-900 uppercase text-xs">Reset Password Pengguna</h5>
                      <p className="text-sm text-amber-800 mt-1">Gunakan fitur ini hanya jika pegawai lupa password. Password lama tidak akan dapat dipulihkan kembali.</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                     <div className="grid grid-cols-1 gap-6">
                        <div>
                           <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Password Baru Sementara</label>
                           <input type="text" className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-900/10 font-mono text-xl font-black text-center tracking-widest" value="SIMPERDIN-2024" readOnly />
                        </div>
                        <label className="flex items-center space-x-3 cursor-pointer group">
                           <div className="relative">
                              <input type="checkbox" className="sr-only peer" defaultChecked={true} />
                              <div className="w-10 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-900 transition-all"></div>
                              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:left-5"></div>
                           </div>
                           <span className="text-sm font-bold text-gray-700">Wajib Ganti Password saat login berikutnya</span>
                        </label>
                     </div>
                  </div>
                </div>
              )}

              {viewMode === 'LOGS' && (
                <div className="space-y-8">
                  <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl flex items-start space-x-4">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                      <History size={24} />
                    </div>
                    <div>
                      <h5 className="font-bold text-blue-900 uppercase text-xs">Audit Aktivitas Akun</h5>
                      <p className="text-sm text-blue-800 mt-1">Monitoring penggunaan sistem oleh user bersangkutan selama 30 hari terakhir.</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Jejak Digital Terakhir</h5>
                    <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
                      {[
                        { time: '12 Mei 2024, 14:15 WIB', action: 'Input SPPD Baru #092', device: 'Chrome / Windows 11', status: 'Success' },
                        { time: '12 Mei 2024, 10:00 WIB', action: 'Login Aplikasi', device: 'Chrome / Windows 11', status: 'Success' },
                        { time: '11 Mei 2024, 08:42 WIB', action: 'Logout Aplikasi', device: 'Edge / MacOS', status: 'Success' },
                      ].map((log, i) => (
                        <div key={i} className="p-4 border-b border-gray-100 last:border-0 flex items-center justify-between hover:bg-white transition-colors">
                          <div className="flex items-center space-x-4">
                             <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                             <div>
                               <p className="text-xs font-black text-gray-900">{log.action}</p>
                               <p className="text-[10px] text-gray-400 font-bold uppercase">{log.time} • {log.device}</p>
                             </div>
                          </div>
                          <span className="text-[10px] font-black px-2 py-0.5 rounded uppercase text-emerald-700 bg-emerald-50">
                            {log.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-8 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center text-xs font-bold text-gray-400">
                <ShieldCheck size={16} className="mr-2" /> 
                System RBAC Policy v3.0
              </div>
              <div className="flex space-x-3">
                <button onClick={closeModal} className="px-6 py-2.5 font-bold text-gray-500 hover:text-gray-900">Batal</button>
                {viewMode === 'FORM' && (
                  <button className="bg-blue-900 text-white px-8 py-2.5 rounded-xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-900/20 hover:bg-blue-800 transition-all">
                    Simpan User
                  </button>
                )}
                {viewMode === 'RESET_PASS' && (
                   <button className="bg-amber-600 text-white px-8 py-2.5 rounded-xl font-black text-sm uppercase tracking-widest shadow-xl shadow-amber-900/20 hover:bg-amber-500 transition-all">
                    Konfirmasi Reset
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagementPage;
