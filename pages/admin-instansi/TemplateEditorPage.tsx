
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Save, Eye, Code, Type, Table, Layout, Info, FileCode } from 'lucide-react';

const TemplateEditorPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [content, setContent] = useState('<h1>SURAT PERINTAH PERJALANAN DINAS</h1><p>Memerintahkan: {{NAMA_PEGAWAI}}</p>');

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate('/admin/templates')} className="p-2 hover:bg-gray-100 rounded-full text-gray-400"><ChevronLeft size={24} /></button>
          <div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">{id ? 'Edit Template' : 'Buat Template'}</h2>
            <p className="text-gray-500 text-sm font-medium">Rancang tata letak dokumen resmi instansi Anda.</p>
          </div>
        </div>
        <button className="bg-blue-900 text-white px-8 py-3 rounded-xl font-black text-sm uppercase flex items-center space-x-2 shadow-xl">
          <Save size={18} /> <span>Simpan Template</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col min-h-[600px]">
            <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center space-x-4">
               <div className="flex space-x-1 p-1 bg-white rounded-lg border border-gray-200">
                  <button className="p-2 hover:bg-gray-50 rounded-md"><Type size={16} /></button>
                  <button className="p-2 hover:bg-gray-50 rounded-md"><Table size={16} /></button>
                  <button className="p-2 hover:bg-gray-50 rounded-md text-blue-900"><Code size={16} /></button>
               </div>
            </div>
            <textarea 
              className="flex-1 p-10 font-mono text-sm outline-none resize-none bg-white" 
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-6">
           <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
              <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center"><FileCode className="mr-2" size={14} /> Placeholder Data</h5>
              <div className="space-y-2">
                 {['{{NOMOR}}', '{{NAMA}}', '{{NIP}}', '{{TUJUAN}}', '{{TGL}}'].map(p => (
                   <button key={p} className="w-full p-2.5 bg-gray-50 border border-gray-100 rounded-xl text-xs font-mono font-bold text-blue-900 text-left hover:border-blue-900 transition-all">{p}</button>
                 ))}
              </div>
           </div>
           <div className="p-6 bg-blue-50 rounded-[2rem] border border-blue-100 flex items-start space-x-3">
              <Info className="text-blue-900 shrink-0" size={18} />
              <p className="text-[9px] text-blue-800 font-bold uppercase">Gunakan tag HTML dasar untuk mengatur format teks seperti Bold (&lt;b&gt;) atau Underline (&lt;u&gt;).</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateEditorPage;
