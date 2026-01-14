
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ChevronLeft, 
  Save, 
  Eye, 
  Type, 
  Table, 
  Image as ImageIcon, 
  Layout, 
  Code,
  Info,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const PLACEHOLDERS = [
  { key: '{{NOMOR_SPPD}}', label: 'Nomor SPPD' },
  { key: '{{NAMA_PEGAWAI}}', label: 'Nama Pegawai' },
  { key: '{{NIP_PEGAWAI}}', label: 'NIP/ID Pegawai' },
  { key: '{{JABATAN_PEGAWAI}}', label: 'Jabatan' },
  { key: '{{MAKSUD_PERJALANAN}}', label: 'Maksud Perjalanan' },
  { key: '{{TUJUAN}}', label: 'Kota Tujuan' },
  { key: '{{TGL_BERANGKAT}}', label: 'Tgl Berangkat' },
  { key: '{{TGL_KEMBALI}}', label: 'Tgl Kembali' },
  { key: '{{LAMA_PERJALANAN}}', label: 'Lama (Hari)' },
  { key: '{{TRANSPORTASI}}', label: 'Alat Angkut' },
  { key: '{{PEJABAT_PENYETUJU}}', label: 'Nama Penyetuju' },
  { key: '{{JABATAN_PENYETUJU}}', label: 'Jabatan Penyetuju' },
];

const TemplateEditorPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [activeTab, setActiveTab] = useState<'CONTENT' | 'HEADER' | 'FOOTER'>('CONTENT');
  const [templateData, setTemplateData] = useState({
    name: isEdit ? 'Template Internal Dishub' : '',
    description: isEdit ? 'Format khusus dengan logo instansi.' : '',
    content: isEdit ? '<h1>DISHUB - SURAT TUGAS</h1><p>Nama: {{NAMA_PEGAWAI}}</p><p>NIP: {{NIP_PEGAWAI}}</p><p>Maksud: {{MAKSUD_PERJALANAN}}</p>' : '<p>Mulai ketik isi template Anda di sini...</p>',
    headerHtml: '<div>KOP SURAT DINAS PERHUBUNGAN</div>',
    footerHtml: '<div>Dicetak otomatis oleh E-SIMPerDin</div>'
  });

  const [showPreview, setShowPreview] = useState(false);

  const insertPlaceholder = (key: string) => {
    setTemplateData({
      ...templateData,
      content: templateData.content + ` ${key} `
    });
  };

  const handleSave = () => {
    alert('Template berhasil disimpan!');
    navigate('/templates');
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate('/templates')}
            className="p-2 hover:bg-gray-100 rounded-full transition-all text-gray-400 hover:text-gray-900"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{isEdit ? 'Edit Template' : 'Buat Template Baru'}</h2>
            <p className="text-gray-500 text-sm">Rancang format SPPD yang profesional dan sesuai regulasi.</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center space-x-2 bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-all font-bold"
          >
            <Eye size={18} />
            <span>{showPreview ? 'Kembali Editor' : 'Pratinjau'}</span>
          </button>
          <button 
            onClick={handleSave}
            className="flex items-center space-x-2 bg-blue-900 text-white px-6 py-2.5 rounded-xl hover:bg-blue-800 transition-all font-bold shadow-lg"
          >
            <Save size={18} />
            <span>Simpan Perubahan</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        <div className="xl:col-span-3">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col min-h-[600px]">
            {/* Toolbar Editor */}
            <div className="bg-gray-50 border-b border-gray-100 px-6 py-3 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setActiveTab('HEADER')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${activeTab === 'HEADER' ? 'bg-blue-900 text-white shadow-md' : 'text-gray-500 hover:bg-gray-200'}`}
                >
                  Header / Kop
                </button>
                <button 
                  onClick={() => setActiveTab('CONTENT')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${activeTab === 'CONTENT' ? 'bg-blue-900 text-white shadow-md' : 'text-gray-500 hover:bg-gray-200'}`}
                >
                  Isi Utama
                </button>
                <button 
                  onClick={() => setActiveTab('FOOTER')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${activeTab === 'FOOTER' ? 'bg-blue-900 text-white shadow-md' : 'text-gray-500 hover:bg-gray-200'}`}
                >
                  Footer
                </button>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <button className="p-1.5 hover:bg-gray-200 rounded"><Type size={16} /></button>
                <button className="p-1.5 hover:bg-gray-200 rounded"><Table size={16} /></button>
                <button className="p-1.5 hover:bg-gray-200 rounded"><ImageIcon size={16} /></button>
                <button className="p-1.5 hover:bg-gray-200 rounded"><Layout size={16} /></button>
                <div className="w-px h-4 bg-gray-200 mx-2"></div>
                <button className="p-1.5 hover:bg-gray-200 rounded text-blue-900"><Code size={16} /></button>
              </div>
            </div>

            {/* Editor Area / Preview Area */}
            {showPreview ? (
              <div className="flex-1 bg-gray-200 p-8 overflow-y-auto">
                <div className="max-w-[800px] mx-auto bg-white shadow-2xl p-12 min-h-[1000px] font-serif text-sm">
                  {/* Real-time Replacement logic simulated */}
                  <div className="mb-8 text-center border-b-2 border-black pb-4">
                    <div dangerouslySetInnerHTML={{ __html: templateData.headerHtml }} />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div dangerouslySetInnerHTML={{ __html: templateData.content
                      .replace(/{{NOMOR_SPPD}}/g, '090/SPPD/DISHUB/2024/042')
                      .replace(/{{NAMA_PEGAWAI}}/g, 'Andi Pratama, S.T.')
                      .replace(/{{NIP_PEGAWAI}}/g, '199503032018031003')
                      .replace(/{{MAKSUD_PERJALANAN}}/g, 'Melaksanakan koordinasi teknis aplikasi SIMPerDin ke pusat.')
                    }} />
                  </div>
                  <div className="mt-20 flex justify-end">
                    <div className="text-center w-64">
                      <p>Jakarta, 12 Mei 2024</p>
                      <p className="font-bold mt-2">Kepala Dinas</p>
                      <div className="h-20"></div>
                      <p className="font-bold underline">Budi Santoso, M.Si.</p>
                      <p>NIP. 197505051998011005</p>
                    </div>
                  </div>
                  <div className="mt-8 pt-4 border-t border-gray-100 text-[10px] text-gray-400 text-center italic">
                    <div dangerouslySetInnerHTML={{ __html: templateData.footerHtml }} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col p-6">
                <div className="mb-4 space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Nama Template</label>
                    <input 
                      type="text"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-900/10 focus:border-blue-900 outline-none"
                      placeholder="Contoh: Format SPPD Perjalanan Luar Kota"
                      value={templateData.name}
                      onChange={(e) => setTemplateData({...templateData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Keterangan</label>
                    <input 
                      type="text"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-900/10 focus:border-blue-900 outline-none"
                      placeholder="Digunakan untuk kegiatan..."
                      value={templateData.description}
                      onChange={(e) => setTemplateData({...templateData, description: e.target.value})}
                    />
                  </div>
                </div>
                <div className="flex-1 border border-gray-100 rounded-xl overflow-hidden shadow-inner">
                  <textarea 
                    className="w-full h-full p-4 font-mono text-sm bg-gray-50 focus:outline-none resize-none"
                    value={activeTab === 'CONTENT' ? templateData.content : activeTab === 'HEADER' ? templateData.headerHtml : templateData.footerHtml}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (activeTab === 'CONTENT') setTemplateData({...templateData, content: val});
                      else if (activeTab === 'HEADER') setTemplateData({...templateData, headerHtml: val});
                      else setTemplateData({...templateData, footerHtml: val});
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar: Placeholders & Help */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 overflow-hidden">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center">
              <Code size={18} className="mr-3 text-blue-900" />
              Placeholders
            </h4>
            <p className="text-xs text-gray-500 mb-4 leading-relaxed">Klik kode di bawah ini untuk memasukkannya ke dalam area editor yang sedang aktif.</p>
            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {PLACEHOLDERS.map((p) => (
                <button 
                  key={p.key}
                  onClick={() => insertPlaceholder(p.key)}
                  className="w-full flex items-center justify-between p-2.5 rounded-lg border border-gray-50 hover:border-blue-200 hover:bg-blue-50 transition-all text-left group"
                >
                  <span className="text-xs font-bold font-mono text-blue-900">{p.key}</span>
                  <span className="text-[10px] text-gray-400 font-medium group-hover:text-blue-700">{p.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-blue-900 text-white rounded-2xl p-6 shadow-xl">
            <h4 className="font-bold mb-3 flex items-center">
              <Info size={18} className="mr-3 text-blue-300" />
              Petunjuk Editor
            </h4>
            <ul className="space-y-3 text-xs text-blue-100 leading-relaxed">
              <li className="flex items-start">
                <CheckCircle2 size={14} className="mr-2 text-blue-300 shrink-0 mt-0.5" />
                Gunakan tag HTML dasar untuk pengaturan format teks (h1, b, i, u, p).
              </li>
              <li className="flex items-start">
                <CheckCircle2 size={14} className="mr-2 text-blue-300 shrink-0 mt-0.5" />
                Header/Kop akan muncul di bagian atas dokumen pada setiap halaman.
              </li>
              <li className="flex items-start">
                <CheckCircle2 size={14} className="mr-2 text-blue-300 shrink-0 mt-0.5" />
                Pastikan placeholder ditulis persis seperti yang terdaftar.
              </li>
            </ul>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <h4 className="font-bold text-amber-900 mb-2 flex items-center">
              <AlertCircle size={18} className="mr-3" />
              Peringatan Layout
            </h4>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              Perubahan template tidak akan mengubah dokumen SPPD yang sudah dicetak atau diunduh sebelumnya demi integritas riwayat arsip.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateEditorPage;
