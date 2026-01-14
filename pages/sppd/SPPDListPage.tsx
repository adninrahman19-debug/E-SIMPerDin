
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../App';
import { SPPDStatus, UserRole, SPPDTemplate, TemplateCategory } from '../../types';
import { MOCK_TEMPLATES } from '../../constants';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  FileEdit, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  Printer, 
  X, 
  Archive, 
  Layers, 
  FileText, 
  Receipt, 
  ClipboardList,
  ChevronRight,
  MoreHorizontal,
  AlertCircle,
  // Fix: Added missing ShieldCheck import
  ShieldCheck
} from 'lucide-react';

const SPPDListPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSppdForPrint, setSelectedSppdForPrint] = useState<any | null>(null);
  const [printDocType, setPrintDocType] = useState<TemplateCategory>(TemplateCategory.SPPD);

  const isAdmin = user?.role === UserRole.ADMIN_INSTANSI;

  // Mock data yang diperluas untuk konteks Admin
  const [mockSppds, setMockSppds] = useState([
    { id: '1', num: '090/SPPD/2024/001', destination: 'Bandung', date: '20-05-2024', employee: 'Andi Pratama', unit: 'Sekretariat', cost: 2500000, status: SPPDStatus.APPROVED },
    { id: '2', num: '090/SPPD/2024/002', destination: 'Surabaya', date: '22-05-2024', employee: 'Siti Aminah', unit: 'Bid. Angkutan', cost: 4200000, status: SPPDStatus.PENDING },
    { id: '3', num: '090/SPPD/2024/003', destination: 'Yogyakarta', date: '25-05-2024', employee: 'Budi Raharjo', unit: 'Bid. Lalu Lintas', cost: 1800000, status: SPPDStatus.REVISION },
    { id: '4', num: '090/SPPD/2024/004', destination: 'Medan', date: '01-06-2024', employee: 'Dewi Lestari', unit: 'Sekretariat', cost: 5500000, status: SPPDStatus.DRAFT },
  ]);

  const getStatusBadge = (status: SPPDStatus) => {
    switch(status) {
      case SPPDStatus.APPROVED: return <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-200">Disetujui</span>;
      case SPPDStatus.PENDING: return <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-200">Menunggu</span>;
      case SPPDStatus.REVISION: return <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-200">Revisi</span>;
      case SPPDStatus.REJECTED: return <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-red-200">Ditolak</span>;
      case SPPDStatus.ARCHIVED: return <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-gray-200">Diarsipkan</span>;
      default: return <span className="bg-gray-50 text-gray-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-gray-100">Draft</span>;
    }
  };

  const handlePrintAction = (templateId: string) => {
    alert(`Mencetak dokumen ${printDocType} untuk SPPD ${selectedSppdForPrint.num} menggunakan template ID: ${templateId}`);
    setSelectedSppdForPrint(null);
  };

  const handleArchive = (id: string) => {
    if(confirm('Apakah Anda yakin ingin mengarsipkan dokumen ini? Dokumen tidak akan muncul di antrean aktif namun tetap tersimpan di riwayat.')) {
      setMockSppds(mockSppds.map(s => s.id === id ? { ...s, status: SPPDStatus.ARCHIVED } : s));
    }
  };

  const canEdit = (status: SPPDStatus) => {
    // Admin bisa edit kapan saja kecuali sudah diarsipkan, 
    // Pegawai/Operator hanya bisa edit jika Draft/Revisi
    if (isAdmin && status !== SPPDStatus.ARCHIVED) return true;
    return [SPPDStatus.DRAFT, SPPDStatus.REVISION].includes(status);
  };

  return (
    <div className="animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Manajemen SPPD</h2>
          <p className="text-gray-500 text-sm font-medium">Monitoring, validasi, dan pengelolaan administrasi perjalanan dinas instansi.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-all font-bold text-sm flex items-center space-x-2 shadow-sm">
            <Download size={18} />
            <span>Rekap Laporan</span>
          </button>
          <Link to="/sppd/baru" className="bg-blue-900 text-white px-6 py-2.5 rounded-xl hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20 font-black text-xs uppercase tracking-widest flex items-center space-x-2">
            <Plus size={18} />
            <span>Buat SPPD Baru</span>
          </Link>
        </div>
      </div>

      {/* Admin Quick Stats */}
      {isAdmin && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
           <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total SPPD Aktif</p>
              <h4 className="text-2xl font-black text-gray-900">{mockSppds.filter(s => s.status !== SPPDStatus.ARCHIVED).length}</h4>
           </div>
           <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-1">Butuh Persetujuan</p>
              <h4 className="text-2xl font-black text-amber-600">{mockSppds.filter(s => s.status === SPPDStatus.PENDING).length}</h4>
           </div>
           <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-[10px] font-black text-blue-900 uppercase tracking-widest mb-1">Realisasi Biaya</p>
              <h4 className="text-2xl font-black text-blue-900">Rp 14.0Jt</h4>
           </div>
           <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Cetak Tersedia</p>
              <h4 className="text-2xl font-black text-emerald-600">{mockSppds.filter(s => s.status === SPPDStatus.APPROVED).length}</h4>
           </div>
        </div>
      )}

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-50/50">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari No. SPPD, Nama, atau Tujuan..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900/10 transition-all text-sm font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-900 px-4 py-2 bg-white border border-gray-200 rounded-xl transition-all">
              <Filter size={18} />
              <span className="text-xs font-bold uppercase tracking-widest">Filter Lanjutan</span>
            </button>
            <select className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-xs font-bold text-gray-500 outline-none uppercase tracking-wider">
               <option>Semua Status</option>
               <option>Disetujui</option>
               <option>Draft</option>
               <option>Diarsipkan</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] text-gray-400 uppercase font-black tracking-[0.2em] border-b border-gray-100 bg-gray-50/30">
                <th className="px-8 py-5">Identitas Dokumen</th>
                <th className="px-6 py-5">Pegawai & Unit</th>
                <th className="px-6 py-5">Tujuan & Waktu</th>
                <th className="px-6 py-5">Estimasi Biaya</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-8 py-5 text-right">Aksi Manajemen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {mockSppds.map((sppd) => (
                <tr key={sppd.id} className="group hover:bg-blue-50/20 transition-all duration-300">
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-3">
                       <div className="w-10 h-10 bg-gray-100 text-gray-400 rounded-xl flex items-center justify-center font-black text-xs">
                         SPP
                       </div>
                       <div>
                          <p className="font-mono text-xs font-black text-blue-900 leading-tight">{sppd.num}</p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">ID: #00{sppd.id}</p>
                       </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div>
                       <p className="font-black text-gray-800 leading-tight">{sppd.employee}</p>
                       <p className="text-[10px] text-blue-600 font-bold uppercase mt-1 flex items-center">
                         <Layers size={10} className="mr-1.5" /> {sppd.unit}
                       </p>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-gray-600">
                    <div className="space-y-1">
                      <p className="text-xs font-black text-gray-700">{sppd.destination}</p>
                      <p className="text-[10px] font-medium text-gray-400">{sppd.date}</p>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <p className="text-xs font-black text-gray-900">Rp {sppd.cost.toLocaleString('id-ID')}</p>
                  </td>
                  <td className="px-6 py-6">{getStatusBadge(sppd.status)}</td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-2 text-gray-400 hover:text-blue-900 hover:bg-white rounded-xl transition-all shadow-sm" title="Lihat Detail">
                        <Eye size={18} />
                      </button>
                      
                      {sppd.status === SPPDStatus.APPROVED && (
                        <button 
                          onClick={() => setSelectedSppdForPrint(sppd)}
                          className="p-2 text-blue-900 bg-blue-50 border border-blue-100 hover:bg-blue-900 hover:text-white rounded-xl transition-all shadow-sm" title="Cetak Dokumen Paket"
                        >
                          <Printer size={18} />
                        </button>
                      )}

                      {canEdit(sppd.status) && (
                        <Link to={`/sppd/edit/${sppd.id}`} className="p-2 text-gray-400 hover:text-blue-900 hover:bg-white rounded-xl transition-all shadow-sm" title="Edit Data">
                          <FileEdit size={18} />
                        </Link>
                      )}
                      
                      {isAdmin && (
                        <>
                           <button 
                             onClick={() => handleArchive(sppd.id)}
                             className="p-2 text-gray-400 hover:text-amber-600 hover:bg-white rounded-xl transition-all shadow-sm" title="Arsipkan"
                           >
                            <Archive size={18} />
                           </button>
                           <button className="p-2 text-gray-300 hover:text-red-600 hover:bg-white rounded-xl transition-all shadow-sm" title="Hapus Permanen">
                            <Trash2 size={18} />
                           </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest">
          <span>Menampilkan 4 dari 48 Dokumen Instansi</span>
          <div className="flex space-x-2">
            <button className="px-4 py-2 border border-gray-200 rounded-xl hover:bg-white transition-all">Sebelumnya</button>
            <button className="px-4 py-2 bg-blue-900 text-white rounded-xl">1</button>
            <button className="px-4 py-2 border border-gray-200 rounded-xl hover:bg-white transition-all">2</button>
            <button className="px-4 py-2 border border-gray-200 rounded-xl hover:bg-white transition-all">Berikutnya</button>
          </div>
        </div>
      </div>

      {/* Advanced Print Package Modal */}
      {selectedSppdForPrint && (
        <div className="fixed inset-0 bg-blue-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            <div className="p-8 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h4 className="text-2xl font-black text-gray-900">Cetak Paket Dokumen</h4>
                <p className="text-sm text-gray-500 font-medium">SPPD No: {selectedSppdForPrint.num}</p>
              </div>
              <button onClick={() => setSelectedSppdForPrint(null)} className="p-3 bg-gray-50 hover:bg-gray-100 rounded-2xl text-gray-400 transition-all">
                <X size={24} />
              </button>
            </div>

            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Document Type Selection */}
              <div className="space-y-4">
                 <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">1. Pilih Jenis Dokumen</h5>
                 <div className="grid grid-cols-1 gap-3">
                    {[
                      { type: TemplateCategory.SPPD, label: 'Lembar SPPD Utama', icon: <FileText size={18}/> },
                      { type: TemplateCategory.SURAT_TUGAS, label: 'Surat Perintah Tugas', icon: <ShieldCheck size={18}/> },
                      { type: TemplateCategory.KWITANSI, label: 'Kwitansi & Rincian', icon: <Receipt size={18}/> },
                      { type: TemplateCategory.LAPORAN, label: 'Laporan Hasil Tugas', icon: <ClipboardList size={18}/> },
                    ].map((doc) => (
                      <button
                        key={doc.type}
                        onClick={() => setPrintDocType(doc.type)}
                        className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${printDocType === doc.type ? 'border-blue-900 bg-blue-50 text-blue-900 shadow-md' : 'border-gray-100 hover:border-blue-200 text-gray-600'}`}
                      >
                         <div className="flex items-center space-x-3 font-bold text-sm">
                            {doc.icon}
                            <span>{doc.label}</span>
                         </div>
                         {printDocType === doc.type && <CheckCircle size={16} className="text-blue-900" />}
                      </button>
                    ))}
                 </div>
              </div>

              {/* Template Selection */}
              <div className="space-y-4">
                 <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">2. Pilih Template Desain</h5>
                 <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {MOCK_TEMPLATES.filter(t => t.isActive && (t.institutionId === 'GLOBAL' || t.institutionId === user?.institutionId)).map((template) => (
                      <button 
                        key={template.id}
                        onClick={() => handlePrintAction(template.id)}
                        className="group w-full flex items-start p-4 border border-gray-100 rounded-2xl hover:border-blue-900 hover:bg-gray-50 transition-all text-left"
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-4 shrink-0 ${template.isDefault ? 'bg-blue-900 text-white shadow-lg' : 'bg-gray-100 text-gray-400 group-hover:bg-blue-100 group-hover:text-blue-900'}`}>
                          <Printer size={20} />
                        </div>
                        <div className="flex-1">
                          <p className="font-black text-gray-900 text-xs">{template.name}</p>
                          <p className="text-[10px] text-gray-400 mt-1 font-medium italic">{template.description}</p>
                          {template.institutionId === 'GLOBAL' && (
                            <span className="inline-block mt-2 text-[8px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded uppercase tracking-widest">Format Nasional</span>
                          )}
                        </div>
                        <ChevronRight size={16} className="text-gray-300 mt-1" />
                      </button>
                    ))}
                 </div>
              </div>
            </div>

            <div className="p-8 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center text-[10px] font-bold text-gray-400 uppercase">
                <AlertCircle size={14} className="mr-2" />
                Data akan digenerate otomatis ke PDF
              </div>
              <button onClick={() => setSelectedSppdForPrint(null)} className="px-6 py-2.5 font-black text-xs text-gray-500 uppercase tracking-widest hover:text-gray-900">Batal</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SPPDListPage;
