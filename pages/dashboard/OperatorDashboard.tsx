
import React from 'react';
import { 
  PlusCircle, 
  FileEdit, 
  Clock, 
  AlertTriangle, 
  TrendingUp, 
  CheckCircle2, 
  ChevronRight,
  Zap,
  FileText,
  RotateCcw,
  Sparkles,
  Layers,
  History,
  Bell,
  Printer,
  ClipboardList,
  ShieldCheck,
  X,
  Search,
  Archive,
  Download
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { SPPDStatus } from '../../types';

// Mock Data untuk Grafik Beban Kerja
const workloadData = [
  { day: 'Sen', input: 12, approval: 8 },
  { day: 'Sel', input: 18, approval: 14 },
  { day: 'Rab', input: 15, approval: 10 },
  { day: 'Kam', input: 22, approval: 20 },
  { day: 'Jum', input: 25, approval: 18 },
  { day: 'Sab', input: 5, approval: 2 },
  { day: 'Min', input: 2, approval: 1 },
];

const StatCard = ({ title, value, icon: Icon, color, subText, trend }: any) => (
  <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group relative overflow-hidden">
    <div className="relative z-10">
      <div className="flex items-start justify-between mb-6">
        <div className={`p-4 rounded-2xl ${color} text-white shadow-lg shadow-black/5 group-hover:scale-110 transition-transform`}>
          <Icon size={24} />
        </div>
        {trend && (
          <div className="flex items-center px-2 py-1 rounded-lg bg-emerald-50 text-emerald-600 text-[10px] font-black">
            <TrendingUp size={12} className="mr-1" /> {trend}
          </div>
        )}
      </div>
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] mb-1">{title}</p>
      <h3 className="text-3xl font-black text-gray-900 leading-none">{value}</h3>
      <p className="text-[10px] font-bold text-gray-400 mt-4 uppercase tracking-tighter flex items-center">
        <Clock size={12} className="mr-1.5 text-blue-900" /> {subText}
      </p>
    </div>
    <div className="absolute -right-4 -bottom-4 opacity-[0.02] group-hover:scale-110 transition-transform duration-700">
      <Icon size={120} />
    </div>
  </div>
);

