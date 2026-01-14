
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
  ShieldCheck,
  Paperclip,
  Clock,
  UserCheck,
  MessageSquare,
  AlertTriangle,
  History,
  CheckCircle2,
  FileCheck,
  Ban,
  RotateCcw,
  User,
  Calendar,
  Wallet
} from 'lucide-react';

const SPPDListPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSppdForPrint, setSelectedSppdForPrint] = useState<any | null>(null);
  const [selectedSppdForMonitoring, setSelectedSppdForMonitoring] = useState<any | null>(null);
  const [selectedSppdForApproval, setSelectedSppdForApproval] = useState<any | null>(null);
  const [printDocType, setPrintDocType] = useState<TemplateCategory>(TemplateCategory.SPPD);
  const [officialNote, setOfficialNote] = useState('');

  const isOperator = user?.role === UserRole.OPERATOR;
  const isAdmin = user?.role === UserRole.ADMIN_INSTANSI;
  const isApprover = user?.role === UserRole.PEJABAT_PENYETUJU;

  const [mockSppds, setMockSppds] = useState([
    { id: '1', num: '090/SPPD/2024/001', purpose: 'Koordinasi Penataan Jalur Sepeda Sudirman', destination: 'Bandung', date: '20-05-2024', employee: 'Andi Pratama', unit: 'Sekretariat', cost: 2500000, status: SPPDStatus.APPROVED, attachments: 2, transportation: 'Kereta Api' },
    { id: '2', num: '090/SPPD/2024/002', purpose: 'Konsultasi Perizinan Trayek AKAP', destination: 'Surabaya', date: '22-05-2024', employee: 'Siti Aminah', unit: 'Bid. Angkutan', cost: 4200000, status: SPPDStatus.PENDING, attachments: 1, transportation: 'Pesawat' },
    { id: '3', num: '090/SPPD/2024/003', purpose: 'Survey Lokasi Halte Trans Metro', destination: 'Yogyakarta', date: '25-05-2024', employee: 'Budi Raharjo', unit: 'Bid. Lalu Lintas', cost: 1800000, status: SPPDStatus.REVISION, attachments: 0, transportation: 'Bus Umum' },
    { id: '4', num: '090/SPPD/2024/004', purpose: 'Rapat Persiapan Lebaran 2024', destination: 'Medan', date: '01-06-2024', employee: 'Dewi Lestari', unit: 'Sekretariat', cost: 5500000, status: SPPDStatus.DRAFT, attachments: 3, transportation: 'Pesawat' },
  ]);

  const mockApprovalTrail = [
    { step: 1, role: 'Operator', user: 'Lilis Staff', status: 'COMPLETED', time: '12 Mei, 09:00', note: 'Data awal diinput' },
    { step: 2, role: 'Verifikator Keuangan', user: 'Admin Keuangan', status: 'COMPLETED', time: '12 Mei, 14:20', note: 'Anggaran tersedia & sesuai DIPA' },
    { step: 3, role: 'Kepala Dinas', user: 'Budi Santoso', status: 'ACTIVE', time: '-', note: 'Menunggu Persetujuan' },
  ];

  const handleDecision = (status: SPPDStatus) => {
    if ((status === SPPDStatus.REVISION || status === SPPDStatus.REJECTED) && !officialNote) {
      alert('Harap masukkan catatan resmi untuk alasan penolakan atau revisi.');
      return;
    }
    
    setMockSppds(mockSppds.map(s => s.id === selectedSppdForApproval.id ? { ...s, status: status } : s));
    alert(`Status SPPD ${selectedSppdForApproval.num} berhasil diupdate menjadi: ${status.replace('_', ' ')}`);
    setSelectedSppdForApproval(null);
    setOfficialNote('');
  };

  const getStatusBadge = (status: SPPDStatus) => {
    switch(status) {
      case SPPDStatus.APPROVED: return <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-200">Disetujui</span>;
      case SPPDStatus.PENDING: return <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-200 animate-pulse">Menunggu</span>;
      case SPPDStatus.REVISION: return <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-200">Revisi</span>;
      case SPPDStatus.REJECTED: return <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-red-200">Ditolak</span>;
      default: return <span className="bg-gray-50 text-gray-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-gray-100">Draft</span>;
    }
  };

  const handleArchive = (id: string) => {
    if(confirm('Apakah Anda yakin ingin mengarsipkan dokumen ini?')) {
      setMockSppds(mockSppds.map(s => s.id === id ? { ...s, status: SPPDStatus.ARCHIVED } : s));
    }
  };

  return (
    <div className="animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Manajemen SPPD</h2>
          <p className="text-gray-500 text-sm font-medium">
            {isApprover ? 'Pusat otorisasi dan validasi dokumen perjalanan dinas.' : 'Panel operasional penginputan dokumen pegawai.'}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-all font-bold text-sm flex items-center space-x-2 shadow-sm">
            <Download size={18} />
            <span>Rekap Laporan</span>
          </button>
          {(isOperator || isAdmin) && (
            <Link to="/sppd/baru" className="bg-blue-900 text-white px-6 py-2.5 rounded-xl hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20 font-black text-xs uppercase tracking-widest flex items-center space-x-2">
              <Plus size={18} />
              <span>Input SPPD Baru</span>
            </Link>
          )}
        </div>
      </div>

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
            <select className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-xs font-bold text-gray-500 outline-none uppercase tracking-wider">
               <option>Semua Status</option>
               <option>Menunggu Setuju</option>
               <option>Disetujui</option>
               <option>Revisi / Ditolak</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] text-gray-400 uppercase font-black tracking-[0.2em] border-b border-gray-100 bg-gray-50/30">
                <th className="px-8 py-5">Identitas Dokumen</th>
                <th className="px-6 py-5">Pegawai & Unit</th>
                <th className="px-6 py-5">Tujuan & Lampiran</th>
                <th className="px-6 py-5">Biaya (Estimasi)</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-8 py-5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {mockSppds.map((sppd) => (
                <tr key={sppd.id} className="group hover:bg-blue-50/20 transition-all duration-300">
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-3">
                       <div className="w-10 h-10 bg-gray-100 text-gray-400 rounded-xl flex items-center justify-center font-black text-[10px]">
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
                      <div className="flex items-center text-[9px] font-black text-gray-400 uppercase tracking-tighter">
                         <Paperclip size={10} className="mr-1" /> {sppd.attachments} File Terunggah
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <p className="text-xs font-black text-gray-900">Rp {sppd.cost.toLocaleString('id-ID')}</p>
                  </td>
                  <td className="px-6 py-6">{getStatusBadge(sppd.status)}</td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      {isApprover && sppd.status === SPPDStatus.PENDING ? (
                        <button 
                          onClick={() => setSelectedSppdForApproval(sppd)}
                          className="bg-amber-500 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-600 transition-all shadow-lg shadow-amber-500/20 flex items-center space-x-2"
                        >
                           <FileCheck size={14} />
                           <span>Proses Otorisasi</span>
                        </button>
                      ) : (
                        <>
                          <button 
                            onClick={() => setSelectedSppdForMonitoring(sppd)}
                            className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-white rounded-xl transition-all shadow-sm" 
                            title="Detail Alur & Audit"
                          >
                            <ShieldCheck size={18} />
                          </button>
                          
                          {sppd.status === SPPDStatus.APPROVED && (
                            <button 
                              onClick={() => setSelectedSppdForPrint(sppd)}
                              className="p-2 text-blue-900 bg-blue-50 border border-blue-100 hover:bg-blue-900 hover:text-white rounded-xl transition-all shadow-sm" title="Cetak Dokumen"
                            >
                              <Printer size={18} />
                            </button>
                          )}

                          {(isOperator || isAdmin) && (sppd.status === SPPDStatus.DRAFT || sppd.status === SPPDStatus.REVISION) && (
                            <Link to={`/sppd/edit/${sppd.id}`} className="p-2 text-gray-400 hover:text-blue-900 hover:bg-white rounded-xl transition-all shadow-sm" title="Edit Data">
                              <FileEdit size={18} />
                            </Link>
                          )}
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL PERSETUJUAN PEJABAT (NEW) */}
      {selectedSppdForApproval && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-md flex items-center justify-center z-[60] p-4">
           <div className="bg-white w-full max-w-5xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300 flex flex-col max-h-[95vh]">
              <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-blue-900 text-white">
                 <div className="flex items-center space-x-4">
                    <div className="p-3 bg-white/10 rounded-2xl">
                       <UserCheck size={28} className="text-amber-400" />
                    </div>
                    <div>
                       <h4 className="text-2xl font-black tracking-tight">Otorisasi Perjalanan Dinas</h4>
                       <p className="text-xs text-blue-200 font-bold uppercase tracking-widest mt-1">Review Dokumen No: {selectedSppdForApproval.num}</p>
                    </div>
                 </div>
                 <button onClick={() => setSelectedSppdForApproval(null)} className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl text-white transition-all">
                    <X size={24} />
                 </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    
                    {/* Left: Summary Detail */}
                    <div className="lg:col-span-2 space-y-8">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Informasi Pelaksana</p>
                             <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-blue-900 text-white rounded-2xl flex items-center justify-center font-black text-lg">
                                   {selectedSppdForApproval.employee.charAt(0)}
                                </div>
                                <div>
                                   <p className="text-lg font-black text-gray-900 leading-none">{selectedSppdForApproval.employee}</p>
                                   <p className="text-xs text-blue-600 font-bold uppercase mt-1">{selectedSppdForApproval.unit}</p>
                                </div>
                             </div>
                          </div>
                          <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Estimasi Biaya</p>
                             <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                                   <Wallet size={24} />
                                </div>
                                <div>
                                   <p className="text-xl font-black text-gray-900 leading-none">Rp {selectedSppdForApproval.cost.toLocaleString('id-ID')}</p>
                                   <p className="text-[10px] text-emerald-600 font-bold uppercase mt-1">Sesuai Pagu SBM 2024</p>
                                </div>
                             </div>
                          </div>
                       </div>

                       <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100 space-y-6">
                          <div>
                             <h5 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center">
                                <MessageSquare size={14} className="mr-2" /> Maksud Perjalanan Dinas
                             </h5>
                             <p className="text-sm font-bold text-gray-800 leading-relaxed italic">
                                "{selectedSppdForApproval.purpose}"
                             </p>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-gray-200/50">
                             <div>
                                <p className="text-[9px] font-black text-gray-400 uppercase">Tujuan</p>
                                <p className="text-xs font-black text-gray-900 mt-1">{selectedSppdForApproval.destination}</p>
                             </div>
                             <div>
                                <p className="text-[9px] font-black text-gray-400 uppercase">Keberangkatan</p>
                                <p className="text-xs font-black text-gray-900 mt-1">{selectedSppdForApproval.date}</p>
                             </div>
                             <div>
                                <p className="text-[9px] font-black text-gray-400 uppercase">Transportasi</p>
                                <p className="text-xs font-black text-gray-900 mt-1">{selectedSppdForApproval.transportation}</p>
                             </div>
                             <div>
                                <p className="text-[9px] font-black text-gray-400 uppercase">Lampiran</p>
                                <button className="text-xs font-black text-blue-900 underline mt-1 flex items-center">
                                   <Paperclip size={12} className="mr-1" /> {selectedSppdForApproval.attachments} Berkas
                                </button>
                             </div>
                          </div>
                       </div>

                       <div className="space-y-4">
                          <label className="block text-[10px] font-black text-blue-900 uppercase tracking-widest ml-1">Berikan Catatan Resmi (Approval/Revision Note)</label>
                          <textarea 
                            rows={4}
                            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-[2rem] outline-none focus:ring-4 focus:ring-blue-900/5 font-medium text-gray-700 resize-none transition-all placeholder:text-gray-300"
                            placeholder="Tuliskan arahan pimpinan atau catatan revisi di sini..."
                            value={officialNote}
                            onChange={(e) => setOfficialNote(e.target.value)}
                          />
                       </div>
                    </div>

                    {/* Right: Audit Log Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                       <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center px-2">
                          <History size={14} className="mr-2" /> Riwayat Dokumen
                       </h5>
                       <div className="relative space-y-6 pl-6 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
                          {mockApprovalTrail.map((trail, i) => (
                             <div key={i} className="relative">
                                <div className={`absolute -left-6 w-4 h-4 rounded-full border-2 border-white shadow-sm z-10 ${
                                   trail.status === 'COMPLETED' ? 'bg-emerald-500' : 'bg-blue-500 animate-pulse'
                                }`}></div>
                                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                   <div className="flex justify-between items-start mb-1">
                                      <p className="text-[9px] font-black text-blue-900 uppercase">{trail.role}</p>
                                      <p className="text-[8px] font-bold text-gray-400">{trail.time}</p>
                                   </div>
                                   <p className="text-[11px] font-black text-gray-800 leading-none">{trail.user}</p>
                                   <p className="text-[10px] text-gray-500 mt-2 italic font-medium">"{trail.note}"</p>
                                </div>
                             </div>
                          ))}
                       </div>
                       
                       <div className="p-6 bg-blue-50 rounded-[2rem] border border-blue-100 relative overflow-hidden">
                          <ShieldCheck size={48} className="absolute -right-4 -bottom-4 text-blue-200/50" />
                          <p className="text-[9px] text-blue-900 font-bold uppercase leading-relaxed relative z-10">
                             Setiap keputusan Anda akan dibubuhi Tanda Tangan Elektronik dan tersimpan permanen sebagai alat bukti hukum kearsipan digital.
                          </p>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="p-8 bg-gray-50 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
                 <div className="flex items-center text-xs font-bold text-gray-400">
                    <AlertCircle size={14} className="mr-2 text-amber-500" />
                    Harap tinjau lampiran sebelum memberikan persetujuan final.
                 </div>
                 <div className="flex items-center space-x-3 w-full md:w-auto">
                    <button 
                      onClick={() => handleDecision(SPPDStatus.REVISION)}
                      className="flex-1 md:flex-none px-6 py-3 bg-white border border-blue-200 text-blue-700 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-50 transition-all flex items-center justify-center space-x-2 shadow-sm"
                    >
                       <RotateCcw size={14} />
                       <span>Minta Revisi</span>
                    </button>
                    <button 
                      onClick={() => handleDecision(SPPDStatus.REJECTED)}
                      className="flex-1 md:flex-none px-6 py-3 bg-red-50 border border-red-100 text-red-600 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all flex items-center justify-center space-x-2 shadow-sm"
                    >
                       <Ban size={14} />
                       <span>Tolak SPPD</span>
                    </button>
                    <button 
                      onClick={() => handleDecision(SPPDStatus.APPROVED)}
                      className="flex-[2] md:flex-none px-10 py-3 bg-emerald-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/20 flex items-center justify-center space-x-2"
                    >
                       <CheckCircle2 size={16} />
                       <span>Setujui Dokumen</span>
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* MODAL MONITORING ALUR (KEEP EXISTING) */}
      {selectedSppdForMonitoring && (
        <div className="fixed inset-0 bg-blue-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300 flex flex-col max-h-[90vh]">
            <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <div className="flex items-center space-x-4">
                 <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-lg">
                    <ShieldCheck size={28} />
                 </div>
                 <div>
                    <h4 className="text-2xl font-black text-gray-900">Monitoring Alur Persetujuan</h4>
                    <p className="text-sm text-gray-500 font-medium tracking-tight uppercase">Dokumen No: {selectedSppdForMonitoring.num}</p>
                 </div>
              </div>
              <button onClick={() => setSelectedSppdForMonitoring(null)} className="p-3 bg-white border border-gray-100 hover:bg-gray-100 rounded-2xl text-gray-400 transition-all shadow-sm">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                  <div className="lg:col-span-1 space-y-6">
                     <div className="p-6 bg-blue-50 rounded-[2rem] border border-blue-100">
                        <h5 className="text-[10px] font-black text-blue-900 uppercase tracking-widest mb-4">Status Saat Ini</h5>
                        <div className="flex items-center space-x-4">
                           <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-900 shadow-sm">
                              <Clock size={24} className="animate-pulse" />
                           </div>
                           <div>
                              <p className="text-lg font-black text-blue-900 leading-none">{selectedSppdForMonitoring.status.replace('_', ' ')}</p>
                              <p className="text-[10px] text-blue-600 font-bold uppercase mt-1">Level 3: Penyetujuan</p>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="lg:col-span-2 space-y-6">
                     <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center">
                        <History size={14} className="mr-2" /> Riwayat Persetujuan Lengkap
                     </h5>
                     <div className="relative space-y-8 pl-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
                        {mockApprovalTrail.map((trail, idx) => (
                           <div key={idx} className="relative">
                              <div className={`absolute -left-8 w-6 h-6 rounded-full border-4 border-white flex items-center justify-center z-10 shadow-sm ${
                                 trail.status === 'COMPLETED' ? 'bg-emerald-500' : 'bg-gray-200'
                              }`}>
                                 {trail.status === 'COMPLETED' ? <CheckCircle2 size={12} className="text-white" /> : <Clock size={12} className="text-gray-400" />}
                              </div>
                              <div className={`p-5 rounded-2xl border transition-all ${
                                 trail.status === 'COMPLETED' ? 'bg-white border-gray-100 hover:border-emerald-200' : 'bg-gray-50/50 border-transparent opacity-60'
                              }`}>
                                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                                    <h6 className="text-sm font-black text-gray-900 uppercase tracking-tight">{trail.role}</h6>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase">{trail.time}</span>
                                 </div>
                                 <div className="flex items-center space-x-2 text-xs font-bold text-gray-600">
                                    <UserCheck size={14} className="text-blue-900" />
                                    <span>{trail.user}</span>
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
            <div className="p-8 bg-gray-50 border-t border-gray-100 text-right">
              <button onClick={() => setSelectedSppdForMonitoring(null)} className="px-6 py-2.5 font-black text-xs text-gray-500 uppercase tracking-widest hover:text-gray-900">Tutup</button>
            </div>
          </div>
        </div>
      )}

      {/* Existing Print Package Modal (KEEP EXISTING) */}
      {selectedSppdForPrint && (
        <div className="fixed inset-0 bg-blue-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            <div className="p-8 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h4 className="text-2xl font-black text-gray-900">Cetak Paket Dokumen</h4>
                <p className="text-sm text-gray-500 font-medium tracking-tight uppercase">SPPD No: {selectedSppdForPrint.num}</p>
              </div>
              <button onClick={() => setSelectedSppdForPrint(null)} className="p-3 bg-gray-50 hover:bg-gray-100 rounded-2xl text-gray-400 transition-all">
                <X size={24} />
              </button>
            </div>

            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                 <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">1. Jenis Dokumen</h5>
                 <div className="grid grid-cols-1 gap-3">
                    {[
                      { type: TemplateCategory.SPPD, label: 'Lembar SPPD Utama', icon: <FileText size={18}/> },
                      { type: TemplateCategory.SURAT_TUGAS, label: 'Surat Perintah Tugas', icon: <ShieldCheck size={18}/> },
                      { type: TemplateCategory.KWITANSI, label: 'Kwitansi & Rincian', icon: <Receipt size={18}/> },
                    ].map((doc) => (
                      <button
                        key={doc.type}
                        onClick={() => setPrintDocType(doc.type)}
                        className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${printDocType === doc.type ? 'border-blue-900 bg-blue-50 text-blue-900 shadow-md' : 'border-gray-100 hover:border-blue-200 text-gray-600'}`}
                      >
                         <div className="flex items-center space-x-3 font-bold text-xs uppercase">
                            {doc.icon}
                            <span>{doc.label}</span>
                         </div>
                         {printDocType === doc.type && <CheckCircle size={16} className="text-blue-900" />}
                      </button>
                    ))}
                 </div>
              </div>

              <div className="space-y-4">
                 <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">2. Pilih Template</h5>
                 <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {MOCK_TEMPLATES.filter(t => t.isActive).map((template) => (
                      <button 
                        key={template.id}
                        className="group w-full flex items-start p-4 border border-gray-100 rounded-2xl hover:border-blue-900 hover:bg-gray-50 transition-all text-left"
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-4 shrink-0 ${template.isDefault ? 'bg-blue-900 text-white shadow-lg' : 'bg-gray-100 text-gray-400 group-hover:bg-blue-100 group-hover:text-blue-900'}`}>
                          <Printer size={20} />
                        </div>
                        <div className="flex-1">
                          <p className="font-black text-gray-900 text-xs">{template.name}</p>
                          <p className="text-[9px] text-gray-400 mt-1 font-medium">{template.description}</p>
                        </div>
                        <ChevronRight size={16} className="text-gray-300 mt-1" />
                      </button>
                    ))}
                 </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SPPDListPage;
