
import React from 'react';
import { MOCK_TRANSACTIONS, MOCK_INSTITUTIONS, MOCK_PLANS } from '../../constants';
import { TransactionStatus } from '../../types';
import { Check, X, Eye, FileText, Download } from 'lucide-react';

const PaymentVerificationPage: React.FC = () => {
  const getStatusBadge = (status: TransactionStatus) => {
    switch(status) {
      case TransactionStatus.APPROVED: return <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Berhasil</span>;
      case TransactionStatus.PENDING: return <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Menunggu</span>;
      case TransactionStatus.REJECTED: return <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Ditolak</span>;
      default: return null;
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Verifikasi Pembayaran</h2>
        <p className="text-gray-500 text-sm">Tinjau bukti pembayaran yang diunggah oleh institusi untuk aktivasi paket.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100 text-xs text-gray-500 uppercase font-bold tracking-widest">
            <tr>
              <th className="px-6 py-4">ID Transaksi</th>
              <th className="px-6 py-4">Institusi</th>
              <th className="px-6 py-4">Paket</th>
              <th className="px-6 py-4">Jumlah</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Bukti</th>
              <th className="px-6 py-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-sm">
            {MOCK_TRANSACTIONS.map((trx) => {
              const inst = MOCK_INSTITUTIONS.find(i => i.id === trx.institutionId);
              const plan = MOCK_PLANS.find(p => p.id === trx.planId);
              return (
                <tr key={trx.id} className="hover:bg-blue-50/20 transition-all">
                  <td className="px-6 py-4 font-mono font-semibold text-gray-400">{trx.id}</td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-900">{inst?.name}</p>
                    <p className="text-xs text-gray-400">Kode: {inst?.code}</p>
                  </td>
                  <td className="px-6 py-4 font-medium text-blue-900">{plan?.name}</td>
                  <td className="px-6 py-4 font-bold text-gray-900">Rp {trx.amount.toLocaleString('id-ID')}</td>
                  <td className="px-6 py-4">{getStatusBadge(trx.status)}</td>
                  <td className="px-6 py-4">
                    <button className="flex items-center text-blue-600 hover:text-blue-900 font-bold space-x-2">
                      <Eye size={14} />
                      <span>Lihat Bukti</span>
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center space-x-2">
                      {trx.status === TransactionStatus.PENDING && (
                        <>
                          <button className="p-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-lg transition-all" title="Verifikasi & Aktifkan">
                            <Check size={18} />
                          </button>
                          <button className="p-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-lg transition-all" title="Tolak">
                            <X size={18} />
                          </button>
                        </>
                      )}
                      <button className="p-2 text-gray-400 hover:text-blue-900 transition-all" title="Detail Transaksi">
                        <FileText size={18} />
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
  );
};

export default PaymentVerificationPage;
