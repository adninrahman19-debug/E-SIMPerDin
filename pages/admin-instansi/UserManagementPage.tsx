
import React, { useState } from 'react';
import { UserPlus, Search, Shield, UserCog, UserCheck, User as UserIcon, MoreVertical, Mail, Fingerprint, Trash2, ToggleRight, History } from 'lucide-react';
import { MOCK_USERS } from '../../constants';
import { UserRole } from '../../types';

const UserManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">SDM & Akses Unit</h2>
          <p className="text-gray-500 text-sm font-medium">Kelola hak akses operasional untuk seluruh personil instansi.</p>
        </div>
        <button className="bg-blue-900 text-white px-6 py-3 rounded-xl flex items-center space-x-2 hover:bg-blue-800 transition-all font-bold shadow-lg">
          <UserPlus size={18} />
          <span>Tambah User Baru</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input type="text" placeholder="Cari personil..." className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {MOCK_USERS.filter(u => u.institutionId === 'inst-1').map((u) => (
          <div key={u.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden group hover:border-blue-200 transition-all duration-300">
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 bg-blue-900 text-white rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg">{u.name.charAt(0)}</div>
                <div className="bg-blue-50 text-blue-900 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest">{u.role.replace('_', ' ')}</div>
              </div>
              <h3 className="text-xl font-black text-gray-900 leading-tight">{u.name}</h3>
              <p className="text-sm font-bold text-blue-900">@{u.username}</p>
              <div className="mt-8 pt-6 border-t border-gray-50 space-y-3">
                <div className="flex items-center text-xs font-bold text-gray-500"><Mail size={14} className="mr-3" /> {u.email}</div>
                {u.nip && <div className="flex items-center text-xs font-bold text-gray-500"><Fingerprint size={14} className="mr-3" /> {u.nip}</div>}
              </div>
            </div>
            <div className="bg-gray-50 px-8 py-4 border-t border-gray-100 flex items-center justify-between">
                <button className="text-[10px] font-black text-emerald-600 uppercase flex items-center"><ToggleRight size={14} className="mr-1.5" /> Aktif</button>
                <button className="p-1.5 bg-white text-gray-400 rounded-lg border border-gray-200 hover:text-blue-900"><History size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagementPage;
