
import React, { useState } from 'react';
import { 
  Users, 
  Award, 
  MapPin, 
  Navigation, 
  Wallet, 
  Plus, 
  Search, 
  Filter, 
  Download,
  MoreVertical,
  Edit3,
  Trash2
} from 'lucide-react';
import { MOCK_USERS } from '../../constants';

type MasterTab = 'PEGAWAI' | 'JABATAN_GOLONGAN' | 'KOTA_TUJUAN' | 'KEGIATAN_ANGGARAN';

const MasterDataPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<MasterTab>('PEGAWAI');
  const [searchTerm, setSearchTerm] = useState('');

  const ranks = [
    { id: 'r1', name: 'Pembina Utama', code: 'IV/e', level: 'Eselon I' },
    { id: 'r2', name: 'Pembina Madya', code: 'IV/d', level: 'Eselon II' },
    { id: 'r3', name: 'Penata Madya', code: 'III/a', level: 'Staf' },
  ];

  const budgetActivities = [
    { id: 'a1', code: '524111', name: 'Belanja Perjalanan Dinas Paket Meeting', budget: 150000000, used: 45000000 },
    { id: 'a2', code: '524113', name: 'Belanja Perjalanan Dinas Luar Kota', budget: 850000000, used: 124500000 },
  ];

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Master Data Instansi</h2>
          <p className="text-gray-500 text-sm font-medium">Pusat referensi data SDM, anggaran, dan wilayah penugasan.</p>
        </div>
        <button className="bg-blue-900 text-white px-6 py-3 rounded-xl flex items-center space-x-2 hover:bg-blue-800 transition-all font-black text-xs uppercase shadow-xl">
          <Plus size={16} />
          <span>Tambah Data</span>
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
        <div className="flex overflow-x-auto border-b border-gray-100 bg-gray-50/30">
          {[
            { id: 'PEGAWAI', icon: <Users size={16} />, label: 'Pegawai' },
            { id: 'JABATAN_GOLONGAN', icon: <Award size={16} />, label: 'Jabatan' },
            { id: 'KOTA_TUJUAN', icon: <MapPin size={16} />, label: 'Wilayah' },
            { id: 'KEGIATAN_ANGGARAN', icon: <Wallet size={16} />, label: 'Anggaran' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as MasterTab)}
              className={`flex items-center space-x-3 px-6 py-4 border-b-2 transition-all font-black text-[10px] uppercase tracking-widest ${
                activeTab === tab.id ? 'border-blue-900 text-blue-900 bg-blue-50/50' : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab.icon} <span>{tab.label}</span>
            </button>
          ))}
        </div>
        <div className="p-8">
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input type="text" placeholder="Cari data..." className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm font-bold" />
            </div>
          </div>

          <div className="overflow-x-auto">
            {activeTab === 'PEGAWAI' && (
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] text-gray-400 uppercase font-black tracking-widest border-b border-gray-100">
                    <th className="px-4 py-4">Nama Pegawai</th>
                    <th className="px-4 py-4">NIP / ID</th>
                    <th className="px-4 py-4">Unit</th>
                    <th className="px-4 py-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {MOCK_USERS.filter(u => u.institutionId === 'inst-1').map(u => (
                    <tr key={u.id} className="hover:bg-blue-50/20">
                      <td className="px-4 py-4 font-bold text-gray-900">{u.name}</td>
                      <td className="px-4 py-4 font-mono text-xs">{u.nip || '-'}</td>
                      <td className="px-4 py-4 text-xs font-bold text-gray-500">Sekretariat</td>
                      <td className="px-4 py-4 text-right"><MoreVertical size={16} className="ml-auto text-gray-300" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            
            {activeTab === 'KEGIATAN_ANGGARAN' && (
               <div className="space-y-4">
                 {budgetActivities.map(act => (
                   <div key={act.id} className="p-6 bg-gray-50 rounded-3xl border border-gray-100 flex items-center justify-between">
                     <div>
                       <span className="text-[9px] font-black text-white bg-blue-900 px-2 py-0.5 rounded mr-2">{act.code}</span>
                       <span className="font-bold text-gray-900">{act.name}</span>
                       <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Realisasi: {Math.round((act.used/act.budget)*100)}%</p>
                     </div>
                     <span className="font-black text-blue-900">Rp {act.budget.toLocaleString()}</span>
                   </div>
                 ))}
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterDataPage;
