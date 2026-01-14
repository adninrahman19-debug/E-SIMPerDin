
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
  AlertCircle
} from 'lucide-react';
import { MOCK_USERS } from '../../constants';

type MasterTab = 'PEGAWAI' | 'JABATAN_GOLONGAN' | 'KOTA_TUJUAN' | 'JENIS_SPPD' | 'KEGIATAN_ANGGARAN';

const MasterDataPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<MasterTab>('PEGAWAI');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock Data Master
  const ranks = [
    { id: 'r1', name: 'Pembina Utama', code: 'IV/e', level: 'Eselon I' },
    { id: 'r2', name: 'Pembina Madya', code: 'IV/d', level: 'Eselon II' },
    { id: 'r3', name: 'Pembina Tingkat I', code: 'IV/b', level: 'Eselon III' },
    { id: 'r4', name: 'Penata Madya', code: 'III/a', level: 'Staf' },
  ];

  const destinations = [
    { id: 'd1', name: 'Bandung', province: 'Jawa Barat', type: 'Dalam Provinsi' },
    { id: 'd2', name: 'Surabaya', province: 'Jawa Timur', type: 'Luar Provinsi' },
    { id: 'd3', name: 'Medan', province: 'Sumatera Utara', type: 'Luar Provinsi' },
    { id: 'd4', name: 'Singapura', province: 'International', type: 'Luar Negeri' },
  ];

  const budgetActivities = [
    { id: 'a1', code: '524111', name: 'Belanja Perjalanan Dinas Paket Meeting Dalam Kota', budget: 150000000, used: 45000000 },
    { id: 'a2', code: '524113', name: 'Belanja Perjalanan Dinas Luar Kota', budget: 850000000, used: 124500000 },
    { id: 'a3', code: '524211', name: 'Belanja Perjalanan Dinas Luar Negeri', budget: 200000000, used: 0 },
  ];

  const travelTypes = [
    { id: 't1', code: 'KORD', name: 'Koordinasi & Konsultasi' },
    { id: 't2', code: 'DKLT', name: 'Pendidikan & Pelatihan' },
    { id: 't3', code: 'MNTR', name: 'Monitoring & Evaluasi' },
    { id: 't4', code: 'RPAT', name: 'Rapat Teknis' },
  ];

  const renderTabButton = (id: MasterTab, icon: React.ReactNode, label: string) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center space-x-3 px-6 py-4 border-b-2 transition-all font-black text-[10px] uppercase tracking-widest ${
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
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Manajemen Data Master</h2>
          <p className="text-gray-500 text-sm font-medium">Kelola referensi data dasar untuk operasional perjalanan dinas instansi.</p>
        </div>
        <button className="bg-blue-900 text-white px-6 py-3 rounded-xl flex items-center space-x-2 hover:bg-blue-800 transition-all font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-900/20">
          <Plus size={16} />
          <span>Tambah Data</span>
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
        <div className="flex overflow-x-auto border-b border-gray-100 bg-gray-50/30">
          {renderTabButton('PEGAWAI', <Users size={16} />, 'Data Pegawai')}
          {renderTabButton('JABATAN_GOLONGAN', <Award size={16} />, 'Jabatan & Golongan')}
          {renderTabButton('KOTA_TUJUAN', <MapPin size={16} />, 'Kota & Tujuan')}
          {renderTabButton('JENIS_SPPD', <Navigation size={16} />, 'Jenis Perjalanan')}
          {renderTabButton('KEGIATAN_ANGGARAN', <Wallet size={16} />, 'Kegiatan & Anggaran')}
        </div>

        <div className="p-8">
          {/* Controls */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Cari data master..." 
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-900/10 outline-none text-sm font-medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
               <button className="p-2.5 text-gray-500 hover:text-blue-900 bg-gray-50 border border-gray-100 rounded-xl transition-all">
                 <Filter size={18} />
               </button>
               <button className="p-2.5 text-gray-500 hover:text-emerald-600 bg-gray-50 border border-gray-100 rounded-xl transition-all">
                 <Download size={18} />
               </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px]">
            {activeTab === 'PEGAWAI' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] text-gray-400 uppercase font-black tracking-widest border-b border-gray-100">
                      <th className="px-4 py-4">Pegawai</th>
                      <th className="px-4 py-4">NIP / ID</th>
                      <th className="px-4 py-4">Unit Kerja</th>
                      <th className="px-4 py-4">Jabatan</th>
                      <th className="px-4 py-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {MOCK_USERS.filter(u => u.institutionId === 'inst-1').map((u) => (
                      <tr key={u.id} className="group hover:bg-blue-50/30 transition-colors">
                        <td className="px-4 py-5">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-900 text-white rounded-lg flex items-center justify-center font-bold text-xs">{u.name.charAt(0)}</div>
                            <span className="text-sm font-bold text-gray-900">{u.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-5 text-sm font-mono text-gray-500">{u.nip || '-'}</td>
                        <td className="px-4 py-5 text-xs font-bold text-gray-600">Sekretariat</td>
                        <td className="px-4 py-5 text-xs text-gray-500">{u.position}</td>
                        <td className="px-4 py-5 text-right">
                          <button className="p-1.5 text-gray-400 hover:text-blue-900"><MoreVertical size={16} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'JABATAN_GOLONGAN' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ranks.map((rank) => (
                  <div key={rank.id} className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 group hover:border-blue-900/20 hover:bg-white transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-900 shadow-sm">
                        <Award size={20} />
                      </div>
                      <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-all">
                        <button className="p-2 text-gray-400 hover:text-blue-900"><Edit3 size={16} /></button>
                        <button className="p-2 text-gray-400 hover:text-red-600"><Trash2 size={16} /></button>
                      </div>
                    </div>
                    <h4 className="text-lg font-black text-gray-900">{rank.name}</h4>
                    <p className="text-[10px] font-black text-blue-900 uppercase tracking-widest mt-1">Kode: {rank.code}</p>
                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                       <span className="text-[10px] font-bold text-gray-400 uppercase">Klasifikasi</span>
                       <span className="text-xs font-bold text-gray-700 bg-blue-100 px-2 py-0.5 rounded-lg">{rank.level}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'KOTA_TUJUAN' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] text-gray-400 uppercase font-black tracking-widest border-b border-gray-100">
                      <th className="px-4 py-4">Nama Kota / Wilayah</th>
                      <th className="px-4 py-4">Provinsi / Area</th>
                      <th className="px-4 py-4">Kategori Wilayah</th>
                      <th className="px-4 py-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {destinations.map((d) => (
                      <tr key={d.id} className="hover:bg-blue-50/30 transition-colors">
                        <td className="px-4 py-5 flex items-center space-x-3">
                          <MapPin size={16} className="text-blue-900" />
                          <span className="text-sm font-bold text-gray-900">{d.name}</span>
                        </td>
                        <td className="px-4 py-5 text-sm text-gray-500">{d.province}</td>
                        <td className="px-4 py-5">
                          <span className={`text-[10px] font-black px-2 py-1 rounded uppercase ${
                            d.type === 'Luar Negeri' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600'
                          }`}>{d.type}</span>
                        </td>
                        <td className="px-4 py-5 text-right">
                           <div className="flex items-center justify-end space-x-2">
                             <button className="p-1.5 text-gray-400 hover:text-blue-900"><Edit3 size={16} /></button>
                             <button className="p-1.5 text-gray-400 hover:text-red-600"><Trash2 size={16} /></button>
                           </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'JENIS_SPPD' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {travelTypes.map((type) => (
                  <div key={type.id} className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100 flex items-center justify-between group hover:border-blue-900/20 hover:bg-white transition-all">
                     <div className="flex items-center space-x-6">
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-blue-900 shadow-sm font-black text-xs">
                          {type.code}
                        </div>
                        <div>
                          <h4 className="text-lg font-black text-gray-900 leading-tight">{type.name}</h4>
                          <p className="text-[10px] font-bold text-gray-400 uppercase mt-1">Status: Aktif</p>
                        </div>
                     </div>
                     <button className="p-3 text-gray-400 hover:text-blue-900 opacity-0 group-hover:opacity-100 transition-all">
                       <Edit3 size={20} />
                     </button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'KEGIATAN_ANGGARAN' && (
              <div className="space-y-6">
                {budgetActivities.map((act) => (
                  <div key={act.id} className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100 group hover:border-emerald-600/20 hover:bg-white transition-all">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                           <span className="px-2 py-0.5 bg-blue-900 text-white rounded text-[10px] font-mono font-black">{act.code}</span>
                           <h4 className="text-lg font-black text-gray-900 leading-tight">{act.name}</h4>
                        </div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Tahun Anggaran: 2024</p>
                      </div>
                      <div className="grid grid-cols-2 gap-8 text-right">
                         <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase">Pagu</p>
                            <p className="text-sm font-black text-gray-900">Rp {act.budget.toLocaleString('id-ID')}</p>
                         </div>
                         <div>
                            <p className="text-[10px] font-black text-emerald-600 uppercase">Realisasi</p>
                            <p className="text-sm font-black text-emerald-600">Rp {act.used.toLocaleString('id-ID')}</p>
                         </div>
                      </div>
                    </div>
                    <div className="mt-6 pt-6 border-t border-gray-100">
                       <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase mb-2">
                          <span>Progress Serapan Anggaran</span>
                          <span className="text-blue-900">{Math.round((act.used / act.budget) * 100)}%</span>
                       </div>
                       <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-900 transition-all duration-1000" style={{ width: `${(act.used / act.budget) * 100}%` }}></div>
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar Info */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="bg-blue-900 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
            <div className="relative z-10 flex items-center space-x-6">
               <div className="p-4 bg-white/10 rounded-2xl">
                 <AlertCircle size={32} className="text-amber-400" />
               </div>
               <div>
                  <h4 className="text-xl font-black mb-2">Sinkronisasi Data</h4>
                  <p className="text-blue-100 text-xs font-bold uppercase leading-relaxed tracking-tight opacity-80">
                    Data master yang Anda kelola di sini akan muncul otomatis sebagai pilihan dropdown saat Operator atau Pegawai membuat pengajuan SPPD baru.
                  </p>
               </div>
            </div>
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
         </div>
         <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center justify-between">
            <div className="flex items-center space-x-6">
               <div className="p-4 bg-gray-50 rounded-2xl text-blue-900">
                 <FileText size={32} />
               </div>
               <div>
                  <h4 className="text-lg font-black text-gray-900">Import Data Masif</h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Gunakan template Excel untuk upload ribuan data sekaligus.</p>
               </div>
            </div>
            <button className="p-3 bg-gray-50 text-gray-400 rounded-xl hover:text-blue-900 hover:bg-blue-50 transition-all">
               <ChevronRight size={24} />
            </button>
         </div>
      </div>
    </div>
  );
};

export default MasterDataPage;
