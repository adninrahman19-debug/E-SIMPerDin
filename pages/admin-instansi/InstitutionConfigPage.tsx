
import React, { useState } from 'react';
import { GitMerge, Hash, BellRing, Save, Info, CheckCircle2, ChevronRight, Zap, RefreshCw, Layers, Plus, Trash2 } from 'lucide-react';

const InstitutionConfigPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'WORKFLOW' | 'NOTIF'>('WORKFLOW');

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Konfigurasi Alur</h2>
          <p className="text-gray-500 text-sm font-medium">Kustomisasi hirarki persetujuan dan sistem penomoran otomatis.</p>
        </div>
        <button className="bg-blue-900 text-white px-8 py-3 rounded-xl flex items-center space-x-2 font-black text-sm uppercase shadow-xl">
          <Save size={18} />
          <span>Simpan Alur</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-10">
              <h4 className="font-black text-lg text-gray-900 mb-8 flex items-center"><GitMerge className="mr-2" /> Hierarki Approval SPPD</h4>
              <div className="space-y-4 relative">
                 <div className="absolute left-[31px] top-8 bottom-8 w-1 bg-gray-50"></div>
                 {[
                   { lvl: 1, name: 'Verifikasi Administrasi', role: 'OPERATOR' },
                   { lvl: 2, name: 'Otorisasi Substantif', role: 'PENYETUJU' }
                 ].map((step, i) => (
                   <div key={i} className="flex items-start space-x-6 relative z-10">
                      <div className="w-16 h-16 bg-blue-900 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg shrink-0">{step.lvl}</div>
                      <div className="flex-1 p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-white transition-all group">
                         <div className="flex justify-between items-center">
                            <h5 className="font-black text-gray-900">{step.name}</h5>
                            <Trash2 size={16} className="text-gray-300 opacity-0 group-hover:opacity-100 transition-all cursor-pointer" />
                         </div>
                         <p className="text-[10px] text-blue-600 font-bold uppercase mt-1">Role: {step.role}</p>
                      </div>
                   </div>
                 ))}
                 <button className="w-full py-4 border-2 border-dashed border-gray-100 rounded-2xl text-[10px] font-black text-gray-400 uppercase tracking-widest hover:border-blue-900 hover:text-blue-900 transition-all">+ Tambah Level Persetujuan</button>
              </div>
           </div>
        </div>

        <div className="space-y-6">
           <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8">
              <h4 className="font-black text-lg text-gray-900 flex items-center"><Hash className="mr-2" /> Penomoran Surat</h4>
              <div className="space-y-4">
                 <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Pola Nomor SPPD</label>
                    <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl font-mono text-xs font-bold" defaultValue="{SEQ}/SPPD/DISHUB/{YEAR}" />
                    <p className="text-[9px] text-emerald-600 font-bold uppercase mt-2">Next: 043/SPPD/DISHUB/2024</p>
                 </div>
              </div>
           </div>
           <div className="bg-indigo-900 text-white p-8 rounded-[3rem] shadow-xl">
              <Zap className="text-amber-400 mb-6" size={32} />
              <h4 className="text-xl font-black mb-2">Smart Workflow</h4>
              <p className="text-indigo-100 text-[10px] font-bold uppercase opacity-80 leading-relaxed">Sistem akan secara otomatis memindahkan antrean dokumen jika penyetuju utama tidak merespon dalam 24 jam (Auto-Escalation).</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionConfigPage;
