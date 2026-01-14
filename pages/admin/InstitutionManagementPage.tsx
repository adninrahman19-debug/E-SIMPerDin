
import React from 'react';
import { MOCK_INSTITUTIONS } from '../../constants';
import { Building2, Plus, Search, CheckCircle, MoreHorizontal } from 'lucide-react';

const InstitutionManagementPage: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Manajemen Institusi</h2>
          <p className="text-gray-500 text-sm">Kelola daftar tenant dan lembaga pengguna E-SIMPerDin.</p>
        </div>
        <button className="bg-blue-900 text-white px-5 py-2.5 rounded-lg flex items-center space-x-2 hover:bg-blue-800 font-bold shadow-md">
          <Plus size={18} /><span>Tambah Institusi</span>
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-100">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input type="text" placeholder="Cari institusi..." className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-xs text-gray-500 uppercase font-bold tracking-widest border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Informasi Institusi</th>
                <th className="px-6 py-4">Kode Satker</th>
                <th className="px-6 py-4">Status Layanan</th>
                <th className="px-6 py-4">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {MOCK_INSTITUTIONS.map((inst) => (
                <tr key={inst.id} className="hover:bg-blue-50/20">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-900 mr-4"><Building2 size={20} /></div>
                      <div><p className="font-bold text-gray-900">{inst.name}</p></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono font-semibold text-blue-800">{inst.code}</td>
                  <td className="px-6 py-4"><div className="flex items-center text-green-600 text-xs font-bold uppercase"><CheckCircle size={14} className="mr-1.5" /> Berlangganan</div></td>
                  <td className="px-6 py-4"><button className="text-gray-400"><MoreHorizontal size={20} /></button></td>
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
