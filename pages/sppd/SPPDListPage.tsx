
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../App';
import { SPPDStatus, UserRole, TemplateCategory } from '../../types';
import { MOCK_TEMPLATES } from '../../constants';
import { GoogleGenAI } from "@google/genai";
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  FileEdit, 
  Printer, 
  X, 
  FileText, 
  ClipboardList,
  ChevronRight,
  ShieldCheck,
  Clock,
  MessageSquare,
  CheckCircle2,
  FileCheck,
  Ban,
  RotateCcw,
  Calendar,
  Wallet,
  MapPin,
  Sparkles,
  SearchCheck,
  RefreshCw,
  CheckCircle,
  Archive,
  Layers,
  FileCode,
  Download,
  MoreVertical,
  Send,
  CheckCircle2 as VerifiedIcon,
  Lock,
  FileSearch,
  Trash2,
  ThumbsUp,
  AlertTriangle,
  Zap
} from 'lucide-react';

const SPPDListPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSppdForDetail, setSelectedSppdForDetail] = useState<any | null>(null);
  const [showPrintModal, setShowPrintModal] = useState<any | null>(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState('tmpl-1');
  
  const isAdmin = user?.role === UserRole.ADMIN_INSTANSI;
  const isOperator = user?.role === UserRole.OPERATOR;
  const isApprover = user?.role === UserRole.PEJABAT_PENYETUJU;
  const isPegawai = user?.role === UserRole.PEGAWAI;

  const [mockSppds, setMockSppds] = useState([
    { id: '1', num: '090/SPPD/2024/001', purpose: 'Koordinasi Penataan Jalur Sepeda Sudirman', destination: 'Bandung', date: '20-05-2024', employee: 'Andi Pratama', empId: 'u-5', unit: 'Sekretariat', cost: 2500000, transport: 'Kereta Api', status: SPPDStatus.APPROVED, transportation: 'Kereta Api' },
    { id: '2', num: '090/SPPD/2024/002', purpose: 'Konsultasi Perizinan Trayek AKAP', destination: 'Surabaya', date: '22-05-2024', employee: 'Siti Aminah', empId: 'u-2', unit: 'Bid. Angkutan', cost: 4200000, transport: 'Pesawat', status: SPPDStatus.PENDING, transportation: 'Pesawat' },
    { id: '3', num: '090/SPPD/2024/003', purpose: 'Survey Lokasi Halte Trans Metro', destination: 'Yogyakarta', date: '25-05-2024', employee: 'Budi Raharjo', empId: 'u-x', unit: 'Bid. Lalu Lintas', cost: 1800000, transport: 'Bus Umum', status: SPPDStatus.REVISION, transportation: 'Bus Umum' },
    { id: '4', num: 'DRAFT-2024-X8', purpose: 'Rapat Koordinasi Lintas Sektoral', destination: 'Medan', date: '01-06-2024', employee: 'Dewi Lestari', empId: 'u-y', unit: 'Sekretariat', cost: 5500000, transport: 'Pesawat', status: SPPDStatus.DRAFT, transportation: 'Pesawat' },
  ]);

  const availableTemplates = MOCK_TEMPLATES.filter(t => t.category === TemplateCategory.SPPD && (t.institutionId === 'GLOBAL' || t.institutionId === user?.institutionId));

  const filteredSppds = mockSppds.filter(s => {
    const matchesSearch = s.num.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         s.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         s.destination.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Peran Administratif (Admin/Operator) melihat seluruh instansi
    if (isAdmin || isOperator) return matchesSearch;
    // Pegawai hanya melihat miliknya
    if (isPegawai) return s.empId === user?.id && matchesSearch;
    // Approver melihat semua pengajuan di instansinya
    return matchesSearch;
  });

  const handleDeleteSppd = (id: string) => {
    if(confirm('Apakah Anda yakin ingin menghapus dokumen DRAFT ini? Tindakan ini tidak dapat dibatalkan.')) {
      setMockSppds(mockSppds.filter(s => s.id !== id));
      alert('Dokumen berhasil dihapus dari sistem.');
    }
  };

  const handlePrint = () => {
    alert(`Mencetak dokumen resmi menggunakan template ${selectedTemplateId}. PDF sedang di-generate...`);
    setShowPrintModal(null);
  };

  const getStatusBadge = (status: SPPDStatus) => {
    switch(status) {
      case SPPDStatus.APPROVED: return <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-200">Disetujui</span>;
      case SPPDStatus.PENDING: return <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-200 animate-pulse">Menunggu</span>;
      case SPPDStatus.REVISION: return <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-red-200">Revisi</span>;
      case SPPDStatus.REJECTED: return <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-red-200">Ditolak</span>;
      case SPPDStatus.ARCHIVED: return <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-gray-200">Arsip</span>;
      default: return <span className="bg-gray-50 text-gray-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-gray-100">Draft</span>;
    }
  };

  return (
    <div className="animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">
             {isOperator ? 'Manajemen SPPD (Operator)' : 'Daftar SPPD'}
          </h2>
          <p className="text-gray-500 text-sm font-medium">
            {isOperator ? 'Kelola, verifikasi, dan pantau seluruh pengajuan perjalanan dinas instansi.' : 'Lacak riwayat perjalanan dinas Anda.'}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="p-3 bg-white border border-gray-100 text-gray-400 hover:text-blue-900 rounded-2xl shadow-sm transition-all">
             <Download size={20} />
          </button>
          <Link to="/sppd/baru" className="bg-blue-900 text-white px-6 py-3 rounded-2xl hover:bg-blue-800 transition-all font-black text-xs uppercase tracking-widest flex items-center space-x-2 shadow-xl shadow-blue-900/20">
            <Plus size={18} />
            <span>Buat SPPD Baru</span>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-50/50">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari No. SPPD, Pegawai, atau Tujuan..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900/10 transition-all text-sm font-medium shadow-inner"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-3 bg-white border border-gray-200 text-gray-400 hover:text-blue-900 rounded-xl transition-all shadow-sm">
              <Filter size={18} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] text-gray-400 uppercase font-black tracking-[0.2em] border-b border-gray-100 bg-gray-50/30">
                <th className="px-8 py-5">Identitas & Pelaksana</th>
                <th className="px-6 py-5">Maksud & Lokasi</th>
                <th className="px-6 py-5 text-center">Status</th>
                <th className="px-8 py-5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {filteredSppds.length > 0 ? filteredSppds.map((sppd) => {
                const canEdit = [SPPDStatus.DRAFT, SPPDStatus.REVISION].includes(sppd.status);
                const canDelete = isOperator && sppd.status === SPPDStatus.DRAFT;
                const canPrint = sppd.status === SPPDStatus.APPROVED;

                return (
                  <tr key={sppd.id} className="group hover:bg-blue-50/30 transition-all duration-300">
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-4">
                         <div className="w-12 h-12 bg-gray-100 text-gray-400 rounded-2xl flex items-center justify-center font-black group-hover:bg-blue-900 group-hover:text-white transition-all shadow-inner">
                           {sppd.employee.charAt(0)}
                         </div>
                         <div>
                            <p className="font-mono text-xs font-black text-blue-900 leading-none">{sppd.num}</p>
                            <p className="text-sm font-black text-gray-800 mt-1.5">{sppd.employee}</p>
                         </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center space-x-2 text-[10px] font-black text-blue-900 uppercase mb-1">
                         <MapPin size={12} className="text-gray-300" />
                         <span>{sppd.destination}</span>
                      </div>
                      <p className="text-xs font-medium text-gray-500 line-clamp-1 italic">"{sppd.purpose}"</p>
                    </td>
                    <td className="px-6 py-6 text-center">{getStatusBadge(sppd.status)}</td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        <button 
                          onClick={() => setSelectedSppdForDetail(sppd)} 
                          className="p-2.5 text-gray-400 hover:text-blue-900 hover:bg-white rounded-xl transition-all shadow-sm border border-transparent hover:border-gray-100"
                          title="Lihat Detail"
                        >
                          <Eye size={18} />
                        </button>
                        
                        {canEdit && (
                          <Link to={`/sppd/edit/${sppd.id}`} className="p-2.5 text-gray-400 hover:text-blue-900 hover:bg-white rounded-xl transition-all shadow-sm border border-transparent hover:border-gray-100" title="Ubah Data">
                            <FileEdit size={18} />
                          </Link>
                        )}

                        {canPrint && (
                          <button 
                            onClick={() => setShowPrintModal(sppd)}
                            className="p-2.5 text-emerald-600 bg-emerald-50 hover:bg-emerald-600 hover:text-white rounded-xl transition-all shadow-sm border border-emerald-100"
                            title="Cetak SPPD"
                          >
                            <Printer size={18} />
                          </button>
                        )}

                        {canDelete && (
                          <button 
                            onClick={() => handleDeleteSppd(sppd.id)}
                            className="p-2.5 text-gray-400 hover:text-red-600 bg-white rounded-xl border border-gray-100 shadow-sm transition-all"
                            title="Hapus Draft"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              }) : (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center">
                     <ClipboardList size={64} className="mx-auto text-gray-100 mb-6" />
                     <p className="text-gray-400 font-black uppercase text-xs tracking-widest">Tidak ada pengajuan ditemukan</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAIL MODAL */}
      {selectedSppdForDetail && (
         <div className="fixed inset-0 bg-blue-900/60 backdrop-blur-md flex items-center justify-center z-[100] p-4">
            <div className="bg-white w-full max-w-4xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300 flex flex-col max-h-[90vh]">
               <div className="p-10 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
                  <div className="flex items-center space-x-5">
                     <div className="w-14 h-14 bg-blue-900 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/20">
                        <FileSearch size={28} />
                     </div>
                     <div>
                        <h4 className="text-2xl font-black text-gray-900 tracking-tight">Detail Dokumen SPPD</h4>
                        <p className="text-sm text-gray-500 font-medium">Nomor Berkas: {selectedSppdForDetail.num}</p>
                     </div>
                  </div>
                  <button onClick={() => setSelectedSppdForDetail(null)} className="p-4 bg-white border border-gray-100 hover:bg-gray-100 rounded-3xl text-gray-400 transition-all shadow-sm"><X size={24} /></button>
               </div>

               <div className="p-10 space-y-10 overflow-y-auto custom-scrollbar flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                     <div className="space-y-6">
                        <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-l-4 border-blue-900 pl-4">Informasi Personal</h5>
                        <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 space-y-4">
                           <div>
                              <p className="text-[9px] font-black text-gray-400 uppercase mb-1">Nama Pegawai Pelaksana</p>
                              <p className="text-sm font-black text-gray-800">{selectedSppdForDetail.employee}</p>
                           </div>
                           <div>
                              <p className="text-[9px] font-black text-gray-400 uppercase mb-1">Unit Kerja</p>
                              <p className="text-sm font-bold text-blue-900">{selectedSppdForDetail.unit}</p>
                           </div>
                        </div>
                     </div>

                     <div className="space-y-6">
                        <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-l-4 border-emerald-500 pl-4">Rincian Keuangan</h5>
                        <div className="p-8 bg-emerald-50 rounded-[2rem] border border-emerald-100 relative overflow-hidden group">
                           <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1 relative z-10">Estimasi Plafon (SBM)</p>
                           <h4 className="text-3xl font-black text-gray-900 relative z-10">Rp {selectedSppdForDetail.cost.toLocaleString('id-ID')}</h4>
                           <div className="mt-4 inline-flex items-center space-x-2 px-3 py-1 bg-white rounded-lg border border-emerald-100 text-[8px] font-black text-emerald-600 uppercase relative z-10">
                              <ShieldCheck size={10} /> <span>Plafon Terverifikasi</span>
                           </div>
                           <Wallet size={120} className="absolute -right-6 -bottom-6 text-emerald-900/5 rotate-12 group-hover:rotate-0 transition-transform duration-700" />
                        </div>
                     </div>
                  </div>

                  <div className="space-y-6">
                     <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-l-4 border-amber-500 pl-4">Uraian Tugas</h5>
                     <div className="p-8 bg-amber-50/50 rounded-[2.5rem] border border-amber-100">
                        <p className="text-sm font-bold text-gray-700 leading-relaxed italic">"{selectedSppdForDetail.purpose}"</p>
                        <div className="mt-6 flex items-center space-x-8">
                           <div className="flex items-center space-x-2">
                              <MapPin size={16} className="text-blue-900" />
                              <span className="text-xs font-black text-gray-800 uppercase tracking-widest">{selectedSppdForDetail.destination}</span>
                           </div>
                           <div className="flex items-center space-x-2">
                              <Calendar size={16} className="text-blue-900" />
                              <span className="text-xs font-black text-gray-800 uppercase tracking-widest">{selectedSppdForDetail.date}</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="p-10 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                     <Lock size={18} className="mr-2 text-blue-900" /> Data Aman & Terenkripsi
                  </div>
                  <div className="flex space-x-4">
                     <button onClick={() => setSelectedSppdForDetail(null)} className="px-8 py-4 font-black text-[10px] uppercase tracking-widest text-gray-400 hover:text-gray-800 transition-all">Tutup</button>
                     {isOperator && selectedSppdForDetail.status === SPPDStatus.DRAFT && (
                        <Link to={`/sppd/edit/${selectedSppdForDetail.id}`} className="bg-blue-900 text-white px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-900/20 hover:bg-blue-800 transition-all">Edit Dokumen</Link>
                     )}
                  </div>
               </div>
            </div>
         </div>
      )}

      {/* MODAL PRINT */}
      {showPrintModal && (
        <div className="fixed inset-0 bg-blue-900/60 backdrop-blur-md flex items-center justify-center z-[110] p-4">
           <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
              <div className="p-10 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
                 <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-blue-900 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-blue-900/20"><Printer size={28} /></div>
                    <h4 className="text-2xl font-black text-gray-900 tracking-tight">Cetak SPPD Resmi</h4>
                 </div>
                 <button onClick={() => setShowPrintModal(null)} className="p-3 bg-white border border-gray-100 hover:bg-gray-100 rounded-2xl text-gray-400"><X size={24} /></button>
              </div>
              <div className="p-10 space-y-8">
                 <div className="space-y-4">
                    <p className="text-sm font-bold text-gray-500 ml-1">Pilih format tata naskah dinas:</p>
                    <div className="space-y-3">
                       {availableTemplates.map(t => (
                         <label key={t.id} className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all cursor-pointer ${selectedTemplateId === t.id ? 'border-blue-900 bg-blue-50' : 'border-gray-100 hover:border-blue-200'}`}>
                            <div className="flex items-center space-x-4">
                               <input 
                                 type="radio" 
                                 name="tmplt" 
                                 className="w-5 h-5 accent-blue-900" 
                                 checked={selectedTemplateId === t.id} 
                                 onChange={() => setSelectedTemplateId(t.id)} 
                               />
                               <span className="text-sm font-black text-gray-700">{t.name}</span>
                            </div>
                            <FileCode size={20} className={selectedTemplateId === t.id ? 'text-blue-900' : 'text-gray-300'} />
                         </label>
                       ))}
                    </div>
                 </div>
                 <button onClick={handlePrint} className="w-full py-5 bg-blue-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-blue-900/30 hover:bg-blue-800 transition-all flex items-center justify-center space-x-2">
                    <Printer size={18} />
                    <span>Download Berkas PDF</span>
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default SPPDListPage;
