
import React, { useState } from 'react';
import { MOCK_TRANSACTIONS, MOCK_INSTITUTIONS, MOCK_PLANS } from '../../constants';
import { Transaction, TransactionStatus } from '../../types';
import { 
  Check, 
  X, 
  Eye, 
  FileText, 
  Download, 
  AlertCircle, 
  ShieldCheck, 
  Calendar, 
  CreditCard,
  Building2,
  Clock,
  Printer,
  ChevronRight,
  ExternalLink,
  Search,
  Filter
} from 'lucide-react';

const PaymentVerificationPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [selectedTrx, setSelectedTrx] = useState<Transaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReview = (trx: Transaction) => {
    setSelectedTrx(trx);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTrx(null);
  };

  const getStatusBadge = (status: TransactionStatus) => {
    switch(status) {
      case TransactionStatus.APPROVED: 
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-700 uppercase tracking-widest">Berhasil</span>;
      case TransactionStatus.PENDING: 
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-700 uppercase tracking-widest animate-pulse">Menunggu</span>;
      case TransactionStatus.REJECTED: 
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black bg-red-100 text-red-700 uppercase tracking-widest">Ditolak</span>;
      default: return null;
    }
  };

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Verifikasi Pembayaran</h2>
          <p className="text-gray-500 text-sm font-medium">Validasi bukti transfer dan kelola arus kas masuk dari seluruh tenant.</p>
        </div>
        <div className="flex items-center space-x-3">
           <button className="bg-white border border-gray-200 text-gray-600 px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-50 transition-all flex items-center space-x-2">
             <Download size={18} />
             <span>Laporan Keuangan</span>
           </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input type="text" placeholder="Cari ID Transaksi atau Nama Institusi..." className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-900/10 outline-none text-sm font-medium" />
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2.5 text-gray-500 hover:text-blue-900 hover:bg-blue-50 rounded-xl border border-gray-100">
            <Filter size={18} />
          </button>
          <select className="bg-gray-50 border border-gray-100 text-gray-600 text-xs font-black px-4 py-2.5 rounded-xl outline-none uppercase tracking-wider">
            <option>Semua Status</option>
            <option>Pending</option>
            <option>Approved</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] text-gray-400 uppercase font-black tracking-[0.15em] border-b border-gray-50 bg-gray-50/30">
                <th className="px-8 py-5">Informasi Transaksi</th>
                <th className="px-6 py-5">Instansi & Paket</th>
                <th className="px-6 py-5">Jumlah Nominal</th>
                <th className="px-6 py-5">Tanggal Masuk</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-8 py-5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {transactions.map((trx) => {
                const inst = MOCK_INSTITUTIONS.find(i => i.id === trx.institutionId);
                const plan = MOCK_PLANS.find(p => p.id === trx.planId);
                return (
                  <tr key={trx.id} className="group hover:bg-blue-50/30 transition-all duration-300">
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gray-100 text-gray-400 rounded-xl flex items-center justify-center font-mono text-[10px] font-black">
                          TRX
                        </div>
                        <div>
                          <p className="font-mono text-xs font-black text-gray-400">{trx.id}</p>
                          <button className="text-[10px] font-black text-blue-900 uppercase tracking-widest mt-1 flex items-center hover:underline">
                            <Eye size={12} className="mr-1" /> Bukti Bayar
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div>
                        <p className="font-black text-gray-900 leading-tight">{inst?.name}</p>
                        <p className="text-xs font-bold text-blue-900 mt-1">{plan?.name} Plan</p>
                      </div>
                    </td>
                    <td className="px-6 py-6 font-black text-gray-900">
                      Rp {trx.amount.toLocaleString('id-ID')}
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center text-xs font-bold text-gray-500">
                        <Clock size={14} className="mr-2 text-gray-300" />
                        {new Date(trx.createdAt).toLocaleDateString('id-ID')}
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      {getStatusBadge(trx.status)}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        {trx.status === TransactionStatus.PENDING ? (
                          <button 
                            onClick={() => handleReview(trx)}
                            className="bg-blue-900 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/10"
                          >
                            Tinjau Bukti
                          </button>
                        ) : (
                          <button className="p-2 text-gray-400 hover:text-blue-900 hover:bg-blue-50 rounded-xl transition-all">
                            <Printer size={18} />
                          </button>
                        )}
                        <button className="p-2 text-gray-400 hover:text-blue-900 hover:bg-blue-50 rounded-xl transition-all">
                          <ChevronRight size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Modal */}
      {isModalOpen && selectedTrx && (
        <div className="fixed inset-0 bg-blue-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300 flex flex-col md:flex-row max-h-[90vh]">
            {/* Left: Proof Preview */}
            <div className="w-full md:w-1/2 bg-gray-100 p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-200">
               <div className="w-full h-full bg-white rounded-2xl shadow-inner border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-4">
                 <FileText size={64} className="text-gray-300 mb-4" />
                 <p className="text-gray-500 font-bold text-sm">Pratinjau Bukti Transfer</p>
                 <p className="text-xs text-gray-400 mt-2">bukti_transfer_inst1.jpg</p>
                 <button className="mt-8 bg-gray-900 text-white px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest flex items-center">
                   <ExternalLink size={14} className="mr-2" /> Buka Fullscreen
                 </button>
               </div>
            </div>

            {/* Right: Actions & Details */}
            <div className="w-full md:w-1/2 p-8 flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <h4 className="text-xl font-black text-gray-900">Verifikasi Transaksi</h4>
                <button onClick={closeModal} className="p-2 bg-gray-50 hover:bg-gray-100 rounded-xl text-gray-400 transition-all">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 space-y-6 overflow-y-auto pr-2 custom-scrollbar">
                <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                  <p className="text-[10px] font-black text-blue-900 uppercase tracking-widest mb-4">Ringkasan Pembayaran</p>
                  <div className="grid grid-cols-2 gap-y-4">
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase">Institusi</p>
                      <p className="text-xs font-bold text-gray-900">{MOCK_INSTITUTIONS.find(i => i.id === selectedTrx.institutionId)?.name}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase">ID Paket</p>
                      <p className="text-xs font-bold text-gray-900">{MOCK_PLANS.find(p => p.id === selectedTrx.planId)?.name}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase">Nominal</p>
                      <p className="text-sm font-black text-blue-900">Rp {selectedTrx.amount.toLocaleString('id-ID')}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase">Tanggal Upload</p>
                      <p className="text-xs font-bold text-gray-900">{new Date(selectedTrx.createdAt).toLocaleString('id-ID')}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Catatan / Pesan untuk Tenant</label>
                  <textarea rows={3} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm font-medium" placeholder="Tulis catatan jika ada ketidaksesuaian nominal..."></textarea>
                </div>

                <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-start space-x-3">
                  <ShieldCheck size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-emerald-800 font-bold leading-relaxed uppercase tracking-tight">
                    Menyetujui pembayaran ini akan secara otomatis memperpanjang masa aktif langganan instansi tersebut.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100 flex space-x-3">
                <button className="flex-1 py-3 bg-red-50 text-red-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-100 transition-all flex items-center justify-center space-x-2">
                  <X size={16} />
                  <span>Tolak Bukti</span>
                </button>
                <button className="flex-[2] py-3 bg-blue-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-800 transition-all shadow-xl shadow-blue-900/20 flex items-center justify-center space-x-2">
                  <Check size={16} />
                  <span>Verifikasi & Aktifkan</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentVerificationPage;
