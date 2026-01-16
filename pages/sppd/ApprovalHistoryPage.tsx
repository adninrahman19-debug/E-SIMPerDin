
import React, { useState, useMemo } from 'react';
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
  X,
  FileArchive,
  ArrowDownToLine,
  ShieldCheck,
  Table as TableIcon,
  BarChart3,
  // Added missing imports for Clock and MoreHorizontal
  Clock,
  MoreHorizontal
} from 'lucide-react';
import { SPPDStatus } from '../../types';

const ApprovalHistoryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('05');
  const [selectedYear, setSelectedYear] = useState('2024');

  // Mock data khusus SPPD yang sudah diproses oleh pimpinan (Approved & Rejected/Revision)
  const approvedHistory = useMemo(() => [
    { id: '1', num: '090/SPPD/2024/001', date: '12 Mei 2024', employee: 'Andi Pratama', unit: 'Sekretariat', destination: 'Bandung', purpose: 'Koordinasi Penataan Jalur Sepeda', cost: 2450000, approvalTime: '12 Mei, 14:00', status: SPPDStatus.APPROVED },
    { id: '2', num: '090/SPPD/2024/015', date: '10 Mei 2024', employee: 'Siti Aminah', unit: 'Bid. Angkutan', destination: 'Jakarta', purpose: 'Konsultasi Perizinan Trayek', cost: 4200000, approvalTime: '10 Mei, 10:30', status: SPPDStatus.APPROVED },
    { id: '3', num: '090/SPPD/2024/022', date: '05 Mei 2024', employee: 'Budi Raharjo', unit: 'Bid. Lalu Lintas', destination: 'Surabaya', purpose: 'Survey Lokasi Halte', cost: 3100000, approvalTime: '05 Mei, 16:45', status: SPPDStatus.APPROVED },
    { id: '4', num: '090/SPPD/2024/028', date: '02 Mei 2024', employee: 'Dewi Lestari', unit: 'Sekretariat', destination: 'Medan', purpose: 'Rapat Persiapan Lebaran', cost: 5800000, approvalTime: '02 Mei, 09:15', status: SPPDStatus.APPROVED },
    { id: '5', num: '090/SPPD/2024/030', date: '28 Apr 2024', employee: 'Hendra Wijaya', unit: 'Umum', destination: 'Bali', purpose: 'Studi Banding Pengelolaan Aset', cost: 7200000, approvalTime: '28 Apr, 11:00', status: SPPDStatus.APPROVED },
  ], []);

  const filteredHistory = approvedHistory.filter(item => {
    const matchesSearch = item.num.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.employee.toLowerCase().includes(searchTerm.toLowerCase());
    const itemMonth = item.date.includes('Mei') ? '05' : item.date.includes('Apr') ? '04' : '';
    const matchesMonth = selectedMonth === 'ALL' || itemMonth === selectedMonth;
    
    return matchesSearch && matchesMonth;
  });

  const totalCost = filteredHistory.reduce((acc, curr) => acc + curr.cost, 0);

  const handleDownloadBulk = () => {
    alert(`Mengunduh rekapitulasi ${filteredHistory.length} dokumen periode ${selectedMonth}/${selectedYear} dalam format XLSX.`);
  };

  const handleDownloadSingle = (num: string) => {
    alert(`Mengunduh salinan digital SPPD resmi #${num} (E-Signed PDF).`);
  };

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center space-x-3 mb-1">
             <div className="p-2.5 bg-blue-900 text-white rounded-2xl shadow-xl">
                <History size={24} />
             </div>
             <h2 className="text-3xl font-black text-gray-900 tracking-tight">Riwayat Persetujuan Pimpinan</h2>
          </div>
          <p className="text-gray-500 text-sm font-medium">Monitoring dan rekapitulasi seluruh keputusan otorisasi perjalanan dinas Anda.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleDownloadBulk}
            className="bg-white border border-gray-200 text-emerald-700 px-6 py-3 rounded-2xl hover:bg-emerald-50 transition-all font-black text-xs uppercase tracking-widest flex items-center space-x-2 shadow-sm"
          >
            <TableIcon size={18} />
            <span>Rekap Excel</span>
          </button>
          <button 
            onClick={() => window.print()}
            className="bg-blue-900 text-white px-6 py-3 rounded-2xl hover:bg-blue-800 transition-all font-black text-xs uppercase tracking-widest flex items-center space-x-2 shadow-xl shadow-blue-900/20"
          >
            <Printer size={18} />
            <span>Cetak PDF</span>
          </button>
        </div>
      </div>

      {/* REKAPITULASI SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
         <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col justify-between group hover:border-blue-900/10 transition-all">
            <div className="flex items-center justify-between mb-6">
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total SPPD Disetujui</p>
               <CheckCircle2 size={20} className="text-emerald-500" />
            </div>
            <div>
               <h4 className="text-3xl font-black text-gray-900">{filteredHistory.length} <span className="text-xs text-gray-400 uppercase">Berkas</span></h4>
               <p className="text-[9px] font-bold text-emerald-600 mt-2 flex items-center">
                  <TrendingUp size={12} className="mr-1" /> +12% dari bulan lalu
               </p>
            </div>
         </div>
         <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col justify-between group hover:border-blue-900/10 transition-all">
            <div className="flex items-center justify-between mb-6">
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Nilai Otorisasi Biaya</p>
               <Wallet size={20} className="text-blue-900" />
            </div>
            <div>
               <h4 className="text-3xl font-black text-blue-900">Rp {(totalCost / 1000000).toFixed(1)} <span className="text-xs uppercase">Juta</span></h4>
               <p className="text-[9px] font-bold text-gray-400 mt-2 uppercase tracking-tighter">Akumulasi Periode Terpilih</p>
            </div>
         </div>
         <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col justify-between group hover:border-blue-900/10 transition-all">
            <div className="flex items-center justify-between mb-6">
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Personel Diberangkatkan</p>
               <Users size={20} className="text-indigo-600" />
            </div>
            <div>
               <h4 className="text-3xl font-black text-gray-900">{filteredHistory.length} <span className="text-xs text-gray-400 uppercase">Orang</span></h4>
               <p className="text-[9px] font-bold text-gray-400 mt-2 uppercase tracking-tighter">Seluruh Unit Kerja</p>
            </div>
         </div>
         <div className="bg-blue-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
            <div className="relative z-10">
               <p className="text-[10px] font-black text-blue-300 uppercase tracking-widest mb-6">Efisiensi Otoritas</p>
               <h4 className="text-3xl font-black">94%</h4>
               <div className="mt-2 flex items-center space-x-2 text-[10px] font-bold text-blue-200">
                  {/* Fixed error: Clock missing from imports */}
                  <Clock size={12} />
                  <span>Avg: 1.2 Jam / Berkas</span>
               </div>
            </div>
            <BarChart3 className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform" size={100} />
         </div>
      </div>

      {/* FILTER PERIOD TOOLBAR */}
      <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm mb-8 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
          <div className="lg:col-span-2 space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Cari Nama / No. SPPD</label>
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Misal: Andi Pratama atau 090/SPPD/..."
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
               </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Bulan Persetujuan</label>
            <div className="relative">
               <Filter size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
               <select 
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-[1.5rem] outline-none font-bold text-gray-700 appearance-none cursor-pointer shadow-inner"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
               >
                <option value="ALL">Seluruh Bulan</option>
                <option value="05">Mei (Aktif)</option>
                <option value="04">April</option>
                <option value="03">Maret</option>
               </select>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 p-10 opacity-[0.02] pointer-events-none">
           <FileSearch size={200} />
        </div>
      </div>

      {/* HISTORY TABLE */}
      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
        <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between bg-gray-50/30 gap-4">
           <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-900 text-white rounded-2xl flex items-center justify-center shadow-lg"><FileSearch size={24} /></div>
              <div>
                 <h4 className="text-xl font-black text-gray-900">Rekapitulasi Persetujuan Anda</h4>
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Ditemukan {filteredHistory.length} rekaman data valid</p>
              </div>
           </div>
           <div className="flex items-center space-x-2">
              <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-widest border border-emerald-100">
                <ShieldCheck size={10} className="inline mr-1" /> Digital Hash Integrity
              </span>
           </div>
        </div>

        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] text-gray-400 uppercase font-black tracking-[0.2em] border-b border-gray-100 bg-gray-50/10">
                <th className="px-10 py-6">No. SPPD & Tanggal</th>
                <th className="px-6 py-6">Pelaksana & Unit</th>
                <th className="px-6 py-6">Maksud & Tujuan</th>
                <th className="px-6 py-6">Biaya Otoritas</th>
                <th className="px-10 py-6 text-right">Opsi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredHistory.length > 0 ? filteredHistory.map((row) => (
                <tr key={row.id} className="group hover:bg-blue-50/20 transition-all duration-300">
                  <td className="px-10 py-8">
                    <p className="font-mono text-xs font-black text-blue-900 leading-none">#{row.num}</p>
                    <div className="flex items-center mt-2 space-x-2 text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                       <Calendar size={10} />
                       <span>Diajukan: {row.date}</span>
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
                            {row.unit}
                         </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-8">
                    <p className="text-xs font-bold text-gray-600 italic line-clamp-1">"{row.purpose}"</p>
                    <div className="flex items-center mt-2 space-x-2 text-[10px] font-black text-gray-400 uppercase">
                       <ArrowUpRight size={12} className="text-blue-900" />
                       <span>{row.destination}</span>
                    </div>
                  </td>
                  <td className="px-6 py-8">
                    <p className="text-sm font-black text-gray-900">Rp {row.cost.toLocaleString('id-ID')}</p>
                    <p className="text-[8px] font-bold text-emerald-600 uppercase mt-1 flex items-center">
                       <CheckCircle2 size={10} className="mr-1" /> Approved {row.approvalTime}
                    </p>
                  </td>
                  <td className="px-10 py-8 text-right">
                    <div className="flex items-center justify-end space-x-2">
                       <button 
                         onClick={() => handleDownloadSingle(row.num)}
                         className="p-3 text-gray-400 hover:text-blue-900 hover:bg-white rounded-2xl shadow-sm transition-all" 
                         title="Unduh PDF Resmi"
                        >
                         <Download size={20} />
                       </button>
                       <button className="p-3 text-gray-400 hover:text-gray-900 hover:bg-white rounded-2xl shadow-sm transition-all">
                         {/* Fixed error: MoreHorizontal missing from imports */}
                         <MoreHorizontal size={20} />
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
                        <h5 className="text-lg font-black text-gray-900">Tidak Ada Data</h5>
                        <p className="text-sm text-gray-400 mt-2 font-medium">Belum ada riwayat persetujuan pada periode yang Anda pilih.</p>
                     </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-10 bg-gray-50 border-t border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4 p-4 bg-white rounded-[1.5rem] border border-gray-200 shadow-sm">
            <ShieldCheck size={28} className="text-blue-900" />
            <div className="pr-4">
               <p className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Akuntabilitas Pimpinan</p>
               <p className="text-[9px] text-gray-500 font-bold uppercase leading-tight">Seluruh keputusan Anda terekam dalam ledger audit sistem dan dilindungi enkripsi AES-256.</p>
            </div>
          </div>
          <div className="flex items-center space-x-6">
             <button className="text-[10px] font-black text-gray-400 hover:text-blue-900 transition-colors uppercase tracking-[0.2em]">Sebelumnya</button>
             <div className="flex space-x-1.5">
                <button className="w-10 h-10 rounded-xl bg-blue-900 text-white font-black text-xs shadow-lg">1</button>
                <button className="w-10 h-10 rounded-xl bg-white border border-gray-200 text-gray-400 font-black text-xs hover:bg-gray-100 transition-all">2</button>
             </div>
             <button className="text-[10px] font-black text-gray-400 hover:text-blue-900 transition-colors uppercase tracking-[0.2em]">Berikutnya</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApprovalHistoryPage;
