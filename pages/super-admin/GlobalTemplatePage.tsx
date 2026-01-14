
import React from 'react';
import { FileCode, Plus, Lock, Globe, FileText, Layout, Copy, ShieldCheck } from 'lucide-react';
import { MOCK_TEMPLATES } from '../../constants';

const GlobalTemplatePage: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Standardisasi Naskah Dinas</h2>
          <p className="text-gray-500 text-sm font-medium">Kelola template SPPD dan Surat Tugas baku yang berlaku secara nasional.</p>
        </div>
        <button className="bg-blue-900 text-white px-6 py-3 rounded-xl flex items-center space-x-2 font-bold shadow-lg">
          <Plus size={18} />
          <span>Tambah Template Master</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {MOCK_TEMPLATES.filter(t => t.institutionId === 'GLOBAL').map((template) => (
          <div key={template.id} className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col group hover:shadow-xl transition-all">
            <div className="p-10">
               <div className="flex items-start justify-between mb-8">
                  <div className="w-16 h-16 bg-blue-50 text-blue-900 rounded-2xl flex items-center justify-center shadow-inner">
                     <FileText size={32} />
                  </div>
                  <div className="flex space-x-1">
                     <button className="p-2 text-gray-400 hover:text-blue-900"><Copy size={18} /></button>
                     <button className="p-2 text-gray-400 hover:text-red-600"><Lock size={18} /></button>
                  </div>
               </div>
               <h3 className="text-2xl font-black text-gray-900 tracking-tight leading-tight mb-4">{template.name}</h3>
               <p className="text-gray-500 text-sm font-medium leading-relaxed mb-10">{template.description}</p>
               <div className="flex items-center space-x-6 pt-6 border-t border-gray-50">
                  <div>
                     <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Version</p>
                     <p className="text-xs font-bold text-gray-800">v{template.version}.0</p>
                  </div>
                  <div>
                     <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Status</p>
                     <p className="text-xs font-bold text-emerald-600 uppercase tracking-tighter">Default Global</p>
                  </div>
               </div>
            </div>
            <button className="w-full py-5 bg-gray-900 text-white font-black text-xs uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center space-x-2">
               <FileCode size={16} /> <span>Open Master Editor</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GlobalTemplatePage;
