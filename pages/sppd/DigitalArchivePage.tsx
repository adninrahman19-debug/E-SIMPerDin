
import React, { useState } from 'react';
import { 
  Archive, Search, Filter, Download, FileText, Calendar, Layers, ExternalLink, Printer, MoreHorizontal, CheckCircle2, ShieldCheck, FileSearch
} from 'lucide-react';

const DigitalArchivePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center space-x-3 mb-1">
             <div className="p-2 bg-blue-900 text-white rounded-lg shadow-lg"><Archive size={20} /></div>
             <h2 className="text-3xl font-black text-gray-900 tracking-tight">Gudang Arsip Digital</h2>
          </div>
          <p className="text-gray-500 text-sm font-medium">Koleksi seluruh dokumen perjalanan dinas yang telah tervalidasi dan selesai.</p>
        </div>
        <button className="bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-50 transition-all font-black text-xs uppercase flex items-center space-x-2 shadow-sm">
          <Printer size={18} /> <span>Export Laporan Arsip</span>
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between">
           <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Cari No. SPPD atau Nama Pegawai..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-900/10 font-bold"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>
           <div className="flex items-center space-x-2">
              <button className="p-2.5 bg-white text-gray-400 border border-gray-100 rounded-xl hover:text-blue-900"><Filter size={18} /></button>
           </div>
        </div>
        <div className="p-20 text-center text-gray-300 font-bold uppercase text-xs tracking-widest">
           Belum ada arsip untuk ditampilkan...
        </div>
      </div>
    </div>
  );
};

export default DigitalArchivePage;
