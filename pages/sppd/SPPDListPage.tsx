
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../App';
import { SPPDStatus, UserRole } from '../../types';
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
  CheckCircle
} from 'lucide-react';

const SPPDListPage: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSppdForApproval, setSelectedSppdForApproval] = useState<any | null>(null);
  const [selectedSppdForDetail, setSelectedSppdForDetail] = useState<any | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [officialNote, setOfficialNote] = useState('');

  const isOperator = user?.role === UserRole.OPERATOR;
  const isAdmin = user?.role === UserRole.ADMIN_INSTANSI;
  const isApprover = user?.role === UserRole.PEJABAT_PENYETUJU;
  const isPegawai = user?.role === UserRole.PEGAWAI;

  const [mockSppds, setMockSppds] = useState([
    { id: '1', num: '090/SPPD/2024/001', purpose: 'Koordinasi Penataan Jalur Sepeda Sudirman', destination: 'Bandung', date: '20-05-2024', employee: 'Andi Pratama', empId: 'u-5', unit: 'Sekretariat', cost: 2500000, status: SPPDStatus.APPROVED, transportation: 'Kereta Api' },
    { id: '2', num: '090/SPPD/2024/002', purpose: 'Konsultasi Perizinan Trayek AKAP', destination: 'Surabaya', date: '22-05-2024', employee: 'Siti Aminah', empId: 'u-2', unit: 'Bid. Angkutan', cost: 4200000, status: SPPDStatus.PENDING, transportation: 'Pesawat' },
    { id: '3', num: '090/SPPD/2024/003', purpose: 'Survey Lokasi Halte Trans Metro', destination: 'Yogyakarta', date: '25-05-2024', employee: 'Andi Pratama', empId: 'u-5', unit: 'Bid. Lalu Lintas', cost: 1800000, status: SPPDStatus.REVISION, transportation: 'Bus Umum' },
  ]);

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

  const handleDecision = (status: SPPDStatus) => {
    if ((status === SPPDStatus.REVISION || status === SPPDStatus.REJECTED) && !officialNote) {
      alert('Harap masukkan catatan resmi untuk alasan penolakan atau revisi.');
      return;
    }
    setMockSppds(mockSppds.map(s => s.id === selectedSppdForApproval.id ? { ...s, status: status } : s));
    alert(`Status SPPD ${selectedSppdForApproval.num} berhasil diperbarui.`);
    setSelectedSppdForApproval(null);
    setOfficialNote('');
  };

  const getStatusBadge = (status: SPPDStatus) => {
    switch(status) {
      case SPPDStatus.APPROVED: return <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-200">Disetujui</span>;
      case SPPDStatus.PENDING: return <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-200 animate-pulse">Diproses</span>;
      case SPPDStatus.REVISION: return <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-200">Perlu Revisi</span>;
      case SPPDStatus.REJECTED: return <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-red-200">Ditolak</span>;
      default: return <span className="bg-gray-50 text-gray-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-gray-100">Draft</span>;
    }
  };

  return (
    <div className="animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">
             {isPegawai ? 'SPPD Saya' : 'Manajemen SPPD'}
          </h2>
          <p className="text-gray-500 text-sm font-medium">
            {isPegawai ? 'Detail rencana dan berkas perjalanan dinas personal Anda.' : 
             isApprover ? 'Pusat otorisasi dan validasi dokumen perjalanan dinas.' : 
             'Panel operasional penginputan dokumen pegawai.'}
          </p>
        </div>
        {(isOperator || isAdmin || isPegawai) && (
          <Link to="/sppd/baru" className="bg-blue-900 text-white px-6 py-2.5 rounded-xl hover:bg-blue-800 transition-all shadow-lg font-black text-xs uppercase tracking-widest flex items-center space-x-2">
            <Plus size={18} />
            <span>{isPegawai ? 'Ajukan SPPD Baru' : 'Input SPPD Baru'}</span>
          </Link>
        )}
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-50/50">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari No. SPPD atau Nama Pegawai..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900/10 transition-all text-sm font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] text-gray-400 uppercase font-black tracking-[0.2em] border-b border-gray-100 bg-gray-50/30">
                <th className="px-8 py-5">Dokumen</th>
                {!isPegawai && <th className="px-6 py-5">Pegawai</th>}
                <th className="px-6 py-5">Maksud & Tujuan</th>
                <th className="px-6 py-5 text-right">Status</th>
                <th className="px-8 py-5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {filteredSppds.length > 0 ? filteredSppds.map((sppd) => (
                <tr key={sppd.id} className="group hover:bg-blue-50/20 transition-all duration-300">
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-3">
                       <div className="w-10 h-10 bg-gray-100 text-gray-400 rounded-xl flex items-center justify-center font-black text-[10px]">
                         {sppd.id.padStart(3, '0')}
                       </div>
                       <div>
                          <p className="font-mono text-xs font-black text-blue-900 leading-none">{sppd.num}</p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">{sppd.date}</p>
                       </div>
                    </div>
                  </td>
                  {!isPegawai && (
                    <td className="px-6 py-6">
                      <p className="font-black text-gray-800 leading-tight">{sppd.employee}</p>
                      <p className="text-[10px] text-blue-600 font-bold uppercase mt-1">{sppd.unit}</p>
                    </td>
                  )}
                  <td className="px-6 py-6 text-gray-600">
                    <p className="text-xs font-black text-gray-700 line-clamp-1">{sppd.purpose}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">{sppd.destination}</p>
                  </td>
                  <td className="px-6 py-6 text-right">{getStatusBadge(sppd.status)}</td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button onClick={() => setSelectedSppdForDetail(sppd)} className="p-2 text-gray-400 hover:text-blue-900 hover:bg-white rounded-xl transition-all shadow-sm">
                        <Eye size={18} />
                      </button>
                      {isApprover && sppd.status === SPPDStatus.PENDING && (
                        <button onClick={() => setSelectedSppdForApproval(sppd)} className="bg-gradient-to-r from-blue-900 to-indigo-800 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:shadow-lg transition-all flex items-center space-x-2">
                           <Sparkles size={14} className="text-amber-400" />
                           <span>Otorisasi</span>
                        </button>
                      )}
                      {sppd.status === SPPDStatus.APPROVED && (
                        <button className="p-2 text-blue-900 bg-blue-50 border border-blue-100 hover:bg-blue-900 hover:text-white rounded-xl transition-all shadow-sm">
                          <Printer size={18} />
                        </button>
                      )}
                      {(sppd.status === SPPDStatus.DRAFT || sppd.status === SPPDStatus.REVISION) && (
                        <Link to={`/sppd/edit/${sppd.id}`} className="p-2 text-gray-400 hover:text-blue-900 hover:bg-white rounded-xl shadow-sm">
                          <FileEdit size={18} />
                        </Link>
                      )}
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={isPegawai ? 4 : 5} className="px-8 py-20 text-center">
                     <ClipboardList size={48} className="mx-auto text-gray-200 mb-4" />
                     <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">Tidak ada data ditemukan</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL APPROVAL DG AI SUMMARY */}
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
                       <textarea className="w-full h-32 p-6 bg-gray-50 border border-gray-200 rounded-[2rem] outline-none text-sm font-medium" placeholder="Pesan revisi atau arahan pimpinan..." value={officialNote} onChange={(e) => setOfficialNote(e.target.value)} />
                    </div>
                 </div>
              </div>

              <div className="p-8 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                 <button onClick={() => handleDecision(SPPDStatus.REJECTED)} className="px-6 py-3 text-red-600 font-black text-[10px] uppercase tracking-widest hover:bg-red-50 rounded-xl transition-all flex items-center space-x-2"><Ban size={16} /> <span>Tolak</span></button>
                 <div className="flex space-x-3">
                    <button onClick={() => handleDecision(SPPDStatus.REVISION)} className="px-8 py-3 bg-white border border-blue-200 text-blue-900 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-sm flex items-center space-x-2"><RotateCcw size={16} /> <span>Revisi</span></button>
                    <button onClick={() => handleDecision(SPPDStatus.APPROVED)} className="px-10 py-3 bg-blue-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl flex items-center space-x-2"><CheckCircle size={16} /> <span>Setujui</span></button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default SPPDListPage;
