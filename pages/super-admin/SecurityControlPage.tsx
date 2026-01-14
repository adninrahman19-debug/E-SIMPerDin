
import React, { useState } from 'react';
import { ShieldCheck, Lock, Key, Globe, Plus, Trash2, Save, Fingerprint, ShieldAlert } from 'lucide-react';

const SecurityControlPage: React.FC = () => {
  const [config, setConfig] = useState({
    minPassLen: 8,
    requireSymbols: true,
    mfa: false,
    ipRestriction: false,
    whitelist: ['114.125.10.12']
  });

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-gray-900 tracking-tight">Security Governance</h2>
        <p className="text-gray-500 text-sm font-medium">Kebijakan otentikasi dan proteksi infrastruktur platform.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-10 space-y-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-900 rounded-2xl flex items-center justify-center"><Key /></div>
              <h4 className="text-xl font-black text-gray-900">Kebijakan Password</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Min Panjang Karakter</label>
                  <input type="number" defaultValue={8} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold" />
               </div>
               <div className="flex items-center space-x-3 pt-6">
                  <input type="checkbox" className="w-5 h-5 accent-blue-900" defaultChecked />
                  <span className="text-sm font-bold text-gray-700">Wajib Karakter Spesial</span>
               </div>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-10 space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-900 rounded-2xl flex items-center justify-center"><Globe /></div>
              <h4 className="text-xl font-black text-gray-900">Pembatasan IP (Whitelist)</h4>
            </div>
            <div className="space-y-4">
               <div className="flex space-x-2">
                  <input type="text" placeholder="192.168..." className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-mono text-sm" />
                  <button className="bg-blue-900 text-white px-6 rounded-xl font-bold uppercase text-[10px]">Add</button>
               </div>
               <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between">
                  <span className="font-mono text-sm font-bold text-gray-600">114.125.10.12 (Pusat Data)</span>
                  <Trash2 size={16} className="text-gray-300" />
               </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
           <div className="bg-blue-900 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                 <ShieldCheck size={40} className="text-amber-400 mb-6" />
                 <h4 className="text-lg font-black mb-2">Enkripsi AES-256</h4>
                 <p className="text-blue-100 text-[10px] font-bold uppercase leading-relaxed opacity-80 mb-6">
                   Seluruh data kearsipan dienkripsi secara permanen untuk memenuhi standar kerahasiaan dokumen negara.
                 </p>
                 <button className="w-full bg-white text-blue-900 py-3 rounded-xl font-black text-xs uppercase shadow-xl hover:bg-blue-50 transition-all">Verifikasi Key</button>
              </div>
           </div>
           <button className="w-full py-4 bg-gray-900 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-xl flex items-center justify-center space-x-2">
              <Save size={16} /> <span>Terapkan Kebijakan</span>
           </button>
        </div>
      </div>
    </div>
  );
};

export default SecurityControlPage;
