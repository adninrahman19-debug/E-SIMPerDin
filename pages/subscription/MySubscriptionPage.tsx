
import React, { useState } from 'react';
import { useAuth } from '../../App';
import { MOCK_PLANS, MOCK_TRANSACTIONS } from '../../constants';
import { SubscriptionStatus, TransactionStatus } from '../../types';
import { 
  CreditCard, 
  CheckCircle2, 
  ArrowUpCircle, 
  History, 
  Download, 
  AlertTriangle,
  Zap,
  Clock,
  X
} from 'lucide-react';

const MySubscriptionPage: React.FC = () => {
  const { subscription, user } = useAuth();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const currentPlan = MOCK_PLANS.find(p => p.id === subscription?.planId) || MOCK_PLANS[0];

  const getStatusDisplay = () => {
    switch (subscription?.status) {
      case SubscriptionStatus.ACTIVE: return { label: 'Aktif', color: 'text-emerald-600 bg-emerald-50 border-emerald-100', icon: <CheckCircle2 size={16} className="mr-2" /> };
      case SubscriptionStatus.TRIAL: return { label: 'Masa Percobaan', color: 'text-blue-600 bg-blue-50 border-blue-100', icon: <Zap size={16} className="mr-2" /> };
      case SubscriptionStatus.EXPIRED: return { label: 'Kadaluwarsa', color: 'text-red-600 bg-red-50 border-red-100', icon: <AlertTriangle size={16} className="mr-2" /> };
      default: return { label: 'Belum Berlangganan', color: 'text-gray-600 bg-gray-50 border-gray-100', icon: <Clock size={16} className="mr-2" /> };
    }
  };

  const statusInfo = getStatusDisplay();

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Langganan & Billing</h2>
        <p className="text-gray-500 text-sm">Kelola paket layanan, pantau penggunaan limit, dan riwayat pembayaran institusi.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Current Plan Overview */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className={`inline-flex items-center px-4 py-1.5 rounded-full border text-xs font-extrabold uppercase tracking-wider mb-4 ${statusInfo.color}`}>
                  {statusInfo.icon}
                  {statusInfo.label}
                </div>
                <h3 className="text-3xl font-extrabold text-blue-900">{currentPlan.name}</h3>
                <p className="text-gray-500 mt-1">Berlaku sampai: <span className="font-bold text-gray-800">{subscription?.endDate || 'N/A'}</span></p>
              </div>
              <button 
                onClick={() => setShowPaymentModal(true)}
                className="bg-blue-900 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center space-x-3 hover:bg-blue-800 transition-all shadow-lg hover:shadow-xl"
              >
                <ArrowUpCircle size={20} />
                <span>Upgrade Paket</span>
              </button>
            </div>

            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Penggunaan Limit</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-gray-600">Pengguna Aktif</span>
                      <span className="font-bold text-gray-900">8 / {currentPlan.userLimit === 9999 ? '∞' : currentPlan.userLimit}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-900 rounded-full w-[80%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-gray-600">SPPD Terbit (Bulan ini)</span>
                      <span className="font-bold text-gray-900">12 / {currentPlan.sppdLimit === 9999 ? '∞' : currentPlan.sppdLimit}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full w-[24%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-gray-600">Penyimpanan Dokumen</span>
                      <span className="font-bold text-gray-900">0.4 GB / {currentPlan.storageGb} GB</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full w-[15%]"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Fitur Paket Anda</h4>
                <ul className="space-y-3">
                  {currentPlan.features.map((f, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-700">
                      <CheckCircle2 size={16} className="text-blue-900 mr-3 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Billing History */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex items-center justify-between">
              <h4 className="font-bold text-gray-900 flex items-center">
                <History size={20} className="mr-3 text-gray-400" />
                Riwayat Pembayaran
              </h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-[10px] text-gray-500 uppercase font-bold tracking-widest">
                  <tr>
                    <th className="px-6 py-4">Tanggal</th>
                    <th className="px-6 py-4">Paket</th>
                    <th className="px-6 py-4">Jumlah</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-center">Invoice</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-sm">
                  {MOCK_TRANSACTIONS.filter(t => t.institutionId === user?.institutionId).map((trx) => (
                    <tr key={trx.id} className="hover:bg-blue-50/10">
                      <td className="px-6 py-4 text-gray-600">{new Date(trx.createdAt).toLocaleDateString('id-ID')}</td>
                      <td className="px-6 py-4 font-bold text-blue-900">{MOCK_PLANS.find(p => p.id === trx.planId)?.name}</td>
                      <td className="px-6 py-4 font-semibold">Rp {trx.amount.toLocaleString('id-ID')}</td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full ${trx.status === TransactionStatus.APPROVED ? 'text-emerald-700 bg-emerald-50' : 'text-amber-700 bg-amber-50'}`}>
                          {trx.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button className="text-gray-400 hover:text-blue-900 transition-all"><Download size={18} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar: Upgrade Info */}
        <div className="space-y-6">
          <div className="bg-blue-900 text-white rounded-2xl p-8 shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <Zap size={32} className="mb-6 text-amber-400" />
              <h4 className="text-xl font-bold mb-4">Butuh Kapasitas Lebih?</h4>
              <p className="text-blue-100 text-sm leading-relaxed mb-6">
                Upgrade ke paket Enterprise untuk mendapatkan limitasi tak terbatas dan akses API untuk integrasi sistem internal Anda.
              </p>
              <button 
                onClick={() => setShowPaymentModal(true)}
                className="w-full bg-white text-blue-900 font-extrabold py-3 rounded-xl hover:bg-blue-50 transition-all"
              >
                Lihat Semua Paket
              </button>
            </div>
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center">
              <CreditCard size={18} className="mr-3 text-gray-400" />
              Metode Pembayaran
            </h4>
            <div className="space-y-3">
              <div className="flex items-center p-3 border border-gray-100 rounded-xl bg-gray-50">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-4 border border-gray-100">
                  <span className="font-bold text-blue-900 text-xs uppercase">Bank</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">Transfer Bank (Manual)</p>
                  <p className="text-xs text-gray-500">Konfirmasi 1-24 Jam</p>
                </div>
              </div>
              <div className="flex items-center p-3 border border-gray-100 rounded-xl opacity-50">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-4 border border-gray-100">
                  <span className="font-bold text-blue-900 text-xs uppercase">CC</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">Kartu Kredit / VA</p>
                  <p className="text-xs text-gray-500 italic">Coming Soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Basic Payment Modal Simulation */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-blue-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            <div className="p-8 border-b border-gray-100 flex items-center justify-between">
              <h4 className="text-xl font-bold text-gray-900">Pilih Paket & Pembayaran</h4>
              {/* Correctly imported 'X' icon from lucide-react */}
              <button onClick={() => setShowPaymentModal(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
            </div>
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 gap-4">
                {MOCK_PLANS.map(p => (
                  <label key={p.id} className="flex items-center justify-between p-4 border-2 border-gray-100 rounded-xl cursor-pointer hover:border-blue-900/20 has-[:checked]:border-blue-900 has-[:checked]:bg-blue-50/30 transition-all">
                    <div className="flex items-center">
                      <input type="radio" name="plan" className="w-5 h-5 text-blue-900 border-gray-300 focus:ring-blue-900 mr-4" defaultChecked={p.id === currentPlan.id} />
                      <div>
                        <p className="font-bold text-gray-900">{p.name}</p>
                        <p className="text-xs text-gray-500">Rp {p.price.toLocaleString('id-ID')} / Bulan</p>
                      </div>
                    </div>
                    {p.id === currentPlan.id && <span className="text-[10px] font-bold uppercase text-blue-900 bg-blue-100 px-2 py-1 rounded">Aktif</span>}
                  </label>
                ))}
              </div>

              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <p className="text-xs font-bold text-gray-400 uppercase mb-3">Instruksi Transfer</p>
                <div className="space-y-1">
                  <p className="text-sm">Bank Mandiri: <span className="font-bold">123-000-456-7890</span></p>
                  <p className="text-sm">Atas Nama: <span className="font-bold">PT. E-SIMPerDin Indonesia</span></p>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <label className="block text-xs font-bold text-gray-700 mb-2">Unggah Bukti Pembayaran (.jpg/.png/.pdf)</label>
                  <div className="w-full border-2 border-dashed border-gray-300 rounded-xl p-4 text-center cursor-pointer hover:border-blue-900 transition-all">
                    <p className="text-xs text-gray-500">Klik atau seret berkas ke sini</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-8 bg-gray-50 border-t border-gray-100 flex justify-end space-x-3">
              <button onClick={() => setShowPaymentModal(false)} className="px-6 py-2.5 font-bold text-gray-500">Batal</button>
              <button className="px-8 py-2.5 bg-blue-900 text-white font-bold rounded-xl shadow-lg hover:bg-blue-800 transition-all">Konfirmasi Bayar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MySubscriptionPage;
