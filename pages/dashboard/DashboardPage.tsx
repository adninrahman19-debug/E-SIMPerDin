
import React, { useState } from 'react';
import { useAuth } from '../../App';
import { UserRole, SubscriptionStatus, SPPDStatus } from '../../types';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, Cell, PieChart, Pie, LineChart, Line, Legend
} from 'recharts';
import { 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Users, 
  Building,
  TrendingUp,
  TrendingDown,
  CreditCard,
  DollarSign,
  Activity,
  ShieldCheck,
  Globe,
  Server,
  Zap,
  Calendar,
  Wallet,
  ArrowUpRight,
  // Added ArrowRight to imports to fix line 461
  ArrowRight,
  Bell,
  FileText,
  PlusCircle,
  FileEdit,
  ClipboardCheck,
  History,
  ChevronRight,
  User as UserIcon,
  Layers,
  XCircle,
  CheckCircle,
  MessageSquare,
  FileCheck,
  Ban,
  RotateCcw,
  X,
  UserCheck,
  Paperclip,
  AlertCircle,
  MapPin,
  Download,
  Info
} from 'lucide-react';
import { MOCK_USERS } from '../../constants';
import { Link } from 'react-router-dom';

const StatCard: React.FC<{ 
  title: string, 
  value: string | number, 
  icon: React.ReactNode, 
  color: string, 
  trend?: { value: string, up: boolean },
  subtitle?: string
}> = ({ title, value, icon, color, trend, subtitle }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all group">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-xl ${color} text-white shadow-lg shadow-current/10 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      {trend && (
        <div className={`flex items-center text-xs font-bold px-2 py-1 rounded-full ${trend.up ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50'}`}>
          {trend.up ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
          {trend.value}
        </div>
      )}
    </div>
    <div>
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{title}</p>
      <h3 className="text-2xl font-black text-gray-900 mt-1">{value}</h3>
      {subtitle && <p className="text-xs text-gray-500 mt-1 font-medium">{subtitle}</p>}
    </div>
  </div>
);

// Mock Data
const growthData = [
  { month: 'Jan', instansi: 80, users: 1200, revenue: 120 },
  { month: 'Feb', instansi: 95, users: 1500, revenue: 145 },
  { month: 'Mar', instansi: 110, users: 1800, revenue: 160 },
  { month: 'Apr', instansi: 135, users: 2400, revenue: 210 },
  { month: 'Mei', instansi: 156, users: 3421, revenue: 280 },
  { month: 'Jun', instansi: 178, users: 3900, revenue: 333 },
];

