
import React, { useState } from 'react';
import { useAuth } from '../../App';
import { MOCK_PLANS, MOCK_TRANSACTIONS } from '../../constants';
import { SubscriptionStatus, TransactionStatus } from '../../types';
// Added missing icon imports: RefreshCw, Info, AlertCircle
import { 
  CreditCard, 
  CheckCircle2, 
  ArrowUpCircle, 
  History, 
  Download, 
  AlertTriangle,
  Zap,
  Clock,
  X,
  ShieldCheck,
  FileText,
  BadgePercent,
  ChevronRight,
  TrendingUp,
  Receipt,
  Wallet,
  RefreshCw,
  Info,
  AlertCircle
} from 'lucide-react';

const MySubscriptionPage: React.FC = () => {
  const { subscription, user } = useAuth();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isDownloading, setIsDownloading] = useState<string | null>(null);
  
  const currentPlan = MOCK_PLANS.find(p => p.id === subscription?.planId) || MOCK_PLANS[0];

  // Helper untuk menghitung sisa hari (mock logic)
  const getRemainingDays = () => {
    if (!subscription?.endDate) return 0;
    const end = new Date(subscription.endDate);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 3600 * 24)));
  };

  const remainingDays = getRemainingDays();
  const remainingPercent = Math.min(100, (remainingDays / 365) * 100);

  const getStatusDisplay = () => {
    switch (subscription?.status) {
      case SubscriptionStatus.ACTIVE: 
        return { label: 'Langganan Aktif', color: 'text-emerald-600 bg-emerald-50 border-emerald-100', icon: <CheckCircle2 size={16} className="mr-2" /> };
      case SubscriptionStatus.TRIAL: 
        return { label: 'Masa Trial', color: 'text-blue-600 bg-blue-50 border-blue-100', icon: <Zap size={16} className="mr-2" /> };
      case SubscriptionStatus.EXPIRED: 
        return { label: 'Masa Aktif Habis', color: 'text-red-600 bg-red-50 border-red-100', icon: <AlertTriangle size={16} className="mr-2" /> };
      default: 
        return { label: 'Belum Berlangganan', color: 'text-gray-600 bg-gray-50 border-gray-100', icon: <Clock size={16} className="mr-2" /> };
    }
  };

  const handleDownloadInvoice = (id: string) => {
    setIsDownloading(id);
    setTimeout(() => {
      alert(`Invoice ${id} berhasil digenerate. Mengunduh PDF...`);
      setIsDownloading(null);
    }, 1500);
  };

  const statusInfo = getStatusDisplay();

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Subscription & Billing</h2>
          <p className="text-gray-500 text-sm font-medium">Monitoring paket aktif, kuota sistem, dan administrasi keuangan instansi.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-all font-bold text-sm flex items-center shadow-sm">
            <Receipt size={18} className="mr-2" />
            <span>Faktur Pajak</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Current Plan Card */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden group">
            <div className="p-10 border-b border-gray-50 flex flex-col md:flex-row md:items-start justify-between gap-8 bg-gradient-to-br from-white to-gray-50/50">
              <div className="space-y-4">
                <div className={`inline-flex items-center px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest ${statusInfo.color}`}>
                  {statusInfo.icon}
                  {statusInfo.label}
                </div>
                <div>
                  <h3 className="text-4xl font-black text-gray-900 tracking-tight">{currentPlan.name}</h3>
                  <p className="text-gray-500 mt-2 font-medium">Batas SPPD: <span className="text-gray-900 font-bold">{currentPlan.sppdLimit === 9999 ? 'Tanpa Batas' : `${currentPlan.sppdLimit} Dokumen/Bln`}</span></p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center justify-center min-w-[180px]">
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Sisa Masa Berlaku</p>
                 <h4 className={`text-4xl font-black ${remainingDays < 30 ? 'text-red-600' : 'text-blue-900'}`}>{remainingDays}</h4>
                 <p className="text-[10px] font-bold text-gray-400 uppercase mt-1">Hari Lagi</p>
                 <div className="w-full h-1.5 bg-gray-100 rounded-full mt-4 overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 ${remainingDays < 30 ? 'bg-red-500' : 'bg-emerald-500'}`} 
                      style={{ width: `${remainingPercent}%` }}
                    ></div>
                 </div>
              </div>
            </div>

            <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center">
                  <TrendingUp size={14} className="mr-2" /> Pemanfaalan Resource
                </h4>
                <div className="space-y-5">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-black uppercase tracking-tighter">
                      <span className="text-gray-500">Akun Pegawai Terdaftar</span>
                      <span className="text-gray-900">8 / {currentPlan.userLimit === 9999 ? '∞' : currentPlan.userLimit}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-900 rounded-full w-[80%] transition-all duration-700"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-black uppercase tracking-tighter">
                      <span className="text-gray-500">Arsip SPPD (Tahun ini)</span>
                      <span className="text-gray-900">142 / {currentPlan.sppdLimit === 9999 ? '∞' : currentPlan.sppdLimit * 12}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full w-[35%] transition-all duration-700"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Fitur Premium Aktif</h4>
                <ul className="space-y-3">
                  {currentPlan.features.map((f, i) => (
                    <li key={i} className="flex items-center text-xs font-bold text-gray-700">
                      <div className="w-5 h-5 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mr-3 shrink-0">
                         <CheckCircle2 size={12} />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="px-10 py-6 bg-gray-900 flex flex-col md:flex-row items-center justify-between gap-4">
               <p className="text-gray-400 text-xs font-medium">Butuh lebih banyak kuota atau fitur kustom untuk instansi Anda?</p>
               <button 
                 onClick={() => setShowPaymentModal(true)}
                 className="bg-white text-gray-900 px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-50 transition-all flex items-center"
               >
                 <ArrowUpCircle size={16} className="mr-2" />
                 Tingkatkan Layanan
               </button>
            </div>
          </div>

          {/* Billing History Section */}
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-gray-50 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-50 text-gray-400 rounded-2xl flex items-center justify-center">
                   <History size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-black text-gray-900">Riwayat Pembayaran</h4>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Daftar Faktur & Status Transaksi</p>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50 text-[10px] text-gray-400 uppercase font-black tracking-[0.2em] border-b border-gray-100">
                    <th className="px-8 py-5">Tanggal & ID</th>
                    <th className="px-6 py-5">Paket Layanan</th>
                    <th className="px-6 py-5">Jumlah Bayar</th>
                    <th className="px-6 py-5">Status</th>
                    <th className="px-8 py-5 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-sm">
                  {MOCK_TRANSACTIONS.filter(t => t.institutionId === user?.institutionId).map((trx) => (
                    <tr key={trx.id} className="group hover:bg-blue-50/20 transition-all duration-300">
                      <td className="px-8 py-6">
                        <p className="text-xs font-black text-gray-900 leading-none">{new Date(trx.createdAt).toLocaleDateString('id-ID')}</p>
                        <p className="text-[10px] text-gray-400 font-mono mt-1 font-bold">#{trx.id.toUpperCase()}</p>
                      </td>
                      <td className="px-6 py-6">
                        <span className="text-xs font-bold text-gray-700">{MOCK_PLANS.find(p => p.id === trx.planId)?.name}</span>
                      </td>
                      <td className="px-6 py-6">
                        <span className="text-sm font-black text-blue-900">Rp {trx.amount.toLocaleString('id-ID')}</span>
                      </td>
                      <td className="px-6 py-6">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${trx.status === TransactionStatus.APPROVED ? 'text-emerald-700 bg-emerald-50 border border-emerald-100' : 'text-amber-700 bg-amber-50 border border-amber-100'}`}>
                          {trx.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button 
                          onClick={() => handleDownloadInvoice(trx.id)}
                          disabled={isDownloading === trx.id}
                          className="p-2 text-gray-400 hover:text-blue-900 hover:bg-white rounded-xl transition-all shadow-sm disabled:opacity-50"
                          title="Download Invoice PDF"
                        >
                          {isDownloading === trx.id ? <RefreshCw size={18} className="animate-spin" /> : <Download size={18} />}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-8 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
               <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total 1 Transaksi Ditemukan</span>
               <button className="text-[10px] font-black text-blue-900 uppercase tracking-widest hover:underline">Tampilkan Lebih Banyak</button>
            </div>
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="space-y-8">
          <div className="bg-blue-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-8">
                <CreditCard size={32} className="text-amber-400" />
              </div>
              <h4 className="text-2xl font-black mb-4 tracking-tight leading-tight">Metode Pembayaran Instansi</h4>
              <p className="text-blue-100 text-sm leading-relaxed mb-8 font-medium opacity-80">
                Kami mendukung transfer bank manual dan otomatis (VA) untuk memudahkan administrasi keuangan pemerintah.
              </p>
              
              <div className="space-y-4">
                 <div className="flex items-center p-4 bg-white/5 rounded-2xl border border-white/10 group-hover:bg-white/10 transition-all">
                    <Wallet size={20} className="text-blue-300 mr-4" />
                    <div>
                       <p className="text-[10px] font-black text-blue-200 uppercase tracking-widest">Default Payment</p>
                       <p className="text-sm font-bold">Transfer Bank Mandiri</p>
                    </div>
                 </div>
              </div>

              <button className="w-full mt-10 bg-white text-blue-900 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-50 transition-all shadow-xl">
                 Ganti Metode
              </button>
            </div>
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
             <div className="flex items-center space-x-3">
                <BadgePercent size={24} className="text-emerald-600" />
                <h5 className="text-lg font-black text-gray-900">Program Loyalitas</h5>
             </div>
             <p className="text-xs text-gray-500 leading-relaxed font-medium">
                Dapatkan potongan harga 20% untuk perpanjangan langganan tahunan di muka. Hubungi Account Manager Anda untuk penawaran khusus.
             </p>
             <button className="w-full flex items-center justify-between p-4 bg-emerald-50 text-emerald-700 rounded-2xl font-bold text-xs hover:bg-emerald-100 transition-all">
                <span>Pelajari Selengkapnya</span>
                <ChevronRight size={16} />
             </button>
          </div>

          <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 flex items-start space-x-4">
            <Info size={24} className="text-gray-400 shrink-0 mt-1" />
            <p className="text-[10px] text-gray-500 font-bold leading-relaxed uppercase tracking-tight">
              Seluruh transaksi di E-SIMPerDin diproses melalui gateway terenkripsi dan memenuhi standar kepatuhan audit keuangan negara.
            </p>
          </div>
        </div>
      </div>

      {/* Upgrade Plan Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-blue-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-4xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            <div className="p-8 md:p-12 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <div>
                <h4 className="text-3xl font-black text-gray-900 tracking-tight">Tingkatkan Kapasitas Institusi</h4>
                <p className="text-sm text-gray-500 font-medium mt-1">Pilih paket yang paling sesuai dengan volume kerja Anda.</p>
              </div>
              <button onClick={() => setShowPaymentModal(false)} className="p-3 bg-white border border-gray-100 hover:bg-gray-100 rounded-2xl text-gray-400 transition-all shadow-sm">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-8 md:p-12 overflow-y-auto max-h-[70vh] custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {MOCK_PLANS.map(p => (
                  <label key={p.id} className={`relative flex flex-col p-8 border-2 rounded-[2.5rem] cursor-pointer transition-all ${p.id === currentPlan.id ? 'border-blue-900 bg-blue-50/30' : 'border-gray-100 hover:border-blue-200 bg-white'}`}>
                    <input type="radio" name="plan" className="sr-only peer" defaultChecked={p.id === currentPlan.id} />
                    
                    <div className="mb-6 flex items-start justify-between">
                       <div className={`p-3 rounded-2xl ${p.id === 'plan-enterprise' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-900'}`}>
                          <Zap size={24} />
                       </div>
                       {p.id === currentPlan.id && (
                         <span className="text-[10px] font-black uppercase text-blue-900 bg-white px-3 py-1 rounded-full shadow-sm border border-blue-100">Paket Anda</span>
                       )}
                    </div>

                    <h5 className="text-xl font-black text-gray-900 mb-1">{p.name}</h5>
                    <div className="flex items-baseline space-x-1 mb-6">
                       <span className="text-2xl font-black text-gray-900">Rp {(p.price / 1000).toLocaleString('id-ID')}K</span>
                       <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">/ Bln</span>
                    </div>

                    <ul className="space-y-4 flex-1">
                      <li className="flex items-start text-[11px] font-bold text-gray-600">
                        <CheckCircle2 size={14} className="text-emerald-500 mr-2 shrink-0" />
                        Limit {p.sppdLimit === 9999 ? 'Tanpa Batas' : p.sppdLimit} SPPD
                      </li>
                      <li className="flex items-start text-[11px] font-bold text-gray-600">
                        <CheckCircle2 size={14} className="text-emerald-500 mr-2 shrink-0" />
                        Hingga {p.userLimit === 9999 ? '∞' : p.userLimit} Pengguna
                      </li>
                      {p.features.slice(0, 2).map((f, idx) => (
                        <li key={idx} className="flex items-start text-[11px] font-bold text-gray-500 italic leading-tight">
                           <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-2 mt-1.5 shrink-0"></div>
                           {f}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                       <span className="text-[10px] font-black text-blue-900 uppercase tracking-widest peer-checked:block hidden">Pilih Paket Ini</span>
                    </div>
                  </label>
                ))}
              </div>

              <div className="mt-12 p-8 bg-gray-900 rounded-[2.5rem] text-white flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center space-x-6">
                   <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center">
                      <ShieldCheck size={28} className="text-blue-300" />
                   </div>
                   <div>
                      <h6 className="text-lg font-black tracking-tight">Pembayaran Aman & Terverifikasi</h6>
                      <p className="text-blue-200 text-[10px] font-bold uppercase tracking-widest">Transfer Bank • Virtual Account • Kartu Kredit</p>
                   </div>
                </div>
                <button className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-50 transition-all shadow-xl">
                   Lanjutkan Ke Pembayaran
                </button>
              </div>
            </div>
            
            <div className="p-8 bg-gray-50 border-t border-gray-100 flex items-center justify-center">
               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] flex items-center">
                  <AlertCircle size={14} className="mr-2" /> Harga belum termasuk PPN 11%
               </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MySubscriptionPage;
