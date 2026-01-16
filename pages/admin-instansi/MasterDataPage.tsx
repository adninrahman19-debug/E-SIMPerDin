
import React, { useState } from 'react';
import { 
  Users, 
  Award, 
  MapPin, 
  Navigation, 
  Wallet, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  ChevronRight, 
  MoreVertical,
  Building,
  Target,
  FileText,
  Filter,
  Download,
  AlertCircle,
  CheckCircle2,
  X,
  Save,
  Briefcase,
  Layers,
  Activity,
  RefreshCw
} from 'lucide-react';
import { MOCK_USERS } from '../../constants';

type MasterTab = 'PEGAWAI' | 'JABATAN' | 'TUJUAN' | 'JENIS' | 'ANGGARAN';

const MasterDataPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<MasterTab>('PEGAWAI');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'ADD' | 'EDIT'>('ADD');
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Data State Simulation
  const [ranks] = useState([
    { id: 'r1', name: 'Pembina Utama', code: 'IV/e', level: 'Eselon I' },
    { id: 'r2', name: 'Pembina Madya', code: 'IV/d', level: 'Eselon II' },
    { id: 'r3', name: 'Pembina Tingkat I', code: 'IV/b', level: 'Eselon III' },
    { id: 'r4', name: 'Penata Madya', code: 'III/a', level: 'Staf' },
  ]);

  const [destinations] = useState([
    { id: 'd1', name: 'Bandung', area: 'Jawa Barat', type: 'Dalam Provinsi' },
    { id: 'd2', name: 'Surabaya', area: 'Jawa Timur', type: 'Luar Provinsi' },
    { id: 'd3', name: 'Medan', area: 'Sumatera Utara', type: 'Luar Provinsi' },
    { id: 'd4', name: 'Singapura', area: 'Asia Tenggara', type: 'Luar Negeri' },
  ]);

  const [budgetActivities] = useState([
    { id: 'a1', code: '524111', name: 'Belanja Perjalanan Dinas Paket Meeting Dalam Kota', budget: 150000000, used: 45000000 },
    { id: 'a2', code: '524113', name: 'Belanja Perjalanan Dinas Luar Kota (Operasional)', budget: 850000000, used: 124500000 },
    { id: 'a3', code: '524211', name: 'Belanja Perjalanan Dinas Luar Negeri', budget: 200000000, used: 0 },
  ]);

  const [travelTypes] = useState([
    { id: 't1', code: 'KORD', name: 'Koordinasi & Konsultasi' },
    { id: 't2', code: 'DKLT', name: 'Pendidikan & Pelatihan' },
    { id: 't3', code: 'MNTR', name: 'Monitoring & Evaluasi' },
    { id: 't4', code: 'RPAT', name: 'Rapat Teknis' },
  ]);

  const handleOpenModal = (mode: 'ADD' | 'EDIT', item: any = null) => {
    setModalMode(mode);
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Data ${activeTab} berhasil ${modalMode === 'ADD' ? 'disimpan' : 'diperbarui'}.`);
    setIsModalOpen(false);
  };

  const handleDelete = (name: string) => {
    if(confirm(`Yakin ingin menghapus data "${name}"? Tindakan ini tidak dapat dibatalkan.`)) {
      alert("Data berhasil dihapus.");
    }
  };

  const renderTabButton = (id: MasterTab, icon: React.ReactNode, label: string) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center space-x-3 px-8 py-5 border-b-4 transition-all font-black text-[10px] uppercase tracking-[0.2em] whitespace-nowrap ${
        activeTab === id 
        ? 'border-blue-900 text-blue-900 bg-blue-50/50' 
        : 'border-transparent text-gray-400 hover:text-gray-600 hover:bg-gray-50'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">Master Data Instansi</h2>
          <p className="text-gray-500 text-sm font-medium mt-1">Konfigurasi data referensi untuk meminimalisir kesalahan input operasional.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="p-3.5 bg-white border border-gray-100 text-gray-400 rounded-2xl shadow-sm hover:text-blue-900 transition-all"><Download size={20} /></button>
          <button 
            onClick={() => handleOpenModal('ADD')}
            className="bg-blue-900 text-white px-8 py-4 rounded-2xl flex items-center space-x-3 hover:bg-blue-800 transition-all font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-900/20"
          >
            <Plus size={20} />
            <span>Tambah Data</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col mb-10">
        <div className="flex overflow-x-auto custom-scrollbar border-b border-gray-100 bg-gray-50/20">
          {renderTabButton('PEGAWAI', <Users size={18} />, 'Data Pegawai')}
          {renderTabButton('JABATAN', <Award size={18} />, 'Struktur Jabatan')}
          {renderTabButton('TUJUAN', <MapPin size={18} />, 'Master Wilayah')}
          {renderTabButton('JENIS', <Navigation size={18} />, 'Kategori Dinas')}
          {renderTabButton('ANGGARAN', <Wallet size={18} />, 'Akun Belanja')}
        </div>

        <div className="p-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder={`Cari dalam master ${activeTab.toLowerCase()}...`}
                className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-[1.5rem] outline-none focus:ring-2 focus:ring-blue-900/10 font-bold text-sm transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-3">
               <button className="p-3.5 bg-gray-50 text-gray-400 border border-gray-100 rounded-2xl hover:text-blue-900 transition-all">
                  <RefreshCw size={20} />
               </button>
               <button className="flex items-center space-x-2 px-6 py-4 bg-gray-50 text-gray-500 rounded-2xl border border-gray-100 font-black text-[10px] uppercase tracking-widest hover:bg-white hover:border-blue-900 transition-all">
                <Filter size={16} />
                <span>Filter Lanjutan</span>
               </button>
            </div>
          </div>

          <div className="min-h-[400px]">
            {activeTab === 'PEGAWAI' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] text-gray-400 uppercase font-black tracking-widest border-b border-gray-100 bg-gray-50/30">
                      <th className="px-6 py-5">Pegawai</th>
                      <th className="px-6 py-5">NIP / Identity</th>
                      <th className="px-6 py-5">Jabatan / Golongan</th>
                      <th className="px-6 py-5">Status Akun</th>
                      <th className="px-6 py-5 text-right">Manajemen</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {MOCK_USERS.filter(u => u.institutionId === 'inst-1').map((u) => (
                      <tr key={u.id} className="group hover:bg-blue-50/30 transition-all duration-300">
                        <td className="px-6 py-6">
                           <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-blue-900 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg group-hover:scale-110 transition-transform">{u.name.charAt(0)}</div>
                              <div>
                                 <p className="font-black text-gray-900 text-sm leading-none">{u.name}</p>
                                 <p className="text-[10px] text-gray-400 font-bold uppercase mt-1.5 tracking-tighter">Sekretariat Utama</p>
                              </div>
                           </div>
                        </td>
                        <td className="px-6 py-6 font-mono text-xs font-black text-blue-900">{u.nip || 'EXTERNAL-ID'}</td>
                        <td className="px-6 py-6 text-sm font-bold text-gray-600">{u.position}</td>
                        <td className="px-6 py-6 text-[10px] font-black uppercase text-emerald-600">Aktif</td>
                        <td className="px-6 py-6 text-right">
                           <div className="flex items-center justify-end space-x-1 opacity-0 group-hover:opacity-100 transition-all">
                              <button onClick={() => handleOpenModal('EDIT', u)} className="p-2 text-gray-400 hover:text-blue-900 bg-white border border-gray-100 rounded-xl shadow-sm"><Edit3 size={18} /></button>
                              <button onClick={() => handleDelete(u.name)} className="p-2 text-gray-400 hover:text-red-600 bg-white border border-gray-100 rounded-xl shadow-sm"><Trash2 size={18} /></button>
                           </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'JABATAN' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {ranks.map((rank) => (
                  <div key={rank.id} className="bg-gray-50/50 p-8 rounded-[2.5rem] border border-gray-100 group hover:bg-white hover:shadow-2xl hover:border-blue-900/20 transition-all duration-500 relative overflow-hidden">
                    <div className="flex items-center justify-between mb-8">
                      <div className="w-14 h-14 bg-blue-900 text-white rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                        <Award size={28} />
                      </div>
                      <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-all">
                        <button onClick={() => handleOpenModal('EDIT', rank)} className="p-2.5 text-gray-400 hover:text-blue-900 bg-gray-50 rounded-xl"><Edit3 size={18} /></button>
                        <button onClick={() => handleDelete(rank.name)} className="p-2.5 text-gray-400 hover:text-red-600 bg-gray-50 rounded-xl"><Trash2 size={18} /></button>
                      </div>
                    </div>
                    <h4 className="text-xl font-black text-gray-900 leading-tight mb-2 uppercase tracking-tight">{rank.name}</h4>
                    <div className="flex items-center space-x-3">
                       <span className="px-3 py-1 bg-blue-100 text-blue-900 rounded-lg text-[10px] font-black font-mono">{rank.code}</span>
                       <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{rank.level}</span>
                    </div>
                    <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between text-gray-300">
                       <p className="text-[10px] font-black uppercase tracking-widest">Master Otoritas</p>
                       <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform group-hover:text-blue-900" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'TUJUAN' && (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {destinations.map((d) => (
                   <div key={d.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between group hover:shadow-xl transition-all duration-300">
                      <div className="flex items-center space-x-6">
                         <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shadow-inner group-hover:bg-indigo-600 group-hover:text-white transition-all"><MapPin size={24} /></div>
                         <div>
                            <h4 className="text-lg font-black text-gray-900">{d.name}</h4>
                            <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-tight">{d.area}</p>
                         </div>
                      </div>
                      <div className="flex items-center space-x-4">
                         <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${d.type === 'Luar Negeri' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-gray-50 text-gray-500 border-gray-100'}`}>{d.type}</span>
                         <button onClick={() => handleOpenModal('EDIT', d)} className="p-2 text-gray-300 hover:text-blue-900 transition-all"><MoreVertical size={20} /></button>
                      </div>
                   </div>
                 ))}
               </div>
            )}

            {activeTab === 'JENIS' && (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {travelTypes.map((type) => (
                   <div key={type.id} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm text-center group hover:border-blue-900 transition-all duration-500 flex flex-col h-full">
                      <div className="w-16 h-16 bg-gray-50 text-blue-900 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-900 group-hover:text-white transition-all shadow-inner font-black text-xs">{type.code}</div>
                      <h4 className="text-sm font-black text-gray-900 leading-tight uppercase tracking-tight mb-8 flex-1 flex items-center justify-center">{type.name}</h4>
                      <div className="flex items-center justify-center space-x-2 pt-6 border-t border-gray-50">
                         <button onClick={() => handleOpenModal('EDIT', type)} className="p-2 text-gray-400 hover:text-blue-900"><Edit3 size={16} /></button>
                         <button onClick={() => handleDelete(type.name)} className="p-2 text-gray-400 hover:text-red-600"><Trash2 size={16} /></button>
                      </div>
                   </div>
                 ))}
               </div>
            )}

            {activeTab === 'ANGGARAN' && (
               <div className="space-y-6">
                 {budgetActivities.map((act) => (
                   <div key={act.id} className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                         <div className="flex-1 space-y-4">
                            <div className="flex items-center space-x-4">
                               <div className="p-2 bg-blue-900 text-white rounded-lg font-mono text-[10px] font-black shadow-lg uppercase">{act.code}</div>
                               <h4 className="text-xl font-black text-gray-900 leading-tight tracking-tight uppercase">{act.name}</h4>
                            </div>
                            <div className="flex items-center space-x-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                               <span className="flex items-center"><Building size={14} className="mr-2" /> DIPA TA 2024</span>
                               <span className="flex items-center text-emerald-600"><Activity size={14} className="mr-2" /> Real-time Sinkron</span>
                            </div>
                         </div>
                         <div className="grid grid-cols-2 gap-12 text-right">
                            <div className="space-y-1">
                               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Pagu Anggaran</p>
                               <p className="text-xl font-black text-gray-900">Rp {act.budget.toLocaleString('id-ID')}</p>
                            </div>
                            <div className="space-y-1">
                               <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Terserap (Realisasi)</p>
                               <p className="text-xl font-black text-emerald-600">Rp {act.used.toLocaleString('id-ID')}</p>
                            </div>
                         </div>
                      </div>
                      <div className="mt-10">
                         <div className="flex justify-between items-center mb-3">
                            <span className="text-[10px] font-black text-gray-400 uppercase">Persentase Serapan Anggaran</span>
                            <span className="text-sm font-black text-blue-900">{Math.round((act.used / act.budget) * 100)}%</span>
                         </div>
                         <div className="h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                            <div className="h-full bg-gradient-to-r from-blue-900 to-indigo-600 transition-all duration-1000 rounded-full shadow-lg" style={{ width: `${(act.used / act.budget) * 100}%` }}></div>
                         </div>
                      </div>
                      <div className="mt-8 pt-8 border-t border-gray-50 flex justify-end space-x-3 opacity-0 group-hover:opacity-100 transition-all">
                        <button onClick={() => handleOpenModal('EDIT', act)} className="px-6 py-2 bg-gray-50 text-blue-900 rounded-xl font-black text-[10px] uppercase border border-gray-100 hover:bg-blue-900 hover:text-white transition-all">Re-alokasi Anggaran</button>
                        <button onClick={() => handleDelete(act.name)} className="px-6 py-2 bg-gray-50 text-red-600 rounded-xl font-black text-[10px] uppercase border border-gray-100 hover:bg-red-600 hover:text-white transition-all">Hapus Akun</button>
                      </div>
                   </div>
                 ))}
               </div>
            )}
          </div>
        </div>
      </div>

      {/* MODAL FORM MASTER DATA */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-blue-900/60 backdrop-blur-md flex items-center justify-center z-[100] p-4">
           <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300 flex flex-col max-h-[90vh]">
              <div className="p-10 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
                 <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-blue-900 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-blue-900/20">
                       <Plus size={28} />
                    </div>
                    <div>
                       <h4 className="text-2xl font-black text-gray-900 tracking-tight leading-none">
                         {modalMode === 'ADD' ? 'Tambah Entitas Master' : 'Perbarui Data Master'}
                       </h4>
                       <p className="text-sm text-gray-500 font-medium mt-2 capitalize">Kategori: {activeTab.replace('_', ' ').toLowerCase()}</p>
                    </div>
                 </div>
                 <button onClick={() => setIsModalOpen(false)} className="p-4 bg-white border border-gray-100 hover:bg-gray-100 rounded-3xl text-gray-400 transition-all shadow-sm"><X size={24} /></button>
              </div>

              <form onSubmit={handleSave} className="p-10 space-y-10 overflow-y-auto custom-scrollbar">
                 <div className="space-y-8">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nama / Label Identitas</label>
                       <input 
                        type="text" 
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-900/10 font-bold text-gray-800" 
                        placeholder="Contoh: Pembina Utama / Bandung / 524111" 
                        defaultValue={selectedItem?.name} 
                        required 
                       />
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Kode Identitas</label>
                          <input 
                            type="text" 
                            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-900/10 font-mono font-black uppercase text-blue-900" 
                            placeholder="KODE-01" 
                            defaultValue={selectedItem?.code} 
                            required 
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Klasifikasi / Level</label>
                          <select className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold text-sm" defaultValue={selectedItem?.level || selectedItem?.type}>
                             <option value="">-- Pilih --</option>
                             <option value="Eselon I">Prioritas Tinggi</option>
                             <option value="Staf">Internal Unit</option>
                             <option value="Luar Negeri">Internasional</option>
                          </select>
                       </div>
                    </div>
                    {activeTab === 'ANGGARAN' && (
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nilai Pagu Anggaran (IDR)</label>
                        <input type="number" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-900/10 font-black text-blue-900" defaultValue={selectedItem?.budget} placeholder="0" />
                      </div>
                    )}
                 </div>

                 <div className="p-8 bg-blue-50 rounded-[2.5rem] border border-blue-100 flex items-start space-x-5">
                    <AlertCircle size={32} className="text-blue-900 shrink-0 mt-1" />
                    <div>
                       <p className="text-xs font-black text-blue-900 uppercase mb-2">Peringatan Integritas</p>
                       <p className="text-[11px] text-blue-800 font-bold leading-relaxed uppercase tracking-tight">
                         Penambahan atau perubahan data master akan langsung merubah opsi pilihan pada modul pengajuan SPPD seluruh unit kerja secara real-time. Pastikan data valid sesuai regulasi terbaru.
                       </p>
                    </div>
                 </div>
              </form>

              <div className="p-10 bg-gray-50 border-t border-gray-100 flex items-center justify-end space-x-4">
                 <button onClick={() => setIsModalOpen(false)} className="px-8 py-4 font-black text-[10px] uppercase tracking-widest text-gray-400 hover:text-gray-800 transition-all">Batalkan</button>
                 <button onClick={handleSave} className="bg-blue-900 text-white px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-blue-900/20 hover:bg-blue-800 transition-all flex items-center space-x-2">
                    <Save size={16} />
                    <span>Simpan Master Data</span>
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default MasterDataPage;
