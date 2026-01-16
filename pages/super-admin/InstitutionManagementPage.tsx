
import React, { useState } from 'react';
import { MOCK_INSTITUTIONS, MOCK_PLANS, MOCK_USERS } from '../../constants';
import { Institution, UserRole, SubscriptionStatus } from '../../types';
import { 
  Building2, 
  Plus, 
  Search, 
  CheckCircle, 
  MoreHorizontal, 
  Shield, 
  User, 
  Calendar, 
  AlertCircle, 
  X, 
  Edit3, 
  Trash2, 
  Power, 
  RefreshCw, 
  ChevronRight,
  Filter,
  BarChart2,
  Phone,
  Mail,
  Zap,
  ShieldCheck,
  History,
  Lock,
  Globe,
  Settings,
  MoreVertical,
  Layers,
  Database,
  ShieldAlert,
  Save
} from 'lucide-react';

const InstitutionManagementPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInst, setSelectedInst] = useState<Institution | null>(null);
  const [viewMode, setViewMode] = useState<'LIST' | 'EDIT' | 'ADD' | 'DETAIL'>('LIST');

  // Filter Logic
  const filtered = MOCK_INSTITUTIONS.filter(i => 
    i.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    i.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Mock aggregates (Super Admin only sees numbers, not content)
  const getAggregatedStats = (id: string) => ({
    usersCount: MOCK_USERS.filter(u => u.institutionId === id).length,
    sppdCount: Math.floor(Math.random() * 500) + 50, // Aggregate only
    lastActivity: '2 jam yang lalu',
    storageUsed: '1.2 GB'
  });

  const handleOpenDetail = (inst: Institution) => {
    setSelectedInst(inst);
    setViewMode('DETAIL');
    setIsModalOpen(true);
  };

  const handleOpenAdd = () => {
    setSelectedInst(null);
    setViewMode('ADD');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedInst(null);
    setViewMode('LIST');
  };

  const toggleStatus = (id: string) => {
    if(confirm("Apakah Anda yakin ingin mengubah status akses instansi ini?")) {
      alert(`Status Instansi ${id} berhasil diperbarui.`);
    }
  };

  const resetDemo = (name: string) => {
    if(confirm(`PERINGATAN: Seluruh data transaksi (SPPD, Kwitansi, Laporan) pada instansi '${name}' akan dihapus secara permanen. Lanjutkan?`)) {
      alert(`Data instansi ${name} berhasil dibersihkan.`);
    }
  };

  const deleteInstitution = (name: string) => {
    if(confirm(`HAPUS PERMANEN: Apakah Anda yakin ingin menghapus '${name}' dari platform? Tindakan ini tidak dapat dibatalkan.`)) {
      alert(`Instansi ${name} telah dihapus dari sistem.`);
    }
  };

  return (
    <div className="animate-in fade-in duration-700 pb-20">
      {/* Header & Stats Dashboard */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">Tenant Management</h2>
          <p className="text-gray-500 text-sm font-medium mt-1">Pusat kendali ekosistem multi-tenant E-SIMPerDin PRO.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 bg-white border border-gray-200 text-gray-700 px-5 py-3 rounded-2xl hover:bg-gray-50 transition-all font-black text-xs uppercase tracking-widest shadow-sm">
            <RefreshCw size={16} />
            <span>Sync All</span>
          </button>
          <button 
            onClick={handleOpenAdd}
            className="bg-blue-900 text-white px-8 py-3 rounded-2xl flex items-center space-x-3 hover:bg-blue-800 transition-all font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-900/20"
          >
            <Plus size={18} />
            <span>Tambah Instansi</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
         <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center space-x-4">
            <div className="w-14 h-14 bg-blue-900 text-white rounded-3xl flex items-center justify-center shadow-lg"><Building2 size={24} /></div>
            <div>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Total Instansi</p>
               <h4 className="text-2xl font-black text-gray-900 mt-1">156</h4>
            </div>
         </div>
         <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center space-x-4">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center"><Zap size={24} /></div>
            <div>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Aktif / Live</p>
               <h4 className="text-2xl font-black text-emerald-600 mt-1">148</h4>
            </div>
         </div>
         <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center space-x-4">
            <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-3xl flex items-center justify-center"><Calendar size={24} /></div>
            <div>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Masa Trial</p>
               <h4 className="text-2xl font-black text-amber-600 mt-1">8</h4>
            </div>
         </div>
         <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center space-x-4">
            <div className="w-14 h-14 bg-red-50 text-red-600 rounded-3xl flex items-center justify-center"><ShieldAlert size={24} /></div>
            <div>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Suspended</p>
               <h4 className="text-2xl font-black text-red-600 mt-1">0</h4>
            </div>
         </div>
      </div>

      {/* Main Table Area */}
      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gray-50/30">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari Nama Institusi atau Kode Satker..." 
              className="w-full pl-12 pr-6 py-3.5 bg-white border border-gray-200 rounded-[1.5rem] focus:ring-2 focus:ring-blue-900/10 outline-none transition-all font-bold text-sm shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-3">
             <button className="p-3.5 text-gray-400 hover:text-blue-900 bg-white rounded-2xl border border-gray-100 shadow-sm transition-all"><Filter size={20} /></button>
             <select className="bg-white border border-gray-200 text-gray-700 text-[10px] font-black uppercase tracking-[0.2em] px-6 py-3.5 rounded-[1.5rem] outline-none shadow-sm cursor-pointer">
                <option>Filter Status</option>
                <option>Pemerintah</option>
                <option>Swasta</option>
             </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] text-gray-400 uppercase font-black tracking-[0.2em] border-b border-gray-50 bg-gray-50/10">
                <th className="px-10 py-6">Identitas Tenant</th>
                <th className="px-6 py-6">Informasi Kontak</th>
                <th className="px-6 py-6">Paket & Layanan</th>
                <th className="px-6 py-6">Usage Agregat</th>
                <th className="px-6 py-6">Status</th>
                <th className="px-10 py-6 text-right">Manajemen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((inst) => {
                const stats = getAggregatedStats(inst.id);
                return (
                  <tr key={inst.id} className="group hover:bg-blue-50/30 transition-all duration-500 cursor-pointer" onClick={() => handleOpenDetail(inst)}>
                    <td className="px-10 py-8">
                      <div className="flex items-center space-x-5">
                        <div className="w-14 h-14 rounded-[1.5rem] bg-gradient-to-br from-blue-900 to-indigo-950 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-900/10 group-hover:scale-110 transition-transform duration-500">
                          {inst.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-black text-gray-900 tracking-tight text-lg leading-none">{inst.name}</p>
                          <div className="flex items-center mt-2 space-x-2">
                             <span className="text-[9px] font-black bg-blue-50 text-blue-900 px-2 py-0.5 rounded uppercase tracking-tighter">Pemerintah</span>
                             <span className="text-[10px] font-mono font-bold text-gray-400 tracking-tight">{inst.code}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-8">
                      <div className="space-y-1.5">
                        <p className="text-xs font-bold text-gray-700 flex items-center leading-none"><Mail size={12} className="mr-2 text-blue-400" /> admin@inst.go.id</p>
                        <p className="text-[10px] font-bold text-gray-400 flex items-center"><Phone size={12} className="mr-2 text-gray-300" /> (021) 12345678</p>
                      </div>
                    </td>
                    <td className="px-6 py-8">
                      <div>
                        <div className="inline-flex items-center px-3 py-1 rounded-xl bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase tracking-widest border border-indigo-100">
                          Professional
                        </div>
                        <p className="text-[9px] text-gray-400 font-bold uppercase mt-2">Exp: 31 Des 2024</p>
                      </div>
                    </td>
                    <td className="px-6 py-8">
                      <div className="grid grid-cols-2 gap-x-6">
                        <div>
                           <p className="text-[8px] font-black text-gray-400 uppercase">Users</p>
                           <p className="text-sm font-black text-gray-800">{stats.usersCount}</p>
                        </div>
                        <div>
                           <p className="text-[8px] font-black text-gray-400 uppercase">SPPD</p>
                           <p className="text-sm font-black text-blue-900">{stats.sppdCount}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-8">
                       <span className={`inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${inst.active ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                         {inst.active ? 'Active' : 'Suspended'}
                       </span>
                    </td>
                    <td className="px-10 py-8 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end space-x-2">
                        <button onClick={() => handleOpenDetail(inst)} className="p-3 text-gray-400 hover:text-blue-900 hover:bg-white rounded-2xl transition-all shadow-sm"><Edit3 size={18} /></button>
                        <button onClick={() => toggleStatus(inst.id)} className="p-3 text-gray-400 hover:text-amber-600 hover:bg-white rounded-2xl transition-all shadow-sm"><Power size={18} /></button>
                        <button onClick={() => deleteInstitution(inst.name)} className="p-3 text-gray-400 hover:text-red-600 hover:bg-white rounded-2xl transition-all shadow-sm"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* CRUD MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-blue-900/40 backdrop-blur-md flex items-center justify-center z-[100] p-4">
          <div className="bg-white w-full max-w-5xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300 flex flex-col max-h-[90vh]">
            
            <div className="p-10 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h4 className="text-3xl font-black text-gray-900 tracking-tight">
                  {viewMode === 'ADD' ? 'Registrasi Klien Baru' : 
                   viewMode === 'EDIT' ? 'Ubah Konfigurasi Tenant' : 
                   'Eksplorasi Detail Instansi'}
                </h4>
                <p className="text-sm text-gray-500 font-medium mt-1">
                  {viewMode === 'DETAIL' ? selectedInst?.name : 'Kelola identitas resmi, paket layanan, dan status otorisasi.'}
                </p>
              </div>
              <button onClick={closeModal} className="p-4 bg-gray-50 hover:bg-gray-100 rounded-3xl text-gray-400 transition-all">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
              {viewMode === 'DETAIL' && selectedInst ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                   {/* Col 1: Profile Glance */}
                   <div className="lg:col-span-1 space-y-8">
                      <div className="p-10 bg-gray-50 rounded-[3rem] border border-gray-100 text-center relative overflow-hidden group">
                         <div className="w-24 h-24 bg-blue-900 text-white rounded-[2rem] flex items-center justify-center text-4xl font-black mx-auto mb-6 shadow-2xl">{selectedInst.name.charAt(0)}</div>
                         <h5 className="text-2xl font-black text-gray-900">{selectedInst.name}</h5>
                         <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2">{selectedInst.code}</p>
                         <div className="mt-8 flex justify-center space-x-3">
                            <span className="px-3 py-1 bg-white rounded-full text-[8px] font-black uppercase text-blue-900 shadow-sm border border-gray-100 tracking-tighter">Tenant ID: {selectedInst.id}</span>
                         </div>
                      </div>

                      <div className="space-y-4">
                         <h6 className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Stats Real-time (Agregat)</h6>
                         <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white p-6 rounded-[2rem] border border-gray-100 text-center">
                               <p className="text-[8px] font-black text-gray-400 uppercase">Akun Pegawai</p>
                               <p className="text-xl font-black text-gray-900">{getAggregatedStats(selectedInst.id).usersCount}</p>
                            </div>
                            <div className="bg-white p-6 rounded-[2rem] border border-gray-100 text-center">
                               <p className="text-[8px] font-black text-gray-400 uppercase">Dokumen SPPD</p>
                               <p className="text-xl font-black text-blue-900">{getAggregatedStats(selectedInst.id).sppdCount}</p>
                            </div>
                         </div>
                      </div>
                   </div>

                   {/* Col 2 & 3: Tabs & Logs */}
                   <div className="lg:col-span-2 space-y-10">
                      <div className="space-y-6">
                         <h6 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center"><History size={14} className="mr-2" /> Log Aktivitas Administratif</h6>
                         <div className="bg-gray-50 rounded-[2.5rem] border border-gray-100 overflow-hidden divide-y divide-gray-100">
                            {[
                              { action: 'Perubahan Standar Biaya (SBM)', user: 'Admin Instansi', date: 'Hari ini, 10:15 WIB' },
                              { action: 'Upload Logo Instansi Baru', user: 'Operator', date: 'Kemarin, 14:20 WIB' },
                              { action: 'Verifikasi Pembayaran Paket Pro', user: 'Super Admin', date: '12 Mei 2024' }
                            ].map((log, i) => (
                              <div key={i} className="px-8 py-5 flex items-center justify-between hover:bg-white transition-colors">
                                 <div>
                                    <p className="text-xs font-black text-gray-800">{log.action}</p>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase mt-1 tracking-tighter">{log.user} • {log.date}</p>
                                 </div>
                                 <ChevronRight size={16} className="text-gray-300" />
                              </div>
                            ))}
                         </div>
                      </div>

                      <div className="p-8 bg-blue-900 text-white rounded-[2.5rem] shadow-xl relative overflow-hidden">
                         <div className="relative z-10 flex items-center justify-between">
                            <div className="max-w-md">
                               <h6 className="text-xl font-black mb-2">Pembersihan Sandbox</h6>
                               <p className="text-blue-100 text-[10px] font-bold uppercase leading-relaxed tracking-tight opacity-80">
                                 Gunakan fitur ini hanya untuk instansi trial/demo guna mereset seluruh data simulasi perjalanan dinas untuk klien baru.
                               </p>
                            </div>
                            <button 
                              onClick={() => resetDemo(selectedInst.name)}
                              className="bg-white text-blue-900 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-50 transition-all shadow-xl"
                            >
                               Reset Data Demo
                            </button>
                         </div>
                         <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
                      </div>
                   </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                   {/* Left Form: Identity */}
                   <div className="space-y-8">
                      <h6 className="text-[10px] font-black text-blue-900 uppercase tracking-widest border-l-4 border-blue-900 pl-4">Identitas Resmi & Kontak</h6>
                      <div className="space-y-6">
                         <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nama Resmi Lembaga</label>
                            <input type="text" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-900/10 font-bold text-gray-900" placeholder="E.g. Kementerian Perhubungan RI" defaultValue={selectedInst?.name} />
                         </div>
                         <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                               <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Jenis Instansi</label>
                               <select className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none font-bold text-sm">
                                  <option>Pemerintah (Pusat)</option>
                                  <option>Pemerintah (Daerah)</option>
                                  <option>BUMN / BUMD</option>
                                  <option>Lembaga Negara</option>
                               </select>
                            </div>
                            <div className="space-y-2">
                               <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Kode Satker / ID</label>
                               <input type="text" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none font-mono font-black text-blue-900 uppercase" placeholder="KEMENHUB-01" defaultValue={selectedInst?.code} />
                            </div>
                         </div>
                         <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Admin Penghubung</label>
                            <input type="email" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none font-bold" placeholder="admin@kemenhub.go.id" />
                         </div>
                      </div>
                   </div>

                   {/* Right Form: Subscription */}
                   <div className="space-y-8">
                      <h6 className="text-[10px] font-black text-blue-900 uppercase tracking-widest border-l-4 border-blue-900 pl-4">Layanan & Aksesibilitas</h6>
                      <div className="space-y-6">
                         <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Paket Subscription</label>
                            <select className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none font-black text-blue-900">
                               {MOCK_PLANS.map(p => <option key={p.id} value={p.id}>{p.name} - Rp {p.price.toLocaleString()}/Bln</option>)}
                            </select>
                         </div>
                         <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                               <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Mulai Aktif</label>
                               <input type="date" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold" />
                            </div>
                            <div className="space-y-2">
                               <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Berakhir Pada</label>
                               <input type="date" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold" />
                            </div>
                         </div>
                         <div className="p-6 bg-amber-50 rounded-[2rem] border border-amber-100 flex items-start space-x-3">
                            <ShieldCheck size={20} className="text-amber-600 shrink-0 mt-0.5" />
                            <p className="text-[9px] text-amber-800 font-bold leading-relaxed uppercase tracking-tight">
                               Perubahan paket akan langsung mengubah kuota limit SPPD dan kapasitas SDM instansi secara real-time melalui engine RBAC sistem.
                            </p>
                         </div>
                      </div>
                   </div>
                </div>
              )}
            </div>

            <div className="p-10 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center text-gray-400 text-xs font-medium">
                <Database size={16} className="mr-2" />
                Multi-Tenant Encrypted Isolation
              </div>
              <div className="flex space-x-4">
                <button onClick={closeModal} className="px-8 py-3.5 font-black text-[10px] uppercase tracking-widest text-gray-500 hover:text-gray-900 transition-all">Batal</button>
                {viewMode !== 'DETAIL' && (
                  <button className="bg-blue-900 text-white px-10 py-3.5 rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-blue-900/20 hover:bg-blue-800 transition-all flex items-center">
                    <Save size={16} className="mr-2" />
                    <span>Simpan Konfigurasi</span>
                  </button>
                )}
                {viewMode === 'DETAIL' && (
                  <button onClick={() => setViewMode('EDIT')} className="bg-blue-900 text-white px-10 py-3.5 rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-blue-900/20 hover:bg-blue-800 transition-all flex items-center">
                    <Edit3 size={16} className="mr-2" />
                    <span>Edit Profil</span>
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

export default InstitutionManagementPage;
