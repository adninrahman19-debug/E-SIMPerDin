
import React, { useState, useMemo } from 'react';
import { 
  Archive, 
  Search, 
  Filter, 
  Download, 
  FileText, 
  Calendar, 
  Layers, 
  ExternalLink, 
  Printer, 
  MoreHorizontal, 
  CheckCircle2, 
  ShieldCheck, 
  FileSearch,
  ChevronRight,
  Clock,
  MapPin,
  X,
  FileArchive,
  ArrowDownToLine,
  AlertCircle
} from 'lucide-react';
import { SPPDStatus } from '../../types';

const DigitalArchivePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedMonth, setSelectedMonth] = useState('ALL');

  // Mock data arsip SPPD (Data yang sudah disetujui atau diarsipkan)
  const archivedData = useMemo(() => [
    { id: '1', num: '090/SPPD/2023/512', date: '12 Des 2023', employee: 'Hendra Wijaya', unit: 'Bag. Umum', destination: 'Jakarta', totalCost: 4500000, status: SPPDStatus.APPROVED },
    { id: '2', num: '090/SPPD/2023/498', date: '05 Des 2023', employee: 'Siska Putri', unit: 'Teknis', destination: 'Bandung', totalCost: 2100000, status: SPPDStatus.ARCHIVED },
    { id: '3', num: '090/SPPD/2023/442', date: '20 Nov 2023', employee: 'Budi Santoso', unit: 'Humas', destination: 'Surabaya', totalCost: 3200000, status: SPPDStatus.APPROVED },
    { id: '4', num: '090/SPPD/2024/010', date: '15 Jan 2024', employee: 'Andi Pratama', unit: 'Sekretariat', destination: 'Medan', totalCost: 5500000, status: SPPDStatus.APPROVED },
    { id: '5', num: '090/SPPD/2024/088', date: '02 Feb 2024', employee: 'Dewi Lestari', unit: 'Teknis', destination: 'Bali', totalCost: 4800000, status: SPPDStatus.ARCHIVED },
    { id: '6', num: '090/SPPD/2024/112', date: '10 Mei 2024', employee: 'Siti Aminah', unit: 'Bag. Umum', destination: 'Semarang', totalCost: 1200000, status: SPPDStatus.APPROVED },
  ], []);

  const filteredData = archivedData.filter(row => {
    const matchesSearch = 
      row.num.toLowerCase().includes(searchTerm.toLowerCase()) || 
      row.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.destination.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesYear = row.date.includes(selectedYear);
    const matchesMonth = selectedMonth === 'ALL' || row.date.includes(selectedMonth);

    return matchesSearch && matchesYear && matchesMonth;
  });

  const handleDownload = (num: string) => {
    alert(`Mempersiapkan paket arsip digital (ZIP) untuk dokumen: ${num}\nStatus: Terverifikasi oleh Sistem.`);
  };

  const handleBulkDownload = () => {
    alert(`Mengunduh ${filteredData.length} berkas arsip terpilih dalam format ZIP kolektif.`);
  };

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center space-x-3 mb-1">
             <div className="p-2.5 bg-blue-900 text-white rounded-2xl shadow-xl">
                <Archive size={24} />
             </div>
             <h2 className="text-3xl font-black text-gray-900 tracking-tight">Gudang Arsip Digital</h2>
          </div>
          <p className="text-gray-500 text-sm font-medium">Pusat penyimpanan permanen dokumen perjalanan dinas yang telah disahkan.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleBulkDownload}
            className="bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-2xl hover:bg-gray-50 transition-all font-black text-xs uppercase tracking-widest flex items-center space-x-2 shadow-sm"
          >
            <Download size={18} />
            <span>Ekspor Kolektif</span>
          </button>
          <button className="bg-blue-900 text-white px-6 py-3 rounded-2xl hover:bg-blue-800 transition-all font-black text-xs uppercase tracking-widest flex items-center space-x-2 shadow-xl shadow-blue-900/20">
            <Printer size={18} />
            <span>Laporan Tahunan</span>
          </button>
        </div>
      </div>

      {/* Statistics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
         <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center space-x-5 group hover:border-blue-900/10 transition-all">
            <div className="w-14 h-14 bg-blue-50 text-blue-900 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
               <FileArchive size={28} />
            </div>
            <div>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Total File Arsip</p>
               <h4 className="text-2xl font-black text-gray-900">1,242 <span className="text-xs text-gray-400 font-bold uppercase tracking-tighter ml-1">Dokumen</span></h4>
            </div>
         </div>
         <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center space-x-5 group hover:border-emerald-900/10 transition-all">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
               <ShieldCheck size={28} />
            </div>
            <div>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Integritas Data</p>
               <h4 className="text-2xl font-black text-emerald-600 uppercase">100% Valid</h4>
            </div>
         </div>
         <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center space-x-5 group hover:border-amber-900/10 transition-all">
            <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
               <Calendar size={28} />
            </div>
            <div>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Cakupan Waktu</p>
               <h4 className="text-2xl font-black text-gray-900">2020 - 2024</h4>
            </div>
         </div>
      </div>

      {/* Advanced Filter & Search Area */}
      <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm mb-8 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
          <div className="lg:col-span-2 space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Pencarian Metadata</label>
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Cari No. SPPD, Nama Pegawai, atau Lokasi..."
                className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-[1.5rem] outline-none focus:ring-2 focus:ring-blue-900/10 font-bold text-gray-700 transition-all shadow-inner"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Tahun Anggaran</label>
            <div className="relative">
               <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
               <select 
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-[1.5rem] outline-none font-bold text-gray-700 appearance-none cursor-pointer shadow-inner"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
               >
                <option value="2024">TA 2024</option>
                <option value="2023">TA 2023</option>
                <option value="2022">TA 2022</option>
               </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Filter Bulan</label>
            <div className="relative">
               <Filter size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
               <select 
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-[1.5rem] outline-none font-bold text-gray-700 appearance-none cursor-pointer shadow-inner"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
               >
                <option value="ALL">Semua Bulan</option>
                <option value="Jan">Januari</option>
                <option value="Feb">Februari</option>
                <option value="Mei">Mei</option>
                <option value="Nov">November</option>
                <option value="Des">Desember</option>
               </select>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 p-10 opacity-[0.02] pointer-events-none">
           <Search size={200} />
        </div>
      </div>

      {/* Archive List Table */}
      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
        <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between bg-gray-50/30 gap-4">
           <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-900 text-white rounded-2xl flex items-center justify-center shadow-lg"><FileSearch size={24} /></div>
              <div>
                 <h4 className="text-xl font-black text-gray-900">Data Arsip Terverifikasi</h4>
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Tahun Anggaran {selectedYear} • {filteredData.length} Rekaman Ditemukan</p>
              </div>
           </div>
           <div className="flex items-center space-x-2">
              <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-widest border border-emerald-100">
                <ShieldCheck size={10} className="inline mr-1" /> Multi-Tenant Secured
              </span>
           </div>
        </div>

        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] text-gray-400 uppercase font-black tracking-[0.2em] border-b border-gray-100 bg-gray-50/10">
                <th className="px-10 py-6">Identitas & Tanggal</th>
                <th className="px-6 py-6">Pelaksana & Unit</th>
                <th className="px-6 py-6">Lokasi Tujuan</th>
                <th className="px-6 py-6">Realisasi Biaya</th>
                <th className="px-10 py-6 text-right">Opsi Arsip</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredData.length > 0 ? filteredData.map((row) => (
                <tr key={row.id} className="group hover:bg-blue-50/20 transition-all duration-300">
                  <td className="px-10 py-8">
                    <p className="font-mono text-xs font-black text-blue-900 leading-none">#{row.num}</p>
                    <div className="flex items-center mt-2 space-x-2 text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                       <Calendar size={10} />
                       <span>Selesai: {row.date}</span>
                    </div>
                  </td>
                  <td className="px-6 py-8">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-100 text-gray-400 rounded-xl flex items-center justify-center font-black text-xs group-hover:bg-blue-900 group-hover:text-white transition-colors">
                        {row.employee.charAt(0)}
                      </div>
                      <div>
                         <p className="text-sm font-black text-gray-800 leading-none">{row.employee}</p>
                         <p className="text-[9px] text-blue-600 font-bold uppercase mt-1 flex items-center">
                            <Layers size={10} className="mr-1" /> {row.unit}
                         </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-8">
                    <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black text-gray-600 bg-gray-100 uppercase tracking-widest group-hover:bg-white transition-colors">
                       <MapPin size={12} className="mr-2 text-blue-900" />
                       {row.destination}
                    </span>
                  </td>
                  <td className="px-6 py-8">
                    <p className="text-sm font-black text-gray-900">Rp {row.totalCost.toLocaleString('id-ID')}</p>
                    <p className="text-[8px] font-bold text-gray-400 uppercase mt-1">Verified Audit</p>
                  </td>
                  <td className="px-10 py-8 text-right">
                    <div className="flex items-center justify-end space-x-2">
                       <button className="p-3 text-gray-400 hover:text-blue-900 hover:bg-white rounded-2xl shadow-sm transition-all" title="Review Detail Metadata">
                         <ExternalLink size={20} />
                       </button>
                       <button 
                         onClick={() => handleDownload(row.num)}
                         className="p-3 text-emerald-600 hover:bg-emerald-50 rounded-2xl transition-all shadow-sm group-hover:scale-110" 
                         title="Unduh Paket Arsip (ZIP)"
                        >
                         <ArrowDownToLine size={20} />
                       </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="py-32 text-center">
                     <div className="max-w-xs mx-auto flex flex-col items-center">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                           <FileArchive size={40} className="text-gray-200" />
                        </div>
                        <h5 className="text-lg font-black text-gray-900">Arsip Tidak Ditemukan</h5>
                        <p className="text-sm text-gray-400 mt-2 font-medium">Coba sesuaikan kata kunci atau filter tahun anggaran Anda.</p>
                        <button onClick={() => { setSearchTerm(''); setSelectedYear('2024'); setSelectedMonth('ALL'); }} className="mt-6 text-xs font-black text-blue-900 uppercase tracking-widest flex items-center hover:underline">
                           <X size={14} className="mr-1" /> Reset Filter
                        </button>
                     </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Info */}
        <div className="p-10 bg-gray-50 border-t border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4 p-4 bg-white rounded-[1.5rem] border border-gray-200 shadow-sm">
            <ShieldCheck size={28} className="text-blue-900" />
            <div className="pr-4">
               <p className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Kepatuhan Kearsipan</p>
               <p className="text-[9px] text-gray-500 font-bold uppercase leading-tight">Seluruh berkas dienkripsi dengan standar AES-256 & disimpan sesuai regulasi kearsipan nasional.</p>
            </div>
          </div>
          <div className="flex items-center space-x-6">
             <button className="text-[10px] font-black text-gray-400 hover:text-blue-900 transition-colors uppercase tracking-[0.2em]">Halaman Sebelumnya</button>
             <div className="flex space-x-1.5">
                <button className="w-10 h-10 rounded-xl bg-blue-900 text-white font-black text-xs shadow-lg">1</button>
                <button className="w-10 h-10 rounded-xl bg-white border border-gray-200 text-gray-400 font-black text-xs hover:bg-gray-100 transition-all">2</button>
             </div>
             <button className="text-[10px] font-black text-gray-400 hover:text-blue-900 transition-colors uppercase tracking-[0.2em]">Halaman Berikutnya</button>
          </div>
        </div>
      </div>

      {/* Info Context Card */}
      <div className="mt-12 p-10 bg-gradient-to-br from-gray-900 to-blue-950 text-white rounded-[3.5rem] shadow-2xl relative overflow-hidden group">
         <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-12">
            <div className="max-w-2xl space-y-6">
               <div className="flex items-center space-x-4">
                  <div className="p-3 bg-white/10 rounded-2xl border border-white/5">
                     <AlertCircle size={28} className="text-amber-400" />
                  </div>
                  <h3 className="text-3xl font-black tracking-tight leading-tight">Retensi Data & Kepatuhan Audit</h3>
               </div>
               <p className="text-blue-100 text-base leading-relaxed opacity-80 font-medium italic">
                 "Data yang diarsipkan tidak dapat diubah kembali. Segala bentuk revisi setelah proses kearsipan harus melalui persetujuan Admin Instansi dan akan dicatat dalam Log Audit Khusus guna menjamin transparansi penggunaan anggaran negara."
               </p>
               <div className="flex items-center space-x-4 pt-4">
                  <div className="flex -space-x-3">
                     {[1,2,3].map(i => <div key={i} className="w-10 h-10 rounded-full border-2 border-blue-900 bg-gray-800 flex items-center justify-center font-black text-[10px]">A{i}</div>)}
                  </div>
                  <p className="text-[10px] font-bold text-blue-300 uppercase tracking-widest">Diverifikasi oleh 14 Tim Audit</p>
               </div>
            </div>
            <button className="bg-white text-blue-950 px-10 py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-blue-50 transition-all shadow-xl whitespace-nowrap flex items-center group">
               <span>Unduh Sertifikat Kearsipan</span>
               <ArrowDownToLine size={18} className="ml-2 group-hover:translate-y-1 transition-transform" />
            </button>
         </div>
         <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/5 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-1000"></div>
      </div>
    </div>
  );
};

export default DigitalArchivePage;
