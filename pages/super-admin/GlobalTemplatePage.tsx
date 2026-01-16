
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
  Info,
  CheckCircle2,
  X,
  RefreshCw,
  Layout,
  Layers,
  Database,
  Search,
  Copy,
  ArrowRight,
  Trash2,
  Edit3,
  FileSearch,
  Code,
  ShieldAlert
} from 'lucide-react';
import { TemplateCategory, SPPDTemplate } from '../../types';

const GLOBAL_TEMPLATES_MOCK: Partial<SPPDTemplate>[] = [
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
  const [templates, setTemplates] = useState<Partial<SPPDTemplate>[]>(GLOBAL_TEMPLATES_MOCK);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [modalMode, setModalMode] = useState<'ADD' | 'EDIT'>('ADD');
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

  const handleOpenEdit = (t: any) => {
    setSelectedTemplate(t);
    setModalMode('EDIT');
    setIsEditModalOpen(true);
  };

  const handleOpenAdd = () => {
    setSelectedTemplate({ category: activeCategory, version: 1, name: '', description: '' });
    setModalMode('ADD');
    setIsEditModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;

    if (modalMode === 'ADD') {
      const newTmpl: Partial<SPPDTemplate> = {
        id: `gt-${Date.now()}`,
        name,
        description,
        category: activeCategory,
        isDefault: false,
        isLocked: false,
        version: 1
      };
      setTemplates([...templates, newTmpl]);
      alert("Blueprint template global baru berhasil diterbitkan.");
    } else {
      setTemplates(templates.map(t => t.id === selectedTemplate.id ? { ...t, name, description } : t));
      alert(`Master blueprint '${name}' berhasil diperbarui dan direplikasi.`);
    }
    setIsEditModalOpen(false);
  };

  const handleDeleteTemplate = (id: string, name: string) => {
    if (confirm(`HAPUS BLUEPRINT: Apakah Anda yakin ingin menghapus '${name}' dari repositori global? Tindakan ini tidak dapat dibatalkan.`)) {
      setTemplates(templates.filter(t => t.id !== id));
      alert("Template global berhasil ditarik dari peredaran.");
    }
  };

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">Master Blueprints</h2>
          <p className="text-gray-500 text-sm font-medium mt-1">Standardisasi naskah dinas nasional dan manajemen replikasi template global.</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setIsConfigOpen(true)}
            className="bg-white border border-gray-200 text-gray-700 px-6 py-3.5 rounded-2xl flex items-center space-x-3 hover:bg-gray-50 transition-all font-black text-[10px] uppercase tracking-widest shadow-sm"
          >
            <Settings size={18} className="text-blue-900" />
            <span>Master Governance</span>
          </button>
          <button 
            onClick={handleOpenAdd}
            className="bg-blue-900 text-white px-8 py-3.5 rounded-2xl flex items-center space-x-3 hover:bg-blue-800 transition-all font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-900/30"
          >
            <Plus size={20} />
            <span>Tambah Blueprint</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden p-4 space-y-1">
             <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-6 px-4 mt-2">Blueprint Category</h5>
             {Object.values(TemplateCategory).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`w-full flex items-center justify-between p-5 rounded-2xl transition-all font-black text-xs uppercase tracking-widest ${
                    activeCategory === cat 
                    ? 'bg-blue-900 text-white shadow-2xl shadow-blue-900/20' 
                    : 'bg-white text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    {getCategoryIcon(cat)}
                    <span>{(cat as string).replace('_', ' ')}</span>
                  </div>
                  <ChevronRight size={16} className={activeCategory === cat ? 'opacity-100' : 'opacity-20'} />
                </button>
              ))}
          </div>

          <div className="p-10 bg-indigo-900 text-white rounded-[3rem] shadow-xl relative overflow-hidden group">
            <div className="relative z-10">
              <Database className="text-blue-300 mb-8 group-hover:scale-110 transition-transform" size={40} />
              <h4 className="text-xl font-black mb-2 tracking-tight">Mass Replication</h4>
              <p className="text-blue-100 text-[11px] font-bold uppercase leading-relaxed tracking-tight opacity-80 mb-8 italic">
                "Setiap pembaruan blueprint master akan otomatis memperbarui folder 'Global Library' di dashboard 156 instansi secara sinkron."
              </p>
              <div className="flex items-center text-[9px] font-black text-emerald-400 bg-emerald-400/10 px-4 py-2 rounded-xl border border-emerald-400/20 w-fit">
                 <RefreshCw size={14} className="mr-2" /> REPLICATION SYNCED
              </div>
            </div>
            <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
          </div>
        </div>

        {/* Templates Grid List */}
        <div className="lg:col-span-3 space-y-8 animate-in slide-in-from-right-4 duration-500">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {templates.filter(t => t.category === activeCategory).map((template) => (
              <div key={template.id} className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col group hover:shadow-2xl hover:border-blue-900/20 transition-all duration-500">
                <div className="p-10 flex-1">
                  <div className="flex items-start justify-between mb-10">
                    <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-inner ${template.isLocked ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'} group-hover:scale-110 transition-transform`}>
                      {template.isLocked ? <Lock size={28} /> : <Unlock size={28} />}
                    </div>
                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-all">
                       <button onClick={() => handleOpenEdit(template)} className="p-3 text-gray-400 hover:text-blue-900 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-md transition-all" title="Edit Master Blueprint"><Edit3 size={20} /></button>
                       <button onClick={() => handleDeleteTemplate(template.id!, template.name!)} className="p-3 text-gray-400 hover:text-red-600 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-md transition-all" title="Recall Blueprint"><Trash2 size={20} /></button>
                       <button className="p-3 text-gray-400 hover:text-indigo-600 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-md transition-all" title="Duplicate Version"><Copy size={20} /></button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                     <div className="flex items-center space-x-3">
                        <h4 className="text-2xl font-black text-gray-900 leading-tight group-hover:text-blue-900 transition-colors">{template.name}</h4>
                        <div className="px-3 py-1 bg-gray-100 rounded-full text-[8px] font-black text-gray-500 uppercase tracking-widest border border-gray-200 shadow-inner">V{template.version}.0</div>
                     </div>
                     <p className="text-sm text-gray-500 font-medium leading-relaxed line-clamp-2 italic">"{template.description}"</p>
                  </div>
                  
                  <div className="flex items-center space-x-8 mt-10 pt-8 border-t border-gray-50">
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">Inheritance</p>
                      <div className="flex items-center text-[10px] font-black text-blue-900 uppercase mt-1">
                        <CheckCircle2 size={12} className="mr-1.5 text-emerald-500" /> Default Master
                      </div>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">Platform Reach</p>
                      <p className="text-[10px] font-black text-gray-900 uppercase mt-1">Global Access</p>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={() => handleOpenEdit(template)}
                  className="px-10 py-6 bg-gray-900 text-white font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-between hover:bg-black transition-all"
                >
                   <span>Buka Blueprint Editor</span>
                   <ChevronRight size={18} />
                </button>
              </div>
            ))}

            {/* Empty State / Add Card */}
            <button 
               onClick={handleOpenAdd}
               className="border-4 border-dashed border-gray-100 rounded-[3rem] p-12 flex flex-col items-center justify-center text-gray-300 hover:text-blue-900 hover:border-blue-900/20 transition-all group min-h-[350px]"
            >
               <div className="w-20 h-20 bg-gray-50 group-hover:bg-blue-50 rounded-full flex items-center justify-center mb-6 transition-all">
                  <Plus size={48} />
               </div>
               <h4 className="text-xl font-black uppercase tracking-widest leading-none">Rilis Master Baru</h4>
               <p className="text-xs font-bold mt-2 uppercase tracking-tighter opacity-60">Tambahkan standar naskah dinas baru</p>
            </button>
          </div>
        </div>
      </div>

      {/* MODAL CONFIG GOVERNANCE */}
      {isConfigOpen && (
        <div className="fixed inset-0 bg-blue-900/60 backdrop-blur-md flex items-center justify-center z-[110] p-4">
           <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300 flex flex-col">
              <div className="p-10 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
                 <div className="flex items-center space-x-5">
                    <div className="w-14 h-14 bg-blue-900 text-white rounded-[1.5rem] flex items-center justify-center shadow-xl shadow-blue-900/20"><ShieldAlert size={28} /></div>
                    <div>
                       <h4 className="text-2xl font-black text-gray-900 tracking-tight leading-none uppercase tracking-[0.05em]">Governance Control</h4>
                       <p className="text-sm text-gray-500 font-medium mt-1">Kebijakan pembatasan hak Admin Instansi global.</p>
                    </div>
                 </div>
                 <button onClick={() => setIsConfigOpen(false)} className="p-4 bg-white border border-gray-100 hover:bg-gray-100 rounded-3xl text-gray-400 transition-all shadow-sm">
                    <X size={24} />
                 </button>
              </div>

              <div className="p-10 space-y-10">
                 <div className="flex items-start justify-between p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 hover:border-blue-900/20 transition-all group">
                    <div className="flex-1 pr-10">
                       <div className="flex items-center space-x-3 mb-2">
                          <h5 className="font-black text-gray-900 uppercase text-sm tracking-tight leading-none">Force Lockdown Numbering</h5>
                          {lockNumbering ? <Lock size={16} className="text-red-500" /> : <Unlock size={16} className="text-emerald-500" />}
                       </div>
                       <p className="text-[11px] text-gray-500 font-bold leading-relaxed uppercase tracking-tighter">
                          Jika aktif, Admin Instansi dilarang mengubah pola penomoran dokumen (SEQ/SPPD/...) guna standarisasi audit nasional lintas tenant.
                       </p>
                    </div>
                    <button 
                      onClick={() => toggleLock('NUMBERING')}
                      className={`w-16 h-8 rounded-full transition-all relative ${lockNumbering ? 'bg-red-600 shadow-lg shadow-red-600/20' : 'bg-gray-200'}`}
                    >
                       <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all shadow-md ${lockNumbering ? 'right-1' : 'left-1'}`}></div>
                    </button>
                 </div>

                 <div className="flex items-start justify-between p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 hover:border-blue-900/20 transition-all group">
                    <div className="flex-1 pr-10">
                       <h5 className="font-black text-gray-900 uppercase text-sm tracking-tight leading-none mb-2">Enforce Global Standards Only</h5>
                       <p className="text-[11px] text-gray-500 font-bold leading-relaxed uppercase tracking-tighter">
                          Menonaktifkan fitur 'Custom Template' di seluruh level tenant. Seluruh instansi dipaksa menggunakan blueprint master Super Admin.
                       </p>
                    </div>
                    <button 
                      onClick={() => toggleLock('TEMPLATE')}
                      className={`w-16 h-8 rounded-full transition-all relative ${forceDefaultTemplate ? 'bg-blue-900 shadow-lg shadow-blue-900/20' : 'bg-gray-200'}`}
                    >
                       <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all shadow-md ${forceDefaultTemplate ? 'right-1' : 'left-1'}`}></div>
                    </button>
                 </div>

                 <div className="p-8 bg-blue-50 rounded-[2.5rem] border border-blue-100 flex items-start space-x-6">
                    <Info size={32} className="text-blue-900 shrink-0 mt-1" />
                    <div>
                       <p className="text-sm font-black text-blue-900 uppercase mb-2">Inheritance Warning</p>
                       <p className="text-[10px] text-blue-800 font-bold uppercase leading-relaxed tracking-tight">
                         Perubahan pada pengaturan governance ini akan langsung merubah akses 156 Admin Instansi secara real-time. Pastikan kebijakan ini sesuai dengan regulasi kearsipan digital nasional yang berlaku.
                       </p>
                    </div>
                 </div>
              </div>

              <div className="p-10 bg-gray-50 border-t border-gray-100 flex items-center justify-end space-x-4">
                 <button onClick={() => setIsConfigOpen(false)} className="px-10 py-4 font-black text-[11px] uppercase tracking-widest text-gray-500 hover:text-gray-900 transition-all">Batalkan</button>
                 <button onClick={() => { alert("Kebijakan tata kelola global berhasil diperbarui."); setIsConfigOpen(false); }} className="bg-blue-900 text-white px-12 py-4 rounded-[1.5rem] font-black text-[11px] uppercase tracking-widest shadow-2xl shadow-blue-900/20 hover:bg-blue-800 transition-all flex items-center">
                    <Save size={18} className="mr-3" />
                    <span>Apply Policy Global</span>
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* MODAL EDITOR BLUEPRINT (Full CRUD Edit) */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-blue-900/60 backdrop-blur-md flex items-center justify-center z-[120] p-4">
          <div className="bg-white w-full max-w-6xl rounded-[4rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300 flex flex-col max-h-[95vh]">
            <form onSubmit={handleSave} className="flex flex-col h-full">
               <div className="p-10 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
                 <div className="flex items-center space-x-6">
                    <div className="w-16 h-16 bg-blue-900 text-white rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-900/20">
                       <FileSearch size={32} />
                    </div>
                    <div>
                       <h4 className="text-3xl font-black text-gray-900 tracking-tight uppercase tracking-[0.05em]">Blueprint Master Editor</h4>
                       <p className="text-sm text-gray-500 font-medium mt-1">Configuring: {selectedTemplate?.name || 'New Master Blueprint'}</p>
                    </div>
                 </div>
                 <button type="button" onClick={() => setIsEditModalOpen(false)} className="p-4 bg-gray-100 hover:bg-red-50 hover:text-red-600 rounded-3xl text-gray-400 transition-all shadow-sm">
                    <X size={24} />
                 </button>
               </div>
               
               <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
                 <div className="lg:w-96 p-10 border-r border-gray-100 overflow-y-auto space-y-10 custom-scrollbar">
                   <div className="space-y-6">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Nama Master Blueprint</label>
                         <input required name="name" type="text" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-900/5 font-black text-gray-900" defaultValue={selectedTemplate?.name} placeholder="E.g. SPPD Standar PMK 2024" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Deskripsi Regulasi</label>
                         <textarea name="description" rows={3} className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-[2rem] outline-none focus:ring-4 focus:ring-blue-900/5 text-xs font-medium text-gray-700 resize-none leading-relaxed" defaultValue={selectedTemplate?.description} placeholder="Sebutkan dasar hukum PMK terkait..." />
                      </div>
                   </div>

                   <div className="space-y-4">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2 block">System Placeholders</label>
                      <div className="grid grid-cols-1 gap-2">
                         {['NOMOR_SURAT', 'NAMA_INSTANSI', 'ALAMAT_INSTANSI', 'NAMA_PEGAWAI', 'NIP_PEGAWAI', 'MAKSUD_DILAKUKAN', 'TGL_DIBERANGKATKAN', 'TOTAL_BIAYA'].map(p => (
                           <div key={p} className="p-3 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-between group hover:border-blue-900/20 transition-all cursor-pointer">
                              <span className="text-[9px] font-mono font-bold text-blue-900">{'{{'}{p}{'}}'}</span>
                              <ArrowRight size={12} className="text-gray-300 group-hover:text-blue-900 group-hover:translate-x-1 transition-all" />
                           </div>
                         ))}
                      </div>
                   </div>
                 </div>

                 <div className="flex-1 bg-gray-900 flex flex-col p-1">
                    <div className="p-4 bg-gray-800 border-b border-gray-700 flex items-center justify-between rounded-t-[3rem] mx-2 mt-2">
                       <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 rounded-full bg-red-500"></div>
                          <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                          <span className="text-[10px] font-mono text-gray-500 ml-4">master_blueprint.html</span>
                       </div>
                       <button type="button" className="text-[10px] font-black text-blue-400 uppercase tracking-widest hover:underline flex items-center">
                          <Eye size={12} className="mr-1.5" /> Preview Engine
                       </button>
                    </div>
                    <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
                       <div className="font-mono text-xs text-blue-100/60 leading-relaxed">
                          <div className="opacity-40 italic mb-6">/* Header Section Standard Naskah Dinas */</div>
                          <div className="text-emerald-400">&lt;div class="kop-surat" style="text-align: center; border-bottom: 3px double #000;"&gt;</div>
                          <div className="pl-8 space-y-1 mt-3">
                             &lt;h1 style="font-size: 18px; font-weight: bold;"&gt;PEMERINTAH REPUBLIK INDONESIA&lt;/h1&gt;<br/>
                             &lt;h2 style="font-size: 22px; font-weight: 900;"&gt;<span className="text-amber-400">{'{{NAMA_INSTANSI}}'}</span>&lt;/h2&gt;<br/>
                             &lt;p style="font-size: 11px;"&gt;<span className="text-amber-400">{'{{ALAMAT_INSTANSI}}'}</span>&lt;/p&gt;
                          </div>
                          <div className="text-emerald-400 mt-3">&lt;/div&gt;</div>
                          
                          <div className="mt-12 opacity-40 italic mb-6">/* Main Content Body */</div>
                          <div className="text-emerald-400">&lt;div class="content" style="padding-top: 40px;"&gt;</div>
                          <div className="pl-8 space-y-1 mt-3">
                             &lt;p style="text-align: center; font-weight: 900; text-decoration: underline;"&gt;SURAT PERINTAH PERJALANAN DINAS&lt;/p&gt;<br/>
                             &lt;p style="text-align: center; margin-top: 5px;"&gt;Nomor: <span className="text-amber-400">{'{{NOMOR_SURAT}}'}</span>&lt;/p&gt;<br/><br/>
                             &lt;p style="text-indent: 40px;"&gt;Pejabat Pemberi Perintah memberikan wewenang penuh kepada:&lt;/p&gt;<br/>
                             &lt;table style="width: 100%; margin-top: 20px;"&gt;<br/>
                             &nbsp;&nbsp;&lt;tr&gt;<br/>
                             &nbsp;&nbsp;&nbsp;&nbsp;&lt;td style="width: 30%;"&gt;Nama Pegawai&lt;/td&gt;<br/>
                             &nbsp;&nbsp;&nbsp;&nbsp;&lt;td&gt;: <span className="text-amber-400 font-bold">{'{{NAMA_PEGAWAI}}'}</span>&lt;/td&gt;<br/>
                             &nbsp;&nbsp;&lt;/tr&gt;
                          </div>
                          <div className="text-emerald-400 mt-3">&lt;/div&gt;</div>
                       </div>
                    </div>
                    <div className="p-4 bg-gray-800 text-gray-500 font-mono text-[9px] flex items-center justify-between rounded-b-[3rem] mx-2 mb-2">
                       <span>Total lines: 142</span>
                       <span>Encoding: UTF-8</span>
                    </div>
                 </div>
               </div>

               <div className="p-10 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                 <div className="flex items-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    <ShieldCheck size={24} className="mr-3 text-blue-900" /> Infrastructure Stability: NOMINAL
                 </div>
                 <div className="flex space-x-4">
                    <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-10 py-4 font-black text-[11px] uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-all">Batalkan</button>
                    <button type="submit" className="bg-blue-900 text-white px-12 py-4 rounded-[1.5rem] font-black text-[11px] uppercase tracking-widest shadow-2xl shadow-blue-900/20 hover:bg-blue-800 transition-all flex items-center space-x-3">
                       <RefreshCw size={20} className="mr-3" />
                       <span>Replicate & Save Blueprint</span>
                    </button>
                 </div>
               </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalTemplatePage;