const usageData = [
  { name: 'Minggu 1', sppd: 45, cost: 12.5 },
  { name: 'Minggu 2', sppd: 52, cost: 18.2 },
  { name: 'Minggu 3', sppd: 48, cost: 15.6 },
  { name: 'Minggu 4', sppd: 61, cost: 22.4 },
];

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [selectedSppdForApproval, setSelectedSppdForApproval] = useState<any | null>(null);
  const [officialNote, setOfficialNote] = useState('');

  const handleDecision = (status: SPPDStatus) => {
    if ((status === SPPDStatus.REVISION || status === SPPDStatus.REJECTED) && !officialNote) {
      alert('Harap masukkan catatan resmi untuk alasan penolakan atau revisi.');
      return;
    }
    alert(`Keputusan disimpan: ${status.replace('_', ' ')} untuk dokumen ${selectedSppdForApproval.num}`);
    setSelectedSppdForApproval(null);
    setOfficialNote('');
  };

  const renderApproverDash = () => (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCard title="SPPD Menunggu Persetujuan" value="12" icon={<Clock size={24} />} color="bg-amber-500" subtitle="Memerlukan tindakan segera" />
        <StatCard title="SPPD Telah Disetujui" value="142" icon={<CheckCircle size={24} />} color="bg-emerald-600" subtitle="Total dokumen divalidasi" trend={{ value: '10%', up: true }} />
        <StatCard title="SPPD Ditolak / Revisi" value="8" icon={<XCircle size={24} />} color="bg-red-600" subtitle="Dokumen dikembalikan ke staf" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-amber-500 text-white rounded-xl shadow-lg">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-gray-900">Antrean Tanda Tangan</h4>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Dokumen yang menunggu otorisasi Anda</p>
                  </div>
                </div>
                <Link to="/sppd" className="text-[10px] font-black text-blue-900 uppercase tracking-widest hover:underline">Kelola Semua</Link>
              </div>
              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead>
                      <tr className="text-[10px] text-gray-400 uppercase font-black tracking-[0.2em] bg-gray-50/50 border-b border-gray-100">
                        <th className="px-8 py-4">Pelaksana & Tujuan</th>
                        <th className="px-6 py-4">Maksud Perjalanan</th>
                        <th className="px-6 py-4">Estimasi Biaya</th>
                        <th className="px-8 py-4 text-right">Aksi Cepat</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {[
                        { id: '201', num: '090/SPPD/2024/042', emp: 'Andi Pratama', dest: 'Bandung', purpose: 'Rapat Koordinasi Implementasi SIMPerDin', cost: 2450000, time: '2h ago', unit: 'Sekretariat', attachments: 2, transportation: 'Kereta' },
                        { id: '202', num: '090/SPPD/2024/043', emp: 'Siti Aminah', dest: 'Jakarta', purpose: 'Konsultasi DIPA TA 2024 ke Pusat', cost: 4200000, time: '4h ago', unit: 'Bidang Angkutan', attachments: 1, transportation: 'Pesawat' },
                      ].map((item) => (
                        <tr key={item.id} className="group hover:bg-amber-50/20 transition-all duration-300">
                          <td className="px-8 py-5">
                             <p className="text-xs font-black text-gray-900 leading-none">{item.emp}</p>
                             <p className="text-[10px] text-amber-600 font-bold mt-1 uppercase tracking-tighter">{item.dest}</p>
                          </td>
                          <td className="px-6 py-5">
                             <p className="text-xs font-medium text-gray-600 line-clamp-1">{item.purpose}</p>
                          </td>
                          <td className="px-6 py-5 font-black text-gray-800 text-xs">Rp {item.cost.toLocaleString('id-ID')}</td>
                          <td className="px-8 py-5 text-right">
                             <button 
                               onClick={() => setSelectedSppdForApproval(item)}
                               className="bg-amber-500 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-600 transition-all shadow-md"
                             >
                                Review
                             </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                 </table>
              </div>
            </div>
            
            <div className="bg-indigo-900 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
               <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                     <h4 className="text-xl font-black mb-2 tracking-tight">E-Signature Terintegrasi</h4>
                     <p className="text-indigo-100 text-xs font-bold uppercase leading-relaxed tracking-tight opacity-80">
                       Seluruh dokumen yang Anda setujui akan secara otomatis dibubuhi tanda tangan elektronik (QR-Code) yang sah secara hukum.
                     </p>
                  </div>
                  <button className="bg-white text-indigo-900 px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-50 transition-all shadow-lg whitespace-nowrap">
                     Update Sertifikat Digital
                  </button>
               </div>
               <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
            </div>
         </div>

         <div className="space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
               <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center">
                  <Activity size={16} className="mr-2 text-emerald-600" /> Tren Aktivitas Dinas
               </h4>
               <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                     <LineChart data={usageData}>
                        <Line type="monotone" dataKey="sppd" stroke="#10b981" strokeWidth={4} dot={{ r: 4, fill: '#10b981' }} />
                     </LineChart>
                  </ResponsiveContainer>
               </div>
            </div>

            <div className="p-8 bg-emerald-50 rounded-[2.5rem] border border-emerald-100 flex items-start space-x-4">
               <ShieldCheck size={32} className="text-emerald-600 shrink-0" />
               <div>
                  <h4 className="text-sm font-black text-emerald-900 uppercase leading-none mb-2">Validasi SBM Otomatis</h4>
                  <p className="text-[10px] text-emerald-700 font-bold leading-relaxed uppercase tracking-tight">
                     Seluruh pengajuan di atas telah divalidasi oleh sistem sesuai Standar Biaya Masukan (SBM) 2024.
                  </p>
               </div>
            </div>
         </div>
      </div>

      {/* REUSED PERSYARATAN MODAL DARI LIST PAGE (SIMULATED HERE) */}
      {selectedSppdForApproval && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-md flex items-center justify-center z-[60] p-4">
           <div className="bg-white w-full max-w-5xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300 flex flex-col max-h-[95vh]">
              <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-blue-900 text-white">
                 <div className="flex items-center space-x-4">
                    <div className="p-3 bg-white/10 rounded-2xl"><UserCheck size={28} className="text-amber-400" /></div>
                    <div>
                       <h4 className="text-2xl font-black tracking-tight">Otorisasi Perjalanan Dinas</h4>
                       <p className="text-xs text-blue-200 font-bold uppercase mt-1">Review Dokumen No: {selectedSppdForApproval.num}</p>
                    </div>
                 </div>
                 <button onClick={() => setSelectedSppdForApproval(null)} className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl text-white transition-all"><X size={24} /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2 space-y-8">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Pelaksana</p>
                             <p className="text-lg font-black text-gray-900">{selectedSppdForApproval.emp}</p>
                             <p className="text-xs text-blue-600 font-bold uppercase">{selectedSppdForApproval.unit}</p>
                          </div>
                          <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Estimasi Biaya</p>
                             <p className="text-xl font-black text-gray-900">Rp {selectedSppdForApproval.cost.toLocaleString('id-ID')}</p>
                             <p className="text-[10px] text-emerald-600 font-bold uppercase">Anggaran Tersedia</p>
                          </div>
                       </div>
                       <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100">
                          <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Maksud Perjalanan</h5>
                          <p className="text-sm font-bold text-gray-800 italic">"{selectedSppdForApproval.purpose}"</p>
                       </div>
                       <div className="space-y-4">
                          <label className="block text-[10px] font-black text-blue-900 uppercase tracking-widest">Berikan Catatan Resmi (Approval/Revision Note)</label>
                          <textarea rows={4} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-[2rem] outline-none text-sm font-medium resize-none transition-all" placeholder="Tuliskan arahan atau alasan revisi/penolakan..." value={officialNote} onChange={(e) => setOfficialNote(e.target.value)} />
                       </div>
                    </div>
                    <div className="lg:col-span-1 space-y-6">
                       <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center"><History size={14} className="mr-2" /> Audit Log</h5>
                       <div className="space-y-4 relative pl-4 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
                          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 text-[10px]">
                             <p className="font-black text-blue-900 uppercase">Input Operator</p>
                             <p className="text-gray-500 font-bold mt-1">Lilis Staff • 12 Mei, 09:00</p>
                          </div>
                          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 text-[10px]">
                             <p className="font-black text-blue-900 uppercase">Verifikasi Keuangan</p>
                             <p className="text-gray-500 font-bold mt-1">Admin Keu • 12 Mei, 14:20</p>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
              <div className="p-8 bg-gray-50 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
                 <div className="flex items-center text-xs font-bold text-gray-400"><AlertCircle size={14} className="mr-2 text-amber-500" /> Tinjau dokumen dengan teliti.</div>
                 <div className="flex items-center space-x-3 w-full md:w-auto">
                    <button onClick={() => handleDecision(SPPDStatus.REVISION)} className="flex-1 md:flex-none px-6 py-3 bg-white border border-blue-200 text-blue-700 rounded-2xl font-black text-[10px] uppercase hover:bg-blue-50 transition-all flex items-center justify-center space-x-2"><RotateCcw size={14} /><span>Revisi</span></button>
                    <button onClick={() => handleDecision(SPPDStatus.REJECTED)} className="flex-1 md:flex-none px-6 py-3 bg-red-50 text-red-600 rounded-2xl font-black text-[10px] uppercase hover:bg-red-100 transition-all flex items-center justify-center space-x-2"><Ban size={14} /><span>Tolak</span></button>
                    <button onClick={() => handleDecision(SPPDStatus.APPROVED)} className="flex-[2] md:flex-none px-10 py-3 bg-emerald-600 text-white rounded-2xl font-black text-[10px] uppercase hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/20 flex items-center justify-center space-x-2"><CheckCircle2 size={16} /><span>Setujui</span></button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );

  const renderSuperAdminDash = () => (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Instansi" value="156" icon={<Building size={24} />} color="bg-blue-900" trend={{ value: '12%', up: true }} subtitle="98 Aktif • 42 Trial" />
        <StatCard title="Total User Global" value="3.421" icon={<Users size={24} />} color="bg-indigo-600" trend={{ value: '24%', up: true }} subtitle="Agregat seluruh tenant" />
        <StatCard title="Total SPPD Global" value="15.204" icon={<Briefcase size={24} />} color="bg-emerald-600" trend={{ value: '8%', up: true }} subtitle="Bulan ini: 2.105 terbit" />
        <StatCard title="Pendapatan (YTD)" value="Rp 1.42M" icon={<DollarSign size={24} />} color="bg-amber-600" trend={{ value: '18%', up: true }} subtitle="Target: Rp 2.0M" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <h4 className="text-lg font-black text-gray-800 mb-8">Pertumbuhan Platform</h4>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id="colorInst" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#1e3a8a" stopOpacity={0.1}/><stop offset="95%" stopColor="#1e3a8a" stopOpacity={0}/></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 11, fontWeight: 700}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 11, fontWeight: 700}} />
                <Tooltip />
                <Area type="monotone" dataKey="instansi" stroke="#1e3a8a" strokeWidth={3} fillOpacity={1} fill="url(#colorInst)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center">
           <Zap size={48} className="text-amber-400 mb-4" />
           <h4 className="font-black text-gray-900">Sistem Stabil</h4>
           <p className="text-xs text-gray-500 mt-1">Uptime 99.98% • Latency 42ms</p>
        </div>
      </div>
    </div>
  );

  const renderInstitutionAdminDash = () => {
    const institutionEmployees = MOCK_USERS.filter(u => u.institutionId === user?.institutionId).length;
    return (
      <div className="space-y-8 animate-in fade-in duration-700">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          <StatCard title="Total Pegawai" value={institutionEmployees} icon={<Users size={24} />} color="bg-blue-900" subtitle="Akun terdaftar" />
          <StatCard title="SPPD (Bulan Ini)" value="48" icon={<FileText size={24} />} color="bg-indigo-600" trend={{ value: '12%', up: true }} subtitle="Volume pengajuan" />
          <StatCard title="Perlu Persetujuan" value="12" icon={<Clock size={24} />} color="bg-amber-500" subtitle="Menunggu antrean" />
          <StatCard title="Realisasi Biaya" value="Rp 154Jt" icon={<Wallet size={24} />} color="bg-emerald-600" trend={{ value: '5%', up: false }} subtitle="Anggaran terpakai" />
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Sisa Masa Aktif</p>
            <h3 className="text-2xl font-black text-blue-900 mt-1">232 Hari</h3>
            <span className="text-[10px] font-black bg-emerald-50 text-emerald-600 px-2 py-1 rounded uppercase w-fit mt-2">Aktif</span>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
              <h4 className="text-xl font-black text-gray-900 mb-8">Statistik Perjalanan Dinas</h4>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={usageData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 11, fontWeight: 700}} />
                      <Tooltip />
                      <Bar dataKey="sppd" fill="#1e3a8a" radius={[6, 6, 0, 0]} />
                   </BarChart>
                </ResponsiveContainer>
              </div>
           </div>
           <div className="bg-blue-900 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
              <ShieldCheck size={32} className="text-amber-400 mb-6" />
              <h4 className="text-lg font-black mb-2">Keamanan Data</h4>
              <p className="text-blue-100 text-[10px] font-bold uppercase opacity-80">Data instansi Anda dienkripsi AES-256 dan terisolasi sepenuhnya.</p>
           </div>
        </div>
      </div>
    );
  };

  const renderOperatorDash = () => (
      <div className="space-y-8 animate-in fade-in duration-700">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="SPPD Baru" value="8" icon={<PlusCircle size={24} />} color="bg-blue-600" subtitle="Input hari ini" />
          <StatCard title="SPPD Draft" value="14" icon={<FileEdit size={24} />} color="bg-indigo-50" subtitle="Perlu penyelesaian" />
          <StatCard title="Menunggu Persetujuan" value="21" icon={<Clock size={24} />} color="bg-amber-500" subtitle="Di antrean pimpinan" />
          <StatCard title="Ditolak / Revisi" value="5" icon={<AlertTriangle size={24} />} color="bg-red-600" subtitle="Butuh atensi segera" />
        </div>
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
           <div className="p-8 border-b border-gray-50 bg-gray-50/30 flex items-center justify-between">
              <h4 className="text-xl font-black text-gray-900">Pekerjaan Berjalan</h4>
              <Link to="/sppd" className="text-[10px] font-black text-blue-900 uppercase">Lihat Semua</Link>
           </div>
           <div className="p-8 h-48 flex items-center justify-center text-gray-400 font-bold uppercase text-xs">Daftar Antrean Kerja Kosong</div>
        </div>
      </div>
  );

  const renderStandardDash = () => (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* 1. Status SPPD Pribadi */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard title="Total Dinas Saya" value="14" icon={<Briefcase size={24} />} color="bg-blue-900" subtitle="Tahun Anggaran 2024" />
        <StatCard title="Sedang Diajukan" value="2" icon={<Clock size={24} />} color="bg-amber-500" subtitle="Menunggu Verifikasi" />
        <StatCard title="Telah Disetujui" value="11" icon={<CheckCircle2 size={24} />} color="bg-emerald-600" subtitle="Siap Berangkat / Cetak" trend={{ value: '12%', up: true }} />
        <StatCard title="Perlu Revisi" value="1" icon={<AlertTriangle size={24} />} color="bg-red-600" subtitle="Cek Catatan Pimpinan" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* 2. Riwayat Perjalanan Dinas (Main List) */}
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-900 text-white rounded-xl shadow-lg">
                    <History size={20} />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-gray-900 tracking-tight">Riwayat Dinas Terakhir</h4>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Daftar kegiatan perjalanan dinas personal</p>
                  </div>
                </div>
                <Link to="/sppd" className="text-[10px] font-black text-blue-900 uppercase tracking-widest hover:underline flex items-center">
                  Lihat Semua <ChevronRight size={14} className="ml-1" />
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] text-gray-400 uppercase font-black tracking-[0.2em] bg-gray-50/50 border-b border-gray-100">
                      <th className="px-8 py-5">Tujuan & No. Dokumen</th>
                      <th className="px-6 py-5">Maksud Kegiatan</th>
                      <th className="px-6 py-5">Estimasi Biaya</th>
                      <th className="px-8 py-5 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[
                      { id: '1', num: '090/SPPD/2024/011', dest: 'Jakarta', purpose: 'Rapat Koordinasi Pusat Data Nasional', date: '12-14 Mei 2024', cost: 2450000, status: SPPDStatus.APPROVED },
                      { id: '2', num: '090/SPPD/2024/015', dest: 'Bandung', purpose: 'Bimtek Pengelolaan Arsip Digital', date: '20-22 Mei 2024', cost: 1800000, status: SPPDStatus.PENDING },
                      { id: '3', num: '090/SPPD/2024/008', dest: 'Surabaya', purpose: 'Studi Banding Terminal Tipe A', date: '01-03 Mei 2024', cost: 3200000, status: SPPDStatus.APPROVED },
                    ].map((row) => (
                      <tr key={row.id} className="group hover:bg-blue-50/20 transition-all duration-300">
                        <td className="px-8 py-6">
                           <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gray-100 text-gray-400 rounded-xl flex items-center justify-center font-black text-[10px]">MAP</div>
                              <div>
                                 <p className="text-xs font-black text-gray-900 leading-none">{row.dest}</p>
                                 <p className="text-[9px] font-mono text-blue-600 font-bold mt-1">{row.num}</p>
                              </div>
                           </div>
                        </td>
                        <td className="px-6 py-6">
                           <p className="text-xs font-medium text-gray-600 line-clamp-1">{row.purpose}</p>
                           <p className="text-[10px] text-gray-400 mt-1 font-bold italic">{row.date}</p>
                        </td>
                        <td className="px-6 py-6 text-xs font-black text-gray-800">Rp {row.cost.toLocaleString('id-ID')}</td>
                        <td className="px-8 py-6 text-right">
                           <span className={`inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                             row.status === SPPDStatus.APPROVED ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                           }`}>
                             {row.status === SPPDStatus.APPROVED ? 'Disetujui' : 'Diproses'}
                           </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
           </div>

           <div className="p-8 bg-blue-50 rounded-[2.5rem] border border-blue-100 flex items-start space-x-6 relative overflow-hidden group hover:shadow-xl transition-all">
              <div className="p-4 bg-white rounded-2xl shadow-sm text-blue-900 group-hover:scale-110 transition-transform">
                 <PlusCircle size={28} />
              </div>
              <div className="relative z-10 flex-1">
                 <h4 className="text-xl font-black text-blue-900 tracking-tight">Butuh SPPD Baru?</h4>
                 <p className="text-blue-700 text-xs font-bold uppercase mt-1 opacity-80 leading-relaxed max-w-md">
                   Proses pengajuan kini lebih cepat dengan fitur "Auto-Draft" dan perhitungan biaya standar otomatis.
                 </p>
                 <Link to="/sppd/baru" className="mt-4 inline-flex items-center space-x-2 bg-blue-900 text-white px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-800 shadow-lg shadow-blue-900/20">
                    <span>Mulai Buat Pengajuan</span>
                    <ArrowRight size={14} />
                 </Link>
              </div>
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-200/20 rounded-full blur-3xl"></div>
           </div>
        </div>

        {/* 3. Notifikasi Persetujuan (Sidebar Feed) */}
        <div className="space-y-8">
           <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                 <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest flex items-center">
                    <Bell size={16} className="mr-2 text-blue-900" /> Notifikasi Sistem
                 </h4>
                 <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
              </div>
              <div className="space-y-6">
                 {[
                   { icon: <CheckCircle className="text-emerald-600" />, title: "SPPD #011 Disetujui", msg: "Dokumen telah ditandatangani secara elektronik oleh Kepala Dinas.", time: "1 jam yang lalu", urgent: false },
                   { icon: <AlertCircle className="text-amber-600" />, title: "Revisi Dokumen #015", msg: "Catatan Keuangan: Lampiran bukti undangan belum lengkap.", time: "4 jam yang lalu", urgent: true },
                   { icon: <Info className="text-blue-600" />, title: "Masa Aktif Penugasan", msg: "Laporan kegiatan dinas Surabaya wajib diinput sebelum lusa.", time: "1 hari yang lalu", urgent: false },
                 ].map((note, i) => (
                   <div key={i} className={`flex items-start space-x-4 pb-6 border-b border-gray-50 last:border-0 last:pb-0 group cursor-pointer ${note.urgent ? 'animate-in fade-in slide-in-from-right-2' : ''}`}>
                      <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-blue-50 transition-colors">
                        {note.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                         <div className="flex justify-between items-start gap-2">
                           <h5 className="text-xs font-black text-gray-900 truncate uppercase tracking-tight">{note.title}</h5>
                           <span className="text-[8px] font-bold text-gray-400 uppercase whitespace-nowrap">{note.time}</span>
                         </div>
                         <p className="text-[10px] text-gray-500 leading-relaxed font-medium mt-1 line-clamp-2 italic">"{note.msg}"</p>
                      </div>
                   </div>
                 ))}
              </div>
              <button className="w-full mt-8 py-3 bg-gray-50 text-gray-400 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-50 hover:text-blue-900 transition-all">
                 Tandai Semua Sudah Baca
              </button>
           </div>

           {/* Personal Wallet Stats */}
           <div className="bg-emerald-900 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                 <p className="text-[10px] font-black text-emerald-300 uppercase tracking-widest mb-4">Estimasi Realisasi Dana 2024</p>
                 <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-black">Rp 12.450</span>
                    <span className="text-lg font-bold text-emerald-400">.000</span>
                 </div>
                 <p className="text-[10px] text-emerald-200 mt-2 font-bold uppercase tracking-tight opacity-80">Total Biaya Perjalanan Terserap</p>
                 
                 <div className="mt-8 space-y-3">
                    <div className="flex justify-between text-[9px] font-black text-emerald-300 uppercase">
                       <span>Quota SPPD Terpakai</span>
                       <span>70%</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                       <div className="h-full bg-amber-400 w-[70%]"></div>
                    </div>
                 </div>
              </div>
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
           </div>

           <div className="p-6 bg-gray-50 rounded-[2.5rem] border border-gray-100 flex items-center space-x-4">
              <ShieldCheck size={32} className="text-blue-900 shrink-0" />
              <div>
                 <p className="text-[9px] text-gray-400 font-bold uppercase leading-none mb-1">E-Signature Info</p>
                 <h4 className="text-[10px] font-black text-gray-900 uppercase leading-relaxed tracking-tight">Dokumen yang diterbitkan memiliki QR-Code unik yang sah untuk pemeriksaan audit.</h4>
              </div>
           </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Halo, {user?.name}</h2>
          <p className="text-gray-500 font-medium mt-1">
            {user?.role === UserRole.SUPER_ADMIN ? 'Pusat kendali platform global.' : 
             user?.role === UserRole.ADMIN_INSTANSI ? 'Ringkasan manajemen instansi Anda.' :
             user?.role === UserRole.OPERATOR ? 'Panel operasional staf administrasi.' :
             user?.role === UserRole.PEJABAT_PENYETUJU ? 'Otoritas persetujuan & pengawasan anggaran.' : 
             'Status perjalanan dinas Anda.'}
          </p>
        </div>
        <div className="flex items-center space-x-3 text-xs font-bold text-gray-400 bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm">
           <Clock size={14} className="text-blue-900" />
           <span>Update: {new Date().toLocaleTimeString('id-ID')} WIB</span>
        </div>
      </div>

      {user?.role === UserRole.SUPER_ADMIN && renderSuperAdminDash()}
      {user?.role === UserRole.ADMIN_INSTANSI && renderInstitutionAdminDash()}
      {user?.role === UserRole.OPERATOR && renderOperatorDash()}
      {user?.role === UserRole.PEJABAT_PENYETUJU && renderApproverDash()}
      {user?.role === UserRole.PEGAWAI && renderStandardDash()}
    </div>
  );
};

export default DashboardPage;
