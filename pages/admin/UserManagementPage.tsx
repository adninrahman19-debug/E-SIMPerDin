
import React, { useState } from 'react';
import { useAuth } from '../../App';
import { MOCK_USERS, MOCK_INSTITUTIONS, MOCK_PLANS } from '../../constants';
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
  /* Import User icon as UserIcon to resolve conflict with User type from types.ts */
  User as UserIcon,
  /* Import missing Zap icon used for control quota section */
  Zap,
  /* Import missing ShieldCheck icon used in footer */
  ShieldCheck
} from 'lucide-react';

const UserManagementPage: React.FC = () => {
  const { user: currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [viewMode, setViewMode] = useState<'LIST' | 'FORM' | 'LOGS'>('LIST');

  const isSuperAdmin = currentUser?.role === UserRole.SUPER_ADMIN;

  // Filter users based on role and institution
  const filteredUsers = MOCK_USERS.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         u.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (isSuperAdmin) {
      // Super Admin manages Admin Instansi or global accounts
      return matchesSearch;
    } else {
      // Admin Instansi only manages their own institution users
      return u.institutionId === currentUser?.institutionId && matchesSearch;
    }
  });

  const getRoleBadge = (role: UserRole) => {
    switch(role) {
      case UserRole.SUPER_ADMIN: 
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black bg-red-50 text-red-600 uppercase tracking-widest border border-red-100"><ShieldAlert size={10} className="mr-1"/> Super Admin</span>;
      case UserRole.ADMIN_INSTANSI: 
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black bg-blue-50 text-blue-900 uppercase tracking-widest border border-blue-100"><Shield size={10} className="mr-1"/> Admin Instansi</span>;
      default: 
        /* Fix: Use UserIcon as the component since User is the type name */
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black bg-gray-50 text-gray-500 uppercase tracking-widest border border-gray-100"><UserIcon size={10} className="mr-1"/> {role.replace('_', ' ')}</span>;
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

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    setViewMode('LIST');
  };

  return (
    <div className="animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">
            {isSuperAdmin ? 'Manajemen User Global' : 'Manajemen Pengguna'}
          </h2>
          <p className="text-gray-500 text-sm font-medium">
            {isSuperAdmin 
              ? 'Kelola otoritas Admin Instansi dan kontrol akses lintas tenant.' 
              : 'Kelola akses dan akun pegawai di lingkungan institusi Anda.'}
          </p>
        </div>
        <button 
          onClick={() => handleOpenForm()}
          className="bg-blue-900 text-white px-6 py-3 rounded-xl flex items-center space-x-2 hover:bg-blue-800 transition-all font-bold shadow-lg shadow-blue-900/20"
        >
          <UserPlus size={18} />
          <span>{isSuperAdmin ? 'Buat Admin Instansi' : 'Tambah Pengguna'}</span>
        </button>
      </div>

      {/* Header Stats for Super Admin */}
      {isSuperAdmin && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-900 rounded-xl flex items-center justify-center">
              <Shield size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Admin Instansi</p>
              <h4 className="text-xl font-black text-gray-900">156 Akun</h4>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
              <Activity size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Login Hari Ini</p>
              <h4 className="text-xl font-black text-gray-900">42 Admin</h4>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center">
              <AlertTriangle size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Login Mencurigakan</p>
              <h4 className="text-xl font-black text-gray-900">2 Terdeteksi</h4>
            </div>
          </div>
        </div>
      )}

      {/* Control Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Cari berdasarkan nama, username, atau email..."
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
            <option>Admin Instansi</option>
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
                        onClick={() => handleOpenLogs(u)}
                        className="p-2 text-gray-400 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-all" 
                        title="Log Aktivitas"
                      >
                        <History size={16} />
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
                    <Building2 size={12} className="mr-1.5" />
                    {instansi?.name || 'Global Access'}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-50 grid grid-cols-1 gap-3">
                  <div className="flex items-center text-xs font-bold text-gray-500">
                    <Mail size={14} className="mr-3 text-gray-300" />
                    {u.email}
                  </div>
                  {u.nip && (
                    <div className="flex items-center text-xs font-bold text-gray-500">
                      <KeyRound size={14} className="mr-3 text-gray-300" />
                      NIP: {u.nip}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bg-gray-50 px-8 py-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                   <button className="text-[10px] font-black text-blue-900 uppercase tracking-widest hover:underline flex items-center">
                      <RefreshCcw size={12} className="mr-1.5" /> Reset Pass
                   </button>
                   <button className="text-[10px] font-black text-red-600 uppercase tracking-widest hover:underline flex items-center">
                      <UserX size={12} className="mr-1.5" /> Suspend
                   </button>
                </div>
                <button 
                  onClick={() => handleOpenLogs(u)}
                  className="p-1.5 bg-white text-gray-400 rounded-lg border border-gray-200 hover:text-blue-900 hover:border-blue-900 transition-all"
                >
                   <ChevronRight size={14} />
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
                   selectedUser ? 'Perbarui Akses Pengguna' : 'Buat Akun Admin Baru'}
                </h4>
                <p className="text-sm text-gray-500 font-medium">
                  {viewMode === 'LOGS' ? 'Monitoring jejak digital dan login session.' : 'Kelola hak akses dan pembatasan kuota user.'}
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
                      <label className="block text-sm font-bold text-gray-700 mb-2">Nama Lengkap</label>
                      <input type="text" defaultValue={selectedUser?.name} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-900/10 font-medium" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Username Otoritas</label>
                      <input type="text" defaultValue={selectedUser?.username} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-900/10 font-medium font-mono" />
                    </div>
                  </div>
                  
                  {isSuperAdmin && (
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Pilih Institusi (Tenant)</label>
                      <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none font-medium">
                        <option>Pilih Institusi...</option>
                        {MOCK_INSTITUTIONS.map(inst => (
                          <option key={inst.id} selected={selectedUser?.institutionId === inst.id}>{inst.name}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 space-y-4">
                    <h5 className="text-xs font-black text-blue-900 uppercase tracking-widest flex items-center">
                      <Zap size={14} className="mr-2" /> 
                      Kontrol Kuota & Lisensi
                    </h5>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-gray-400 uppercase">Limit User Tenant</p>
                        <p className="text-sm font-bold text-gray-800">50 User (Paket Professional)</p>
                      </div>
                      <div className="space-y-1 text-right">
                        <p className="text-[10px] font-black text-gray-400 uppercase">Status Lisensi</p>
                        <p className="text-sm font-bold text-emerald-600 uppercase">Aktif</p>
                      </div>
                    </div>
                    <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                       <div className="h-full bg-blue-900 w-[40%] rounded-full"></div>
                    </div>
                    <p className="text-[10px] text-gray-500 italic">20 dari 50 slot user telah digunakan oleh instansi ini.</p>
                  </div>

                  <div className="flex items-center space-x-4">
                    <button className="flex-1 bg-gray-100 text-gray-700 font-black py-4 rounded-xl uppercase tracking-widest text-xs hover:bg-gray-200 transition-all flex items-center justify-center">
                       <KeyRound size={16} className="mr-2" /> Generate Pass Default
                    </button>
                    <button className="flex-1 bg-red-50 text-red-600 font-black py-4 rounded-xl uppercase tracking-widest text-xs hover:bg-red-100 transition-all flex items-center justify-center">
                       <Lock size={16} className="mr-2" /> Paksa Ganti Password
                    </button>
                  </div>
                </div>
              )}

              {viewMode === 'LOGS' && (
                <div className="space-y-8">
                  <div className="bg-red-50 border border-red-100 p-6 rounded-2xl flex items-start space-x-4">
                    <div className="p-3 bg-red-100 text-red-600 rounded-xl">
                      <AlertTriangle size={24} />
                    </div>
                    <div>
                      <h5 className="font-bold text-red-900 uppercase text-xs">Peringatan Keamanan</h5>
                      <p className="text-sm text-red-800 mt-1">Sistem mendeteksi upaya login dari IP Address baru (182.253.x.x) pada 12 Mei pukul 03:00 WIB.</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Riwayat Sesi Terakhir</h5>
                    <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
                      {[
                        { time: '12 Mei 2024, 10:15 WIB', ip: '114.125.10.12', device: 'Chrome / Windows 11', status: 'Success' },
                        { time: '12 Mei 2024, 03:00 WIB', ip: '182.253.44.18', device: 'Edge / MacOS', status: 'Blocked (Geo-Fence)' },
                        { time: '11 Mei 2024, 08:42 WIB', ip: '114.125.10.12', device: 'Chrome / Windows 11', status: 'Success' },
                      ].map((log, i) => (
                        <div key={i} className="p-4 border-b border-gray-100 last:border-0 flex items-center justify-between hover:bg-white transition-colors">
                          <div className="flex items-center space-x-4">
                             <div className={`w-2 h-2 rounded-full ${log.status === 'Success' ? 'bg-emerald-500' : 'bg-red-500 animate-pulse'}`}></div>
                             <div>
                               <p className="text-xs font-black text-gray-900">{log.time}</p>
                               <p className="text-[10px] text-gray-400 font-bold uppercase">{log.device} • IP: {log.ip}</p>
                             </div>
                          </div>
                          <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase ${log.status === 'Success' ? 'text-emerald-700 bg-emerald-50' : 'text-red-700 bg-red-50'}`}>
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
                Account Management v2.5
              </div>
              <div className="flex space-x-3">
                <button onClick={closeModal} className="px-6 py-2.5 font-bold text-gray-500 hover:text-gray-900">Batal</button>
                {viewMode === 'FORM' && (
                  <button className="bg-blue-900 text-white px-8 py-2.5 rounded-xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-900/20 hover:bg-blue-800 transition-all">
                    Simpan Perubahan
                  </button>
                )}
                {viewMode === 'LOGS' && (
                  <button className="bg-red-600 text-white px-8 py-2.5 rounded-xl font-black text-sm uppercase tracking-widest shadow-xl shadow-red-600/20 hover:bg-red-500 transition-all">
                    Reset Session
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
