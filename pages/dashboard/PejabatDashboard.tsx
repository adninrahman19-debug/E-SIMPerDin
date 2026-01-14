
import React from 'react';
import { Clock, CheckCircle, XCircle, FileText, History } from 'lucide-react';
import { Link } from 'react-router-dom';

const PejabatDashboard = () => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="bg-amber-500 p-8 rounded-3xl text-white shadow-xl shadow-amber-500/20">
        <Clock className="mb-4" />
        <p className="text-xs font-black uppercase opacity-80">Butuh TTD</p>
        <h3 className="text-4xl font-black">12 SPPD</h3>
      </div>
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <CheckCircle className="text-emerald-600 mb-4" />
        <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Disetujui (Mei)</p>
        <h3 className="text-3xl font-black">142 Dok</h3>
      </div>
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <XCircle className="text-red-600 mb-4" />
        <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Ditolak/Revisi</p>
        <h3 className="text-3xl font-black">8 Dok</h3>
      </div>
    </div>
    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
       <div className="p-8 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
          <div className="flex items-center space-x-3">
             <FileText className="text-amber-500" />
             <h4 className="text-xl font-black">Antrean Otorisasi</h4>
          </div>
          <Link to="/sppd" className="text-[10px] font-black text-blue-900 uppercase">Lihat Semua</Link>
       </div>
       <div className="p-12 text-center text-gray-400">
          <History size={48} className="mx-auto mb-4 opacity-20" />
          <p className="font-bold uppercase text-xs tracking-widest">Tidak ada antrean mendesak</p>
       </div>
    </div>
  </div>
);

export default PejabatDashboard;
