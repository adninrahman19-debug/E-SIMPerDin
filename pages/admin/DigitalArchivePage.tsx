
import React, { useState } from 'react';
import { 
  Archive, 
  Search, 
  Filter, 
  Download, 
  FileText, 
  Calendar, 
  Users, 
  Layers, 
  ChevronRight, 
  ArrowUpRight,
  ShieldCheck,
  FileSearch,
  ExternalLink,
  Printer,
  MoreHorizontal,
  // Added missing CheckCircle2 import
  CheckCircle2
} from 'lucide-react';
import { SPPDStatus } from '../../types';

const DigitalArchivePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedMonth, setSelectedMonth] = useState('ALL');

  // Mock Archived Data
  const archivedData = [
    { id: '1', num: '090/SPPD/2023/512', date: '12 Des 2023', employee: 'Hendra Wijaya', unit: 'Bag. Umum', destination: 'Jakarta', totalCost: 4500000 },
    { id: '2', num: '090/SPPD/2023/498', date: '05 Des 2023', employee: 'Siska Putri', unit: 'Teknis', destination: 'Bandung', totalCost: 2100000 },
    { id: '3', num: '090/SPPD/2023/442', date: '20 Nov 2023', employee: 'Budi Santoso', unit: 'Humas', destination: 'Surabaya', totalCost: 3200000 },
    { id: '4', num: '090/SPPD/2023/410', date: '15 Nov 2023', employee: 'Andi Pratama', unit: 'Sekretariat', destination: 'Medan', totalCost: 5500000 },
    { id: '5', num: '090/SPPD/2023/388', date: '02 Nov 2023', employee: 'Dewi Lestari', unit: 'Teknis', destination: 'Bali', totalCost: 4800000 },
  ];

  const handleDownload = (num: string) => {
    alert(`Mempersiapkan unduhan file ZIP untuk dokumen: ${num}\nTermasuk: SPPD, Surat Tugas, & Bukti Riil.`);
  };

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center space-x-3 mb-1">
             <div className="p-2 bg-blue-900 text-white rounded-lg shadow-lg">
                <Archive size={20} />
             </div>
             <h2 className="text-3xl font-black text-gray-900 tracking-tight">Arsip Digital SPPD</h2>
          </div>
          <p className="text-gray-500 text-sm font-medium">Pusat penyimpanan dokumen perjalanan dinas yang telah selesai dan divalidasi.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-all font-bold text-sm flex items-center space-x-2 shadow-sm">
            <Printer size={18} />
            <span>Cetak Rekap Tahunan</span>
          </button>
        </div>
      </div>

      {/* Statistics Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
         <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-900 rounded-2xl flex items-center justify-center">
               <FileText size={24} />
            </div>
            <div>
               <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Total Dokumen Arsip</p>
               <h4 className="text-xl font-black text-gray-900">1,242 <span className="text-xs text-gray-400">Files</span></h4>
            </div>
         </div>
         <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
               <ShieldCheck size={24} />
            </div>
            <div>
               <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Integritas Data</p>
               <h4 className="text-xl font-black text-indigo-600">100% Secure</h4>
            </div>
         </div>
         <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
               <Calendar size={24} />
            </div>
            <div>
               <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Rentang Waktu</p>
               <h4 className="text-xl font-black text-gray-900">2020 - 2024</h4>
            </div>
         </div>
      </div>

      {/* Control Bar */}
      <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Pencarian Dokumen</label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Cari No. SPPD, Nama Pegawai, atau Kota Tujuan..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-900/10 font-bold text-gray-700 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Tahun Anggaran</label>
            <select 
              className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold text-gray-700 appearance-none"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Bulan</label>
            <select 
              className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold text-gray-700 appearance-none"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option value="ALL">Semua Bulan</option>
              <option value="01">Januari</option>
              <option value="02">Februari</option>
              <option value="11">November</option>
              <option value="12">Desember</option>
            </select>
          </div>
        </div>
      </div>

      {/* Archive List Table */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
          <div className="flex items-center space-x-3">
             <FileSearch size={24} className="text-blue-900" />
             <div>
                <h4 className="text-xl font-black text-gray-900">Data Arsip Permanen</h4>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Menampilkan rekaman tahun anggaran {selectedYear}</p>
             </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] text-gray-400 uppercase font-black tracking-[0.2em] border-b border-gray-100 bg-gray-50/50">
                <th className="px-8 py-5">No. SPPD & Tanggal</th>
                <th className="px-6 py-5">Pegawai & Unit</th>
                <th className="px-6 py-5">Tujuan Perjalanan</th>
                <th className="px-6 py-5">Realisasi Biaya</th>
                <th className="px-8 py-5 text-right">Aksi Arsip</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {archivedData.map((row) => (
                <tr key={row.id} className="group hover:bg-blue-50/20 transition-all duration-300">
                  <td className="px-8 py-6">
                    <p className="font-mono text-xs font-black text-blue-900">{row.num}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase mt-1 flex items-center">
                      <Calendar size={10} className="mr-1.5" /> {row.date}
                    </p>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 bg-gray-100 text-gray-400 rounded-xl flex items-center justify-center font-black text-xs group-hover:bg-blue-900 group-hover:text-white transition-colors">
                        {row.employee.charAt(0)}
                      </div>
                      <div>
                         <p className="text-sm font-bold text-gray-800 leading-tight">{row.employee}</p>
                         <p className="text-[10px] text-gray-400 font-bold uppercase mt-1 flex items-center">
                            <Layers size={10} className="mr-1" /> {row.unit}
                         </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className="text-xs font-black text-gray-600 bg-gray-100 px-3 py-1 rounded-full uppercase tracking-tighter">{row.destination}</span>
                  </td>
                  <td className="px-6 py-6 font-black text-gray-900">
                    Rp {row.totalCost.toLocaleString('id-ID')}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end space-x-2">
                       <button className="p-2 text-gray-400 hover:text-blue-900 hover:bg-white rounded-xl shadow-sm transition-all" title="Lihat Detail">
                         <ExternalLink size={18} />
                       </button>
                       <button 
                         onClick={() => handleDownload(row.num)}
                         className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all" 
                         title="Unduh Paket Dokumen"
                        >
                         <Download size={18} />
                       </button>
                       <button className="p-2 text-gray-400 hover:text-gray-900 transition-all">
                         <MoreHorizontal size={18} />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-8 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center space-x-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">
            <Archive size={16} className="text-blue-900" />
            <span>Dokumen dienkripsi & tersimpan permanen sesuai regulasi kearsipan RI.</span>
          </div>
          <div className="flex items-center space-x-4">
             <button className="text-xs font-black text-gray-400 hover:text-blue-900 transition-colors">Sebelumnya</button>
             <div className="flex space-x-1">
                <button className="w-8 h-8 rounded-lg bg-blue-900 text-white font-black text-xs">1</button>
                <button className="w-8 h-8 rounded-lg bg-white border border-gray-100 text-gray-400 font-black text-xs hover:bg-gray-50">2</button>
             </div>
             <button className="text-xs font-black text-gray-400 hover:text-blue-900 transition-colors">Berikutnya</button>
          </div>
        </div>
      </div>

      {/* Advanced Filter Modal Placeholder */}
      <div className="mt-10 p-10 bg-indigo-900 text-white rounded-[3rem] shadow-2xl relative overflow-hidden group">
         <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
               <h3 className="text-3xl font-black mb-4 tracking-tight leading-tight">Pencarian Lanjutan Berbasis Metadata</h3>
               <p className="text-indigo-100 text-sm leading-relaxed opacity-80 font-medium mb-8">
                 Cari dokumen berdasarkan kode anggaran, eselon pegawai, atau kategori transportasi tertentu untuk kebutuhan audit Inspektorat atau BPK.
               </p>
               <button className="bg-white text-indigo-900 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-50 transition-all shadow-xl">
                  Buka Filter Lanjutan
               </button>
            </div>
            <div className="bg-white/10 rounded-[2rem] p-8 border border-white/10 backdrop-blur-sm">
               <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                     <span className="text-[10px] font-black uppercase text-indigo-300">Total Ukuran Arsip</span>
                     <span className="text-lg font-black tracking-tighter">4.2 GB</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                     <span className="text-[10px] font-black uppercase text-indigo-300">Format Dokumen</span>
                     <span className="text-lg font-black tracking-tighter">PDF/A-1</span>
                  </div>
                  <div className="flex items-center justify-between">
                     <span className="text-[10px] font-black uppercase text-indigo-300">Status Backup</span>
                     <div className="flex items-center text-emerald-400 text-xs font-black">
                        <CheckCircle2 size={14} className="mr-1.5" /> REPLICATED
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default DigitalArchivePage;
