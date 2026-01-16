
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileCode, 
  Plus, 
  Edit, 
  Trash2, 
  CheckCircle, 
  Sparkles, 
  FileText, 
  Copy, 
  ArrowUpRight,
  ShieldCheck,
  MoreVertical,
  ChevronRight
} from 'lucide-react';
import { MOCK_TEMPLATES } from '../../constants';
import { TemplateCategory } from '../../types';

const TemplateManagementPage: React.FC = () => {
  // Filter template untuk instansi ini (Global + Lokal)
  const templates = MOCK_TEMPLATES; 

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Kustomisasi Dokumen Dinas</h2>
          <p className="text-gray-500 text-sm font-medium">Personalisasi tata naskah dinas, logo, dan format cetak SPPD instansi.</p>
        </div>
        <Link to="/admin/templates/baru" className="bg-blue-900 text-white px-8 py-4 rounded-2xl flex items-center space-x-3 hover:bg-blue-800 transition-all font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-900/20">
          <Plus size={20} />
          <span>Buat Template Baru</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {templates.map((template) => (
          <div key={template.id} className={`bg-white rounded-[3rem] border-2 shadow-sm overflow-hidden flex flex-col group hover:shadow-2xl transition-all duration-500 ${template.isDefault ? 'border-blue-900' : 'border-gray-100'}`}>
            <div className="p-10 flex-1">
              <div className="flex items-start justify-between mb-8">
                <div className={`p-4 rounded-2xl ${template.isDefault ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-500'} shadow-lg group-hover:scale-110 transition-transform`}>
                  <FileCode size={32} />
                </div>
                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-all">
                  <Link to={`/admin/templates/edit/${template.id}`} className="p-3 text-gray-400 hover:text-blue-900 bg-gray-50 rounded-xl transition-all hover:bg-white hover:shadow-sm">
                    <Edit size={20} />
                  </Link>
                  <button className="p-3 text-gray-400 hover:text-red-600 bg-gray-50 rounded-xl transition-all hover:bg-white hover:shadow-sm">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
              
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-2">
                   <h3 className="text-2xl font-black text-gray-900 tracking-tight leading-none">{template.name}</h3>
                   {template.isDefault && (
                     <span className="bg-blue-900 text-white text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Active Default</span>
                   )}
                </div>
                <p className="text-sm text-gray-500 line-clamp-2 font-medium leading-relaxed italic">"{template.description}"</p>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-8 border-t border-gray-50">
                <div>
                  <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest">Kategori Dokumen</p>
                  <div className="flex items-center mt-1 space-x-2">
                    <FileText size={14} className="text-blue-900" />
                    <span className="text-xs font-black text-gray-700 uppercase tracking-tighter">{template.category}</span>
                  </div>
                </div>
                <div>
                  <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest">Status Template</p>
                  <p className="text-xs font-black text-emerald-600 mt-1 uppercase tracking-tighter">Verified v{template.version}.0</p>
                </div>
              </div>
            </div>

            <div className="px-10 py-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                {template.institutionId === 'GLOBAL' ? 'Standar Nasional (PMK)' : 'Kustom Lokal Instansi'}
              </span>
              {!template.isDefault ? (
                <button className="text-[10px] font-black text-blue-900 uppercase tracking-widest hover:underline flex items-center group">
                  Jadikan Default <ChevronRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <div className="flex items-center text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                  <ShieldCheck size={14} className="mr-2" /> Digunakan Sistem
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Empty State / Add Card */}
        <Link 
          to="/admin/templates/baru" 
          className="border-4 border-dashed border-gray-100 rounded-[3rem] p-10 flex flex-col items-center justify-center text-gray-300 hover:text-blue-900 hover:border-blue-900/20 transition-all group min-h-[350px]"
        >
          <div className="w-20 h-20 bg-gray-50 group-hover:bg-blue-50 rounded-full flex items-center justify-center mb-6 transition-all">
            <Plus size={48} />
          </div>
          <h4 className="text-xl font-black uppercase tracking-widest">Buat Desain Baru</h4>
          <p className="text-sm font-bold mt-2 opacity-60">Tambahkan format surat tugas atau kwitansi internal.</p>
        </Link>
      </div>

      {/* Info Context Footer */}
      <div className="mt-12 p-10 bg-indigo-900 text-white rounded-[3rem] shadow-2xl relative overflow-hidden">
         <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-2xl">
               <div className="flex items-center space-x-3 mb-6">
                  <Sparkles size={32} className="text-amber-400" />
                  <h3 className="text-2xl font-black tracking-tight">Smart Placeholder Integration</h3>
               </div>
               <p className="text-indigo-100 text-sm leading-relaxed opacity-80 font-medium italic">
                 "Gunakan editor template kami untuk memasukkan variabel dinamis seperti NAMA, NIP, dan TUJUAN secara otomatis saat dokumen dicetak. Template kustom memungkinkan instansi menyisipkan logo resmi dan tanda tangan digital secara presisi."
               </p>
            </div>
            <button className="bg-white text-indigo-900 px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-50 transition-all shadow-xl whitespace-nowrap">
               Pelajari Tutorial Editor
            </button>
         </div>
         <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default TemplateManagementPage;
