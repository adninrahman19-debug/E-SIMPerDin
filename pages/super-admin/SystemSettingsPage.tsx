
import React, { useState } from 'react';
import { DEFAULT_SYSTEM_CONFIG } from '../../constants';
import { Palette, Globe, Settings, Save, Monitor, ShieldCheck, Zap, Image as ImageIcon, Camera } from 'lucide-react';

const SystemSettingsPage: React.FC = () => {
  const [config, setConfig] = useState(DEFAULT_SYSTEM_CONFIG);

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Platform Configuration</h2>
          <p className="text-gray-500 text-sm font-medium">Identitas visual, versi aplikasi, dan standar lokalisasi global.</p>
        </div>
        <button className="bg-blue-900 text-white px-8 py-3 rounded-xl flex items-center space-x-2 font-black text-sm uppercase shadow-xl">
          <Save size={18} />
          <span>Simpan Perubahan</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden p-10 space-y-10">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-900 rounded-2xl flex items-center justify-center"><Palette /></div>
              <h4 className="text-xl font-black text-gray-900">Branding Aplikasi</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Nama Platform</label>
                    <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-black text-blue-900" defaultValue={config.appName} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Label Versi</label>
                    <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-mono text-xs" defaultValue={config.version} />
                  </div>
               </div>
               <div className="flex flex-col items-center justify-center bg-gray-50 border-2 border-dashed border-gray-200 rounded-[2rem] p-6 group hover:border-blue-900 transition-all cursor-pointer">
                  <ImageIcon className="text-gray-300 group-hover:scale-110 transition-transform" size={40} />
                  <p className="text-[10px] font-black text-gray-400 uppercase mt-4">Change Global Logo</p>
               </div>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-10 space-y-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-900 rounded-2xl flex items-center justify-center"><Globe /></div>
              <h4 className="text-xl font-black text-gray-900">Regional & Lokalisasi</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Bahasa Default</label>
                  <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold">
                     <option>Bahasa Indonesia (ID)</option>
                     <option>English (EN)</option>
                  </select>
               </div>
               <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Timezone</label>
                  <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold">
                     <option>Asia/Jakarta (GMT+7)</option>
                     <option>Asia/Makassar (GMT+8)</option>
                  </select>
               </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
           <div className="bg-indigo-900 text-white p-8 rounded-[3rem] shadow-xl relative overflow-hidden group">
              <div className="relative z-10">
                 <Zap size={40} className="text-amber-400 mb-6 animate-pulse" />
                 <h4 className="text-lg font-black mb-2 leading-tight">License Status</h4>
                 <p className="text-indigo-100 text-[10px] font-bold uppercase leading-relaxed opacity-80 mb-6">
                   Layanan E-SIMPerDin dioperasikan sebagai SaaS Cluster Terpusat. Seluruh update keamanan disinkronkan otomatis.
                 </p>
                 <div className="flex items-center text-xs font-bold bg-white/10 px-4 py-2 rounded-xl">
                   <ShieldCheck size={14} className="mr-2 text-emerald-400" /> Operational Stable
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettingsPage;
