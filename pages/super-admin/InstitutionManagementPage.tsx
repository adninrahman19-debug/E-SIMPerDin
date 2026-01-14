
import React, { useState } from 'react';
import { MOCK_INSTITUTIONS } from '../../constants';
import { Institution } from '../../types';
import { Building2, Plus, Search, Edit3, Trash2, Power, RefreshCw, Filter, ChevronRight, X, Shield, Save } from 'lucide-react';

const InstitutionManagementPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filtered = MOCK_INSTITUTIONS.filter(i => 
    i.name.toLowerCase().includes(searchTerm.toLowerCase()) || i.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Pusat Kendali Institusi</h2>
          <p className="text-gray-500 text-sm font-medium">Manajemen seluruh tenant kementerian dan lembaga pengguna E-SIMPerDin.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-blue-900 text-white px-6 py-3 rounded-xl flex items-center space-x-2 font-bold shadow-lg">
          <Plus size={18} />
          <span>Daftarkan Institusi Baru</span>
        </button>
      </div>

      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 bg-gray-50/50 border-b border-gray-100">
           <div className="relative max-w-md">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
             <input 
               type="text" 
               placeholder="Cari lembaga..." 
               className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl outline-none text-xs font-bold"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
             />
           </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] text-gray-400 uppercase font-black tracking-widest border-b border-gray-50">
                <th className="px-8 py-5">Lembaga</th>
                <th className="px-6 py-5">Kode Satker</th>
                <th className="px-6 py-5">Status Layanan</th>
                <th className="px-8 py-5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((inst) => (
                <tr key={inst.id} className="hover:bg-blue-50/20 transition-all">
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-900 text-white rounded-2xl flex items-center justify-center font-black text-lg">
                        {inst.name.charAt(0)}
                      </div>
                      <span className="font-bold text-gray-900">{inst.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-6 font-mono font-bold text-blue-900 uppercase tracking-tighter">{inst.code}</td>
                  <td className="px-6 py-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${inst.active ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                      {inst.active ? 'Aktif' : 'Suspended'}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                     <button className="p-2 text-gray-400 hover:text-blue-900"><Edit3 size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InstitutionManagementPage;
