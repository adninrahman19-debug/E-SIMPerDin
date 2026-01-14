import React, { useState } from 'react';
import { 
  FileSearch, 
  Download, 
  FileText, 
  Users, 
  Calendar, 
  Wallet, 
  Search, 
  Filter, 
  Printer, 
  ChevronRight, 
  ArrowUpRight, 
  CheckCircle2, 
  BarChart3,
  TrendingUp,
  Table as TableIcon,
  AlertCircle,
  Clock,
  // Added ShieldCheck to imports
  ShieldCheck
} from 'lucide-react';
import { MOCK_USERS } from '../../constants';

const ReportsPage: React.FC = () => {
  const [reportType, setReportType] = useState<'PER_EMPLOYEE' | 'PER_PERIOD' | 'PER_ACTIVITY'>('PER_PERIOD');
  const [isExporting, setIsExporting] = useState(false);

  // Mock Report Data
  const reportData = [
    { id: '1', num: '090/SPPD/2024/001', date: '12 Mei 2024', employee: 'Andi Pratama', activity: 'Koordinasi Pusat', cost: 2450000, status: 'Verified' },
    { id: '2', num: '090/SPPD/2024/012', date: '15 Mei 2024', employee: 'Siti Aminah', activity: 'Diklat Teknis', cost: 3200000, status: 'Verified' },
    { id: '3', num: '090/SPPD/2024/015', date: '18 Mei 2024', employee: 'Budi Raharjo', activity: 'Monitoring Wilayah', cost: 1850000, status: 'Verified' },
    { id: '4', num: '090/SPPD/2024/020', date: '20 Mei 2024', employee: 'Andi Pratama', activity: 'Konsultasi DIPA', cost: 2100000, status: 'Verified' },
  ];

  const handleExport = (format: 'PDF' | 'EXCEL') => {
    setIsExporting(true);
    setTimeout(() => {
      alert(`Laporan berhasil digenerate dalam format ${format}. Mengunduh berkas...`);
      setIsExporting(false);
    }, 1500);
  };

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Laporan & Rekapitulasi</h2>
          <p className="text-gray-500 text-sm font-medium">Generate laporan akuntabilitas perjalanan dinas instansi yang siap audit.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => handleExport('EXCEL')}
            className="bg-white border border-gray-200 text-emerald-700 px-5 py-2.5 rounded-xl hover:bg-emerald-50 transition-all font-bold text-sm flex items-center space-x-2 shadow-sm"
          >
            <TableIcon size={18} />
            <span>Export Excel</span>
          </button>
          <button 
            onClick={() => handleExport('PDF')}
            className="bg-blue-900 text-white px-6 py-2.5 rounded-xl hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20 font-black text-xs uppercase tracking-widest flex items-center space-x-2"
          >
            <Printer size={18} />
            <span>Cetak PDF</span>
          </button>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Cakupan Laporan</label>
            <select 
              className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-900/10 font-bold text-gray-700 appearance-none"
              value={reportType}
              onChange={(e) => setReportType(e.target.value as any)}
            >
              <option value="PER_PERIOD">Berdasarkan Periode</option>
              <option value="PER_EMPLOYEE">Berdasarkan Pegawai</option>
              <option value="PER_ACTIVITY">Berdasarkan Kegiatan</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Pilih Periode</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              <input type="month" className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none font-bold text-gray-700" defaultValue="2024-05" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
              {reportType === 'PER_EMPLOYEE' ? 'Nama Pegawai' : reportType === 'PER_ACTIVITY' ? 'Kode Kegiatan' : 'Unit Kerja'}
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              <input 
                type="text" 
                placeholder="Semua..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none font-bold text-gray-700" 
              />
            </div>
          </div>

          <div className="flex items-end">
            <button className="w-full py-3 bg-gray-900 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-gray-800 transition-all">
              Tampilkan Data
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Total SPPD</p>
            <h3 className="text-3xl font-black text-gray-900">48 <span className="text-xs text-gray-400 font-bold uppercase">Dokumen</span></h3>
          </div>
          <BarChart3 size={60} className="absolute -right-4 -bottom-4 text-gray-50 group-hover:text-blue-50 transition-colors" />
        </div>
        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Realisasi Biaya</p>
            <h3 className="text-3xl font-black text-blue-900">96.5<span className="text-sm">Jt</span></h3>
          </div>
          <Wallet size={60} className="absolute -right-4 -bottom-4 text-gray-50 group-hover:text-blue-50 transition-colors" />
        </div>
        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Pagu Anggaran</p>
            <h3 className="text-3xl font-black text-gray-900">250<span className="text-sm">Jt</span></h3>
          </div>
          <TrendingUp size={60} className="absolute -right-4 -bottom-4 text-gray-50 group-hover:text-blue-50 transition-colors" />
        </div>
        <div className="bg-emerald-900 text-white p-8 rounded-[2rem] shadow-xl relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-[10px] font-black text-emerald-300 uppercase tracking-[0.2em] mb-2">Status Audit</p>
            <h3 className="text-xl font-black">Audit Ready</h3>
            <div className="flex items-center mt-2 text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
              <CheckCircle2 size={12} className="mr-1.5" /> Data Terenkripsi
            </div>
          </div>
          <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
          <div>
            <h4 className="text-xl font-black text-gray-900">Rincian Rekapitulasi</h4>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Menampilkan data terpilih untuk pelaporan</p>
          </div>
          <div className="flex items-center space-x-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
             <Clock size={14} className="text-blue-900" />
             <span>Update: {new Date().toLocaleDateString('id-ID')}</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] text-gray-400 uppercase font-black tracking-[0.2em] border-b border-gray-100 bg-gray-50/50">
                <th className="px-8 py-5">No. SPPD & Tanggal</th>
                <th className="px-6 py-5">Pegawai / Pelaksana</th>
                <th className="px-6 py-5">Kegiatan / Program</th>
                <th className="px-6 py-5">Biaya Riil</th>
                <th className="px-8 py-5 text-right">Integritas Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {reportData.map((row) => (
                <tr key={row.id} className="group hover:bg-blue-50/30 transition-all duration-300">
                  <td className="px-8 py-6">
                    <p className="font-mono text-xs font-black text-blue-900">{row.num}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">{row.date}</p>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-100 text-gray-400 rounded-lg flex items-center justify-center font-black text-xs group-hover:bg-blue-900 group-hover:text-white transition-colors">
                        {row.employee.charAt(0)}
                      </div>
                      <span className="text-sm font-bold text-gray-800">{row.employee}</span>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className="text-xs font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full uppercase tracking-tighter">{row.activity}</span>
                  </td>
                  <td className="px-6 py-6 font-black text-gray-900">
                    Rp {row.cost.toLocaleString('id-ID')}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-black uppercase border border-emerald-100">
                      <CheckCircle2 size={12} />
                      <span>{row.status}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-8 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center space-x-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">
            <AlertCircle size={16} className="text-amber-500" />
            <span>Data ini telah divalidasi oleh sistem dan sesuai dengan bukti kwitansi riil.</span>
          </div>
          <button className="text-xs font-black text-blue-900 uppercase tracking-widest hover:underline flex items-center">
            Lihat Analitik Mendalam <ArrowUpRight size={14} className="ml-1.5" />
          </button>
        </div>
      </div>

      {/* Audit Info Sidebar */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="bg-blue-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
               <ShieldCheck size={40} className="text-amber-400 mb-6" />
               <h4 className="text-2xl font-black mb-4 tracking-tight">Kesiapan Audit Digital</h4>
               <p className="text-blue-100 text-sm leading-relaxed opacity-80 mb-8 font-medium">
                 Seluruh dokumen pendukung (Kwitansi, Laporan Tugas, & Tiket) telah terindeks secara digital dan dapat diverifikasi langsung melalui QR Code unik di setiap dokumen cetak.
               </p>
               <button className="bg-white text-blue-900 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-50 transition-all">
                  Uji Validitas Data
               </button>
            </div>
            <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
         </div>
         <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm flex flex-col justify-between">
            <div>
               <h4 className="text-xl font-black text-gray-900 mb-2">Template Laporan Khusus</h4>
               <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                 Sesuaikan tata letak kolom rekapitulasi untuk memenuhi standar pemeriksaan BPK atau Inspektorat internal.
               </p>
            </div>
            <div className="mt-8 space-y-3">
               {['Rekapitulasi Tahunan', 'Laporan Pajak Perjalanan', 'Rincian Biaya Per Kegiatan'].map((item, i) => (
                 <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl group hover:bg-blue-50 transition-colors">
                    <span className="text-xs font-bold text-gray-700 group-hover:text-blue-900">{item}</span>
                    <Download size={16} className="text-gray-300 group-hover:text-blue-900" />
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default ReportsPage;