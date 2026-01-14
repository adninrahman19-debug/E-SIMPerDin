
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
  Zap
} from 'lucide-react';

const InstitutionManagementPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInst, setSelectedInst] = useState<Institution | null>(null);
  const [viewMode, setViewMode] = useState<'LIST' | 'EDIT' | 'ADD' | 'DETAIL'>('LIST');

  const filteredInstitutions = MOCK_INSTITUTIONS.filter(inst => 
    inst.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    inst.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Mock aggregates (Super Admin hanya melihat angka, bukan isi)
  const getStats = (id: string) => ({
    users: MOCK_USERS.filter(u => u.institutionId === id).length,
    sppd: Math.floor(Math.random() * 500) + 10, // Agregat acak untuk demo
    logs: [
      { action: 'Login Admin', date: '2024-05-12 10:15' },
      { action: 'Pembuatan SPPD #092', date: '2024-05-12 09:30' },
      { action: 'Update Standar Biaya', date: '2024-05-11 14:20' }
    ]
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

  const getStatusBadge = (active: boolean) => {
    return active ? (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-700 uppercase tracking-widest">
        Aktif
      </span>
    ) : (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black bg-red-100 text-red-700 uppercase tracking-widest">
        Ditangguhkan
      </span>
    );
  };

  return (
    <div className="animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Manajemen Institusi</h2>
          <p className="text-gray-500 text-sm font-medium">Pusat kendali tenant dan kustomisasi platform E-SIMPerDin.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-all font-bold text-sm shadow-sm">
            <RefreshCw size={18} />
            <span>Sinkronisasi</span>
          </button>
          <button 
            onClick={handleOpenAdd}
            className="bg-blue-900 text-white px-5 py-2.5 rounded-xl flex items-center space-x-2 hover:bg-blue-800 transition-all font-bold shadow-lg shadow-blue-900/20"
          >
            <Plus size={18} />
            <span>Tambah Institusi</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Cari Nama Institusi atau Kode Satker..." 
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-900/10 focus:border-blue-900 outline-none transition-all text-sm font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2.5 text-gray-500 hover:text-blue-900 hover:bg-blue-50 rounded-xl border border-gray-100 transition-all">
            <Filter size={18} />
          </button>
          <select className="bg-gray-50 border border-gray-100 text-gray-600 text-xs font-bold px-4 py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-blue-900/10 uppercase tracking-wider">
            <option>Semua Status</option>
            <option>Aktif</option>
            <option>Trial</option>
            <option>Suspended</option>
          </select>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] text-gray-400 uppercase font-black tracking-[0.15em] border-b border-gray-50 bg-gray-50/30">
                <th className="px-8 py-5">Informasi Institusi</th>
                <th className="px-6 py-5">Jenis & Kode</th>
                <th className="px-6 py-5">Paket & Layanan</th>
                <th className="px-6 py-5">Statistik (Agregat)</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-8 py-5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredInstitutions.map((inst) => {
                const stats = getStats(inst.id);
                return (
                  <tr key={inst.id} className="group hover:bg-blue-50/30 transition-all duration-300">
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-900 to-indigo-800 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                          <Building2 size={24} />
                        </div>
                        <div>
                          <p className="font-black text-gray-900 leading-tight">{inst.name}</p>
                          <p className="text-xs text-gray-400 font-medium mt-1">Terdaftar: Jan 2024</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="space-y-1">
                        <div className="inline-flex items-center px-2 py-0.5 rounded bg-gray-100 text-gray-600 text-[10px] font-black uppercase">Pemerintah</div>
                        <p className="text-sm font-mono font-bold text-blue-900">{inst.code}</p>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="space-y-1">
                        <p className="text-sm font-black text-gray-800">Professional</p>
                        <p className="text-xs text-gray-500 flex items-center">
                          <Calendar size={12} className="mr-1.5" />
                          Exp: 31 Des 2024
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                        <div>
                          <p className="text-[9px] font-black text-gray-400 uppercase">Users</p>
                          <p className="text-xs font-bold text-gray-700">{stats.users} Akun</p>
                        </div>
                        <div>
                          <p className="text-[9px] font-black text-gray-400 uppercase">SPPD</p>
                          <p className="text-xs font-bold text-gray-700">{stats.sppd} Dok</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      {getStatusBadge(inst.active)}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button 
                          onClick={() => handleOpenDetail(inst)}
                          className="p-2 text-gray-400 hover:text-blue-900 hover:bg-blue-50 rounded-xl transition-all" 
                          title="Kelola & Detail"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all" title="Hapus">
                          <Trash2 size={18} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-blue-900 hover:bg-blue-50 rounded-xl transition-all">
                          <MoreHorizontal size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail & Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-blue-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            <div className="p-8 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h4 className="text-2xl font-black text-gray-900">
                  {viewMode === 'ADD' ? 'Daftarkan Institusi Baru' : 
                   viewMode === 'EDIT' ? 'Ubah Informasi Institusi' : 
                   'Detail & Kelola Institusi'}
                </h4>
                <p className="text-sm text-gray-500 font-medium">
                  {viewMode === 'DETAIL' ? selectedInst?.name : 'Lengkapi formulir di bawah ini.'}
                </p>
              </div>
              <button onClick={closeModal} className="p-3 bg-gray-50 hover:bg-gray-100 rounded-2xl text-gray-400 transition-all">
                <X size={24} />
              </button>
            </div>

            <div className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
              {(viewMode === 'ADD' || viewMode === 'EDIT') && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h5 className="text-xs font-black text-blue-900 uppercase tracking-widest border-l-4 border-blue-900 pl-3">Informasi Umum</h5>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Nama Resmi Institusi</label>
                      <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-900/10 focus:border-blue-900 transition-all font-medium" placeholder="Contoh: Kementerian ESDM" defaultValue={selectedInst?.name} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Jenis Institusi</label>
                        <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none transition-all font-medium">
                          <option>Pemerintah (Pusat)</option>
                          <option>Pemerintah (Daerah)</option>
                          <option>BUMN/BUMD</option>
                          <option>Swasta</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Kode Satker</label>
                        <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none transition-all font-medium" placeholder="E.g. ESM-101" defaultValue={selectedInst?.code} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Alamat Kantor</label>
                      <textarea rows={3} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none transition-all font-medium" defaultValue={selectedInst?.address}></textarea>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <h5 className="text-xs font-black text-blue-900 uppercase tracking-widest border-l-4 border-blue-900 pl-3">Kontak & Langganan</h5>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Email Admin Institusi</label>
                      <input type="email" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none transition-all font-medium" placeholder="admin@kementerian.go.id" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Paket Subscription</label>
                      <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none transition-all font-medium">
                        {MOCK_PLANS.map(p => <option key={p.id}>{p.name}</option>)}
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Masa Aktif Dari</label>
                        <input type="date" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none transition-all font-medium" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Sampai Dengan</label>
                        <input type="date" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none transition-all font-medium" />
                      </div>
                    </div>
                    <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex items-start space-x-3">
                      <AlertCircle size={20} className="text-amber-600 shrink-0 mt-0.5" />
                      <p className="text-[10px] text-amber-800 font-bold leading-relaxed uppercase tracking-wider">
                        Perubahan paket akan langsung mengubah kuota user dan limit SPPD instansi secara real-time.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {viewMode === 'DETAIL' && selectedInst && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Column: Quick Stats */}
                  <div className="lg:col-span-1 space-y-6">
                    <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 text-center">
                      <div className="w-20 h-20 bg-blue-900 text-white rounded-[2rem] flex items-center justify-center mx-auto mb-4 shadow-xl">
                        <Building2 size={36} />
                      </div>
                      <h4 className="text-lg font-black text-gray-900">{selectedInst.name}</h4>
                      <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest">{selectedInst.code}</p>
                      <div className="mt-6 flex justify-center">
                        {getStatusBadge(selectedInst.active)}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                       <div className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center justify-between">
                         <div className="flex items-center">
                           <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mr-3">
                             <User size={20} />
                           </div>
                           <span className="text-xs font-black text-gray-500 uppercase">Users</span>
                         </div>
                         <span className="text-lg font-black text-gray-900">{getStats(selectedInst.id).users}</span>
                       </div>
                       <div className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center justify-between">
                         <div className="flex items-center">
                           <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mr-3">
                             <BarChart2 size={20} />
                           </div>
                           <span className="text-xs font-black text-gray-500 uppercase">Total SPPD</span>
                         </div>
                         <span className="text-lg font-black text-gray-900">{getStats(selectedInst.id).sppd}</span>
                       </div>
                    </div>
                  </div>

                  {/* Right Column: Controls & Logs */}
                  <div className="lg:col-span-2 space-y-8">
                    <div className="space-y-4">
                      <h5 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Pusat Kendali Otoritas</h5>
                      <div className="grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center space-x-3 p-4 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-800 transition-all">
                          <Power size={18} className={selectedInst.active ? "text-red-400" : "text-emerald-400"} />
                          <span>{selectedInst.active ? 'Suspend Institusi' : 'Aktifkan Kembali'}</span>
                        </button>
                        <button className="flex items-center justify-center space-x-3 p-4 bg-blue-50 text-blue-900 border border-blue-100 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-100 transition-all">
                          <RefreshCw size={18} />
                          <span>Reset Data Demo</span>
                        </button>
                        <button 
                          onClick={() => setViewMode('EDIT')}
                          className="flex items-center justify-center space-x-3 p-4 bg-gray-50 text-gray-700 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-100 transition-all"
                        >
                          <Edit3 size={18} />
                          <span>Edit Profil Instansi</span>
                        </button>
                        <button className="flex items-center justify-center space-x-3 p-4 bg-red-50 text-red-600 border border-red-100 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-100 transition-all">
                          <Trash2 size={18} />
                          <span>Hapus Permanen</span>
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h5 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Log Aktivitas Sistem (Agregat)</h5>
                      <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
                        {getStats(selectedInst.id).logs.map((log, i) => (
                          <div key={i} className="flex items-center justify-between p-4 border-b border-gray-100 last:border-0 hover:bg-white transition-colors">
                            <div className="flex items-center">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-900 mr-3"></div>
                              <span className="text-xs font-bold text-gray-700">{log.action}</span>
                            </div>
                            <span className="text-[10px] font-bold text-gray-400">{log.date}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-8 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center text-gray-400 text-xs font-medium">
                <Shield size={14} className="mr-2" />
                Sistem Terenkripsi AES-256
              </div>
              <div className="flex space-x-3">
                <button onClick={closeModal} className="px-6 py-2.5 font-bold text-gray-500 hover:text-gray-700 transition-colors">Batal</button>
                {viewMode !== 'DETAIL' && (
                  <button className="bg-blue-900 text-white px-8 py-2.5 rounded-xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-900/20 hover:bg-blue-800 transition-all">
                    Simpan Konfigurasi
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