const OperatorDashboard: React.FC = () => {
  // Mock data antrean tugas
  const priorityTasks = [
    { id: '3', num: '090/SPPD/2024/003', employee: 'Andi Pratama', status: SPPDStatus.REVISION, note: 'Lampiran surat undangan kurang jelas' },
    { id: '4', num: '090/SPPD/2024/004', employee: 'Dewi Lestari', status: SPPDStatus.DRAFT, note: 'Menunggu konfirmasi tiket maskapai' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      
      {/* 1. Header & Quick Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
           <div className="w-14 h-14 bg-blue-900 text-white rounded-2xl flex items-center justify-center shadow-2xl">
              <Zap size={28} className="fill-amber-400 text-amber-400" />
           </div>
           <div>
              <h3 className="text-2xl font-black text-gray-900 tracking-tight">Work Center Operator</h3>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Pusat Penginputan & Monitoring SPPD</p>
           </div>
        </div>
        <div className="flex items-center space-x-3">
          <Link 
            to="/arsip-digital" 
            className="bg-white border border-gray-200 text-gray-700 px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-50 transition-all shadow-sm flex items-center space-x-2"
          >
            <Archive size={18} />
            <span>Arsip Digital</span>
          </Link>
          <Link 
            to="/sppd/baru" 
            className="bg-blue-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-800 transition-all shadow-xl shadow-blue-900/20 flex items-center space-x-3"
          >
            <PlusCircle size={18} />
            <span>Buat SPPD Baru</span>
          </Link>
        </div>
      </div>

      {/* 2. Dashboard Utama KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="SPPD Baru Hari Ini" 
          value="8 Berkas" 
          icon={PlusCircle} 
          color="bg-blue-600" 
          subText="Input terbaru sistem"
          trend="+12%"
        />
        <StatCard 
          title="SPPD Draft" 
          value="14 Dokumen" 
          icon={FileEdit} 
          color="bg-indigo-600" 
          subText="Perlu difinalisasi"
        />
        <StatCard 
          title="Menunggu Persetujuan" 
          value="21 Dokumen" 
          icon={Clock} 
          color="bg-amber-500" 
          subText="Di meja pimpinan"
        />
        <StatCard 
          title="SPPD Ditolak / Revisi" 
          value="5 Dokumen" 
          icon={AlertTriangle} 
          color="bg-red-600" 
          subText="Perlu tindakan segera"
          trend="Prioritas"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 3. Workload Visualizer */}
        <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm relative overflow-hidden">
           <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
              <div>
                 <h4 className="text-xl font-black text-gray-900">Produktivitas Input Mingguan</h4>
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Status Penanganan Dokumen (Sen - Min)</p>
              </div>
              <div className="flex items-center space-x-3 bg-gray-50 p-1.5 rounded-xl border border-gray-100">
                 <div className="flex items-center px-3 py-1 bg-white rounded-lg shadow-sm border border-gray-100 text-[9px] font-black text-blue-900 uppercase">
                    <div className="w-2 h-2 bg-blue-900 rounded-full mr-2"></div> Input
                 </div>
                 <div className="flex items-center px-3 py-1 text-[9px] font-black text-gray-400 uppercase">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full mr-2"></div> Approved
                 </div>
              </div>
           </div>

           <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={workloadData}>
                    <defs>
                      <linearGradient id="colorInput" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1e3a8a" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 10, fontWeight: 700}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 10, fontWeight: 700}} />
                    <Tooltip contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'}} />
                    <Area type="monotone" dataKey="input" stroke="#1e3a8a" strokeWidth={4} fillOpacity={1} fill="url(#colorInput)" />
                    <Area type="monotone" dataKey="approval" stroke="#6366f1" strokeWidth={2} fillOpacity={0} strokeDasharray="5 5" />
                 </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* 4. Help & Roles Restriction Box */}
        <div className="space-y-6">
           <div className="bg-blue-900 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden group">
              <div className="relative z-10">
                 <Printer size={32} className="text-blue-300 mb-6 group-hover:scale-110 transition-transform" />
                 <h5 className="text-lg font-black mb-2">Cetak Dokumen Resmi</h5>
                 <p className="text-blue-200 text-[10px] font-bold uppercase leading-relaxed tracking-tight opacity-80 mb-6">
                   Lakukan pencetakan SPPD, Surat Tugas, dan Kwitansi untuk dokumen yang telah disetujui pimpinan.
                 </p>
                 <Link to="/sppd" className="bg-white text-blue-900 px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-50 transition-all flex items-center justify-center">
                    Daftar Cetak
                 </Link>
              </div>
              <div className="absolute -right-10 -bottom-10 opacity-10">
                 <FileText size={160} />
              </div>
           </div>

           <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-6">
                 <h5 className="font-black text-gray-900 uppercase text-xs tracking-widest">Akses Arsip</h5>
                 <History className="text-blue-900" size={20} />
              </div>
              <p className="text-xs font-bold text-gray-400 uppercase leading-relaxed mb-4">
                Tinjau data perjalanan dinas tahun anggaran sebelumnya di folder arsip digital.
              </p>
              <Link to="/arsip-digital" className="text-[10px] font-black text-blue-900 uppercase tracking-widest flex items-center hover:underline">
                Buka Brankas Arsip <ChevronRight size={14} className="ml-1" />
              </Link>
           </div>
        </div>
      </div>

      {/* 5. Priority Action Table (Draft & Revision Monitoring) */}
      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/20">
           <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white text-blue-900 rounded-2xl flex items-center justify-center shadow-sm border border-gray-100">
                 <Layers size={24} />
              </div>
              <div>
                 <h4 className="text-xl font-black text-gray-900 uppercase tracking-tight leading-none">Antrean Tindakan Prioritas</h4>
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1.5">Tindak lanjuti dokumen Revisi & Draft segera</p>
              </div>
           </div>
           <Link to="/monitoring" className="text-[10px] font-black text-blue-900 uppercase tracking-[0.2em] hover:underline flex items-center">
              Lihat Semua Monitoring <ChevronRight size={14} className="ml-1" />
           </Link>
        </div>

        <div className="overflow-x-auto">
           <table className="w-full text-left">
              <thead>
                 <tr className="text-[10px] text-gray-400 uppercase font-black tracking-[0.2em] bg-gray-50/50 border-b border-gray-100">
                    <th className="px-10 py-6">No. SPPD & Pegawai</th>
                    <th className="px-6 py-6">Alasan Perbaikan / Catatan</th>
                    <th className="px-6 py-6 text-center">Status</th>
                    <th className="px-10 py-6 text-right">Tindakan Kelola</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                 {priorityTasks.map((task) => (
                   <tr key={task.id} className="group hover:bg-blue-50/20 transition-all duration-300">
                      <td className="px-10 py-6">
                         <p className="font-mono text-xs font-black text-blue-900 leading-none">#{task.num}</p>
                         <p className="text-sm font-bold text-gray-800 mt-1.5">{task.employee}</p>
                      </td>
                      <td className="px-6 py-6">
                         <p className="text-xs font-medium text-gray-500 italic line-clamp-1">"{task.note}"</p>
                      </td>
                      <td className="px-6 py-6 text-center">
                         <span className={`inline-flex px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${task.status === SPPDStatus.REVISION ? 'bg-red-50 text-red-600 border-red-100' : 'bg-gray-100 text-gray-400'}`}>
                            {task.status.replace('_', ' ')}
                         </span>
                      </td>
                      <td className="px-10 py-6 text-right">
                         <Link 
                          to={`/sppd/edit/${task.id}`}
                          className="inline-flex items-center space-x-2 bg-white border border-gray-200 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-blue-900 hover:bg-blue-900 hover:text-white transition-all shadow-sm"
                         >
                            <FileEdit size={14} />
                            <span>Edit & Proses</span>
                         </Link>
                      </td>
                   </tr>
                 ))}
              </tbody>
           </table>
        </div>
      </div>
    </div>
  );
};

export default OperatorDashboard;
