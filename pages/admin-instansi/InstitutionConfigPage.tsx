
import React, { useState } from 'react';
import { 
  GitMerge, 
  Hash, 
  BellRing, 
  Save, 
  Info, 
  CheckCircle2, 
  ChevronRight, 
  Zap, 
  RefreshCw, 
  Layers, 
  Plus, 
  Trash2,
  Mail,
  Monitor,
  Settings2,
  ShieldCheck,
  GripVertical,
  Layout,
  AlertCircle,
  /* Added FileText to imports to fix the error */
  FileText
} from 'lucide-react';

const InstitutionConfigPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'WORKFLOW' | 'NUMBERING' | 'NOTIF'>('WORKFLOW');

  // 1. Workflow State
  const [workflow, setWorkflow] = useState([
    { id: 'w1', level: 1, name: 'Verifikasi Administrasi', role: 'OPERATOR', desc: 'Pemeriksaan kelengkapan dokumen and ketersediaan pagu.' },
    { id: 'w2', level: 2, name: 'Verifikasi Keuangan', role: 'OPERATOR_KEUANGAN', desc: 'Validasi akun belanja dan nominal biaya riil.' },
    { id: 'w3', level: 3, name: 'Otorisasi Kepala Dinas', role: 'PEJABAT_PENYETUJU', desc: 'Persetujuan akhir dan penerbitan nomor SPPD.' }
  ]);

  // 2. Numbering State
  const [numbering, setNumbering] = useState({
    sppdPattern: '{SEQ}/SPPD/{DEPT}/{MONTH_ROMAN}/{YEAR}',
    stPattern: 'ST/{SEQ}/{DEPT}/{YEAR}',
    currentSeq: 142
  });

  // 3. Notification Matrix State
  const [notifications, setNotifications] = useState([
    { id: 'n1', event: 'Pengajuan SPPD Baru', email: true, system: true },
    { id: 'n2', event: 'Permintaan Revisi Dokumen', email: true, system: true },
    { id: 'n3', event: 'Dokumen Disetujui Akhir', email: true, system: true },
    { id: 'n4', event: 'Laporan Tugas Terlambat (>3 hari)', email: false, system: true },
    { id: 'n5', event: 'Masa Aktif Langganan', email: true, system: true },
  ]);

  const handleSave = () => {
    alert('Konfigurasi operasional instansi berhasil disimpan dan direplikasi ke seluruh unit kerja.');
  };

  const getPreviewNumber = (pattern: string) => {
    return pattern
      .replace('{SEQ}', '043')
      .replace('{DEPT}', 'UMUM')
      .replace('{MONTH_ROMAN}', 'V')
      .replace('{YEAR}', '2024');
  };

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight flex items-center">
            Konfigurasi Sistem <Settings2 className="ml-3 text-blue-900" size={32} />
          </h2>
          <p className="text-gray-500 text-sm font-medium mt-1">Personalisasi alur birokrasi dan standar dokumentasi internal instansi.</p>
        </div>
        <button 
          onClick={handleSave}
          className="bg-blue-900 text-white px-8 py-4 rounded-2xl flex items-center space-x-3 hover:bg-blue-800 transition-all font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-900/20"
        >
          <Save size={20} />
          <span>Terapkan Perubahan</span>
        </button>
      </div>

      {/* Primary Tabs */}
      <div className="flex bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm mb-10 w-fit overflow-x-auto max-w-full">
        {[
          { id: 'WORKFLOW', icon: GitMerge, label: 'Alur Persetujuan' },
          { id: 'NUMBERING', icon: Hash, label: 'Penomoran Otomatis' },
          { id: 'NOTIF', icon: BellRing, label: 'Matriks Notifikasi' },
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center space-x-2 whitespace-nowrap ${activeTab === tab.id ? 'bg-blue-900 text-white shadow-lg' : 'text-gray-500 hover:text-blue-900'}`}
          >
            <tab.icon size={16} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          
          {activeTab === 'WORKFLOW' && (
            <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm p-10 space-y-10 animate-in slide-in-from-left-4 duration-500">
               <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xl font-black text-gray-900 uppercase tracking-tight">Hirarki Verifikasi SPPD</h4>
                    <p className="text-xs text-gray-400 font-medium">Urutan otorisasi dokumen dari input hingga terbit.</p>
                  </div>
                  <button className="p-3 bg-blue-50 text-blue-900 rounded-xl hover:bg-blue-900 hover:text-white transition-all shadow-sm">
                    <Plus size={20} />
                  </button>
               </div>

               <div className="space-y-4 relative">
                  <div className="absolute left-[31px] top-10 bottom-10 w-1 bg-gray-100 -z-10"></div>
                  {workflow.map((step, idx) => (
                    <div key={step.id} className="flex items-start space-x-6 relative z-10 group">
                       <div className="w-16 h-16 bg-blue-900 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-xl shrink-0 group-hover:scale-110 transition-transform">
                          {step.level}
                       </div>
                       <div className="flex-1 bg-gray-50 border border-gray-100 p-6 rounded-[2rem] hover:bg-white hover:border-blue-900/20 transition-all">
                          <div className="flex items-center justify-between mb-2">
                             <h5 className="font-black text-gray-900 leading-none">{step.name}</h5>
                             <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-all">
                                <button className="p-2 text-gray-400 hover:text-blue-900"><GripVertical size={16} /></button>
                                <button className="p-2 text-gray-400 hover:text-red-600"><Trash2 size={16} /></button>
                             </div>
                          </div>
                          <div className="flex items-center space-x-3">
                             <span className="text-[9px] font-black bg-blue-100 text-blue-900 px-2 py-0.5 rounded uppercase">{step.role.replace('_', ' ')}</span>
                             <p className="text-xs text-gray-500 font-medium italic">"{step.desc}"</p>
                          </div>
                       </div>
                    </div>
                  ))}
               </div>

               <div className="pt-6 border-t border-gray-50 flex items-center justify-center">
                  <div className="px-6 py-2 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100 text-[10px] font-black uppercase tracking-widest flex items-center">
                     <CheckCircle2 size={14} className="mr-2" /> Output: Dokumen Terbit & Sah
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'NUMBERING' && (
            <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm p-10 space-y-10 animate-in slide-in-from-left-4 duration-500">
               <div>
                  <h4 className="text-xl font-black text-gray-900 uppercase tracking-tight">Pola Penomoran Otomatis</h4>
                  <p className="text-xs text-gray-400 font-medium">Gunakan tag dinamis untuk membangun format nomor surat resmi.</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Pola Nomor SPPD</label>
                     <input 
                       type="text" 
                       className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-900/10 font-mono text-sm font-black text-blue-900"
                       value={numbering.sppdPattern}
                       onChange={(e) => setNumbering({...numbering, sppdPattern: e.target.value})}
                     />
                     <div className="p-5 bg-gray-900 rounded-[1.5rem] relative overflow-hidden group">
                        <p className="text-[8px] font-black text-gray-500 uppercase mb-2">Simulasi Nomor Berikutnya:</p>
                        <p className="text-sm font-mono font-black text-emerald-400">{getPreviewNumber(numbering.sppdPattern)}</p>
                        <Zap size={40} className="absolute -right-4 -bottom-4 text-white/5 group-hover:scale-110 transition-transform" />
                     </div>
                  </div>

                  <div className="space-y-4">
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Pola Surat Tugas</label>
                     <input 
                       type="text" 
                       className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-900/10 font-mono text-sm font-black text-blue-900"
                       value={numbering.stPattern}
                       onChange={(e) => setNumbering({...numbering, stPattern: e.target.value})}
                     />
                     <div className="p-5 bg-gray-900 rounded-[1.5rem] relative overflow-hidden group">
                        <p className="text-[8px] font-black text-gray-500 uppercase mb-2">Simulasi Nomor Berikutnya:</p>
                        <p className="text-sm font-mono font-black text-emerald-400">{getPreviewNumber(numbering.stPattern)}</p>
                        <FileText size={40} className="absolute -right-4 -bottom-4 text-white/5 group-hover:scale-110 transition-transform" />
                     </div>
                  </div>
               </div>

               <div className="p-8 bg-blue-50 rounded-[2rem] border border-blue-100">
                  <h5 className="text-[10px] font-black text-blue-900 uppercase mb-4 flex items-center">
                    <RefreshCw size={14} className="mr-2" /> Tag Dinamis Tersedia
                  </h5>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                     {[
                       { t: '{SEQ}', d: 'No. Urut (001)' },
                       { t: '{DEPT}', d: 'Kode Bidang' },
                       { t: '{YEAR}', d: 'Tahun (2024)' },
                       { t: '{MONTH_ROMAN}', d: 'Bulan Romawi' },
                       { t: '{DAY}', d: 'Tanggal Hari Ini' },
                       { t: '{INST}', d: 'Kode Instansi' }
                     ].map((tag, i) => (
                       <div key={i} className="bg-white p-3 rounded-xl border border-blue-200 text-center">
                          <p className="text-[10px] font-mono font-black text-blue-900">{tag.t}</p>
                          <p className="text-[8px] font-bold text-gray-400 uppercase mt-1 leading-none">{tag.d}</p>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'NOTIF' && (
            <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden animate-in slide-in-from-left-4 duration-500">
               <div className="p-10 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
                  <div>
                    <h4 className="text-xl font-black text-gray-900 uppercase tracking-tight">Matriks Notifikasi Internal</h4>
                    <p className="text-xs text-gray-400 font-medium">Kontrol saluran komunikasi untuk setiap event sistem.</p>
                  </div>
               </div>
               <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-[10px] text-gray-400 uppercase font-black tracking-[0.2em] bg-gray-50/50 border-b border-gray-100">
                        <th className="px-10 py-6">Pemicu Aktivitas (Event)</th>
                        <th className="px-6 py-6 text-center">Notifikasi Email</th>
                        <th className="px-6 py-6 text-center">Notifikasi Sistem</th>
                        <th className="px-10 py-6 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {notifications.map((n) => (
                        <tr key={n.id} className="group hover:bg-blue-50/30 transition-all duration-300">
                          <td className="px-10 py-7">
                            <p className="text-sm font-black text-gray-800">{n.event}</p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Otomatis Terkirim</p>
                          </td>
                          <td className="px-6 py-7">
                             <div className="flex justify-center">
                                <button 
                                  onClick={() => setNotifications(notifications.map(notif => notif.id === n.id ? {...notif, email: !notif.email} : notif))}
                                  className={`p-3 rounded-xl transition-all ${n.email ? 'bg-blue-900 text-white shadow-lg' : 'bg-gray-100 text-gray-300'}`}
                                >
                                  <Mail size={18} />
                                </button>
                             </div>
                          </td>
                          <td className="px-6 py-7">
                             <div className="flex justify-center">
                                <button 
                                  onClick={() => setNotifications(notifications.map(notif => notif.id === n.id ? {...notif, system: !notif.system} : notif))}
                                  className={`p-3 rounded-xl transition-all ${n.system ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-100 text-gray-300'}`}
                                >
                                  <Monitor size={18} />
                                </button>
                             </div>
                          </td>
                          <td className="px-10 py-7 text-right">
                             <span className={`inline-flex px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${n.email || n.system ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-400'}`}>
                               {n.email || n.system ? 'Aktif' : 'Muted'}
                             </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
               </div>
            </div>
          )}

        </div>

        {/* Sidebar Context & Info */}
        <div className="space-y-8">
           <div className="bg-blue-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
              <div className="relative z-10">
                 <ShieldCheck size={40} className="text-amber-400 mb-8 group-hover:rotate-12 transition-transform duration-500" />
                 <h4 className="text-2xl font-black mb-4 tracking-tight leading-tight">Otoritas Administratif</h4>
                 <p className="text-blue-100 text-sm leading-relaxed opacity-80 mb-10 font-medium italic">
                   "Setiap perubahan konfigurasi di halaman ini akan terekam dalam audit log global instansi untuk menjamin transparansi perubahan alur kerja."
                 </p>
                 <div className="p-5 bg-white/10 rounded-2xl border border-white/10">
                    <p className="text-[10px] font-black text-blue-300 uppercase tracking-widest mb-1">Status Keamanan</p>
                    <div className="flex items-center text-xs font-bold text-emerald-400">
                       <CheckCircle2 size={14} className="mr-2" /> ENCRYPTED SYNC ACTIVE
                    </div>
                 </div>
              </div>
              <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
           </div>

           <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
              <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center">
                 <Info size={16} className="mr-2 text-blue-900" /> Tips Konfigurasi
              </h5>
              <div className="space-y-4">
                 <div className="p-5 bg-gray-50 rounded-2xl group hover:bg-blue-50 transition-colors">
                    <p className="text-xs font-black text-gray-700 leading-relaxed uppercase mb-1">Gunakan Pola Penomoran Unik</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase leading-tight">Hindari duplikasi nomor dengan menyertakan tag {'{SEQ}'} dan {'{DEPT}'}.</p>
                 </div>
                 <div className="p-5 bg-gray-50 rounded-2xl group hover:bg-blue-50 transition-colors">
                    <p className="text-xs font-black text-gray-700 leading-relaxed uppercase mb-1">Batasi Level Approval</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase leading-tight">Idealnya gunakan 2-3 level untuk efisiensi birokrasi harian.</p>
                 </div>
              </div>
           </div>
           
           <div className="p-8 bg-amber-50 rounded-[2.5rem] border border-amber-100 flex items-start space-x-4">
              <AlertCircle size={24} className="text-amber-600 shrink-0 mt-1" />
              <p className="text-[10px] text-amber-800 font-bold leading-relaxed uppercase tracking-tight">
                 Perubahan alur persetujuan hanya akan berdampak pada SPPD yang baru diajukan setelah pengaturan disimpan. Dokumen yang sedang berjalan akan tetap mengikuti alur lama.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionConfigPage;
