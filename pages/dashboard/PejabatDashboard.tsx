
import React, { useState, useEffect, useCallback } from 'react';
import { 
  Clock, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  History, 
  TrendingUp, 
  ChevronRight, 
  Zap, 
  AlertTriangle,
  UserCheck,
  ShieldCheck,
  Calendar,
  MessageSquare,
  ArrowUpRight,
  Eye,
  RotateCcw,
  X,
  Sparkles,
  RefreshCw,
  Wallet,
  MapPin,
  FileCheck,
  Ban,
  ArrowDownToLine,
  // Added missing import for FileSearch
  FileSearch
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
import { GoogleGenAI } from "@google/genai";

// Mock Data untuk Tren Approval Pimpinan
const approvalTrendData = [
  { day: 'Sen', approved: 4, rejected: 1 },
  { day: 'Sel', approved: 8, rejected: 0 },
  { day: 'Rab', approved: 5, rejected: 2 },
  { day: 'Kam', approved: 12, rejected: 1 },
  { day: 'Jum', approved: 10, rejected: 0 },
  { day: 'Sab', approved: 2, rejected: 0 },
  { day: 'Min', approved: 0, rejected: 0 },
];

const StatCard = ({ title, value, icon: Icon, color, subText, trend }: any) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group relative overflow-hidden">
    <div className="relative z-10">
      <div className="flex items-start justify-between mb-6">
        <div className={`p-4 rounded-2xl ${color} text-white shadow-lg shadow-black/5 group-hover:scale-110 transition-transform`}>
          <Icon size={28} />
        </div>
        {trend && (
          <div className="flex items-center px-2 py-1 rounded-lg bg-emerald-50 text-emerald-600 text-[10px] font-black">
            <TrendingUp size={14} className="mr-1" /> {trend}
          </div>
        )}
      </div>
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">{title}</p>
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

const PejabatDashboard = () => {
  // States
  const [pendingApprovals, setPendingApprovals] = useState([
    { id: '2', num: '090/SPPD/2024/002', employee: 'Siti Aminah', unit: 'Bid. Angkutan', destination: 'Surabaya', purpose: 'Konsultasi Perizinan Trayek AKAP', date: '22 Mei 2024', returnDate: '24 Mei 2024', cost: 4200000, transport: 'Pesawat Terbang', urgent: true },
    { id: '5', num: '090/SPPD/2024/005', employee: 'Hendra Wijaya', unit: 'Bag. Umum', destination: 'Jakarta', purpose: 'Koordinasi Penataan Aset Daerah', date: '28 Mei 2024', returnDate: '30 Mei 2024', cost: 3500000, transport: 'Pesawat Terbang', urgent: false },
  ]);

  const [selectedSppd, setSelectedSppd] = useState<any | null>(null);
  const [officialNote, setOfficialNote] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);

  // AI Analysis logic
  const analyzeSppd = useCallback(async (sppd: any) => {
    setIsAiLoading(true);
    setAiAnalysis(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analisis urgensi dan kelayakan SPPD berikut untuk Pejabat Penyetuju: 
          Nomor: ${sppd.num}, 
          Nama: ${sppd.employee}, 
          Tujuan: ${sppd.destination}, 
          Maksud: ${sppd.purpose}, 
          Biaya: Rp ${sppd.cost.toLocaleString('id-ID')}. 
          Berikan jawaban dalam 3 poin bullet singkat (Urgensi, Kepatuhan Anggaran, dan Rekomendasi). Gunakan bahasa formal Indonesia.`,
      });
      setAiAnalysis(response.text || "Gagal mendapatkan analisis AI.");
    } catch (error) {
      setAiAnalysis("Sistem AI sedang sibuk. Silakan tinjau berkas secara manual.");
    } finally {
      setIsAiLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedSppd) {
      analyzeSppd(selectedSppd);
    }
  }, [selectedSppd, analyzeSppd]);

  const handleDecision = (id: string, status: SPPDStatus) => {
    if ((status === SPPDStatus.REVISION || status === SPPDStatus.REJECTED) && !officialNote.trim()) {
      alert('Harap masukkan catatan resmi untuk alasan revisi atau penolakan.');
      return;
    }

    // Simulasi penyimpanan ke database & Audit Log
    console.log(`Action: ${status}, ID: ${id}, Note: ${officialNote}, Timestamp: ${new Date().toISOString()}`);
    
    setPendingApprovals(pendingApprovals.filter(item => item.id !== id));
    alert(`Keputusan berhasil disimpan! Status SPPD: ${status.replace('_', ' ')}. Tindakan telah terekam di Audit Log.`);
    
    setSelectedSppd(null);
    setOfficialNote('');
    setAiAnalysis(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      
      {/* 1. Otoritas KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCard 
          title="Menunggu Otorisasi" 
          value={`${pendingApprovals.length} Berkas`} 
          icon={Clock} 
          color="bg-amber-500" 
          subText="Butuh tindakan segera"
          trend="Prioritas"
        />
        <StatCard 
          title="SPPD Disetujui" 
          value="142 Berkas" 
          icon={CheckCircle2} 
          color="bg-emerald-600" 
          subText="Total Mei 2024"
          trend="+18%"
        />
        <StatCard 
          title="Ditolak / Revisi" 
          value="8 Berkas" 
          icon={XCircle} 
          color="bg-red-600" 
          subText="Dikembalikan ke staf"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 2. Urgent Approval Queue */}
        <div className="lg:col-span-2 bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full min-h-[500px]">
           <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/20">
              <div className="flex items-center space-x-4">
                 <div className="w-12 h-12 bg-white text-amber-500 rounded-2xl flex items-center justify-center shadow-sm border border-gray-100">
                    <Zap size={24} className="fill-amber-500" />
                 </div>
                 <div>
                    <h4 className="text-xl font-black text-gray-900 uppercase tracking-tight leading-none">Antrean Otorisasi Pimpinan</h4>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1.5">Klik berkas untuk meninjau detail & memberikan keputusan</p>
                 </div>
              </div>
              <Link to="/sppd" className="text-[10px] font-black text-blue-900 uppercase tracking-[0.2em] hover:underline flex items-center">
                 Daftar Semua <ChevronRight size={14} className="ml-1" />
              </Link>
           </div>

           <div className="flex-1 overflow-y-auto custom-scrollbar">
              {pendingApprovals.length > 0 ? (
                <div className="divide-y divide-gray-50">
                   {pendingApprovals.map((item) => (
                     <div key={item.id} className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:bg-amber-50/20 transition-all duration-300">
                        <div className="flex items-center space-x-6">
                           <div className="w-14 h-14 bg-gray-50 text-gray-400 rounded-2xl flex items-center justify-center font-black group-hover:bg-blue-900 group-hover:text-white transition-all text-xl">
                              {item.employee.charAt(0)}
                           </div>
                           <div>
                              <div className="flex items-center space-x-2">
                                 <span className="font-mono text-xs font-black text-blue-900 leading-none">{item.num}</span>
                                 {item.urgent && (
                                   <span className="px-2 py-0.5 bg-red-100 text-red-600 text-[8px] font-black uppercase rounded animate-pulse">Urgent</span>
                                 )}
                              </div>
                              <h5 className="text-lg font-black text-gray-900 mt-1">{item.employee}</h5>
                              <div className="flex items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1.5 space-x-4">
                                 <span className="flex items-center"><Calendar size={12} className="mr-1" /> {item.date}</span>
                                 <span className="flex items-center"><ArrowUpRight size={12} className="mr-1" /> {item.destination}</span>
                              </div>
                           </div>
                        </div>
                        <button 
                          onClick={() => setSelectedSppd(item)}
                          className="bg-white border-2 border-amber-200 text-amber-600 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-amber-500 hover:text-white transition-all shadow-sm flex items-center justify-center space-x-2"
                        >
                           <Eye size={16} />
                           <span>Tinjau Berkas</span>
                        </button>
                     </div>
                   ))}
                </div>
              ) : (
                <div className="p-20 text-center flex flex-col items-center">
                   <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
                      <CheckCircle2 size={40} className="text-emerald-500" />
                   </div>
                   <h5 className="text-xl font-black text-gray-900 uppercase">Antrean Kosong</h5>
                   <p className="text-gray-400 text-sm font-medium mt-2">Seluruh dokumen telah Anda proses secara tepat waktu.</p>
                </div>
              )}
           </div>
        </div>

        {/* 3. Performance & Insights Sidebar */}
        <div className="space-y-8">
           <div className="bg-blue-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
              <div className="relative z-10">
                 <ShieldCheck size={40} className="text-amber-400 mb-8 group-hover:rotate-12 transition-transform duration-500" />
                 <h4 className="text-2xl font-black mb-4 tracking-tight leading-tight">Digital Integrity</h4>
                 <p className="text-blue-100 text-sm leading-relaxed opacity-80 mb-10 font-medium italic">
                   "Persetujuan Anda merupakan otorisasi hukum yang mengikat. Seluruh dokumen yang Anda tanda tangani dilindungi dengan fingerprint digital unik."
                 </p>
                 <div className="flex items-center space-x-3 text-[10px] font-black uppercase text-emerald-400 bg-emerald-400/10 w-fit px-4 py-2 rounded-xl border border-emerald-400/20">
                    <UserCheck size={14} className="mr-2" /> Verified Official
                 </div>
              </div>
              <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
           </div>

           <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                 <h4 className="text-lg font-black text-gray-900 uppercase tracking-tight">Tren Otorisasi</h4>
                 <div className="w-2 h-2 rounded-full bg-blue-900 animate-ping"></div>
              </div>
              <div className="h-48 w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={approvalTrendData}>
                       <defs>
                         <linearGradient id="colorApproved" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#1e3a8a" stopOpacity={0.1}/>
                           <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0}/>
                         </linearGradient>
                       </defs>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                       <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 10, fontWeight: 700}} dy={10} />
                       <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                       <Area type="monotone" dataKey="approved" stroke="#1e3a8a" strokeWidth={4} fillOpacity={1} fill="url(#colorApproved)" />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
              <div className="mt-6 flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                 <div className="text-center">
                    <p className="text-[8px] font-black text-gray-400 uppercase">Disetujui</p>
                    <p className="text-lg font-black text-gray-900">41</p>
                 </div>
                 <div className="w-px h-8 bg-gray-200"></div>
                 <div className="text-center">
                    <p className="text-[8px] font-black text-gray-400 uppercase">Ditolak</p>
                    <p className="text-lg font-black text-red-600">4</p>
                 </div>
                 <div className="w-px h-8 bg-gray-200"></div>
                 <div className="text-center">
                    <p className="text-[8px] font-black text-gray-400 uppercase">Efisiensi</p>
                    <p className="text-lg font-black text-emerald-600">92%</p>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* 4. Keputusan Terakhir Table */}
      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/20">
           <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white text-blue-900 rounded-2xl flex items-center justify-center shadow-sm border border-gray-100">
                 <History size={24} />
              </div>
              <div>
                 <h4 className="text-xl font-black text-gray-900 uppercase tracking-tight leading-none">Riwayat Keputusan Terbaru</h4>
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1.5">Jejak otorisasi yang telah Anda berikan</p>
              </div>
           </div>
           <Link to="/riwayat-persetujuan" className="bg-blue-900 text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-800 transition-all shadow-xl shadow-blue-900/20 flex items-center space-x-2">
              <FileSearch size={16} />
              <span>Buka Semua Riwayat</span>
           </Link>
        </div>

        <div className="overflow-x-auto">
           <table className="w-full text-left">
              <thead>
                 <tr className="text-[10px] text-gray-400 uppercase font-black tracking-[0.2em] bg-gray-50/50 border-b border-gray-100">
                    <th className="px-10 py-6">No. SPPD & Pegawai</th>
                    <th className="px-6 py-6">Keputusan Anda</th>
                    <th className="px-6 py-6">Alasan / Catatan</th>
                    <th className="px-10 py-6 text-right">Waktu Keputusan</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                 <tr className="group hover:bg-emerald-50/20 transition-all duration-300">
                    <td className="px-10 py-6">
                       <p className="font-mono text-xs font-black text-blue-900 leading-none">#090/SPPD/2024/001</p>
                       <p className="text-sm font-bold text-gray-800 mt-1.5">Andi Pratama</p>
                    </td>
                    <td className="px-6 py-6">
                       <span className="inline-flex px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600 border border-emerald-100">
                          Disetujui
                       </span>
                    </td>
                    <td className="px-6 py-6">
                       <p className="text-xs font-medium text-gray-500 italic">"Penting untuk koordinasi teknis aplikasi."</p>
                    </td>
                    <td className="px-10 py-6 text-right">
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Hari Ini, 14:20 WIB</p>
                    </td>
                 </tr>
                 <tr className="group hover:bg-red-50/20 transition-all duration-300">
                    <td className="px-10 py-6">
                       <p className="font-mono text-xs font-black text-blue-900 leading-none">#090/SPPD/2024/003</p>
                       <p className="text-sm font-bold text-gray-800 mt-1.5">Budi Raharjo</p>
                    </td>
                    <td className="px-6 py-6">
                       <span className="inline-flex px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-red-50 text-red-600 border border-red-100">
                          Revisi
                       </span>
                    </td>
                    <td className="px-6 py-6">
                       <p className="text-xs font-medium text-gray-500 italic">"Lampiran surat undangan belum lengkap."</p>
                    </td>
                    <td className="px-10 py-6 text-right">
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Kemarin, 10:15 WIB</p>
                    </td>
                 </tr>
              </tbody>
           </table>
        </div>
      </div>

      {/* 5. MODAL REVIEW SPPD (DETAIL & APPROVAL ENGINE) */}
      {selectedSppd && (
        <div className="fixed inset-0 bg-blue-900/60 backdrop-blur-md flex items-center justify-center z-[100] p-4">
           <div className="bg-white w-full max-w-5xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300 flex flex-col max-h-[95vh]">
              {/* Modal Header */}
              <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
                 <div className="flex items-center space-x-5">
                    <div className="w-14 h-14 bg-blue-900 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-blue-900/20">
                       <FileCheck size={28} />
                    </div>
                    <div>
                       <h4 className="text-2xl font-black text-gray-900 tracking-tight leading-none uppercase tracking-[0.05em]">Lembar Otorisasi Berkas</h4>
                       <p className="text-sm text-gray-500 font-medium mt-1">Review detail SPPD #{selectedSppd.num}</p>
                    </div>
                 </div>
                 <button onClick={() => setSelectedSppd(null)} className="p-4 bg-white border border-gray-100 hover:bg-gray-100 rounded-3xl text-gray-400 transition-all shadow-sm">
                    <X size={24} />
                 </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Column Left: Information */}
                    <div className="space-y-10">
                       <section className="space-y-6">
                          <h5 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center">
                             <UserCheck size={16} className="mr-2 text-blue-900" /> Identitas Pelaksana
                          </h5>
                          <div className="p-6 bg-gray-50 rounded-[2rem] border border-gray-100 space-y-4">
                             <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                                <span className="text-[10px] font-black text-gray-400 uppercase">Nama Lengkap</span>
                                <span className="text-sm font-black text-gray-900">{selectedSppd.employee}</span>
                             </div>
                             <div className="flex justify-between items-center">
                                <span className="text-[10px] font-black text-gray-400 uppercase">Unit Kerja</span>
                                <span className="text-sm font-bold text-blue-900">{selectedSppd.unit}</span>
                             </div>
                          </div>
                       </section>

                       <section className="space-y-6">
                          <h5 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center">
                             <MapPin size={16} className="mr-2 text-blue-900" /> Rincian Tugas
                          </h5>
                          <div className="p-8 bg-blue-50/50 rounded-[2rem] border border-blue-100 space-y-6">
                             <div>
                                <p className="text-[9px] font-black text-blue-900 uppercase mb-2">Maksud / Tujuan Perjalanan</p>
                                <p className="text-sm font-bold text-gray-800 leading-relaxed">"{selectedSppd.purpose}"</p>
                             </div>
                             <div className="grid grid-cols-2 gap-6">
                                <div>
                                   <p className="text-[9px] font-black text-blue-900 uppercase mb-1">Kota Tujuan</p>
                                   <p className="text-sm font-black text-gray-900">{selectedSppd.destination}</p>
                                </div>
                                <div>
                                   <p className="text-[9px] font-black text-blue-900 uppercase mb-1">Transportasi</p>
                                   <p className="text-sm font-black text-gray-900">{selectedSppd.transport}</p>
                                </div>
                             </div>
                          </div>
                       </section>

                       <section className="space-y-6">
                          <div className="flex items-center justify-between">
                             <h5 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center">
                                <Wallet size={16} className="mr-2 text-emerald-600" /> Estimasi Anggaran
                             </h5>
                             <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">Verified SBM 2024</span>
                          </div>
                          <div className="p-8 bg-gray-900 rounded-[2.5rem] shadow-xl relative overflow-hidden group">
                             <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 relative z-10">Total Plafon Biaya</p>
                             <h4 className="text-3xl font-black text-white tracking-tight relative z-10">Rp {selectedSppd.cost.toLocaleString('id-ID')}</h4>
                             <div className="mt-4 flex items-center space-x-2 text-[10px] font-bold text-gray-400 relative z-10">
                                <AlertTriangle size={12} className="text-amber-400" />
                                <span>Biaya dapat berubah sesuai realisasi kwitansi.</span>
                             </div>
                             <div className="absolute -right-6 -bottom-6 opacity-10 group-hover:scale-110 transition-transform duration-700">
                                <TrendingUp size={120} />
                             </div>
                          </div>
                       </section>
                    </div>

                    {/* Column Right: AI Analysis & Decision */}
                    <div className="space-y-8 flex flex-col">
                       {/* AI Analysis Widget */}
                       <div className="bg-gradient-to-br from-indigo-900 to-blue-950 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group flex-1 min-h-[300px]">
                          <div className="relative z-10">
                             <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center space-x-3">
                                   <Sparkles size={24} className="text-amber-400 animate-pulse" />
                                   <h5 className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-300 leading-none">Smart Otorisasi AI</h5>
                                </div>
                                <button onClick={() => analyzeSppd(selectedSppd)} className="p-2 hover:bg-white/10 rounded-xl transition-all">
                                   <RefreshCw size={16} className={isAiLoading ? 'animate-spin' : ''} />
                                </button>
                             </div>

                             {isAiLoading ? (
                                <div className="flex flex-col items-center justify-center py-20 space-y-4">
                                   <RefreshCw size={32} className="animate-spin text-blue-300" />
                                   <p className="text-xs font-black uppercase tracking-widest animate-pulse">Menganalisis urgensi berkas...</p>
                                </div>
                             ) : (
                                <div className="space-y-6 animate-in fade-in duration-700">
                                   <div className="text-sm font-medium leading-relaxed max-w-none text-blue-100/90 whitespace-pre-wrap">
                                      {aiAnalysis || "Klik ikon refresh untuk memulai analisis kepatuhan."}
                                   </div>
                                   <div className="pt-6 border-t border-white/10 flex items-center space-x-3">
                                      <ShieldCheck size={16} className="text-emerald-400" />
                                      <p className="text-[9px] font-bold text-blue-300 uppercase">Analisis didasarkan pada data historis & regulasi SBM.</p>
                                   </div>
                                </div>
                             )}
                          </div>
                          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
                       </div>

                       {/* Official Note Input */}
                       <div className="space-y-4">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4 flex items-center">
                             <MessageSquare size={14} className="mr-2 text-blue-900" /> Catatan Resmi Penyetuju
                          </label>
                          <textarea 
                             className="w-full h-32 p-8 bg-gray-50 border border-gray-200 rounded-[2.5rem] outline-none focus:ring-4 focus:ring-blue-900/5 focus:bg-white focus:border-blue-900 transition-all font-medium text-gray-700 resize-none shadow-inner"
                             placeholder="Masukkan arahan atau alasan jika dokumen ditolak/perlu revisi..."
                             value={officialNote}
                             onChange={(e) => setOfficialNote(e.target.value)}
                          />
                       </div>

                       {/* Decision Controls */}
                       <div className="grid grid-cols-3 gap-4 pt-4">
                          <button 
                             onClick={() => handleDecision(selectedSppd.id, SPPDStatus.REJECTED)}
                             className="bg-red-50 text-red-600 p-5 rounded-3xl font-black text-[10px] uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all flex flex-col items-center justify-center space-y-2 border border-red-100 shadow-sm"
                          >
                             <Ban size={24} />
                             <span>Tolak Berkas</span>
                          </button>
                          <button 
                             onClick={() => handleDecision(selectedSppd.id, SPPDStatus.REVISION)}
                             className="bg-amber-50 text-amber-600 p-5 rounded-3xl font-black text-[10px] uppercase tracking-widest hover:bg-amber-500 hover:text-white transition-all flex flex-col items-center justify-center space-y-2 border border-amber-100 shadow-sm"
                          >
                             <RotateCcw size={24} />
                             <span>Minta Revisi</span>
                          </button>
                          <button 
                             onClick={() => handleDecision(selectedSppd.id, SPPDStatus.APPROVED)}
                             className="bg-blue-900 text-white p-5 rounded-3xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-800 transition-all flex flex-col items-center justify-center space-y-2 shadow-2xl shadow-blue-900/30"
                          >
                             <FileCheck size={24} />
                             <span>Setujui SPPD</span>
                          </button>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Modal Footer */}
              <div className="p-8 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                 <div className="flex items-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    <ShieldCheck size={20} className="mr-3 text-blue-900" /> Otorisasi Tanda Tangan Elektronik v2.5
                 </div>
                 <button 
                    onClick={() => setSelectedSppd(null)}
                    className="px-10 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-gray-900 transition-colors"
                 >
                    Tutup Tanpa Perubahan
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default PejabatDashboard;
