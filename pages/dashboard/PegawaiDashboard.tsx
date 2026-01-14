
import React from 'react';
import { 
  Briefcase, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  History, 
  PlusCircle, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  MapPin, 
  Calendar,
  Zap,
  Info,
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../App';
import { SPPDStatus } from '../../types';

const StatCard = ({ title, value, icon: Icon, color, subText }: { title: string, value: string, icon: any, color: string, subText: string }) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
    <div className={`w-14 h-14 ${color} text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
      <Icon size={28} />
    </div>
    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">{title}</p>
    <h3 className="text-3xl font-black text-gray-900">{value}</h3>
    <p className="text-[10px] font-bold text-gray-400 uppercase mt-2 flex items-center">
       <Info size={10} className="mr-1" /> {subText}
    </p>
  </div>
);

const PegawaiDashboard = () => {
  const { user } = useAuth();

  // Mock data untuk tampilan "Quick Glance"
  const recentSppds = [
    { id: '1', dest: 'Bandung', date: '20 Mei 2024', status: SPPDStatus.APPROVED, num: '090/SPPD/2024/001' },
    { id: '2', dest: 'Surabaya', date: '25 Mei 2024', status: SPPDStatus.PENDING, num: '090/SPPD/2024/002' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-1000">
      {/* Welcome Banner */}
      <div className="relative p-12 bg-gradient-to-br from-blue-900 to-indigo-900 rounded-[3rem] text-white overflow-hidden shadow-2xl">
         <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
               <div className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">
                  <ShieldCheck size={14} className="mr-2 text-emerald-400" /> Dokumen Anda Terlindungi
               </div>
               <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tight">
                  Halo {user?.name.split(' ')[0]}, Kelola Perjalanan Dinas Anda Secara <span className="text-blue-300 italic">Cerdas.</span>
               </h2>
               <p className="text-blue-100 text-lg font-medium opacity-80 leading-relaxed max-w-md">
                  Gunakan bantuan AI untuk menyusun narasi maksud perjalanan yang profesional dalam hitungan detik.
               </p>
               <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link to="/sppd/baru" className="bg-white text-blue-900 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-50 transition-all flex items-center justify-center shadow-xl">
                     <PlusCircle size={18} className="mr-2" /> Ajukan SPPD Baru
                  </Link>
                  <Link to="/sppd" className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all flex items-center justify-center">
                     Lihat SPPD Saya
                  </Link>
               </div>
            </div>
            <div className="hidden lg:flex justify-end">
               <div className="w-64 h-64 bg-white/10 rounded-full flex items-center justify-center relative animate-pulse">
                  <Zap size={120} className="text-blue-300" />
               </div>
            </div>
         </div>
         <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard title="Total Tugas" value="14" icon={Briefcase} color="bg-blue-900" subText="Tugas dinas tahun 2024" />
        <StatCard title="Sedang Diajukan" value="2" icon={Clock} color="bg-amber-500" subText="Menunggu persetujuan pimpinan" />
        <StatCard title="Telah Disetujui" value="11" icon={CheckCircle2} color="bg-emerald-600" subText="Dokumen siap cetak" />
        <StatCard title="Perlu Revisi" value="1" icon={AlertTriangle} color="bg-red-600" subText="Harap periksa catatan revisi" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         {/* Recent SPPD Section */}
         <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between px-2">
               <h4 className="text-xl font-black text-gray-900 flex items-center">
                  <History size={20} className="mr-2 text-blue-900" /> Pengajuan Terakhir
               </h4>
               <Link to="/sppd" className="text-[10px] font-black text-blue-900 uppercase tracking-widest hover:underline flex items-center">
                  Lihat Semua <ChevronRight size={14} className="ml-1" />
               </Link>
            </div>
            <div className="grid grid-cols-1 gap-6">
               {recentSppds.map((s) => (
                 <div key={s.id} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:shadow-xl transition-all">
                    <div className="flex items-center space-x-6">
                       <div className="w-16 h-16 bg-gray-50 text-gray-300 rounded-2xl flex items-center justify-center font-black group-hover:bg-blue-900 group-hover:text-white transition-all">
                          {s.dest.charAt(0)}
                       </div>
                       <div>
                          <p className="text-[10px] font-black text-blue-900 uppercase tracking-widest">{s.num}</p>
                          <h5 className="text-xl font-black text-gray-900 mt-1">{s.dest}</h5>
                          <div className="flex items-center text-xs font-bold text-gray-400 mt-2">
                             <Calendar size={12} className="mr-1.5" /> {s.date}
                          </div>
                       </div>
                    </div>
                    <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-6 md:pt-0 border-gray-50">
                       <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${s.status === SPPDStatus.APPROVED ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100 animate-pulse'}`}>
                          {s.status === SPPDStatus.APPROVED ? 'Disetujui' : 'Diproses'}
                       </span>
                       <button className="p-3 bg-gray-50 text-gray-400 hover:text-blue-900 hover:bg-white rounded-2xl transition-all shadow-sm">
                          <ArrowRight size={20} />
                       </button>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         {/* AI Guide Widget */}
         <div className="space-y-6">
            <h4 className="text-xl font-black text-gray-900 flex items-center px-2">
               <Sparkles size={20} className="mr-2 text-amber-500" /> Bantuan Cerdas AI
            </h4>
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6 relative overflow-hidden group">
               <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-50 rounded-full blur-3xl group-hover:bg-amber-100 transition-all"></div>
               <div className="relative z-10">
                  <h5 className="text-sm font-black text-gray-900 uppercase leading-relaxed mb-4">Cara Menyusun Narasi Profesional:</h5>
                  <ul className="space-y-6">
                     <li className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-blue-900 text-white rounded-xl flex items-center justify-center font-black text-xs shrink-0">1</div>
                        <p className="text-xs font-bold text-gray-600 leading-relaxed">Tulis poin singkat maksud Anda di form pengajuan (Contoh: "ikut rapat bappenas").</p>
                     </li>
                     <li className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-blue-900 text-white rounded-xl flex items-center justify-center font-black text-xs shrink-0">2</div>
                        <p className="text-xs font-bold text-gray-600 leading-relaxed">Klik tombol <span className="text-blue-900 font-black">"Formalisasi dg AI"</span> di samping kolom input.</p>
                     </li>
                     <li className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-blue-900 text-white rounded-xl flex items-center justify-center font-black text-xs shrink-0">3</div>
                        <p className="text-xs font-bold text-gray-600 leading-relaxed">Gemini AI akan mengubahnya menjadi kalimat birokrasi yang formal & elegan.</p>
                     </li>
                  </ul>
                  <div className="mt-10 p-6 bg-blue-50 rounded-3xl border border-blue-100">
                     <div className="flex items-center space-x-2 text-blue-900 font-black text-[10px] uppercase mb-2">
                        <UserCheck size={14} /> <span>Tips Akuntabilitas</span>
                     </div>
                     <p className="text-[10px] text-blue-700 font-bold leading-relaxed italic">"Gunakan kalimat AI untuk meminimalisir revisi dari pimpinan Anda."</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default PegawaiDashboard;
