
import React, { useState } from 'react';
import { 
  Settings2, 
  GitMerge, 
  Hash, 
  BellRing, 
  Plus, 
  Trash2, 
  Save, 
  Info, 
  CheckCircle2, 
  ChevronRight, 
  Mail, 
  Monitor, 
  ArrowRight,
  GripVertical,
  FileCode,
  Layout,
  RefreshCw,
  Zap,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const InstitutionConfigPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'WORKFLOW' | 'NUMBERING' | 'NOTIFICATIONS'>('WORKFLOW');

  // 1. Workflow State
  const [workflow, setWorkflow] = useState([
    { id: 'w1', level: 1, name: 'Verifikasi Administrasi', role: 'OPERATOR', desc: 'Pemeriksaan kelengkapan dokumen dan anggaran.' },
    { id: 'w2', level: 2, name: 'Persetujuan Pejabat Utama', role: 'PEJABAT_PENYETUJU', desc: 'Validasi substantif dan otorisasi perjalanan.' }
  ]);

  // 2. Numbering State
  const [numbering, setNumbering] = useState({
    sppdPattern: '{SEQ}/SPPD/{DEPT}/{MONTH_ROMAN}/{YEAR}',
    stPattern: 'ST/{SEQ}/{DEPT}/{YEAR}',
    currentSeq: 42
  });

  // 3. Notification State
  const [notifications, setNotifications] = useState([
    { id: 'n1', event: 'Pengajuan SPPD Baru', email: true, system: true },
    { id: 'n2', event: 'Permintaan Revisi', email: true, system: true },
    { id: 'n3', event: 'Persetujuan Akhir Selesai', email: true, system: true },
    { id: 'n4', event: 'Laporan Belum Diinput (>3 hari)', email: false, system: true },
    { id: 'n5', event: 'Masa Aktif Langganan', email: true, system: true },
  ]);

  const handleSave = () => {
    alert('Konfigurasi operasional instansi berhasil disimpan dan diterapkan!');
  };

  const getPreviewNumber = (pattern: string) => {
    return pattern
      .replace('{SEQ}', '001')
      .replace('{DEPT}', 'SEKRET')
      .replace('{MONTH_ROMAN}', 'V')
      .replace('{YEAR}', '2024');
  };

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Pengaturan Operasional</h2>
          <p className="text-gray-500 text-sm font-medium">Kustomisasi alur kerja, penomoran dokumen, dan preferensi sistem instansi.</p>
        </div>
        <div className="flex items-center space-x-3">
           <Link to="/templates" className="bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-all font-bold text-sm flex items-center shadow-sm">
            <FileCode size={18} className="mr-2" />
            <span>Atur Template</span>
          </Link>
          <button 
            onClick={handleSave}
            className="bg-blue-900 text-white px-8 py-2.5 rounded-xl hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20 font-black text-xs uppercase tracking-widest flex items-center"
          >
            <Save size={18} className="mr-2" />
            <span>Simpan Perubahan</span>
          </button>
        </div>
      </div>

      <div className="flex bg-white p-1 rounded-2xl border border-gray-100 shadow-sm mb-8 w-fit overflow-x-auto max-w-full">
        <button 
          onClick={() => setActiveTab('WORKFLOW')}
          className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all flex items-center space-x-2 whitespace-nowrap ${activeTab === 'WORKFLOW' ? 'bg-blue-900 text-white shadow-lg' : 'text-gray-500 hover:text-blue-900'}`}
        >
          <GitMerge size={16} />
          <span>Alur Persetujuan</span>
        </button>
        <button 
          onClick={() => setActiveTab('NUMBERING')}
          className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all flex items-center space-x-2 whitespace-nowrap ${activeTab === 'NUMBERING' ? 'bg-blue-900 text-white shadow-lg' : 'text-gray-500 hover:text-blue-900'}`}
        >
          <Hash size={16} />
          <span>Nomor Surat</span>
        </button>
        <button 
          onClick={() => setActiveTab('NOTIFICATIONS')}
          className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all flex items-center space-x-2 whitespace-nowrap ${activeTab === 'NOTIFICATIONS' ? 'bg-blue-900 text-white shadow-lg' : 'text-gray-500 hover:text-blue-900'}`}
        >
          <BellRing size={16} />
          <span>Notifikasi Internal</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {activeTab === 'WORKFLOW' && (
            <div className="space-y-6 animate-in slide-in-from-left-4">
              <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                   <div>
                      <h4 className="text-xl font-black text-gray-900">Workflow Engine</h4>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Tentukan hirarki otorisasi dokumen</p>
                   </div>
                   <button className="bg-gray-50 text-blue-900 border border-blue-100 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-900 hover:text-white transition-all">
                      Tambah Level
                   </button>
                </div>

                <div className="space-y-4 relative">
                   <div className="absolute left-[31px] top-8 bottom-8 w-1 bg-gray-50 -z-10"></div>
                   {workflow.map((step, idx) => (
                     <div key={step.id} className="flex items-start space-x-6 bg-gray-50/50 p-6 rounded-[2rem] border border-gray-100 group hover:border-blue-900/20 hover:bg-white transition-all">
                        <div className="w-16 h-16 bg-blue-900 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg shrink-0">
                           {step.level}
                        </div>
                        <div className="flex-1">
                           <div className="flex items-center justify-between">
                              <h5 className="font-black text-gray-900">{step.name}</h5>
                              <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-all">
                                 <button className="p-2 text-gray-400 hover:text-red-600"><Trash2 size={16} /></button>
                                 <button className="p-2 text-gray-400 cursor-grab active:cursor-grabbing"><GripVertical size={16} /></button>
                              </div>
                           </div>
                           <div className="flex items-center space-x-2 mt-1">
                              <span className="text-[9px] font-black bg-blue-100 text-blue-900 px-2 py-0.5 rounded uppercase">{step.role.replace('_', ' ')}</span>
                              <span className="text-gray-300">•</span>
                              <p className="text-xs text-gray-500 font-medium">{step.desc}</p>
                           </div>
                        </div>
                     </div>
                   ))}
                   <div className="flex justify-center pt-4">
                      <div className="px-6 py-2 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100 text-[10px] font-black uppercase tracking-widest flex items-center">
                         <CheckCircle2 size={14} className="mr-2" /> Dokumen Disetujui & Siap Cetak
                      </div>
                   </div>
                </div>
              </div>

              <div className="p-8 bg-blue-900 text-white rounded-[2.5rem] shadow-xl relative overflow-hidden group">
                <div className="relative z-10 flex items-center justify-between">
                   <div className="max-w-md">
                      <h4 className="text-xl font-black mb-2">Persetujuan Paralel</h4>
                      <p className="text-blue-100 text-xs font-bold uppercase leading-relaxed tracking-tight opacity-80">
                        Izinkan beberapa pejabat menyetujui dalam satu level yang sama untuk mempercepat proses.
                      </p>
                   </div>
                   <button className="bg-white text-blue-900 px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-50 transition-all">Aktifkan Fitur</button>
                </div>
                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
              </div>
            </div>
          )}

          {activeTab === 'NUMBERING' && (
            <div className="space-y-6 animate-in slide-in-from-left-4">
              <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                   <div className="space-y-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                           <Layout size={20} />
                        </div>
                        <h4 className="text-lg font-black text-gray-900">Format Nomor SPPD</h4>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Pola Penomoran</label>
                        <input 
                          type="text" 
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-900/10 font-mono text-sm font-bold"
                          value={numbering.sppdPattern}
                          onChange={(e) => setNumbering({...numbering, sppdPattern: e.target.value})}
                        />
                      </div>
                      <div className="p-4 bg-gray-900 rounded-2xl">
                         <p className="text-[9px] font-black text-gray-500 uppercase mb-2">Preview Nomor Berikutnya:</p>
                         <p className="text-sm font-mono font-black text-emerald-400">{getPreviewNumber(numbering.sppdPattern)}</p>
                      </div>
                   </div>

                   <div className="space-y-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
                           <ShieldCheck size={20} />
                        </div>
                        <h4 className="text-lg font-black text-gray-900">Format Surat Tugas</h4>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Pola Penomoran</label>
                        <input 
                          type="text" 
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-900/10 font-mono text-sm font-bold"
                          value={numbering.stPattern}
                          onChange={(e) => setNumbering({...numbering, stPattern: e.target.value})}
                        />
                      </div>
                      <div className="p-4 bg-gray-900 rounded-2xl">
                         <p className="text-[9px] font-black text-gray-500 uppercase mb-2">Preview Nomor Berikutnya:</p>
                         <p className="text-sm font-mono font-black text-amber-400">{getPreviewNumber(numbering.stPattern)}</p>
                      </div>
                   </div>
                </div>

                <div className="p-8 bg-blue-50 rounded-[2rem] border border-blue-100">
                   <h5 className="text-[10px] font-black text-blue-900 uppercase mb-4 flex items-center">
                      <RefreshCw size={14} className="mr-2" /> Variabel Dinamis Tersedia
                   </h5>
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { t: '{SEQ}', d: 'Urutan Otomatis' },
                        { t: '{MONTH}', d: 'Angka Bulan (05)' },
                        { t: '{MONTH_ROMAN}', d: 'Bulan Romawi (V)' },
                        { t: '{YEAR}', d: 'Tahun (2024)' },
                        { t: '{DEPT}', d: 'Kode Unit Kerja' },
                        { t: '{INST}', d: 'Kode Instansi' }
                      ].map((tag, i) => (
                        <div key={i} className="bg-white p-2.5 rounded-xl border border-blue-200 text-center">
                           <p className="text-[10px] font-black text-blue-900 font-mono">{tag.t}</p>
                           <p className="text-[8px] font-bold text-gray-400 uppercase mt-1">{tag.d}</p>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'NOTIFICATIONS' && (
            <div className="space-y-6 animate-in slide-in-from-left-4">
              <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                   <div>
                      <h4 className="text-xl font-black text-gray-900">Event Notifications</h4>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Kelola pemberitahuan internal instansi</p>
                   </div>
                </div>
                <div className="overflow-x-auto">
                   <table className="w-full text-left">
                      <thead>
                         <tr className="text-[10px] text-gray-400 uppercase font-black tracking-widest bg-gray-50/50 border-b border-gray-100">
                            <th className="px-8 py-5">Jenis Aktivitas / Trigger</th>
                            <th className="px-6 py-5 text-center">Email</th>
                            <th className="px-6 py-5 text-center">Dashboard</th>
                            <th className="px-8 py-5 text-right">Status</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                         {notifications.map((n) => (
                           <tr key={n.id} className="group hover:bg-blue-50/20 transition-all duration-300">
                              <td className="px-8 py-6">
                                 <p className="text-sm font-bold text-gray-900">{n.event}</p>
                              </td>
                              <td className="px-6 py-6">
                                 <div className="flex justify-center">
                                    <button 
                                      onClick={() => {
                                        const newN = notifications.map(not => not.id === n.id ? {...not, email: !not.email} : not);
                                        setNotifications(newN);
                                      }}
                                      className={`p-2 rounded-xl border transition-all ${n.email ? 'bg-blue-900 text-white border-blue-900' : 'bg-white text-gray-300 border-gray-100'}`}
                                    >
                                       <Mail size={16} />
                                    </button>
                                 </div>
                              </td>
                              <td className="px-6 py-6">
                                 <div className="flex justify-center">
                                    <button 
                                      onClick={() => {
                                        const newN = notifications.map(not => not.id === n.id ? {...not, system: !not.system} : not);
                                        setNotifications(newN);
                                      }}
                                      className={`p-2 rounded-xl border transition-all ${n.system ? 'bg-blue-900 text-white border-blue-900' : 'bg-white text-gray-300 border-gray-100'}`}
                                    >
                                       <Monitor size={16} />
                                    </button>
                                 </div>
                              </td>
                              <td className="px-8 py-6 text-right">
                                 <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${n.email || n.system ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-400'}`}>
                                    {n.email || n.system ? 'Aktif' : 'Nonaktif'}
                                 </span>
                              </td>
                           </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Help & Info */}
        <div className="space-y-6">
           <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
              <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Pusat Bantuan Config</h5>
              <div className="space-y-4">
                 <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-2xl">
                    <Info size={18} className="text-blue-900 shrink-0 mt-0.5" />
                    <p className="text-[10px] text-gray-500 font-bold leading-relaxed uppercase tracking-tight">
                       Pastikan alur persetujuan memiliki setidaknya 1 Pejabat Penyetuju agar SPPD dapat diterbitkan secara resmi.
                    </p>
                 </div>
                 <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-2xl">
                    <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-[10px] text-gray-500 font-bold leading-relaxed uppercase tracking-tight">
                       Perubahan format nomor surat hanya akan berlaku untuk dokumen yang dibuat setelah pengaturan disimpan.
                    </p>
                 </div>
              </div>
           </div>

           <div className="bg-emerald-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
              <div className="relative z-10">
                 <Zap size={32} className="text-amber-400 mb-6" />
                 <h4 className="text-xl font-black mb-2 tracking-tight">Otomatisasi Penuh</h4>
                 <p className="text-emerald-100 text-[10px] font-bold uppercase leading-relaxed tracking-tight opacity-80 mb-8">
                   Sistem akan menghitung antrean persetujuan dan mengirim notifikasi secara otomatis berdasarkan peran yang Anda atur.
                 </p>
                 <button className="w-full flex items-center justify-between p-4 bg-white/10 rounded-2xl font-bold text-xs hover:bg-white/20 transition-all border border-white/10">
                    <span>Baca Dokumentasi</span>
                    <ChevronRight size={16} />
                 </button>
              </div>
              <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionConfigPage;
