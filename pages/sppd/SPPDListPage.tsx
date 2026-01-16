
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
  CheckCircle2 as VerifiedIcon
} from 'lucide-react';

const SPPDListPage: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSppdForApproval, setSelectedSppdForApproval] = useState<any | null>(null);
  const [selectedSppdForDetail, setSelectedSppdForDetail] = useState<any | null>(null);
  const [showPrintModal, setShowPrintModal] = useState<any | null>(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState('tmpl-1');
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [officialNote, setOfficialNote] = useState('');

  const isAdmin = user?.role === UserRole.ADMIN_INSTANSI;
  const isOperator = user?.role === UserRole.OPERATOR;
  const isApprover = user?.role === UserRole.PEJABAT_PENYETUJU;
  const isPegawai = user?.role === UserRole.PEGAWAI;

  const [mockSppds, setMockSppds] = useState([
    { id: '1', num: '090/SPPD/2024/001', purpose: 'Koordinasi Penataan Jalur Sepeda Sudirman', destination: 'Bandung', date: '20-05-2024', employee: 'Andi Pratama', empId: 'u-5', unit: 'Sekretariat', cost: 2500000, status: SPPDStatus.APPROVED, transportation: 'Kereta Api' },
    { id: '2', num: '090/SPPD/2024/002', purpose: 'Konsultasi Perizinan Trayek AKAP', destination: 'Surabaya', date: '22-05-2024', employee: 'Siti Aminah', empId: 'u-2', unit: 'Bid. Angkutan', cost: 4200000, status: SPPDStatus.PENDING, transportation: 'Pesawat' },
    { id: '3', num: '090/SPPD/2024/003', purpose: 'Survey Lokasi Halte Trans Metro', destination: 'Yogyakarta', date: '25-05-2024', employee: 'Andi Pratama', empId: 'u-5', unit: 'Bid. Lalu Lintas', cost: 1800000, status: SPPDStatus.REVISION, transportation: 'Bus Umum' },
    { id: '4', num: '090/SPPD/2024/004', purpose: 'Rapat Koordinasi Lintas Sektoral', destination: 'Medan', date: '01-06-2024', employee: 'Dewi Lestari', empId: 'u-4', unit: 'Sekretariat', cost: 5500000, status: SPPDStatus.DRAFT, transportation: 'Pesawat' },
  ]);

  // Filter templates yang relevan (Global atau milik instansi ini)
  const availableTemplates = MOCK_TEMPLATES.filter(t => t.category === TemplateCategory.SPPD && (t.institutionId === 'GLOBAL' || t.institutionId === user?.institutionId));

  const filteredSppds = mockSppds.filter(s => {
    const matchesSearch = s.num.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         s.employee.toLowerCase().includes(searchTerm.toLowerCase());
    if (isPegawai) return s.empId === user?.id && matchesSearch;
    return matchesSearch;
  });

  const handleAiAnalysis = useCallback(async (sppd: any) => {
    setIsAiLoading(true);
    setAiAnalysis(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analisis pengajuan SPPD berikut secara ringkas untuk pimpinan: Nomor: ${sppd.num}, Pegawai: ${sppd.employee}, Tujuan: ${sppd.destination}, Maksud: ${sppd.purpose}, Biaya: Rp ${sppd.cost.toLocaleString()}. Berikan ringkasan dalam 3 poin bullet (Poin Kepatuhan, Urgensi, dan Rekomendasi). Gunakan bahasa formal.`,
      });
      setAiAnalysis(response.text || "Gagal menghasilkan analisis.");
    } catch (error) {
      setAiAnalysis("Error menghubungi AI Assistant.");
    } finally {
      setIsAiLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedSppdForApproval) {
      handleAiAnalysis(selectedSppdForApproval);
    }
  }, [selectedSppdForApproval, handleAiAnalysis]);

  const handleDecision = (id: string, status: SPPDStatus) => {
    if ((status === SPPDStatus.REVISION || status === SPPDStatus.REJECTED) && !officialNote) {
      alert('Harap masukkan catatan resmi untuk alasan penolakan atau revisi.');
      return;
    }
    setMockSppds(mockSppds.map(s => s.id === id ? { ...s, status: status } : s));
    alert(`Status SPPD berhasil diperbarui menjadi ${status.replace('_', ' ')}.`);
    setSelectedSppdForApproval(null);
    setOfficialNote('');
  };

  const handleArchive = (id: string) => {
    if(confirm('Arsipkan dokumen ini? Dokumen yang diarsipkan tidak dapat diubah lagi.')) {
      handleDecision(id, SPPDStatus.ARCHIVED);
    }
  };

  const handleCancel = (id: string) => {
    if(confirm('Batalkan pengajuan SPPD ini secara permanen?')) {
      handleDecision(id, SPPDStatus.REJECTED);
    }
  };

  const handlePrint = () => {
    alert(`Mencetak SPPD #${showPrintModal.num} menggunakan template ID: ${selectedTemplateId}`);
    setShowPrintModal(null);
  };

  const getStatusBadge = (status: SPPDStatus) => {
    switch(status) {
      case SPPDStatus.APPROVED: return <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-200">Disetujui</span>;
      case SPPDStatus.PENDING: return <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-200 animate-pulse">Diproses</span>;
      case SPPDStatus.REVISION: return <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-200">Perlu Revisi</span>;
      case SPPDStatus.REJECTED: return <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-red-200">Dibatalkan</span>;
      case SPPDStatus.ARCHIVED: return <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-gray-200">Arsip Digital</span>;
      default: return <span className="bg-gray-50 text-gray-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-gray-100">Draft</span>;
    }
  };

  return (
    <div className="animate-in fade-in duration-500 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">
             {isPegawai ? 'SPPD Saya' : isAdmin ? 'Manajemen SPPD Instansi' : 'Manajemen SPPD'}
          </h2>
          <p className="text-gray-500 text-sm font-medium">
            {isAdmin ? 'Pantau, verifikasi, dan kelola dokumen perjalanan dinas seluruh pegawai.' : 
             isPegawai ? 'Detail rencana dan berkas perjalanan dinas personal Anda.' : 
             'Panel operasional penginputan dokumen pegawai.'}
          </p>
        </div>
        {(isOperator || isAdmin || isPegawai) && (
          <Link to="/sppd/baru" className="bg-blue-900 text-white px-6 py-2.5 rounded-xl hover:bg-blue-800 transition-all font-black text-xs uppercase tracking-widest flex items-center space-x-2 shadow-xl shadow-blue-900/20">
            <Plus size={18} />
            <span>{isPegawai ? 'Ajukan SPPD' : 'Input SPPD Baru'}</span>
          </Link>
        )}
      </div>

      {/* Admin Stats Overview */}
      {isAdmin && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
           <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Total Pengajuan</p>
              <h4 className="text-2xl font-black text-gray-900">{mockSppds.length} Dokumen</h4>
           </div>
           <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
              <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest leading-none mb-1">Butuh Review</p>
              <h4 className="text-2xl font-black text-amber-600">{mockSppds.filter(s => s.status === SPPDStatus.PENDING).length} Dokumen</h4>
           </div>
           <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
              <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest leading-none mb-1">Telah Disetujui</p>
              <h4 className="text-2xl font-black text-emerald-600">{mockSppds.filter(s => s.status === SPPDStatus.APPROVED).length} Dokumen</h4>
           </div>
           <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
              <p className="text-[10px] font-black text-blue-900 uppercase tracking-widest leading-none mb-1">Anggaran Terpakai</p>
              <h4 className="text-2xl font-black text-blue-900">Rp 13.9 Jt</h4>
           </div>
        </div>
      )}

      {/* Main Container */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-50/50">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari No. SPPD atau Nama Pegawai..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900/10 transition-all text-sm font-medium shadow-inner"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            {isAdmin && (
              <select className="bg-white border border-gray-200 text-[10px] font-black uppercase px-4 py-2.5 rounded-xl outline-none shadow-sm cursor-pointer tracking-widest">
                <option>Semua Unit</option>
                <option>Sekretariat</option>
                <option>Bid. Angkutan</option>
                <option>Bid. Lalu Lintas</option>
              </select>
            )}
            <button className="p-2.5 bg-white border border-gray-200 text-gray-400 hover:text-blue-900 rounded-xl transition-all shadow-sm">
              <Filter size={18} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] text-gray-400 uppercase font-black tracking-[0.2em] border-b border-gray-100 bg-gray-50/30">
                <th className="px-8 py-5">Identitas Dokumen</th>
                {!isPegawai && <th className="px-6 py-5">Pegawai & Unit</th>}
                <th className="px-6 py-5">Kegiatan & Wilayah</th>
                <th className="px-6 py-5 text-right">Status</th>
                <th className="px-8 py-5 text-right">Manajemen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {filteredSppds.length > 0 ? filteredSppds.map((sppd) => {
                // Syarat agar dokumen bisa di-edit (Admin & Operator)
                const canEdit = (isAdmin || isOperator) && [SPPDStatus.DRAFT, SPPDStatus.REVISION, SPPDStatus.PENDING].includes(sppd.status);
                // Syarat cetak (Sudah disetujui)
                const canPrint = sppd.status === SPPDStatus.APPROVED || sppd.status === SPPDStatus.ARCHIVED;

                return (
                  <tr key={sppd.id} className="group hover:bg-blue-50/30 transition-all duration-300">
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-3">
                         <div className="w-12 h-12 bg-gray-50 text-gray-300 rounded-2xl flex items-center justify-center group-hover:bg-blue-900 group-hover:text-white transition-all shadow-inner">
                           <FileText size={20} />
                         </div>
                         <div>
                            <p className="font-mono text-xs font-black text-blue-900 leading-none">{sppd.num}</p>
                            <div className="flex items-center mt-1.5 space-x-2">
                               <Calendar size={12} className="text-gray-300" />
                               <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">{sppd.date}</span>
                            </div>
                         </div>
                      </div>
                    </td>
                    {!isPegawai && (
                      <td className="px-6 py-6">
                        <div className="flex flex-col">
                           <p className="font-black text-gray-800 leading-tight">{sppd.employee}</p>
                           <div className="flex items-center mt-1.5 space-x-1">
                              <Layers size={10} className="text-blue-400" />
                              <p className="text-[10px] text-blue-600 font-black uppercase tracking-tighter">{sppd.unit}</p>
                           </div>
                        </div>
                      </td>
                    )}
                    <td className="px-6 py-6">
                      <p className="text-xs font-black text-gray-700 line-clamp-1 italic">"{sppd.purpose}"</p>
                      <div className="flex items-center mt-2 space-x-2 text-[10px] font-bold text-gray-400 uppercase">
                         <MapPin size={12} className="text-gray-300" />
                         <span>{sppd.destination}</span>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-right">{getStatusBadge(sppd.status)}</td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        {/* Aksi Lihat Detail */}
                        <button onClick={() => setSelectedSppdForDetail(sppd)} className="p-2.5 text-gray-400 hover:text-blue-900 hover:bg-white rounded-xl transition-all shadow-sm border border-transparent hover:border-gray-100">
                          <Eye size={18} />
                        </button>
                        
                        {/* Aksi Edit */}
                        {canEdit && (
                          <Link to={`/sppd/edit/${sppd.id}`} className="p-2.5 text-gray-400 hover:text-indigo-600 hover:bg-white rounded-xl transition-all shadow-sm border border-transparent hover:border-gray-100">
                            <FileEdit size={18} />
                          </Link>
                        )}

                        {/* Aksi Otorisasi (Khusus Pimpinan/Admin) */}
                        {((isApprover || isAdmin) && sppd.status === SPPDStatus.PENDING) && (
                          <button onClick={() => setSelectedSppdForApproval(sppd)} className="bg-gradient-to-r from-blue-900 to-indigo-800 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:shadow-lg transition-all flex items-center space-x-2">
                             <Sparkles size={14} className="text-amber-400" />
                             <span>Otorisasi</span>
                          </button>
                        )}

                        {/* Aksi Cetak & Pilih Template */}
                        {canPrint && (
                          <button 
                            onClick={() => setShowPrintModal(sppd)}
                            className="p-2.5 text-blue-900 bg-blue-50 border border-blue-100 hover:bg-blue-900 hover:text-white rounded-xl transition-all shadow-sm"
                          >
                            <Printer size={18} />
                          </button>
                        )}

                        {/* Aksi Tambahan Admin (Batal / Arsip) */}
                        {isAdmin && (
                          <div className="relative group/more">
                             <button className="p-2.5 text-gray-300 hover:text-gray-900 transition-all">
                                <MoreVertical size={18} />
                             </button>
                             <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-100 rounded-2xl shadow-2xl opacity-0 group-hover/more:opacity-100 pointer-events-none group-hover/more:pointer-events-auto transition-all z-20 py-2 overflow-hidden">
                                {sppd.status === SPPDStatus.APPROVED && (
                                   <button onClick={() => handleArchive(sppd.id)} className="w-full text-left px-5 py-2.5 text-[10px] font-black text-gray-600 uppercase tracking-widest hover:bg-blue-50 flex items-center">
                                      <Archive size={14} className="mr-3 text-blue-900" /> Arsipkan Digital
                                   </button>
                                )}
                                {sppd.status !== SPPDStatus.REJECTED && (
                                   <button onClick={() => handleCancel(sppd.id)} className="w-full text-left px-5 py-2.5 text-[10px] font-black text-red-500 uppercase tracking-widest hover:bg-red-50 flex items-center">
                                      <Ban size={14} className="mr-3" /> Batalkan SPPD
                                   </button>
                                )}
                                <button className="w-full text-left px-5 py-2.5 text-[10px] font-black text-gray-600 uppercase tracking-widest hover:bg-gray-100 flex items-center">
                                   <Download size={14} className="mr-3" /> Download ZIP
                                </button>
                             </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              }) : (
                <tr>
                  <td colSpan={isPegawai ? 4 : 5} className="px-8 py-20 text-center">
                     <ClipboardList size={64} className="mx-auto text-gray-100 mb-6" />
                     <p className="text-gray-400 font-black uppercase text-xs tracking-widest">Tidak ada pengajuan ditemukan</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL PRINT & TEMPLATE PICKER */}
      {showPrintModal && (
        <div className="fixed inset-0 bg-blue-900/60 backdrop-blur-md flex items-center justify-center z-[100] p-4">
           <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300 flex flex-col max-h-[90vh]">
              <div className="p-10 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
                 <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-blue-900 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-blue-900/20"><Printer size={28} /></div>
                    <div>
                       <h4 className="text-2xl font-black text-gray-900 tracking-tight">Cetak Dokumen Resmi</h4>
                       <p className="text-sm text-gray-500 font-medium">Pilih template tata naskah dinas untuk SPPD ini.</p>
                    </div>
                 </div>
                 <button onClick={() => setShowPrintModal(null)} className="p-4 bg-white border border-gray-100 hover:bg-gray-100 rounded-3xl text-gray-400 transition-all shadow-sm"><X size={24} /></button>
              </div>

              <div className="p-10 space-y-8 overflow-y-auto custom-scrollbar">
                 <div className="space-y-4">
                    <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Template Tersedia</h5>
                    <div className="grid grid-cols-1 gap-4">
                       {availableTemplates.map((t) => (
                         <label key={t.id} className={`flex items-center justify-between p-6 rounded-3xl border-2 cursor-pointer transition-all ${selectedTemplateId === t.id ? 'border-blue-900 bg-blue-50' : 'border-gray-100 hover:border-blue-200'}`}>
                            <div className="flex items-center space-x-5">
                               <input 
                                 type="radio" 
                                 name="template" 
                                 className="w-5 h-5 accent-blue-900" 
                                 checked={selectedTemplateId === t.id}
                                 onChange={() => setSelectedTemplateId(t.id)}
                               />
                               <div className="flex flex-col">
                                  <span className="text-sm font-black text-gray-900">{t.name}</span>
                                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                                    {t.institutionId === 'GLOBAL' ? 'Standar Nasional (PMK)' : 'Kustom Instansi'} • v{t.version}.0
                                  </span>
                               </div>
                            </div>
                            <FileCode size={24} className={selectedTemplateId === t.id ? 'text-blue-900' : 'text-gray-200'} />
                         </label>
                       ))}
                    </div>
                 </div>

                 <div className="bg-gray-900 text-white p-8 rounded-[2.5rem] relative overflow-hidden group">
                    <div className="relative z-10">
                       <h6 className="text-[10px] font-black text-blue-300 uppercase tracking-widest mb-4">Informasi Dokumen</h6>
                       <div className="grid grid-cols-2 gap-6">
                          <div>
                             <p className="text-[8px] font-black text-gray-500 uppercase">Penerima Tugas</p>
                             <p className="text-sm font-bold truncate">{showPrintModal.employee}</p>
                          </div>
                          <div>
                             <p className="text-[8px] font-black text-gray-500 uppercase">Nomor SPPD</p>
                             <p className="text-sm font-mono font-bold text-emerald-400">{showPrintModal.num}</p>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="p-10 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                 <div className="flex items-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    <ShieldCheck size={18} className="mr-2 text-blue-900" /> Digital Sign Ready
                 </div>
                 <div className="flex space-x-4">
                    <button onClick={() => setShowPrintModal(null)} className="px-8 py-4 font-black text-[10px] uppercase tracking-widest text-gray-400 hover:text-gray-800 transition-all">Batalkan</button>
                    <button 
                      onClick={handlePrint}
                      className="bg-blue-900 text-white px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-blue-900/20 hover:bg-blue-800 transition-all flex items-center space-x-2"
                    >
                       <Printer size={16} />
                       <span>Proses Cetak PDF</span>
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* MODAL APPROVAL / OTORISASI (Exist) */}
      {selectedSppdForApproval && (
        <div className="fixed inset-0 bg-blue-900/60 backdrop-blur-md flex items-center justify-center z-[70] p-4">
           <div className="bg-white w-full max-w-4xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300 flex flex-col max-h-[90vh]">
              <div className="p-8 border-b border-gray-100 flex items-center justify-between">
                 <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-900 text-white rounded-2xl flex items-center justify-center"><FileCheck size={24} /></div>
                    <div>
                       <h4 className="text-2xl font-black text-gray-900">Otorisasi Dokumen</h4>
                       <p className="text-xs text-gray-400 font-bold uppercase">No: {selectedSppdForApproval.num}</p>
                    </div>
                 </div>
                 <button onClick={() => setSelectedSppdForApproval(null)} className="p-2 bg-gray-50 hover:bg-gray-100 rounded-xl text-gray-400"><X size={24} /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-10 custom-scrollbar space-y-10">
                 <div className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white p-8 rounded-[2.5rem] relative overflow-hidden shadow-xl">
                    <div className="relative z-10">
                       <div className="flex items-center space-x-2 mb-4">
                          <Sparkles size={18} className="text-amber-400" />
                          <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-200">Analisis Kepatuhan AI</h5>
                       </div>
                       {isAiLoading ? (
                          <div className="flex items-center space-x-3 py-6">
                             <RefreshCw size={24} className="animate-spin text-blue-400" />
                             <p className="text-sm font-bold animate-pulse">Meninjau dokumen...</p>
                          </div>
                       ) : (
                          <div className="text-sm font-medium leading-relaxed max-w-none">
                             {aiAnalysis?.split('\n').map((line, i) => <p key={i} className="mb-2">{line}</p>)}
                          </div>
                       )}
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                       <h5 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center"><SearchCheck size={16} className="mr-2" /> Detail Pengajuan</h5>
                       <div className="p-6 bg-gray-50 rounded-[2rem] border border-gray-100 space-y-4 text-sm font-bold">
                          <p className="text-gray-900">{selectedSppdForApproval.employee}</p>
                          <p className="text-gray-500 italic">"{selectedSppdForApproval.purpose}"</p>
                       </div>
                    </div>
                    <div className="space-y-4">
                       <h5 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center"><MessageSquare size={16} className="mr-2" /> Catatan Penyetuju</h5>
                       <textarea className="w-full h-32 p-6 bg-gray-50 border border-gray-200 rounded-[2rem] outline-none text-sm font-medium shadow-inner" placeholder="Pesan revisi atau arahan pimpinan..." value={officialNote} onChange={(e) => setOfficialNote(e.target.value)} />
                    </div>
                 </div>
              </div>

              <div className="p-8 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                 <button onClick={() => handleDecision(selectedSppdForApproval.id, SPPDStatus.REJECTED)} className="px-6 py-3 text-red-600 font-black text-[10px] uppercase tracking-widest hover:bg-red-50 rounded-xl transition-all flex items-center space-x-2"><Ban size={16} /> <span>Tolak</span></button>
                 <div className="flex space-x-3">
                    <button onClick={() => handleDecision(selectedSppdForApproval.id, SPPDStatus.REVISION)} className="px-8 py-3 bg-white border border-blue-200 text-blue-900 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-sm flex items-center space-x-2"><RotateCcw size={16} /> <span>Revisi</span></button>
                    <button onClick={() => handleDecision(selectedSppdForApproval.id, SPPDStatus.APPROVED)} className="px-10 py-3 bg-blue-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl flex items-center space-x-2"><CheckCircle size={16} /> <span>Setujui</span></button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default SPPDListPage;
