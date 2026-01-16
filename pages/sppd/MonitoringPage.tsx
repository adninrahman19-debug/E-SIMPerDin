
import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Clock, 
  Search, 
  Filter, 
  ChevronRight, 
  MessageSquare, 
  AlertTriangle, 
  CheckCircle2, 
  UserCheck, 
  ArrowRight,
  Eye,
  FileEdit,
  Zap,
  RotateCcw,
  X,
  History,
  FileText,
  User,
  Calendar,
  /* Added missing MapPin import */
  MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SPPDStatus } from '../../types';

const MonitoringPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSppdHistory, setSelectedSppdHistory] = useState<any | null>(null);

  const mockMonitoringData = [
    { 
      id: '1', 
      num: '090/SPPD/2024/002', 
      employee: 'Siti Aminah', 
      dest: 'Surabaya', 
      status: SPPDStatus.PENDING,
      currentStep: 2,
      steps: [
        { name: 'Operator', status: 'DONE', user: 'Staf Admin (Anda)', time: '12 Mei, 09:00' },
        { name: 'Kasubag Umum', status: 'ACTIVE', user: 'Drs. H. Mulyadi', time: 'Pending' },
        { name: 'Kepala Dinas', status: 'WAITING', user: 'Budi Santoso', time: '-' }
      ]
    },
    { 
      id: '2', 
      num: '090/SPPD/2024/003', 
      employee: 'Budi Raharjo', 
      dest: 'Yogyakarta', 
      status: SPPDStatus.REVISION,
      currentStep: 3,
      note: 'Lampiran surat undangan belum jelas scan-nya. Harap upload ulang dengan resolusi lebih tinggi.',
      steps: [
        { name: 'Operator', status: 'DONE', user: 'Staf Admin (Anda)', time: '10 Mei, 08:30' },
        { name: 'Kasubag Umum', status: 'DONE', user: 'Drs. H. Mulyadi', time: '11 Mei, 14:20' },
        { name: 'Kepala Dinas', status: 'REVISION', user: 'Budi Santoso', time: '13 Mei, 10:15' }
      ]
    },
    { 
      id: '3', 
      num: '090/SPPD/2024/005', 
      employee: 'Hendra Wijaya', 
      dest: 'Jakarta', 
      status: SPPDStatus.PENDING,
      currentStep: 1,
      steps: [
        { name: 'Operator', status: 'ACTIVE', user: 'Staf Admin (Anda)', time: 'Hari ini, 08:45' },
        { name: 'Kasubag Umum', status: 'WAITING', user: 'Drs. H. Mulyadi', time: '-' },
        { name: 'Kepala Dinas', status: 'WAITING', user: 'Budi Santoso', time: '-' }
      ]
    }
  ];

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Monitoring Persetujuan</h2>
          <p className="text-gray-500 text-sm font-medium">Pantau status approval, riwayat jejak audit, dan catatan revisi pimpinan.</p>
        </div>
        <div className="flex items-center space-x-2 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
           <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Cari No. SPPD..." 
                className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold outline-none w-48 focus:ring-2 focus:ring-blue-900/10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>
        </div>
      </div>

      {/* Stats Summary Area */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
         <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
               <Clock size={24} />
            </div>
            <div>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Sedang Diproses</p>
               <h4 className="text-xl font-black text-gray-900">12 Dokumen</h4>
            </div>
         </div>
         <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center">
               <AlertTriangle size={24} />
            </div>
            <div>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Perlu Perbaikan</p>
               <h4 className="text-xl font-black text-red-600">5 Dokumen</h4>
            </div>
         </div>
         <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
               <CheckCircle2 size={24} />
            </div>
            <div>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Selesai Approval</p>
               <h4 className="text-xl font-black text-emerald-600">8 Dokumen</h4>
            </div>
         </div>
      </div>

      {/* Monitoring List */}
      <div className="space-y-6">
        {mockMonitoringData.map((item) => (
          <div key={item.id} className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden group hover:border-blue-900/20 transition-all">
            <div className="p-8">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                {/* 1. Status Approval & Info Utama */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-3">
                    <span className="font-mono text-sm font-black text-blue-900 leading-none">#{item.num}</span>
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${item.status === SPPDStatus.REVISION ? 'bg-red-50 text-red-600 border-red-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                      {item.status.replace('_', ' ')}
                    </span>
                  </div>
                  <h4 className="text-xl font-black text-gray-900 leading-tight">{item.employee}</h4>
                  <div className="flex items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest space-x-4">
                    <span className="flex items-center"><MapPin size={12} className="mr-1" /> {item.dest}</span>
                    <span className="flex items-center"><Calendar size={12} className="mr-1" /> Input: 12 Mei 2024</span>
                  </div>
                </div>

                {/* 2. Visual Progress Bar (Status Approval) */}
                <div className="flex-1 flex items-center justify-between relative px-4 min-w-[300px]">
                  <div className="absolute left-10 right-10 top-1/2 -translate-y-1/2 h-0.5 bg-gray-100 -z-10"></div>
                  {item.steps.map((step, idx) => (
                    <div key={idx} className="flex flex-col items-center space-y-2 relative z-10 bg-white px-2">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-sm transition-all ${
                        step.status === 'DONE' ? 'bg-emerald-500 text-white' : 
                        step.status === 'ACTIVE' ? 'bg-blue-900 text-white animate-pulse' : 
                        step.status === 'REVISION' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {step.status === 'DONE' ? <CheckCircle2 size={18} /> : 
                         step.status === 'REVISION' ? <AlertTriangle size={18} /> : 
                         <UserCheck size={18} />}
                      </div>
                      <div className="text-center">
                        <p className="text-[9px] font-black uppercase tracking-tighter text-gray-900">{step.name}</p>
                        <p className="text-[8px] font-bold text-gray-400 uppercase">{step.time}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 3. Aksi Cepat Operator */}
                <div className="flex items-center space-x-3">
                  {item.status === SPPDStatus.REVISION && (
                    <Link to={`/sppd/edit/${item.id}`} className="p-3 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-2xl transition-all shadow-sm">
                      <FileEdit size={20} />
                    </Link>
                  )}
                  <button 
                    onClick={() => setSelectedSppdHistory(item)}
                    className="flex items-center space-x-2 px-6 py-3 bg-blue-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20"
                  >
                    <History size={16} />
                    <span>Riwayat</span>
                  </button>
                </div>
              </div>

              {/* 4. Catatan Revisi dari Pejabat (Prominent Display) */}
              {item.note && (
                <div className="mt-8 p-5 bg-red-50 rounded-2xl border border-red-100 flex items-start space-x-4 animate-in slide-in-from-top-2">
                  <div className="p-2 bg-white rounded-xl text-red-600 shadow-sm shrink-0">
                    <MessageSquare size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-1">Instruksi Perbaikan Pimpinan:</p>
                    <p className="text-sm font-bold text-red-900 leading-relaxed italic">"{item.note}"</p>
                    <p className="text-[9px] text-red-400 font-bold uppercase mt-2">Diterima: 13 Mei 2024, 10:15 WIB</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 6. MODAL RIWAYAT PERSETUJUAN (Jejeak Audit) */}
      {selectedSppdHistory && (
        <div className="fixed inset-0 bg-blue-900/60 backdrop-blur-md flex items-center justify-center z-[100] p-4">
           <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300 flex flex-col max-h-[90vh]">
              <div className="p-10 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
                 <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-blue-900 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-blue-900/20"><History size={28} /></div>
                    <div>
                       <h4 className="text-2xl font-black text-gray-900 tracking-tight leading-none uppercase tracking-[0.05em]">Jejak Audit Approval</h4>
                       <p className="text-sm text-gray-500 font-medium mt-1">No SPPD: {selectedSppdHistory.num}</p>
                    </div>
                 </div>
                 <button onClick={() => setSelectedSppdHistory(null)} className="p-4 bg-white border border-gray-100 hover:bg-gray-100 rounded-3xl text-gray-400 transition-all shadow-sm"><X size={24} /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-10 custom-scrollbar space-y-10">
                 <div className="space-y-8 relative before:absolute before:left-[23px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
                    {selectedSppdHistory.steps.map((log: any, i: number) => (
                      <div key={i} className="flex items-start space-x-6 relative z-10">
                         <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm border-2 border-white shrink-0 ${
                            log.status === 'DONE' ? 'bg-emerald-500 text-white' : 
                            log.status === 'ACTIVE' ? 'bg-amber-500 text-white' : 
                            log.status === 'REVISION' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-300'
                         }`}>
                            {log.status === 'DONE' ? <CheckCircle2 size={20} /> : log.status === 'REVISION' ? <AlertTriangle size={20} /> : <User size={20} />}
                         </div>
                         <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                               <h5 className="font-black text-gray-900 uppercase text-xs tracking-tight">{log.name}</h5>
                               <span className="text-[10px] font-bold text-gray-400 uppercase">{log.time}</span>
                            </div>
                            <p className="text-sm font-bold text-gray-600">{log.user}</p>
                            <div className="mt-2 inline-flex px-3 py-1 bg-gray-50 rounded-lg border border-gray-100 text-[9px] font-black uppercase text-gray-400 tracking-widest">
                               {log.status === 'DONE' ? 'Verified & Approved' : log.status === 'REVISION' ? 'Returned with Note' : 'Waiting Action'}
                            </div>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="p-10 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                 <div className="flex items-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    <ShieldCheck size={18} className="mr-2 text-blue-900" /> Sistem Terenkripsi v2.5
                 </div>
                 <button 
                  onClick={() => setSelectedSppdHistory(null)}
                  className="bg-blue-900 text-white px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-blue-900/20 hover:bg-blue-800 transition-all"
                 >
                    Tutup Riwayat
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default MonitoringPage;
