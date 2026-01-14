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
  // Added missing Zap icon
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SPPDStatus } from '../../types';

const MonitoringPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const mockMonitoringData = [
    { 
      id: '1', 
      num: '090/SPPD/2024/002', 
      employee: 'Siti Aminah', 
      dest: 'Surabaya', 
      status: SPPDStatus.PENDING,
      currentStep: 2,
      steps: [
        { name: 'Operator', status: 'DONE', time: '12 Mei' },
        { name: 'Keuangan', status: 'ACTIVE', time: 'Pending' },
        { name: 'Kepala Dinas', status: 'WAITING', time: '-' }
      ]
    },
    { 
      id: '2', 
      num: '090/SPPD/2024/003', 
      employee: 'Budi Raharjo', 
      dest: 'Yogyakarta', 
      status: SPPDStatus.REVISION,
      currentStep: 3,
      note: 'Lampiran surat undangan belum jelas scan-nya.',
      steps: [
        { name: 'Operator', status: 'DONE', time: '10 Mei' },
        { name: 'Keuangan', status: 'DONE', time: '11 Mei' },
        { name: 'Kepala Dinas', status: 'REVISION', time: '13 Mei' }
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
        { name: 'Operator', status: 'ACTIVE', time: 'Today' },
        { name: 'Keuangan', status: 'WAITING', time: '-' },
        { name: 'Kepala Dinas', status: 'WAITING', time: '-' }
      ]
    }
  ];

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-gray-900 tracking-tight">Monitoring Persetujuan</h2>
        <p className="text-gray-500 text-sm font-medium">Lacak posisi dokumen dan respon revisi dari pimpinan secara real-time.</p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
         <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
               <Clock size={24} />
            </div>
            <div>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Sedang Diproses</p>
               <h4 className="text-xl font-black text-gray-900">12 Dokumen</h4>
            </div>
         </div>
         <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center">
               <AlertTriangle size={24} />
            </div>
            <div>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Perlu Revisi</p>
               <h4 className="text-xl font-black text-red-600">5 Dokumen</h4>
            </div>
         </div>
         <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
               <CheckCircle2 size={24} />
            </div>
            <div>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Selesai Hari Ini</p>
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
                {/* Info Utama */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-3">
                    <span className="font-mono text-sm font-black text-blue-900">{item.num}</span>
                    <span className={`px-3 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${item.status === SPPDStatus.REVISION ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-amber-50 text-amber-600 border border-amber-100'}`}>
                      {item.status.replace('_', ' ')}
                    </span>
                  </div>
                  <h4 className="text-xl font-black text-gray-900">{item.employee}</h4>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Tujuan: {item.dest}</p>
                </div>

                {/* Pipeline Visual */}
                <div className="flex-1 flex items-center justify-between relative px-4">
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

                {/* Aksi Cepat */}
                <div className="flex items-center space-x-3">
                  {item.status === SPPDStatus.REVISION && (
                    <Link to={`/sppd/edit/${item.id}`} className="p-3 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-2xl transition-all shadow-sm group/btn">
                      <FileEdit size={20} />
                    </Link>
                  )}
                  <button className="p-3 bg-gray-50 text-gray-400 hover:text-blue-900 hover:bg-white rounded-2xl transition-all border border-transparent hover:border-gray-100 shadow-sm">
                    <Eye size={20} />
                  </button>
                  <button className="flex items-center space-x-2 px-6 py-3 bg-blue-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20">
                    <span>Detail Alur</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              {/* Revision Note Box */}
              {item.note && (
                <div className="mt-8 p-5 bg-red-50 rounded-2xl border border-red-100 flex items-start space-x-4 animate-in slide-in-from-top-2">
                  <div className="p-2 bg-white rounded-xl text-red-600 shadow-sm">
                    <MessageSquare size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-1">Catatan Pimpinan:</p>
                    <p className="text-sm font-bold text-red-900 leading-relaxed italic">"{item.note}"</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Info Sidebar (Bottom for mobile) */}
      <div className="mt-10 p-10 bg-gray-900 text-white rounded-[3rem] relative overflow-hidden group">
         <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
               <h3 className="text-3xl font-black mb-4 tracking-tight leading-tight">Butuh Persetujuan Cepat?</h3>
               <p className="text-gray-400 text-sm leading-relaxed mb-8 font-medium">
                 Gunakan fitur "Nudge" untuk mengirimkan notifikasi pengingat ke aplikasi mobile pejabat jika dokumen belum diproses lebih dari 24 jam.
               </p>
               <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center space-x-3 shadow-2xl">
                  <Zap size={18} className="text-amber-400 fill-amber-400" />
                  <span>Kirim Nudge Kolektif</span>
               </button>
            </div>
            <div className="bg-white/5 rounded-[2rem] p-8 border border-white/10 backdrop-blur-sm">
               <div className="flex items-center space-x-4 mb-6">
                  <div className="w-10 h-10 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center">
                     <ShieldCheck size={20} />
                  </div>
                  <h5 className="font-black uppercase text-xs tracking-widest">Auto-Escalation</h5>
               </div>
               <p className="text-[10px] text-gray-400 leading-relaxed font-bold uppercase">Sistem akan otomatis memindahkan antrean ke Pejabat Pelaksana Harian (Plh) jika pimpinan utama berhalangan hadir atau sedang dalam perjalanan dinas lain.</p>
            </div>
         </div>
         <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default MonitoringPage;