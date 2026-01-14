
import React, { useState } from 'react';
import { Users, Award, MapPin, Navigation, Wallet, Plus, Search, Filter, Download } from 'lucide-react';
import { MOCK_USERS } from '../../constants';

type MasterTab = 'PEGAWAI' | 'JABATAN_GOLONGAN' | 'KOTA_TUJUAN' | 'KEGIATAN_ANGGARAN';

const MasterDataPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<MasterTab>('PEGAWAI');

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

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
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
        <div className="p-8 min-h-[400px]">
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input type="text" placeholder="Cari data..." className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none" />
            </div>
            <div className="flex items-center space-x-2">
               <button className="p-2.5 bg-gray-50 text-gray-500 border border-gray-100 rounded-xl"><Filter size={18} /></button>
               <button className="p-2.5 bg-gray-50 text-gray-500 border border-gray-100 rounded-xl"><Download size={18} /></button>
            </div>
          </div>
          <div className="text-center py-20 text-gray-300 font-bold uppercase text-xs tracking-widest">
            Menampilkan data tabel {activeTab.replace('_', ' ')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterDataPage;
