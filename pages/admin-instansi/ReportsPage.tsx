
import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Cell, PieChart, Pie, AreaChart, Area 
} from 'recharts';
import { 
  BarChart3, 
  Download, 
  Printer, 
  Table as TableIcon, 
  Calendar, 
  Search, 
  Filter, 
  Clock, 
  AlertCircle, 
  PieChart as PieIcon, 
  TrendingUp,
  FileSearch,
  Users,
  Briefcase,
  ChevronRight,
  ShieldCheck,
  RefreshCw,
  FileText,
  ArrowDownToLine
} from 'lucide-react';
import { MOCK_USERS } from '../../constants';

const dataMonthly = [
  { name: 'Jan', cost: 12400000 }, { name: 'Feb', cost: 15600000 }, { name: 'Mar', cost: 9800000 }, 
  { name: 'Apr', cost: 24500000 }, { name: 'Mei', cost: 18200000 }, { name: 'Jun', cost: 14000000 },
];

const dataDist = [
  { name: 'Koordinasi', value: 45 }, 
  { name: 'Diklat/Bimtek', value: 30 }, 
  { name: 'Konsultasi', value: 15 }, 
  { name: 'Lainnya', value: 10 }
];

const COLORS = ['#1e3a8a', '#4f46e5', '#10b981', '#f59e0b'];

