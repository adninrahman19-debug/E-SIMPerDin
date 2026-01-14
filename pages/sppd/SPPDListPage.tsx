
import React, { useState, useEffect } from 'react';
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
  Wallet,
  Lock,
  ArrowUpRight,
  MapPin,
  Plane
} from 'lucide-react';

const SPPDListPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSppdForPrint, setSelectedSppdForPrint] = useState<any | null>(null);
  const [selectedSppdForMonitoring, setSelectedSppdForMonitoring] = useState<any | null>(null);
  const [selectedSppdForApproval, setSelectedSppdForApproval] = useState<any | null>(null);
  const [selectedSppdForDetail, setSelectedSppdForDetail] = useState<any | null>(null); // State baru untuk Detail Pegawai
  const [printDocType, setPrintDocType] = useState<TemplateCategory>(TemplateCategory.SPPD);
  const [officialNote, setOfficialNote] = useState('');

  const isOperator = user?.role === UserRole.OPERATOR;
  const isAdmin = user?.role === UserRole.ADMIN_INSTANSI;
  const isApprover = user?.role === UserRole.PEJABAT_PENYETUJU;
  const isPegawai = user?.role === UserRole.PEGAWAI;

  const [mockSppds, setMockSppds] = useState([
    { id: '1', num: '090/SPPD/2024/001', purpose: 'Koordinasi Penataan Jalur Sepeda Sudirman', destination: 'Bandung', date: '20-05-2024', employee: 'Andi Pratama', empId: 'u-5', unit: 'Sekretariat', cost: 2500000, status: SPPDStatus.APPROVED, attachments: 2, transportation: 'Kereta Api' },
    { id: '2', num: '090/SPPD/2024/002', purpose: 'Konsultasi Perizinan Trayek AKAP', destination: 'Surabaya', date: '22-05-2024', employee: 'Siti Aminah', empId: 'u-2', unit: 'Bid. Angkutan', cost: 4200000, status: SPPDStatus.PENDING, attachments: 1, transportation: 'Pesawat' },
    { id: '3', num: '090/SPPD/2024/003', purpose: 'Survey Lokasi Halte Trans Metro', destination: 'Yogyakarta', date: '25-05-2024', employee: 'Andi Pratama', empId: 'u-5', unit: 'Bid. Lalu Lintas', cost: 1800000, status: SPPDStatus.REVISION, attachments: 0, transportation: 'Bus Umum' },
    { id: '4', num: '090/SPPD/2024/004', purpose: 'Rapat Persiapan Lebaran 2024', destination: 'Medan', date: '01-06-2024', employee: 'Andi Pratama', empId: 'u-5', unit: 'Sekretariat', cost: 5500000, status: SPPDStatus.DRAFT, attachments: 3, transportation: 'Pesawat' },
  ]);

  // Filter STRICT: Pegawai HANYA bisa lihat SPPD miliknya sendiri
  const filteredSppds = mockSppds.filter(s => {
    const matchesSearch = s.num.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         s.employee.toLowerCase().includes(searchTerm.toLowerCase());
    if (isPegawai) {
      return s.empId === user?.id && matchesSearch;
    }
    return matchesSearch;
  });

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
        <div className="flex items-center space-x-3">
          {(isOperator || isAdmin || isPegawai) && (
            <Link to="/sppd/baru" className="bg-blue-900 text-white px-6 py-2.5 rounded-xl hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20 font-black text-xs uppercase tracking-widest flex items-center space-x-2">
              <Plus size={18} />
              <span>{isPegawai ? 'Ajukan SPPD Baru' : 'Input SPPD Baru'}</span>
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
              placeholder="Cari No. SPPD atau Tujuan..."
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
                <th className="px-6 py-5">Biaya (SBM)</th>
                <th className="px-6 py-5">Status</th>
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
                          <p className="font-mono text-xs font-black text-blue-900 leading-tight">{sppd.num}</p>
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
                  <td className="px-6 py-6">
                    <p className="text-xs font-black text-gray-900">Rp {sppd.cost.toLocaleString('id-ID')}</p>
                  </td>
                  <td className="px-6 py-6">{getStatusBadge(sppd.status)}</td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      {/* Pegawai Action: Lihat Detail */}
                      <button 
                        onClick={() => setSelectedSppdForDetail(sppd)}
                        className="p-2 text-gray-400 hover:text-blue-900 hover:bg-white rounded-xl transition-all shadow-sm" 
                        title="Lihat Detail"
                      >
                        <Eye size={18} />
                      </button>

                      {isApprover && sppd.status === SPPDStatus.PENDING && (
                        <button 
                          onClick={() => setSelectedSppdForApproval(sppd)}
                          className="bg-amber-500 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-600 transition-all shadow-lg flex items-center space-x-2"
                        >
                           <FileCheck size={14} />
                           <span>Otorisasi</span>
                        </button>
                      )}
                      
                      {sppd.status === SPPDStatus.APPROVED && (
                        <>
                          <button 
                            onClick={() => setSelectedSppdForPrint(sppd)}
                            className="p-2 text-blue-900 bg-blue-50 border border-blue-100 hover:bg-blue-900 hover:text-white rounded-xl transition-all shadow-sm" title="Cetak SPPD"
                          >
                            <Printer size={18} />
                          </button>
                          <button 
                            className="p-2 text-emerald-700 bg-emerald-50 border border-emerald-100 hover:bg-emerald-700 hover:text-white rounded-xl transition-all shadow-sm" title="Download Dokumen"
                            onClick={() => alert(`Mengunduh berkas SPPD ${sppd.num}...`)}
                          >
                            <Download size={18} />
                          </button>
                        </>
                      )}

                      {(sppd.status === SPPDStatus.DRAFT || sppd.status === SPPDStatus.REVISION) && (
                        <Link to={`/sppd/edit/${sppd.id}`} className="p-2 text-gray-400 hover:text-blue-900 hover:bg-white rounded-xl transition-all shadow-sm" title="Edit Rencana">
                          <FileEdit size={18} />
                        </Link>
                      )}
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={isPegawai ? 5 : 6} className="px-8 py-20 text-center">
                     <ClipboardList size={48} className="mx-auto text-gray-200 mb-4" />
                     <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">Tidak ada data ditemukan</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL DETAIL SPPD (KHUSUS PEGAWAI) */}
      {selectedSppdForDetail && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-md flex items-center justify-center z-[60] p-4">
           <div className="bg-white w-full max-w-4xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300 flex flex-col max-h-[90vh]">
              <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-blue-900 text-white">
                 <div className="flex items-center space-x-4">
                    <div className="p-3 bg-white/10 rounded-2xl"><FileText size={28} className="text-blue-200" /></div>
                    <div>
                       <h4 className="text-2xl font-black tracking-tight uppercase">Detail Perjalanan Dinas</h4>
                       <p className="text-xs text-blue-300 font-bold mt-1 uppercase tracking-widest">No Dokumen: {selectedSppdForDetail.num}</p>
                    </div>
                 </div>
                 <button onClick={() => setSelectedSppdForDetail(null)} className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl text-white transition-all"><X size={24} /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-10 custom-scrollbar space-y-10">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 flex items-center">
                         <MapPin size={12} className="mr-1.5" /> Kota Tujuan
                       </p>
                       <p className="text-lg font-black text-gray-900">{selectedSppdForDetail.destination}</p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 flex items-center">
                         <Calendar size={12} className="mr-1.5" /> Tanggal Tugas
                       </p>
                       <p className="text-lg font-black text-gray-900">{selectedSppdForDetail.date}</p>
                    </div>
                    <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100">
                       <p className="text-[10px] font-black text-blue-900 uppercase tracking-widest mb-2 flex items-center">
                         <Wallet size={12} className="mr-1.5" /> Estimasi Biaya (SBM)
                       </p>
                       <p className="text-xl font-black text-blue-900">Rp {selectedSppdForDetail.cost.toLocaleString('id-ID')}</p>
                       <p className="text-[8px] font-bold text-blue-400 uppercase mt-1 italic">* Terkunci sesuai regulasi</p>
                    </div>
                 </div>

                 <div className="space-y-4">
                    <h5 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center">
                      <AlertCircle size={14} className="mr-2" /> Maksud & Keperluan
                    </h5>
                    <div className="p-8 bg-gray-50 rounded-[2rem] border border-gray-100 font-bold text-gray-700 leading-relaxed italic">
                       "{selectedSppdForDetail.purpose}"
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                       <h5 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center">
                        <Plane size={14} className="mr-2" /> Informasi Lainnya
                       </h5>
                       <div className="space-y-3">
                          <div className="flex justify-between items-center py-2 border-b border-gray-50 text-sm font-bold">
                             <span className="text-gray-400 uppercase text-[10px]">Alat Angkut</span>
                             <span className="text-gray-900">{selectedSppdForDetail.transportation}</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-gray-50 text-sm font-bold">
                             <span className="text-gray-400 uppercase text-[10px]">Pelaksana</span>
                             <span className="text-gray-900">{selectedSppdForDetail.employee}</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-gray-50 text-sm font-bold">
                             <span className="text-gray-400 uppercase text-[10px]">Unit Kerja</span>
                             <span className="text-gray-900">{selectedSppdForDetail.unit}</span>
                          </div>
                       </div>
                    </div>
                    <div className="space-y-4">
                       <h5 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center">
                        <History size={14} className="mr-2" /> Histori Persetujuan
                       </h5>
                       <div className="space-y-4 relative pl-4 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-0.5 before:bg-blue-100">
                          <div className="flex items-center space-x-3">
                             <div className="w-2 h-2 rounded-full bg-emerald-500 ring-4 ring-emerald-50"></div>
                             <div className="text-[10px] font-bold">
                                <p className="text-gray-900 uppercase">Input Draft</p>
                                <p className="text-gray-400 uppercase tracking-tighter">Oleh: Pegawai • 12 Mei</p>
                             </div>
                          </div>
                          <div className="flex items-center space-x-3">
                             <div className={`w-2 h-2 rounded-full ${selectedSppdForDetail.status === SPPDStatus.APPROVED ? 'bg-emerald-500 ring-4 ring-emerald-50' : 'bg-amber-400 ring-4 ring-amber-50'}`}></div>
                             <div className="text-[10px] font-bold">
                                <p className="text-gray-900 uppercase">Verifikasi Keuangan</p>
                                <p className="text-gray-400 uppercase tracking-tighter">Status: {selectedSppdForDetail.status === SPPDStatus.APPROVED ? 'SELESAI' : 'MENUNGGU'}</p>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="p-8 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                 <div className="flex items-center text-xs font-bold text-gray-400">
                    <ShieldCheck size={16} className="mr-2 text-blue-900" /> Dokumen divalidasi oleh sistem
                 </div>
                 <div className="flex space-x-3">
                    {selectedSppdForDetail.status === SPPDStatus.APPROVED ? (
                       <>
                          <button className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-50 flex items-center space-x-2">
                             <Printer size={14} /> <span>Cetak</span>
                          </button>
                          <button className="px-8 py-3 bg-blue-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-800 shadow-xl flex items-center space-x-2">
                             <Download size={14} /> <span>Download PDF</span>
                          </button>
                       </>
                    ) : (
                       <button onClick={() => setSelectedSppdForDetail(null)} className="px-10 py-3 bg-gray-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all">Tutup Detail</button>
                    )}
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default SPPDListPage;
