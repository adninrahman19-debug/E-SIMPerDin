
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
  Clock, 
  Printer,
  ChevronRight,
  ExternalLink,
  Search,
  Filter,
  FileCheck,
  Receipt,
  RotateCcw
} from 'lucide-react';

const PaymentVerificationPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [selectedTrx, setSelectedTrx] = useState<Transaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInvoiceGenerating, setIsInvoiceGenerating] = useState(false);

  const handleReview = (trx: Transaction) => {
    setSelectedTrx(trx);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTrx(null);
  };

  const generateInvoice = () => {
    setIsInvoiceGenerating(true);
    setTimeout(() => {
      alert("Invoice PDF Berhasil Dihasilkan! Berkas telah dikirim ke email penanggung jawab instansi.");
      setIsInvoiceGenerating(false);
    }, 2000);
  };

  const getStatusBadge = (status: TransactionStatus) => {
    switch(status) {
      case TransactionStatus.APPROVED: 
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-700 uppercase tracking-widest">BERHASIL</span>;
      case TransactionStatus.PENDING: 
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-700 uppercase tracking-widest animate-pulse">PENDING</span>;
      case TransactionStatus.REJECTED: 
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black bg-red-100 text-red-700 uppercase tracking-widest">DITOLAK</span>;
      default: return null;
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
           <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1 leading-none">Financial Guard</p>
           <h3 className="text-2xl font-black text-gray-900 tracking-tight">Verifikasi & Penagihan</h3>
        </div>
        <div className="flex items-center space-x-2">
           <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="text" placeholder="ID Transaksi / Lembaga..." className="pl-10 pr-4 py-2 bg-white border border-gray-100 rounded-xl text-xs font-bold outline-none w-64 shadow-sm focus:ring-2 focus:ring-blue-900/10" />
           </div>
           <button className="p-2.5 bg-white text-gray-400 rounded-xl border border-gray-100 hover:text-blue-900 shadow-sm transition-all"><Filter size={18} /></button>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] text-gray-400 uppercase font-black tracking-[0.15em] border-b border-gray-50 bg-gray-50/30">
                <th className="px-8 py-5">Identitas Trx</th>
                <th className="px-6 py-5">Instansi Target</th>
                <th className="px-6 py-5">Nominal Bayar</th>
                <th className="px-6 py-5">Waktu Masuk</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-8 py-5 text-right">Manajemen</th>
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
                        <div className="w-10 h-10 bg-gray-100 text-gray-400 rounded-xl flex items-center justify-center font-mono text-[10px] font-black">TRX</div>
                        <div>
                          <p className="font-mono text-[10px] font-black text-gray-400 uppercase">#{trx.id}</p>
                          <p className="text-[10px] font-black text-blue-900 uppercase mt-0.5">{plan?.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6 font-black text-gray-800 text-sm leading-tight">
                      {inst?.name}
                    </td>
                    <td className="px-6 py-6 font-black text-gray-900">
                      Rp {trx.amount.toLocaleString('id-ID')}
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center text-[10px] font-bold text-gray-500 uppercase tracking-tighter">
                        <Clock size={12} className="mr-1.5 text-gray-300" />
                        {new Date(trx.createdAt).toLocaleDateString('id-ID')} - {new Date(trx.createdAt).toLocaleTimeString('id-ID')}
                      </div>
                    </td>
                    <td className="px-6 py-6">{getStatusBadge(trx.status)}</td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        {trx.status === TransactionStatus.PENDING ? (
                          <button 
                            onClick={() => handleReview(trx)}
                            className="bg-blue-900 text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/10 flex items-center space-x-2"
                          >
                            <FileCheck size={14} />
                            <span>Verifikasi</span>
                          </button>
                        ) : (
                          <button onClick={generateInvoice} className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-white rounded-xl transition-all shadow-sm" title="Generate Invoice">
                            <Receipt size={20} />
                          </button>
                        )}
                        <button className="p-2 text-gray-400 hover:text-blue-900 hover:bg-white rounded-xl transition-all"><ChevronRight size={18} /></button>
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
        <div className="fixed inset-0 bg-blue-900/60 backdrop-blur-md flex items-center justify-center z-[100] p-4">
          <div className="bg-white w-full max-w-5xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300 flex flex-col md:flex-row max-h-[90vh]">
            
            <div className="w-full md:w-1/2 bg-gray-100 p-10 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-200">
               <div className="w-full h-full bg-white rounded-3xl shadow-inner border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-6 relative group overflow-hidden">
                 <div className="w-full h-full bg-gray-50 rounded-2xl flex items-center justify-center">
                    <FileText size={80} className="text-gray-200" />
                 </div>
                 <div className="absolute inset-0 bg-blue-900/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                    <button className="bg-white text-blue-900 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center space-x-2 shadow-xl">
                       <ExternalLink size={16} />
                       <span>Zoom Bukti Bayar</span>
                    </button>
                 </div>
               </div>
            </div>

            <div className="w-full md:w-1/2 p-10 flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <h4 className="text-2xl font-black text-gray-900 tracking-tight">Review Pembayaran</h4>
                <button onClick={closeModal} className="p-2 bg-gray-50 hover:bg-gray-100 rounded-xl text-gray-400"><X size={24} /></button>
              </div>

              <div className="flex-1 space-y-8 overflow-y-auto pr-2 custom-scrollbar">
                <div className="p-8 bg-blue-50 rounded-[2.5rem] border border-blue-100">
                  <p className="text-[10px] font-black text-blue-900 uppercase tracking-[0.2em] mb-6">Informasi Transaksi</p>
                  <div className="grid grid-cols-2 gap-y-6">
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase">Institusi</p>
                      <p className="text-sm font-black text-gray-900 leading-tight">{MOCK_INSTITUTIONS.find(i => i.id === selectedTrx.institutionId)?.name}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase">Nominal</p>
                      <p className="text-lg font-black text-blue-900 leading-tight">Rp {selectedTrx.amount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase">Metode</p>
                      <p className="text-sm font-bold text-gray-700">Bank Transfer (Manual)</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase">Paket Dipilih</p>
                      <p className="text-sm font-bold text-gray-700">{MOCK_PLANS.find(p => p.id === selectedTrx.planId)?.name}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-start space-x-4">
                  <ShieldCheck size={24} className="text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-emerald-800 font-bold leading-relaxed uppercase tracking-tight">
                    Dengan menyetujui bukti ini, masa aktif langganan instansi akan otomatis diperpanjang sesuai durasi paket yang dibayar.
                  </p>
                </div>
              </div>

              <div className="mt-10 pt-10 border-t border-gray-100 flex space-x-3">
                <button className="flex-1 py-4 bg-red-50 text-red-600 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-100 transition-all flex items-center justify-center space-x-2">
                  <X size={16} />
                  <span>Tolak Bukti</span>
                </button>
                <button className="flex-[2] py-4 bg-blue-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-800 transition-all shadow-2xl shadow-blue-900/20 flex items-center justify-center space-x-2">
                  <Check size={16} />
                  <span>Validasi & Aktifkan</span>
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
