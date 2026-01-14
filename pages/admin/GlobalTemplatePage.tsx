
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
  X
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
    name: 'Kwitansi Pembayaran Biaya Riil', 
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

  const getCategoryIcon = (cat: TemplateCategory) => {
    switch (cat) {
      case TemplateCategory.SPPD: return <FileText size={24} />;
      case TemplateCategory.SURAT_TUGAS: return <ShieldCheck size={24} />;
      case TemplateCategory.KWITANSI: return <Receipt size={24} />;
      case TemplateCategory.LAPORAN: return <ClipboardList size={24} />;
    }
  };

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Template & Konfigurasi Global</h2>
          <p className="text-gray-500 text-sm font-medium">Standarisasi dokumen nasional dan kontrol field sistem lintas tenant.</p>
        </div>
        <button className="bg-blue-900 text-white px-6 py-3 rounded-xl flex items-center space-x-2 hover:bg-blue-800 transition-all font-bold shadow-lg shadow-blue-900/20">
          <Plus size={18} />
          <span>Tambah Template Global</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigasi Kategori */}
        <div className="lg:col-span-1 space-y-3">
          <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Kategori Dokumen</h5>
          {Object.values(TemplateCategory).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all font-bold text-sm ${
                activeCategory === cat 
                ? 'bg-blue-900 text-white shadow-xl shadow-blue-900/20' 
                : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-100'
              }`}
            >
              <div className="flex items-center space-x-3">
                {getCategoryIcon(cat)}
                <span className="capitalize">{cat.replace('_', ' ')}</span>
              </div>
              <ChevronRight size={16} className={activeCategory === cat ? 'opacity-100' : 'opacity-0'} />
            </button>
          ))}

          <div className="mt-10 p-6 bg-indigo-50 rounded-[2rem] border border-indigo-100 relative overflow-hidden group">
            <div className="relative z-10">
              <Settings className="text-indigo-600 mb-4" size={24} />
              <h4 className="text-sm font-black text-indigo-900 mb-2">Konfigurasi Sistem</h4>
              <p className="text-[10px] text-indigo-700 leading-relaxed font-bold uppercase">Field yang dikunci akan berlaku untuk seluruh instansi baru tanpa kecuali.</p>
              <button className="mt-4 text-[10px] font-black text-white bg-indigo-600 px-4 py-2 rounded-lg uppercase tracking-widest hover:bg-indigo-700 transition-all">
                Kelola Field Lock
              </button>
            </div>
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/20 rounded-full blur-2xl"></div>
          </div>
        </div>

        {/* Daftar Template per Kategori */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl flex items-start space-x-4">
            <div className="bg-blue-100 p-2 rounded-xl text-blue-900"><Info size={20} /></div>
            <div className="flex-1">
              <p className="text-sm font-black text-blue-900 mb-1 uppercase tracking-tight">Informasi Distribusi</p>
              <p className="text-xs text-blue-800 leading-relaxed font-medium">Template Global bertanda "Default" akan otomatis dipasangkan pada setiap instansi trial/baru. Template yang terkunci tidak dapat dimodifikasi oleh Admin Instansi.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {GLOBAL_TEMPLATES.filter(t => t.category === activeCategory).map((template) => (
              <div key={template.id} className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col group hover:shadow-xl hover:border-blue-100 transition-all duration-300">
                <div className="p-8 flex-1">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-3 rounded-2xl ${template.isLocked ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
                      {template.isLocked ? <Lock size={20} /> : <Unlock size={20} />}
                    </div>
                    <div className="flex space-x-2">
                       <button className="p-2 text-gray-400 hover:text-blue-900 bg-gray-50 rounded-xl transition-all"><Eye size={18} /></button>
                       <button 
                         onClick={() => { setSelectedTemplate(template); setIsEditModalOpen(true); }}
                         className="p-2 text-gray-400 hover:text-blue-900 bg-gray-50 rounded-xl transition-all"
                       >
                        <FileCode size={18} />
                       </button>
                    </div>
                  </div>
                  <h4 className="text-xl font-black text-gray-900 leading-tight mb-2">{template.name}</h4>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed mb-6">{template.description}</p>
                  
                  <div className="flex items-center space-x-4 pt-6 border-t border-gray-50">
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Versi</p>
                      <p className="text-xs font-bold text-gray-800">v{template.version}.0 Global</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Status Default</p>
                      <div className="flex items-center text-xs font-bold text-blue-900">
                        <CheckCircle2 size={12} className="mr-1" /> Aktif
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                   <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    {template.isLocked ? 'LOCKED BY SUPER ADMIN' : 'INSTANSI CAN MODIFY'}
                   </span>
                   <button className="text-[10px] font-black text-blue-900 uppercase tracking-widest hover:underline">
                    Konfigurasi
                   </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Modal (Mock) */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-blue-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-5xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300 flex flex-col max-h-[90vh]">
            <div className="p-8 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h4 className="text-2xl font-black text-gray-900">Editor Template Global</h4>
                <p className="text-sm text-gray-500 font-medium">Kategori: {selectedTemplate?.category}</p>
              </div>
              <button onClick={() => setIsEditModalOpen(false)} className="p-3 bg-gray-50 hover:bg-gray-100 rounded-2xl text-gray-400 transition-all">
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
              {/* Toolbar & Form */}
              <div className="lg:w-1/3 p-8 border-r border-gray-100 overflow-y-auto space-y-6">
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Nama Template</label>
                  <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-900/10 font-bold" defaultValue={selectedTemplate?.name} />
                </div>
                
                <div className="p-6 bg-red-50 rounded-2xl border border-red-100 space-y-4">
                   <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-red-900 uppercase">Field Lock Status</span>
                      <Lock size={16} className="text-red-600" />
                   </div>
                   <label className="flex items-center space-x-3 cursor-pointer group">
                      <div className="relative">
                        <input type="checkbox" className="sr-only peer" defaultChecked={selectedTemplate?.isLocked} />
                        <div className="w-10 h-6 bg-gray-200 rounded-full peer peer-checked:bg-red-600 transition-all"></div>
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:left-5"></div>
                      </div>
                      <span className="text-[11px] font-bold text-red-800 uppercase tracking-tight">Kunci Untuk Seluruh Tenant</span>
                    </label>
                </div>

                <div className="space-y-4">
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Placeholder Tersedia</p>
                  <div className="flex flex-wrap gap-2">
                    {['{{NOMOR}}', '{{INSTANSI}}', '{{TANGGAL}}', '{{NOMINAL}}', '{{PEGAWAI}}'].map(p => (
                      <span key={p} className="px-2 py-1 bg-blue-50 text-blue-900 rounded font-mono text-[10px] font-bold border border-blue-100">{p}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Editor Code Area (Simulated) */}
              <div className="flex-1 bg-gray-900 p-8 font-mono text-sm text-blue-100 overflow-y-auto">
                <div className="opacity-50 mb-4">&lt;!-- Global Template Header Start --&gt;</div>
                <div className="text-emerald-400">&lt;div class="kop-surat"&gt;</div>
                <div className="pl-6">
                  &lt;h1&gt;KEMENTERIAN REPUBLIK INDONESIA&lt;/h1&gt;<br/>
                  &lt;h2&gt;{'{{INSTANSI}}'}&lt;/h2&gt;<br/>
                  &lt;p&gt;Nomor: {'{{NOMOR}}'}&lt;/p&gt;
                </div>
                <div className="text-emerald-400">&lt;/div&gt;</div>
                <div className="opacity-50 mt-4">&lt;!-- Global Template Content --&gt;</div>
                <div className="pl-6 mt-2">
                  Memerintahkan Kepada: {'{{PEGAWAI}}'}<br/>
                  Untuk melaksanakan tugas dinas ke...
                </div>
              </div>
            </div>

            <div className="p-8 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center text-xs font-bold text-gray-400">
                <ShieldCheck size={16} className="mr-2" />
                Diverifikasi oleh Super Admin
              </div>
              <div className="flex space-x-3">
                <button onClick={() => setIsEditModalOpen(false)} className="px-6 py-2.5 font-bold text-gray-500 hover:text-gray-700">Batal</button>
                <button className="bg-blue-900 text-white px-8 py-2.5 rounded-xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-900/20 hover:bg-blue-800 transition-all flex items-center space-x-2">
                  <Save size={18} />
                  <span>Update Global</span>
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
