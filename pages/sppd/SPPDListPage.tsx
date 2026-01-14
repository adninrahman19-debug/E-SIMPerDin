
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../App';
import { SPPDStatus, UserRole, SPPDTemplate } from '../../types';
import { MOCK_TEMPLATES } from '../../constants';
import { Plus, Search, Filter, Download, Eye, FileEdit, Trash2, CheckCircle, XCircle, Printer, X } from 'lucide-react';

const SPPDListPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSppdForPrint, setSelectedSppdForPrint] = useState<string | null>(null);

  const mockSppds = [
    { id: '1', num: '090/SPPD/2024/001', destination: 'Bandung', date: '2024-05-20', employee: 'Andi Pratama', status: SPPDStatus.APPROVED },
    { id: '2', num: '090/SPPD/2024/002', destination: 'Surabaya', date: '2024-05-22', employee: 'Siti Aminah', status: SPPDStatus.PENDING },
    { id: '3', num: '090/SPPD/2024/003', destination: 'Yogyakarta', date: '2024-05-25', employee: 'Budi Raharjo', status: SPPDStatus.REVISION },
    { id: '4', num: '090/SPPD/2024/004', destination: 'Medan', date: '2024-06-01', employee: 'Dewi Lestari', status: SPPDStatus.DRAFT },
  ];

  const getStatusBadge = (status: SPPDStatus) => {
    switch(status) {
      case SPPDStatus.APPROVED: return <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase">Disetujui</span>;
      case SPPDStatus.PENDING: return <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold uppercase">Menunggu</span>;
      case SPPDStatus.REVISION: return <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase">Revisi</span>;
      case SPPDStatus.REJECTED: return <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold uppercase">Ditolak</span>;
      default: return <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-bold uppercase">Draft</span>;
    }
  };

  const handlePrint = (templateId: string) => {
    // Simulated print action
    alert(`Mencetak SPPD menggunakan template: ${templateId}`);
    setSelectedSppdForPrint(null);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 space-y-4 md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Daftar SPPD</h2>
          <p className="text-gray-500 text-sm mt-1">Kelola dan lacak riwayat perjalanan dinas pegawai.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-all font-medium">
            <Download size={18} />
            <span>Rekap Excel</span>
          </button>
          {[UserRole.PEGAWAI, UserRole.OPERATOR, UserRole.ADMIN_INSTANSI].includes(user?.role as UserRole) && (
            <Link to="/sppd/baru" className="flex items-center space-x-2 bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-all shadow-md font-medium">
              <Plus size={18} />
              <span>Tambah Baru</span>
            </Link>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between space-y-3 md:space-y-0">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari berdasarkan nomor, nama, atau kota..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900/10 focus:border-blue-900 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-900 px-3 py-2">
            <Filter size={18} />
            <span className="text-sm font-medium">Filter Lanjutan</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-6 py-4">No. SPPD</th>
                <th className="px-6 py-4">Tujuan</th>
                <th className="px-6 py-4">Tanggal Berangkat</th>
                <th className="px-6 py-4">Pegawai</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {mockSppds.map((sppd) => (
                <tr key={sppd.id} className="hover:bg-blue-50/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-blue-900">{sppd.num}</td>
                  <td className="px-6 py-4 text-gray-700">{sppd.destination}</td>
                  <td className="px-6 py-4 text-gray-600">{sppd.date}</td>
                  <td className="px-6 py-4 text-gray-700">{sppd.employee}</td>
                  <td className="px-6 py-4">{getStatusBadge(sppd.status)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-blue-900 transition-colors" title="Lihat Detail">
                        <Eye size={18} />
                      </button>
                      
                      {sppd.status === SPPDStatus.APPROVED && (
                        <button 
                          onClick={() => setSelectedSppdForPrint(sppd.id)}
                          className="p-2 text-gray-400 hover:text-blue-900 transition-colors" title="Cetak Dokumen"
                        >
                          <Printer size={18} />
                        </button>
                      )}

                      {user?.role === UserRole.PEJABAT_PENYETUJU && sppd.status === SPPDStatus.PENDING && (
                        <>
                          <button className="p-2 text-green-500 hover:text-green-600 transition-colors" title="Setujui"><CheckCircle size={18} /></button>
                          <button className="p-2 text-red-500 hover:text-red-600 transition-colors" title="Tolak"><XCircle size={18} /></button>
                        </>
                      )}
                      {[UserRole.OPERATOR, UserRole.PEGAWAI, UserRole.ADMIN_INSTANSI].includes(user?.role as UserRole) && 
                       (sppd.status === SPPDStatus.DRAFT || sppd.status === SPPDStatus.REVISION) && (
                        <Link to={`/sppd/edit/${sppd.id}`} className="p-2 text-gray-400 hover:text-blue-900 transition-colors" title="Edit">
                          <FileEdit size={18} />
                        </Link>
                      )}
                      {user?.role === UserRole.ADMIN_INSTANSI && (
                        <button className="p-2 text-gray-400 hover:text-red-600 transition-colors" title="Hapus"><Trash2 size={18} /></button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Print Template Selection Modal */}
      {selectedSppdForPrint && (
        <div className="fixed inset-0 bg-blue-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h4 className="text-xl font-bold text-gray-900">Pilih Template Cetak</h4>
                <p className="text-sm text-gray-500">Pilih format dokumen untuk SPPD yang disetujui.</p>
              </div>
              <button onClick={() => setSelectedSppdForPrint(null)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {MOCK_TEMPLATES.filter(t => t.isActive && (t.institutionId === 'GLOBAL' || t.institutionId === user?.institutionId)).map((template) => (
                <button 
                  key={template.id}
                  onClick={() => handlePrint(template.id)}
                  className="w-full flex items-center p-4 border border-gray-100 rounded-xl hover:border-blue-900/20 hover:bg-blue-50/50 transition-all text-left"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${template.isDefault ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-500'}`}>
                    <Printer size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900">{template.name}</p>
                    <p className="text-xs text-gray-500">{template.description}</p>
                  </div>
                  {template.isDefault && (
                    <span className="text-[10px] font-bold text-blue-900 bg-blue-100 px-2 py-1 rounded uppercase">Default</span>
                  )}
                </button>
              ))}
            </div>
            <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end">
              <button onClick={() => setSelectedSppdForPrint(null)} className="px-6 py-2.5 font-bold text-gray-500 hover:text-gray-700">Tutup</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SPPDListPage;
