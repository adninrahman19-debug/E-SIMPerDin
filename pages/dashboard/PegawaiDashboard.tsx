
import React, { useState } from 'react';
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
  UserCheck,
  Bell,
  Search,
  Download,
  FileText,
  Activity,
  ArrowUpRight,
  MessageSquare,
  FileEdit,
  Send,
  ClipboardCheck,
  RotateCcw,
  Printer,
  X,
  Eye,
  Wallet,
  Plane,
  FileCode,
  ShieldAlert,
  FileSearch
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../App';
import { SPPDStatus } from '../../types';

const StatCard = ({ title, value, icon: Icon, color, subText }: { title: string, value: string, icon: any, color: string, subText: string }) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
    <div className={`w-14 h-14 ${color} text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
      <Icon size={28} />
    </div>
    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">{title}</p>
    <h3 className="text-3xl font-black text-gray-900">{value}</h3>
    <p className="text-[10px] font-bold text-gray-400 uppercase mt-2 flex items-center">
       <Info size={10} className="mr-1 text-blue-900" /> {subText}
    </p>
  </div>
);

const PegawaiDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Mock data Notifikasi Persetujuan
  const notifications = [
    { id: 1, type: 'SUCCESS', title: 'SPPD Disetujui', msg: 'SPPD tujuan Bandung #001 telah disetujui Kepala Dinas.', time: '10 menit yang lalu' },
    { id: 2, type: 'WARNING', title: 'Revisi Diperlukan', msg: 'Mohon perbaiki lampiran pada SPPD tujuan Surabaya.', time: '2 jam yang lalu' },
  ];

  // Mock data SPPD yang butuh tindakan (Draft / Revisi)
  const actionRequiredSppds = [
    { id: '3', dest: 'Yogyakarta', date: '25 Mei 2024', status: SPPDStatus.REVISION, num: '090/SPPD/2024/003', note: 'Scan surat tugas tidak terbaca' },
    { id: '4', dest: 'Medan', date: '01 Juni 2024', status: SPPDStatus.DRAFT, num: 'DRAFT-2024-X8', note: 'Lengkapi estimasi biaya hotel' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-1000 pb-12">
      {/* Welcome Banner */}
      <div className="relative p-12 bg-gradient-to-br from-blue-900 to-indigo-900 rounded-[3rem] text-white overflow-hidden shadow-2xl">
         <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
               <div className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">
                  <ShieldCheck size={14} className="mr-2 text-emerald-400" /> Sesi Pegawai Terverifikasi
               </div>
               <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tight">
                  Halo {user?.name.split(' ')[0]}, Kelola SPPD Anda Secara <span className="text-blue-300 italic">Cerdas.</span>
               </h2>
               <p className="text-blue-100 text-lg font-medium opacity-80 leading-relaxed max-w-md">
                  Monitoring status pengajuan, akses dokumen pribadi, dan buat rencana dinas baru dalam satu ekosistem terenkripsi.
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
        <StatCard title="Sedang Diajukan" value="2" icon={Clock} color="bg-amber-500" subText="Menunggu persetujuan" />
        <StatCard title="Telah Disetujui" value="11" icon={CheckCircle2} color="bg-emerald-600" subText="Dokumen siap cetak" />
        <StatCard title="Perlu Revisi" value="1" icon={AlertTriangle} color="bg-red-600" subText="Cek instruksi perbaikan" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         
         {/* LEFT COLUMN: Antrean Tindakan */}
         <div className="lg:col-span-2 space-y-10">
            <section className="space-y-6">
               <div className="flex items-center justify-between px-2">
                  <h4 className="text-xl font-black text-gray-900 flex items-center">
                     <ClipboardCheck size={20} className="mr-2 text-red-600" /> Antrean Tindakan
                  </h4>
                  <span className="text-[10px] font-black text-red-600 bg-red-50 px-3 py-1 rounded-full uppercase">Perlu Perhatian Segera</span>
               </div>
               
               <div className="grid grid-cols-1 gap-4">
                  {actionRequiredSppds.map(item => (
                     <div key={item.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:border-blue-900/20 transition-all">
                        <div className="flex items-start space-x-4">
                           <div className={`p-3 rounded-2xl shrink-0 ${item.status === SPPDStatus.REVISION ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-400'}`}>
                              {item.status === SPPDStatus.REVISION ? <RotateCcw size={20} /> : <FileEdit size={20} />}
                           </div>
                           <div>
                              <div className="flex items-center space-x-2">
                                 <span className="text-[10px] font-black text-blue-900 uppercase tracking-widest">{item.num}</span>
                                 <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${item.status === SPPDStatus.REVISION ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-500'}`}>
                                    {item.status === SPPDStatus.REVISION ? 'REVISI' : 'DRAFT'}
                                 </span>
                              </div>
                              <h5 className="text-lg font-black text-gray-800">Tujuan: {item.dest}</h5>
                              <p className="text-xs text-gray-500 font-medium italic mt-1">"{item.note}"</p>
                           </div>
                        </div>
                        <Link 
                           to={`/sppd/edit/${item.id}`} 
                           className="bg-gray-900 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-900 transition-all flex items-center justify-center space-x-2 shadow-lg shadow-black/5"
                        >
                           <FileEdit size={14} />
                           <span>{item.status === SPPDStatus.REVISION ? 'Perbaiki Berkas' : 'Lanjutkan Input'}</span>
                        </Link>
                     </div>
                  ))}
               </div>
            </section>

            {/* Quick Actions Hub */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <Link to="/sppd/baru" className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center justify-between group hover:border-blue-900/20 transition-all">
                  <div className="flex items-center space-x-5">
                     <div className="w-12 h-12 bg-blue-50 text-blue-900 rounded-2xl flex items-center justify-center group-hover:bg-blue-900 group-hover:text-white transition-all">
                        <PlusCircle size={24} />
                     </div>
                     <div>
                        <h6 className="font-black text-gray-900 uppercase text-xs tracking-tight">Ajukan Baru</h6>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Input Rencana Dinas</p>
                     </div>
                  </div>
                  <ChevronRight size={20} className="text-gray-200 group-hover:text-blue-900 group-hover:translate-x-1 transition-all" />
               </Link>
               <Link to="/sppd" className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center justify-between group hover:border-indigo-900/20 transition-all">
                  <div className="flex items-center space-x-5">
                     <div className="w-12 h-12 bg-indigo-50 text-indigo-900 rounded-2xl flex items-center justify-center group-hover:bg-indigo-900 group-hover:text-white transition-all">
                        <FileText size={24} />
                     </div>
                     <div>
                        <h6 className="font-black text-gray-900 uppercase text-xs tracking-tight">Daftar SPPD</h6>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Pantau Seluruh Berkas</p>
                     </div>
                  </div>
                  <ChevronRight size={20} className="text-gray-200 group-hover:text-indigo-900 group-hover:translate-x-1 transition-all" />
               </Link>
            </section>
         </div>

         {/* RIGHT COLUMN: Notifikasi & Keamanan */}
         <div className="space-y-10">
            {/* Notification Center */}
            <section className="space-y-6">
               <h4 className="text-xl font-black text-gray-900 flex items-center px-2">
                  <Bell size={20} className="mr-2 text-blue-900" /> Notifikasi
               </h4>
               <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-4">
                  {notifications.map(n => (
                     <div key={n.id} className="p-5 rounded-3xl border border-gray-50 bg-gray-50/30 group hover:bg-white hover:border-blue-900/10 transition-all cursor-pointer">
                        <div className="flex items-start space-x-4">
                           <div className={`p-2.5 rounded-xl shrink-0 ${n.type === 'SUCCESS' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                              {n.type === 'SUCCESS' ? <CheckCircle2 size={18} /> : <MessageSquare size={18} />}
                           </div>
                           <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-center mb-1">
                                 <h5 className="text-xs font-black text-gray-900 uppercase truncate">{n.title}</h5>
                                 <span className="text-[8px] font-bold text-gray-400 uppercase">{n.time}</span>
                              </div>
                              <p className="text-xs text-gray-500 leading-relaxed font-medium line-clamp-2">{n.msg}</p>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </section>

            <div className="p-8 bg-gray-900 text-white rounded-[2.5rem] shadow-xl relative overflow-hidden group">
               <div className="relative z-10">
                  <ShieldAlert size={32} className="text-amber-400 mb-6" />
                  <h4 className="text-lg font-black mb-2">Proteksi Biaya & Data</h4>
                  <p className="text-blue-100 text-[10px] font-bold uppercase leading-relaxed tracking-tight opacity-80">
                     Sesuai regulasi unit, Pegawai hanya diizinkan untuk melihat data pribadi. Perubahan anggaran (SBM) dikunci dan dikelola secara otomatis oleh sistem.
                  </p>
               </div>
               <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default PegawaiDashboard;
