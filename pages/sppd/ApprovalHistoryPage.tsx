
import React, { useState } from 'react';
import { 
  History, 
  Search, 
  Filter, 
  Download, 
  Calendar, 
  FileText, 
  CheckCircle2, 
  ChevronRight, 
  Printer, 
  FileSearch,
  ArrowUpRight,
  TrendingUp,
  Wallet,
  Users,
  X
} from 'lucide-react';
import { SPPDStatus } from '../../types';

const ApprovalHistoryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('05');
  const [selectedYear, setSelectedYear] = useState('2024');

  // Mock data khusus SPPD yang sudah disetujui pimpinan
  const approvedHistory = [
    { id: '1', num: '090/SPPD/2024/001', date: '12 Mei 2024', employee: 'Andi Pratama', unit: 'Sekretariat', destination: 'Bandung', purpose: 'Koordinasi Penataan Jalur Sepeda', cost: 2450000, approvalTime: '12 Mei, 14:00' },
    { id: '2', num: '090/SPPD/2024/015', date: '10 Mei 2024', employee: 'Siti Aminah', unit: 'Bid. Angkutan', destination: 'Jakarta', purpose: 'Konsultasi Perizinan Trayek', cost: 4200000, approvalTime: '10 Mei, 10:30' },
    { id: '3', num: '090/SPPD/2024/022', date: '05 Mei 2024', employee: 'Budi Raharjo', unit: 'Bid. Lalu Lintas', destination: 'Surabaya', purpose: 'Survey Lokasi Halte', cost: 3100000, approvalTime: '05 Mei, 16:45' },
    { id: '4', num: '090/SPPD/2024/028', date: '02 Mei 2024', employee: 'Dewi Lestari', unit: 'Sekretariat', destination: 'Medan', purpose: 'Rapat Persiapan Lebaran', cost: 5800000, approvalTime: '02 Mei, 09:15' },
  ];

  const handleDownloadRekap = () => {
    alert(`Mengunduh Rekapitulasi Persetujuan Periode ${selectedMonth}-${selectedYear} (Format PDF)...`);
  };

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center space-x-3 mb-1">
             <div className="p-2 bg-emerald-600 text-white rounded-lg shadow-lg">
                <History size={20} />
             </div>
             <h2 className="text-3xl font-black text-gray-900 tracking-tight">Riwayat Persetujuan</h2>
          </div>
          <p className="text-gray-500 text-sm font-medium">Rekapitulasi dokumen perjalanan dinas yang telah Anda tanda tangani.</p>
        </div>
        <button 
          onClick={handleDownloadRekap}
          className="bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-50 transition-all font-black text-xs uppercase tracking-widest flex items-center space-x-2 shadow-sm"
        >
          <Printer size={18} />
          <span>Cetak Rekap Bulanan</span>
        </button>
      </div>

      {/* Summary Stats khusus Pimpinan */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
         <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
               <CheckCircle2 size={24} />
            </div>
            <div>
               <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Disetujui Bulan Ini</p>
               <h4 className="text-xl font-black text-gray-900">42 Dokumen</h4>
            </div>
         </div>
         <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
               <Wallet size={24} />
            </div>
            <div>
               <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Total Otorisasi Biaya</p>
               <h4 className="text-xl font-black text-blue-900">Rp 124.5 Jt</h4>
            </div>
         </div>
         <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
               <Users size={24} />
            </div>
            <div>
               <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Jumlah Personel Dinas</p>
               <h4 className="text-xl font-black text-gray-900">18 Pegawai</h4>
            </div>
         </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Pencarian Cepat</label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Cari No. SPPD atau Nama Pegawai..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-900/10 font-bold text-gray-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Bulan</label>
            <select 
              className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold text-gray-700 appearance-none"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option value="01">Januari</option>
              <option value="02">Februari</option>
              <option value="05">Mei</option>
              {/* Tambahkan bulan lainnya sesuai kebutuhan */}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Tahun</label>
            <select 
              className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold text-gray-700 appearance-none"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>
          </div>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
          <div className="flex items-center space-x-3">
             <FileSearch size={24} className="text-emerald-600" />
             <div>
                <h4 className="text-xl font-black text-gray-900">Daftar Dokumen Disetujui</h4>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Data Periode: Mei 2024</p>
             </div>
          </div>
          <button className="text-[10px] font-black text-blue-900 uppercase tracking-widest hover:underline flex items-center">
             Download Semua (ZIP) <Download size={14} className="ml-1.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] text-gray-400 uppercase font-black tracking-[0.2em] border-b border-gray-100 bg-gray-50/50">
                <th className="px-8 py-5">Dokumen & Waktu Approval</th>
                <th className="px-6 py-5">Pegawai & Tujuan</th>
                <th className="px-6 py-5">Maksud Perjalanan</th>
                <th className="px-6 py-5 text-right">Biaya Otoritas</th>
                <th className="px-8 py-5 text-right">Aksi Berkas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {approvedHistory.map((row) => (
                <tr key={row.id} className="group hover:bg-emerald-50/20 transition-all duration-300">
                  <td className="px-8 py-6">
                    <p className="font-mono text-xs font-black text-blue-900">{row.num}</p>
                    <p className="text-[9px] text-emerald-600 font-bold uppercase mt-1 flex items-center">
                      <CheckCircle2 size={10} className="mr-1" /> Approved: {row.approvalTime}
                    </p>
                  </td>
                  <td className="px-6 py-6">
                    <div>
                       <p className="text-sm font-bold text-gray-800 leading-tight">{row.employee}</p>
                       <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">{row.destination}</p>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <p className="text-xs font-medium text-gray-600 line-clamp-1 italic">"{row.purpose}"</p>
                  </td>
                  <td className="px-6 py-6 text-right">
                    <p className="text-sm font-black text-gray-900">Rp {row.cost.toLocaleString('id-ID')}</p>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end space-x-2">
                       <button className="p-2 text-gray-400 hover:text-blue-900 hover:bg-white rounded-xl shadow-sm transition-all" title="Lihat Berkas">
                         <FileText size={18} />
                       </button>
                       <button className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-white rounded-xl shadow-sm transition-all" title="Download PDF">
                         <Download size={18} />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-8 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest">
           <span>Menampilkan {approvedHistory.length} rekaman persetujuan</span>
           <div className="flex space-x-4">
              <button className="hover:text-blue-900">Halaman Sebelumnya</button>
              <button className="hover:text-blue-900">Halaman Berikutnya</button>
           </div>
        </div>
      </div>
      
      {/* Info Box Footer */}
      <div className="mt-8 p-6 bg-blue-900 text-white rounded-[2.5rem] relative overflow-hidden">
         <div className="relative z-10 flex items-center space-x-4">
            <TrendingUp size={32} className="text-amber-400 shrink-0" />
            <div>
               <h5 className="font-black uppercase text-xs tracking-widest">Efisiensi Birokrasi</h5>
               <p className="text-[11px] text-blue-100 font-bold leading-relaxed opacity-80">Rata-rata waktu persetujuan Anda bulan ini adalah <span className="text-amber-400">1.2 jam</span> per dokumen. Ini adalah peningkatan 15% dari bulan sebelumnya.</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default ApprovalHistoryPage;
