
import React from 'react';
import { PlusCircle, FileEdit, Clock, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const OperatorDashboard = () => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-blue-600 p-6 rounded-2xl text-white shadow-xl">
        <PlusCircle className="mb-4" />
        <p className="text-[10px] font-black uppercase opacity-80">Input Hari Ini</p>
        <h3 className="text-3xl font-black">8 Baru</h3>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <FileEdit className="text-indigo-600 mb-4" />
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">SPPD Draft</p>
        <h3 className="text-2xl font-black">14 Dokumen</h3>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <Clock className="text-amber-500 mb-4" />
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Di Antrean</p>
        <h3 className="text-2xl font-black">21 Dokumen</h3>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <AlertTriangle className="text-red-600 mb-4" />
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Perlu Atensi</p>
        <h3 className="text-2xl font-black text-red-600">5 Dokumen</h3>
      </div>
    </div>
    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 text-center">
       <div className="max-w-md mx-auto space-y-4">
          <FileEdit size={48} className="mx-auto text-gray-200" />
          <h4 className="text-xl font-black">Pekerjaan Berjalan</h4>
          <p className="text-gray-500 text-sm">Anda saat ini memiliki 3 dokumen yang sedang dalam tahap revisi pimpinan. Segera periksa detailnya.</p>
          <Link to="/sppd" className="inline-block bg-blue-900 text-white px-8 py-3 rounded-xl font-bold uppercase text-xs tracking-widest">Kelola Antrean</Link>
       </div>
    </div>
  </div>
);

export default OperatorDashboard;
