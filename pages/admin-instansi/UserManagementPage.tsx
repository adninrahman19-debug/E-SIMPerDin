
import React, { useState } from 'react';
import { useAuth } from '../../App';
import { MOCK_USERS } from '../../constants';
import { UserRole, User } from '../../types';
import { 
  UserPlus, 
  Search, 
  Shield, 
  UserCog, 
  UserCheck, 
  User as UserIcon, 
  MoreVertical, 
  Mail, 
  Fingerprint, 
  Trash2, 
  ToggleRight, 
  History,
  X,
  Save,
  KeyRound,
  ShieldCheck,
  AlertTriangle,
  Info,
  CheckCircle2,
  RefreshCw,
  Edit3
} from 'lucide-react';

const UserManagementPage = () => {
  const { user: currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'ADD' | 'EDIT' | 'RESET'>('ADD');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Filter users only for this institution
  const institutionUsers = MOCK_USERS.filter(u => 
    u.institutionId === currentUser?.institutionId &&
    (u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
     u.nip?.includes(searchTerm))
  );

  const handleOpenModal = (mode: 'ADD' | 'EDIT' | 'RESET', user: User | null = null) => {
    setModalMode(mode);
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Data user berhasil ${modalMode === 'ADD' ? 'ditambahkan' : 'diperbarui'}.`);
    setIsModalOpen(false);
  };

  const toggleStatus = (name: string, current: boolean) => {
    if(confirm(`Apakah Anda yakin ingin ${current ? 'menonaktifkan' : 'mengaktifkan'} akun ${name}?`)) {
      alert(`Status akun ${name} berhasil diubah.`);
    }
  };

  return (
    <div className="animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">SDM & Akses Unit</h2>
          <p className="text-gray-500 text-sm font-medium">Kelola hak akses operasional untuk seluruh personil instansi.</p>
        </div>
        <button 
          onClick={() => handleOpenModal('ADD')}
          className="bg-blue-900 text-white px-8 py-4 rounded-2xl flex items-center space-x-3 hover:bg-blue-800 transition-all font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-900/20"
        >
          <UserPlus size={18} />
          <span>Tambah User Baru</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Cari Nama, Username, atau NIP..." 
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-900/10 font-medium text-sm" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </div>
        <div className="flex items-center space-x-2">
           <div className="px-4 py-2 bg-blue-50 text-blue-900 rounded-xl text-[10px] font-black uppercase tracking-widest">
              Total: {institutionUsers.length} Pegawai
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {institutionUsers.map((u) => (
          <div key={u.id} className={`bg-white rounded-[2.5rem] border ${u.active === false ? 'border-red-100 bg-red-50/10' : 'border-gray-100'} shadow-sm overflow-hidden group hover:shadow-2xl hover:border-blue-200 transition-all duration-500 flex flex-col`}>
            <div className="p-8 flex-1">
              <div className="flex items-start justify-between mb-6">
                <div className={`w-16 h-16 ${u.active === false ? 'bg-gray-400' : 'bg-blue-900'} text-white rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg transition-transform group-hover:scale-110`}>
                  {u.name.charAt(0)}
                </div>
                <div className="flex flex-col items-end space-y-2">
                   <div className="bg-blue-50 text-blue-900 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100">
                     {u.role.replace('_', ' ')}
                   </div>
                   <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-all">
                      <button onClick={() => handleOpenModal('EDIT', u)} className="p-2 text-gray-400 hover:text-blue-900 bg-gray-50 rounded-xl"><Edit3 size={16} /></button>
                      <button onClick={() => handleOpenModal('RESET', u)} className="p-2 text-gray-400 hover:text-amber-600 bg-gray-50 rounded-xl" title="Reset Password"><KeyRound size={16} /></button>
                   </div>
                </div>
              </div>
              <h3 className="text-xl font-black text-gray-900 leading-tight">{u.name}</h3>
              <p className="text-sm font-bold text-blue-900">@{u.username}</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1 italic">{u.position || 'Staf Pelaksana'}</p>
              
              <div className="mt-8 pt-6 border-t border-gray-50 space-y-3">
                <div className="flex items-center text-xs font-bold text-gray-500">
                  <Mail size={14} className="mr-3 text-gray-300" /> 
                  <span className="truncate">{u.email}</span>
                </div>
                <div className="flex items-center text-xs font-bold text-gray-500">
                  <Fingerprint size={14} className="mr-3 text-gray-300" /> 
                  {u.nip || 'NIP Belum Diatur'}
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-8 py-4 border-t border-gray-100 flex items-center justify-between">
                <button 
                  onClick={() => toggleStatus(u.name, u.active !== false)}
                  className={`text-[10px] font-black uppercase flex items-center hover:underline transition-all ${u.active === false ? 'text-red-500' : 'text-emerald-600'}`}
                >
                  <ToggleRight size={14} className={`mr-1.5 ${u.active === false ? 'rotate-180' : ''}`} /> 
                  {u.active === false ? 'Akun Dinonaktifkan' : 'Akun Aktif'}
                </button>
                <button className="p-1.5 bg-white text-gray-400 rounded-lg border border-gray-100 hover:text-blue-900 shadow-sm transition-all"><History size={14} /></button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL USER CRUD */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-blue-900/60 backdrop-blur-md flex items-center justify-center z-[100] p-4">
           <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300 flex flex-col max-h-[90vh]">
              <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
                 <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-blue-900 text-white rounded-2xl flex items-center justify-center shadow-xl">
                       {modalMode === 'RESET' ? <KeyRound size={28} /> : <UserCog size={28} />}
                    </div>
                    <div>
                       <h4 className="text-2xl font-black text-gray-900 tracking-tight">
                         {modalMode === 'ADD' ? 'Registrasi Pegawai Baru' : 
                          modalMode === 'EDIT' ? 'Ubah Informasi Pegawai' : 'Otorisasi Reset Password'}
                       </h4>
                       <p className="text-sm text-gray-500 font-medium">
                         {modalMode === 'RESET' ? `Mengatur ulang akses untuk ${selectedUser?.name}` : 'Pastikan data sesuai dengan SK Kepegawaian.'}
                       </p>
                    </div>
                 </div>
                 <button onClick={() => setIsModalOpen(false)} className="p-4 bg-white border border-gray-100 hover:bg-gray-100 rounded-3xl text-gray-400 transition-all shadow-sm"><X size={24} /></button>
              </div>

              <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-10 custom-scrollbar">
                {modalMode !== 'RESET' ? (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nama Lengkap & Gelar</label>
                          <input type="text" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-900/10 font-bold" defaultValue={selectedUser?.name} placeholder="Contoh: Andi Pratama, S.T." required />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">NIP (Nomor Induk Pegawai)</label>
                          <input type="text" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-900/10 font-mono font-bold" defaultValue={selectedUser?.nip} placeholder="19XXXXXXXXXXXXXX" required />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Peran dalam Sistem</label>
                          <select className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-900/10 font-bold text-sm" defaultValue={selectedUser?.role || UserRole.PEGAWAI}>
                             <option value={UserRole.PEGAWAI}>Pegawai (Pelaksana)</option>
                             <option value={UserRole.OPERATOR}>Operator (Admin Teknis)</option>
                             <option value={UserRole.PEJABAT_PENYETUJU}>Pejabat Penyetuju (Kadin/Kabid)</option>
                          </select>
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Jabatan Struktural</label>
                          <input type="text" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-900/10 font-bold" defaultValue={selectedUser?.position} placeholder="Contoh: Kepala Bidang Angkutan" />
                       </div>
                       <div className="md:col-span-2 space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Alamat Email Dinas</label>
                          <input type="email" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-900/10 font-bold" defaultValue={selectedUser?.email} placeholder="email@instansi.go.id" required />
                       </div>
                    </div>

                    {!selectedUser && (
                       <div className="p-8 bg-gray-900 rounded-[2.5rem] shadow-xl space-y-6">
                          <h5 className="text-[10px] font-black text-indigo-300 uppercase tracking-widest flex items-center"><ShieldCheck size={14} className="mr-2" /> Kredensial Login Awal</h5>
                          <div className="grid grid-cols-2 gap-6">
                             <div>
                                <label className="block text-[9px] font-black text-gray-500 uppercase mb-2 ml-1">Username</label>
                                <input type="text" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none font-bold" placeholder="andi_pratama" />
                             </div>
                             <div>
                                <label className="block text-[9px] font-black text-gray-500 uppercase mb-2 ml-1">Password Sementara</label>
                                <input type="password" title="password" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none font-bold" placeholder="••••••••" />
                             </div>
                          </div>
                       </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-8 py-6 text-center">
                     <div className="w-24 h-24 bg-amber-50 text-amber-600 rounded-[2rem] flex items-center justify-center mx-auto shadow-inner mb-6">
                        <KeyRound size={48} className="animate-bounce" />
                     </div>
                     <h5 className="text-2xl font-black text-gray-900 leading-tight">Yakin ingin mereset password akun ini?</h5>
                     <p className="text-gray-500 text-sm max-w-sm mx-auto">Password sementara akan di-generate otomatis dan dikirimkan ke email <span className="text-blue-900 font-bold">{selectedUser?.email}</span>.</p>
                     
                     <div className="mt-8 p-6 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-between">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Password Baru Preview</span>
                        <span className="font-mono font-black text-blue-900 tracking-widest">SIM-2024-PASS</span>
                     </div>
                  </div>
                )}

                <div className="mt-10 p-10 bg-gray-50 border-t border-gray-100 flex items-center justify-between -mx-10 -mb-10">
                   <div className="flex items-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      <ShieldCheck size={18} className="mr-2 text-blue-900" /> Platform Security Compliance v2.5
                   </div>
                   <div className="flex space-x-4">
                      <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-4 font-black text-[10px] uppercase tracking-widest text-gray-400 hover:text-gray-800 transition-all">Batalkan</button>
                      <button type="submit" className="bg-blue-900 text-white px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-blue-900/20 hover:bg-blue-800 transition-all flex items-center">
                         <Save size={16} className="mr-2" />
                         <span>{modalMode === 'RESET' ? 'Konfirmasi Reset' : 'Simpan Perubahan'}</span>
                      </button>
                   </div>
                </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default UserManagementPage;
