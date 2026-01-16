
import React, { useState } from 'react';
import { 
  FileCode, 
  Plus, 
  Lock, 
  Unlock, 
  Eye, 
  Save, 
  FileText, 
  Receipt, 
  ClipboardList, 
  ShieldCheck, 
  Settings,
  ChevronRight,
  /* Added missing icon imports */
  Info,
  CheckCircle2,
  X,
  RefreshCw,
  Layout,
  Layers,
  Database,
  Search,
  Copy,
  ArrowRight
} from 'lucide-react';
import { TemplateCategory, SPPDTemplate } from '../../types';

const GLOBAL_TEMPLATES: Partial<SPPDTemplate>[] = [
  { 
    id: 'gt-1', 
    category: TemplateCategory.SPPD, 
    name: 'SPPD Standar Nasional (PMK)', 
    isDefault: true, 
    isLocked: true, 
    version: 3, 
    description: 'Format baku sesuai regulasi pusat untuk perjalanan dinas jabatan.' 
  },
  { 
    id: 'gt-2', 
    category: TemplateCategory.SURAT_TUGAS, 
    name: 'Surat Tugas Kolektif', 
    isDefault: true, 
    isLocked: false, 
    version: 1, 
    description: 'Template penugasan untuk lebih dari satu pegawai dalam satu nomor.' 
  },
  { 
    id: 'gt-3', 
    category: TemplateCategory.KWITANSI, 
    name: 'Kwitansi Biaya Riil (Otomatis)', 
    isDefault: true, 
    isLocked: true, 
    version: 2, 
    description: 'Format kwitansi otomatis dengan terbilang nominal biaya.' 
  },
  { 
    id: 'gt-4', 
    category: TemplateCategory.LAPORAN, 
    name: 'Laporan Hasil Perjalanan Dinas', 
    isDefault: true, 
    isLocked: false, 
    version: 1, 
    description: 'Struktur laporan kegiatan mencakup dasar hukum dan hasil tugas.' 
  },
];

const GlobalTemplatePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<TemplateCategory>(TemplateCategory.SPPD);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  // Global Config States
  const [lockNumbering, setLockNumbering] = useState(true);
  const [forceDefaultTemplate, setForceDefaultTemplate] = useState(false);

  const getCategoryIcon = (cat: TemplateCategory) => {
    switch (cat) {
      case TemplateCategory.SPPD: return <FileText size={24} />;
      case TemplateCategory.SURAT_TUGAS: return <ShieldCheck size={24} />;
      case TemplateCategory.KWITANSI: return <Receipt size={24} />;
      case TemplateCategory.LAPORAN: return <ClipboardList size={24} />;
      default: return <FileCode size={24} />;
    }
  };

  const toggleLock = (field: 'NUMBERING' | 'TEMPLATE') => {
    if(confirm("Apakah Anda yakin ingin mengubah kebijakan lockdown global ini? Seluruh tenant akan terdampak secara real-time.")) {
       if(field === 'NUMBERING') setLockNumbering(!lockNumbering);
       else setForceDefaultTemplate(!forceDefaultTemplate);
    }
  };

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Template & Konfigurasi Global</h2>
          <p className="text-gray-500 text-sm font-medium">Standarisasi dokumen nasional dan kontrol kebijakan sistem lintas tenant.</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setIsConfigOpen(true)}
            className="bg-white border border-gray-200 text-gray-700 px-5 py-3 rounded-xl flex items-center space-x-2 hover:bg-gray-50 transition-all font-black text-[10px] uppercase tracking-widest shadow-sm"
          >
            <Settings size={18} className="text-blue-900" />
            <span>Master Control</span>
          </button>
          <button className="bg-blue-900 text-white px-6 py-3 rounded-xl flex items-center space-x-2 hover:bg-blue-800 transition-all font-black text-[10px] uppercase tracking-widest shadow-lg shadow-blue-900/20">
            <Plus size={18} />
            <span>Tambah Template Master</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation & Stats Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
             <div className="p-6 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Pilih Kategori</h5>
                <RefreshCw size={14} className="text-gray-300" />
             </div>
             <div className="p-3 space-y-1">
                {Object.values(TemplateCategory).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all font-bold text-sm ${
                      activeCategory === cat 
                      ? 'bg-blue-900 text-white shadow-xl shadow-blue-900/20' 
                      : 'bg-white text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {getCategoryIcon(cat)}
                      {/* Fix: cast cat as string to access replace method */}
                      <span className="capitalize">{(cat as string).replace('_', ' ')}</span>
                    </div>
                    <ChevronRight size={16} className={activeCategory === cat ? 'opacity-100' : 'opacity-20'} />
                  </button>
                ))}
             </div>
          </div>

          <div className="p-8 bg-indigo-900 text-white rounded-[2.5rem] shadow-xl relative overflow-hidden group">
            <div className="relative z-10">
              <Database className="text-blue-300 mb-6" size={32} />
              <h4 className="text-lg font-black mb-2 tracking-tight leading-tight">Data Replication</h4>
              <p className="text-blue-100 text-[10px] font-bold uppercase leading-relaxed tracking-tight opacity-80">
                Setiap perubahan pada template master akan otomatis direplikasi ke folder 'Global Reference' di setiap dashboard instansi.
              </p>
            </div>
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
          </div>
        </div>

        {/* Templates List */}
        <div className="lg:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {GLOBAL_TEMPLATES.filter(t => t.category === activeCategory).map((template) => (
              <div key={template.id} className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col group hover:shadow-xl hover:border-blue-100 transition-all duration-300">
                <div className="p-8 flex-1">
                  <div className="flex items-center justify-between mb-8">
                    <div className={`p-3 rounded-2xl ${template.isLocked ? 'bg-red-50 text-red-600 shadow-red-100' : 'bg-emerald-50 text-emerald-600 shadow-emerald-100'} shadow-inner`}>
                      {template.isLocked ? <Lock size={20} /> : <Unlock size={20} />}
                    </div>
                    <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-all">
                       <button className="p-2 text-gray-400 hover:text-blue-900 bg-gray-50 rounded-xl transition-all"><Eye size={18} /></button>
                       <button 
                         onClick={() => { setSelectedTemplate(template); setIsEditModalOpen(true); }}
                         className="p-2 text-gray-400 hover:text-blue-900 bg-gray-50 rounded-xl transition-all"
                       >
                        <FileCode size={18} />
                       </button>
                       <button className="p-2 text-gray-400 hover:text-indigo-600 bg-gray-50 rounded-xl transition-all"><Copy size={18} /></button>
                    </div>
                  </div>
                  <h4 className="text-xl font-black text-gray-900 leading-tight mb-2">{template.name}</h4>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed mb-8">{template.description}</p>
                  
                  <div className="flex items-center space-x-6 pt-6 border-t border-gray-50">
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Version</p>
                      <p className="text-xs font-bold text-gray-800">v{template.version}.0 Global</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Inheritance</p>
                      <div className="flex items-center text-xs font-bold text-blue-900 uppercase">
                        <CheckCircle2 size={12} className="mr-1" /> Default
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                   <span className={`text-[9px] font-black uppercase tracking-widest ${template.isLocked ? 'text-red-500' : 'text-emerald-500'}`}>
                    {template.isLocked ? 'READ-ONLY BY ADMIN' : 'MODIFIABLE BY ADMIN'}
                   </span>
                   <button 
                    onClick={() => { setSelectedTemplate(template); setIsEditModalOpen(true); }}
                    className="text-[10px] font-black text-blue-900 uppercase tracking-widest hover:underline"
                   >
                    Edit Master
                   </button>
                </div>
              </div>
            ))}

            {/* Empty State / Add Card */}
            <button className="border-4 border-dashed border-gray-100 rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-gray-300 hover:text-blue-900 hover:border-blue-100 transition-all group">
               <div className="w-16 h-16 bg-gray-50 group-hover:bg-blue-50 rounded-full flex items-center justify-center mb-4 transition-all">
                  <Plus size={32} />
               </div>
               <p className="text-xs font-black uppercase tracking-widest">Rilis Variasi Template</p>
            </button>
          </div>
        </div>
      </div>

      {/* MODAL CONFIG GLOBAL */}
      {isConfigOpen && (
        <div className="fixed inset-0 bg-blue-900/60 backdrop-blur-md flex items-center justify-center z-[100] p-4">
           <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300 flex flex-col">
              <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
                 <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-900 text-white rounded-2xl flex items-center justify-center shadow-lg"><Settings size={24} /></div>
                    <div>
                       <h4 className="text-2xl font-black text-gray-900">Master Control Platform</h4>
                       <p className="text-sm text-gray-500 font-medium">Kebijakan pembatasan hak Admin Instansi.</p>
                    </div>
                 </div>
                 <button onClick={() => setIsConfigOpen(false)} className="p-3 bg-white border border-gray-100 hover:bg-gray-100 rounded-2xl text-gray-400 transition-all shadow-sm">
                    <X size={24} />
                 </button>
              </div>

              <div className="p-10 space-y-8">
                 {/* Lock Numbering */}
                 <div className="flex items-start justify-between p-6 bg-gray-50 rounded-3xl border border-gray-100 hover:border-blue-200 transition-all">
                    <div className="flex-1 pr-6">
                       <div className="flex items-center space-x-2 mb-1">
                          <h5 className="font-black text-gray-900 uppercase text-xs tracking-tight">Kunci Format Nomor Surat</h5>
                          {lockNumbering ? <Lock size={12} className="text-red-500" /> : <Unlock size={12} className="text-emerald-500" />}
                       </div>
                       <p className="text-[10px] text-gray-500 font-bold leading-relaxed uppercase tracking-tighter">
                          Jika aktif, Admin Instansi dilarang mengubah pola penomoran dokumen (SEQ/SPPD/...) guna standarisasi audit nasional.
                       </p>
                    </div>
                    <button 
                      onClick={() => toggleLock('NUMBERING')}
                      className={`w-14 h-8 rounded-full transition-all relative ${lockNumbering ? 'bg-red-600' : 'bg-gray-200'}`}
                    >
                       <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all shadow-md ${lockNumbering ? 'right-1' : 'left-1'}`}></div>
                    </button>
                 </div>

                 {/* Force Global Defaults */}
                 <div className="flex items-start justify-between p-6 bg-gray-50 rounded-3xl border border-gray-100 hover:border-blue-200 transition-all">
                    <div className="flex-1 pr-6">
                       <h5 className="font-black text-gray-900 uppercase text-xs tracking-tight mb-1">Wajibkan Template Nasional</h5>
                       <p className="text-[10px] text-gray-500 font-bold leading-relaxed uppercase tracking-tighter">
                          Nonaktifkan kemampuan 'Custom Template' di seluruh level tenant (Force Global Compliance).
                       </p>
                    </div>
                    <button 
                      onClick={() => toggleLock('TEMPLATE')}
                      className={`w-14 h-8 rounded-full transition-all relative ${forceDefaultTemplate ? 'bg-blue-900' : 'bg-gray-200'}`}
                    >
                       <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all shadow-md ${forceDefaultTemplate ? 'right-1' : 'left-1'}`}></div>
                    </button>
                 </div>

                 <div className="p-6 bg-blue-50 rounded-[2rem] border border-blue-100 flex items-start space-x-4">
                    <Info size={24} className="text-blue-900 shrink-0 mt-0.5" />
                    <div>
                       <p className="text-[10px] text-blue-800 font-black leading-relaxed uppercase tracking-tight mb-2">Peringatan Inheritansi</p>
                       <p className="text-[9px] text-blue-700 font-bold uppercase leading-tight">Perubahan pada pengaturan ini akan merubah akses seluruh Admin Instansi secara otomatis. Pastikan kebijakan ini sesuai dengan TOS platform.</p>
                    </div>
                 </div>
              </div>

              <div className="p-8 bg-gray-50 border-t border-gray-100 flex items-center justify-end space-x-4">
                 <button onClick={() => setIsConfigOpen(false)} className="px-6 py-2 font-bold text-gray-500 hover:text-gray-900">Batal</button>
                 <button onClick={() => setIsConfigOpen(false)} className="bg-blue-900 text-white px-10 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-900/20 hover:bg-blue-800 transition-all flex items-center">
                    <Save size={16} className="mr-2" />
                    <span>Update Kebijakan</span>
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* MODAL EDITOR MASTER (Simplified for now) */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-blue-900/60 backdrop-blur-md flex items-center justify-center z-[110] p-4">
          <div className="bg-white w-full max-w-6xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300 flex flex-col max-h-[95vh]">
            <div className="p-8 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h4 className="text-2xl font-black text-gray-900 tracking-tight">Master Blueprint Editor</h4>
                <p className="text-sm text-gray-500 font-medium">Modifikasi template '{selectedTemplate?.name}' (Global Reference).</p>
              </div>
              <button onClick={() => setIsEditModalOpen(false)} className="p-3 bg-gray-50 hover:bg-gray-100 rounded-2xl text-gray-400 transition-all">
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
              {/* Sidebar Placeholders */}
              <div className="lg:w-80 p-8 border-r border-gray-100 overflow-y-auto space-y-6">
                <div>
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 block">Variabel Dinamis</label>
                   <div className="space-y-2">
                      {['NOMOR_SURAT', 'NAMA_INSTANSI', 'ALAMAT_INSTANSI', 'NAMA_PEGAWAI', 'NIP_PEGAWAI', 'MAKSUD_DILAKUKAN', 'TGL_DIBERANGKATKAN', 'TOTAL_BIAYA'].map(p => (
                        <div key={p} className="p-3 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-between group hover:border-blue-900/20 transition-all cursor-pointer">
                           <span className="text-[9px] font-mono font-bold text-blue-900">{'{{'}{p}{'}}'}</span>
                           <ArrowRight size={12} className="text-gray-300 group-hover:text-blue-900" />
                        </div>
                      ))}
                   </div>
                </div>
              </div>

              {/* Editor Code View (Simulated) */}
              <div className="flex-1 bg-gray-900 p-8 font-mono text-sm text-blue-100 overflow-y-auto custom-scrollbar">
                 <div className="opacity-40 mb-6 italic">/* Header Section Standard Naskah Dinas */</div>
                 <div className="text-emerald-400">&lt;div class="kop-surat" style="text-align: center; border-bottom: 2px solid #000;"&gt;</div>
                 <div className="pl-6 space-y-1 mt-2">
                    &lt;h1&gt;KEMENTERIAN REPUBLIK INDONESIA&lt;/h1&gt;<br/>
                    &lt;h2&gt;<span className="text-amber-400">{'{{NAMA_INSTANSI}}'}</span>&lt;/h2&gt;<br/>
                    &lt;p&gt;<span className="text-amber-400">{'{{ALAMAT_INSTANSI}}'}</span>&lt;/p&gt;
                 </div>
                 <div className="text-emerald-400">&lt;/div&gt;</div>
                 
                 <div className="mt-10 opacity-40 mb-4 italic">/* Content Body */</div>
                 <div className="text-emerald-400">&lt;div class="content"&gt;</div>
                 <div className="pl-6 space-y-1 mt-2">
                    &lt;p style="text-align: center; font-weight: bold;"&gt;SURAT PERINTAH PERJALANAN DINAS&lt;/p&gt;<br/>
                    &lt;p style="text-align: center;"&gt;Nomor: <span className="text-amber-400">{'{{NOMOR_SURAT}}'}</span>&lt;/p&gt;<br/><br/>
                    &lt;p&gt;Pejabat Pemberi Perintah memberikan perintah kepada:&lt;/p&gt;<br/>
                    &lt;table&gt;<br/>
                    &nbsp;&nbsp;&lt;tr&gt;<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;td&gt;Nama&lt;/td&gt;<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;td&gt;: <span className="text-amber-400">{'{{NAMA_PEGAWAI}}'}</span>&lt;/td&gt;<br/>
                    &nbsp;&nbsp;&lt;/tr&gt;
                 </div>
                 <div className="text-emerald-400">&lt;/div&gt;</div>
              </div>
            </div>

            <div className="p-8 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center text-xs font-black text-gray-400 uppercase tracking-widest">
                <ShieldCheck size={18} className="mr-2 text-blue-900" />
                Verified Infrastructure v2.5
              </div>
              <div className="flex space-x-3">
                <button onClick={() => setIsEditModalOpen(false)} className="px-8 py-3.5 font-bold text-gray-500 hover:text-gray-900 uppercase text-[10px] tracking-widest">Batal</button>
                <button className="bg-blue-900 text-white px-10 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-blue-900/20 hover:bg-blue-800 transition-all flex items-center">
                  <RefreshCw size={16} className="mr-2" />
                  <span>Update & Replikasi</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalTemplatePage;