const ReportsPage: React.FC = () => {
  const [reportType, setReportType] = useState<'PERIOD' | 'EMPLOYEE' | 'ACTIVITY'>('PERIOD');
  const [isExporting, setIsExporting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleExport = (format: 'PDF' | 'EXCEL') => {
    setIsExporting(true);
    setTimeout(() => {
      alert(`Laporan Rekapitulasi format ${format} berhasil dibuat dan diunduh.`);
      setIsExporting(false);
    }, 2000);
  };

  // Mock data rekapitulasi table
  const tableData = [
    { id: '1', num: '090/SPPD/2024/001', employee: 'Andi Pratama', activity: 'Rapat Koordinasi Teknis', date: '12-05-2024', cost: 2450000 },
    { id: '2', num: '090/SPPD/2024/015', employee: 'Siti Aminah', activity: 'Bimtek Kearsipan Digital', date: '15-05-2024', cost: 3200000 },
    { id: '3', num: '090/SPPD/2024/022', employee: 'Budi Raharjo', activity: 'Konsultasi DIPA 2025', date: '20-05-2024', cost: 1850000 },
    { id: '4', num: '090/SPPD/2024/042', employee: 'Dewi Lestari', activity: 'Monitoring Lapangan Tahap I', date: '25-05-2024', cost: 4100000 },
  ];

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      {/* Header & Global Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">Laporan & Rekapitulasi</h2>
          <p className="text-gray-500 text-sm font-medium mt-1">Instrumen transparansi dan akuntabilitas biaya perjalanan dinas.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => handleExport('EXCEL')}
            disabled={isExporting}
            className="bg-white border border-gray-100 text-emerald-700 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center space-x-3 shadow-sm hover:bg-emerald-50 transition-all disabled:opacity-50"
          >
            {isExporting ? <RefreshCw className="animate-spin" size={16} /> : <TableIcon size={16} />}
            <span>Export Excel</span>
          </button>
          <button 
            onClick={() => handleExport('PDF')}
            disabled={isExporting}
            className="bg-blue-900 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center space-x-3 shadow-xl shadow-blue-900/20 hover:bg-blue-800 transition-all disabled:opacity-50"
          >
            {isExporting ? <RefreshCw className="animate-spin" size={18} /> : <Printer size={18} />}
            <span>Cetak PDF</span>
          </button>
        </div>
      </div>

      {/* Filter Engine */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm mb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
           <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Jenis Rekapitulasi</label>
              <select 
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-900/10 font-bold text-gray-700 appearance-none cursor-pointer"
                value={reportType}
                onChange={(e) => setReportType(e.target.value as any)}
              >
                <option value="PERIOD">Berdasarkan Periode</option>
                <option value="EMPLOYEE">Berdasarkan Pegawai</option>
                <option value="ACTIVITY">Berdasarkan Kegiatan</option>
              </select>
           </div>
           
           <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Rentang Waktu</label>
              <div className="relative">
                 <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                 <input type="month" className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold text-gray-700" defaultValue="2024-05" />
              </div>
           </div>

           <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Cari Spesifik</label>
              <div className="relative">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                 <input 
                  type="text" 
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold text-gray-700" 
                  placeholder={reportType === 'EMPLOYEE' ? "Nama Pegawai..." : reportType === 'ACTIVITY' ? "Kode Kegiatan..." : "Cari..."}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                 />
              </div>
           </div>

           <div className="flex items-end">
              <button className="w-full py-3.5 bg-gray-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg hover:bg-black transition-all">Tampilkan Laporan</button>
           </div>
        </div>
      </div>

      {/* Analytics Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
         <div className="lg:col-span-2 bg-white rounded-[3rem] border border-gray-100 shadow-sm p-10 relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
               <div>
                  <h4 className="text-xl font-black text-gray-900">Realisasi Anggaran Bulanan</h4>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1 leading-none">Mei 2024 • Semester I</p>
               </div>
               <div className="flex items-center space-x-3 bg-gray-50 p-1.5 rounded-xl border border-gray-100">
                  <div className="flex items-center px-3 py-1 bg-white rounded-lg shadow-sm border border-gray-50 text-[10px] font-black text-blue-900 uppercase">BIAYA</div>
               </div>
            </div>
            <div className="h-80 w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dataMonthly}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 11, fontWeight: 700}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 11, fontWeight: 700}} />
                    <Tooltip cursor={{fill: '#f9fafb'}} contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'}} />
                    <Bar dataKey="cost" fill="#1e3a8a" radius={[6, 6, 0, 0]} barSize={45}>
                       {dataMonthly.map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={index === 4 ? '#10b981' : '#1e3a8a'} />
                       ))}
                    </Bar>
                  </BarChart>
               </ResponsiveContainer>
            </div>
            <div className="absolute top-0 right-0 p-10 pointer-events-none opacity-[0.03]">
               <TrendingUp size={200} />
            </div>
         </div>

         <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm p-10 flex flex-col relative overflow-hidden">
            <h4 className="text-xl font-black text-gray-900 mb-2">Pola Penugasan</h4>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-10">Distribusi Jenis Dinas</p>
            <div className="flex-1 h-64">
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={dataDist} cx="50%" cy="50%" innerRadius={70} outerRadius={100} paddingAngle={8} dataKey="value">
                       {dataDist.map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={0} />
                       ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
               </ResponsiveContainer>
            </div>
            <div className="space-y-4 mt-8">
               {dataDist.map((item, i) => (
                 <div key={i} className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-gray-500">
                    <div className="flex items-center space-x-3">
                       <div className="w-3 h-3 rounded-full" style={{backgroundColor: COLORS[i % COLORS.length]}}></div>
                       <span>{item.name}</span>
                    </div>
                    <span className="text-gray-900 font-black">{item.value}%</span>
                 </div>
               ))}
            </div>
            <div className="absolute -left-10 -bottom-10 p-10 pointer-events-none opacity-[0.02]">
               <PieIcon size={240} />
            </div>
         </div>
      </div>

      {/* Detailed Records Table (Audit Ready) */}
      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-10 border-b border-gray-50 flex items-center justify-between bg-gray-50/20">
           <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-900 text-white rounded-2xl flex items-center justify-center shadow-lg"><FileSearch size={24} /></div>
              <div>
                 <h4 className="text-xl font-black text-gray-900">Rincian Data Rekapitulasi</h4>
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1 leading-none">Arsip Terverifikasi • Mei 2024</p>
              </div>
           </div>
           <div className="flex items-center space-x-3 text-[10px] font-black text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
              <ShieldCheck size={14} className="mr-2" /> DATA READY FOR AUDIT
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] text-gray-400 uppercase font-black tracking-[0.2em] bg-gray-50/50 border-b border-gray-100">
                <th className="px-10 py-6">No. SPPD & Tanggal</th>
                <th className="px-6 py-6">Nama Pegawai / Pelaksana</th>
                <th className="px-6 py-6">Uraian Kegiatan / Program</th>
                <th className="px-6 py-6">Biaya Realisasi</th>
                <th className="px-10 py-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {tableData.map((row) => (
                <tr key={row.id} className="group hover:bg-blue-50/30 transition-all duration-300">
                  <td className="px-10 py-8">
                     <p className="font-mono text-xs font-black text-blue-900 leading-none">{row.num}</p>
                     <p className="text-[10px] text-gray-400 font-bold uppercase mt-2">{row.date}</p>
                  </td>
                  <td className="px-6 py-8">
                     <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 bg-gray-100 text-gray-400 rounded-xl flex items-center justify-center font-black group-hover:bg-blue-900 group-hover:text-white transition-colors">
                           {row.employee.charAt(0)}
                        </div>
                        <div>
                           <p className="text-sm font-black text-gray-800 leading-none">{row.employee}</p>
                           <p className="text-[9px] text-gray-400 font-bold uppercase mt-1 tracking-tighter">NIP: 19800101XXXXXXXX</p>
                        </div>
                     </div>
                  </td>
                  <td className="px-6 py-8">
                     <p className="text-xs font-bold text-gray-600 leading-relaxed italic line-clamp-1 group-hover:text-gray-900 transition-colors">"{row.activity}"</p>
                     <p className="text-[9px] text-blue-600 font-black uppercase mt-1 tracking-widest">AKUN: 524111</p>
                  </td>
                  <td className="px-6 py-8">
                     <p className="text-sm font-black text-gray-900 leading-none">Rp {row.cost.toLocaleString('id-ID')}</p>
                  </td>
                  <td className="px-10 py-8 text-right">
                     <div className="flex items-center justify-end space-x-1 opacity-0 group-hover:opacity-100 transition-all">
                        <button className="p-2.5 text-gray-400 hover:text-blue-900 bg-white border border-gray-100 rounded-xl shadow-sm" title="Lihat Berkas"><FileText size={18} /></button>
                        <button className="p-2.5 text-gray-400 hover:text-emerald-600 bg-white border border-gray-100 rounded-xl shadow-sm" title="Unduh ZIP"><ArrowDownToLine size={18} /></button>
                     </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-10 bg-gray-50/50 border-t border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
           <div className="flex items-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
              <AlertCircle size={16} className="text-blue-900 mr-2" />
              Total Rekapitulasi: 48 Dokumen dengan Nilai Kumulatif Rp 96.500.000
           </div>
           <div className="flex items-center space-x-6">
              <button className="text-[10px] font-black text-gray-400 hover:text-gray-900 transition-colors uppercase">Sebelumnya</button>
              <div className="flex space-x-1">
                 <button className="w-8 h-8 rounded-lg bg-blue-900 text-white font-black text-xs">1</button>
                 <button className="w-8 h-8 rounded-lg bg-white border border-gray-100 text-gray-400 font-black text-xs hover:bg-gray-50">2</button>
              </div>
              <button className="text-[10px] font-black text-gray-400 hover:text-gray-900 transition-colors uppercase">Berikutnya</button>
           </div>
        </div>
      </div>

      {/* KPI Stats Bottom (DIPA Monitoring) */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="bg-blue-900 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
            <div className="relative z-10">
               <h5 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mb-6">Monitoring DIPA Perjalanan Dinas</h5>
               <div className="flex items-end justify-between mb-8">
                  <div>
                     <p className="text-4xl font-black tracking-tight">Rp 250.0 Jt</p>
                     <p className="text-[10px] font-bold text-blue-300 uppercase tracking-widest mt-1 leading-none">Total Pagu Anggaran 2024</p>
                  </div>
                  <div className="text-right">
                     <p className="text-2xl font-black text-emerald-400">38%</p>
                     <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mt-1 leading-none">Terserap</p>
                  </div>
               </div>
               <div className="h-2.5 bg-white/10 rounded-full overflow-hidden border border-white/5">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 w-[38%] rounded-full shadow-lg shadow-emerald-500/50 transition-all duration-1000"></div>
               </div>
            </div>
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-1000"></div>
         </div>

         <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm flex items-center justify-between group hover:border-blue-900/20 transition-all duration-500 cursor-pointer">
            <div className="flex items-center space-x-8">
               <div className="w-16 h-16 bg-gray-50 text-blue-900 rounded-[2rem] flex items-center justify-center shadow-inner group-hover:bg-blue-900 group-hover:text-white transition-all">
                  <Users size={32} />
               </div>
               <div>
                  <h5 className="text-xl font-black text-gray-900 tracking-tight leading-none mb-2">Statistik Personel</h5>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Analisis intensitas tugas per individu</p>
               </div>
            </div>
            <ChevronRight className="text-gray-200 group-hover:text-blue-900 group-hover:translate-x-2 transition-all" size={32} />
         </div>
      </div>
    </div>
  );
};

export default ReportsPage;
