import React, { useState } from 'react';
import { useAuth } from '../../App';
import { MOCK_PLANS, MOCK_TRANSACTIONS } from '../../constants';
import { SubscriptionStatus, TransactionStatus } from '../../types';
import { 
  CreditCard, 
  Zap, 
  CheckCircle2, 
  History, 
  Download, 
  Clock, 
  Receipt, 
  BadgePercent, 
  ShieldCheck, 
  AlertCircle, 
  Info,
  ArrowUpCircle,
  X,
  ChevronRight,
  TrendingUp,
  RefreshCw,
  // Added missing ArrowUpRight import
  ArrowUpRight
} from 'lucide-react';

const MySubscriptionPage: React.FC = () => {
  const { subscription, user } = useAuth();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  
  const currentPlan = MOCK_PLANS.find(p => p.id === subscription?.planId) || MOCK_PLANS[0];
  const institutionTransactions = MOCK_TRANSACTIONS.filter(t => t.institutionId === user?.institutionId);

  // Hitung sisa hari (Simulation logic)
  const getRemainingDays = () => {
    if (!subscription?.endDate) return 0;
    const end = new Date(subscription.endDate);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 3600 * 24)));
  };

  const remainingDays = getRemainingDays();
  const validityPercentage = Math.min(100, (remainingDays / 365) * 100);

  const handleDownloadInvoice = (trxId: string) => {
    setIsProcessing(trxId);
    setTimeout(() => {
      alert(`Invoice ${trxId.toUpperCase()} berhasil digenerate. Memulai pengunduhan PDF...`);
      setIsProcessing(null);
    }, 1500);
  };

  const handleUpgrade = (planName: string) => {
    if(confirm(`Apakah Anda ingin mengajukan upgrade ke paket ${planName}? Tim billing kami akan mengirimkan instruksi pembayaran ke email instansi.`)) {
      setShowUpgradeModal(false);
      alert('Permintaan upgrade telah dikirim. Cek menu "Verifikasi Pembayaran" setelah Anda melakukan transfer.');
    }
  };

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight flex items-center">
            Subscription & Billing <CreditCard className="ml-3 text-blue-900" size={32} />
          </h2>
          <p className="text-gray-500 text-sm font-medium mt-1">Kelola lisensi platform, kuota sistem, dan administrasi keuangan instansi.</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="bg-white px-5 py-3 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-3">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
             <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Status: Authorized</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Col: Plan & Usage */}
        <div className="lg:col-span-2 space-y-8">
           {/* Active Plan Card */}
           <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden group hover:shadow-xl transition-all duration-500">
              <div className="p-10 border-b border-gray-50 flex flex-col md:flex-row items-start justify-between gap-8 bg-gradient-to-br from-white to-blue-50/20">
                 <div className="space-y-5">
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-900 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-900/20">
                       <Zap size={14} className="mr-2 fill-amber-400 text-amber-400" />
                       Paket Aktif Saat Ini
                    </div>
                    <div>
                       <h3 className="text-5xl font-black text-gray-900 tracking-tighter">{currentPlan.name}</h3>
                       <div className="flex items-center mt-3 space-x-4">
                          <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest flex items-center">
                             <Clock size={14} className="mr-1.5 text-blue-900" /> Exp: 31 Des 2024
                          </p>
                          <span className="text-gray-300">|</span>
                          <p className="text-blue-600 font-black text-[10px] uppercase tracking-widest">Enterprise Edition v2.5</p>
                       </div>
                    </div>
                 </div>
                 
                 <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-inner flex flex-col items-center justify-center min-w-[200px] relative overflow-hidden">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 relative z-10">Masa Berlaku</p>
                    <h4 className={`text-5xl font-black relative z-10 ${remainingDays < 30 ? 'text-red-600' : 'text-blue-900'}`}>{remainingDays}</h4>
                    <p className="text-[10px] font-bold text-gray-400 uppercase mt-1 relative z-10">Hari Tersisa</p>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full mt-6 overflow-hidden relative z-10">
                       <div className={`h-full transition-all duration-1000 ${remainingDays < 30 ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-emerald-500'}`} style={{ width: `${validityPercentage}%` }}></div>
                    </div>
                    <div className="absolute -right-10 -bottom-10 opacity-[0.03] group-hover:rotate-12 transition-transform duration-700">
                       <Clock size={160} />
                    </div>
                 </div>
              </div>

              <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-12">
                 <div className="space-y-6">
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center">
                       <TrendingUp size={14} className="mr-2 text-blue-900" /> Utilisasi Resource
                    </h4>
                    <div className="space-y-6">
                       <div className="space-y-2">
                          <div className="flex justify-between text-xs font-black uppercase tracking-tighter">
                             <span className="text-gray-500">Akun Pegawai Terdaftar</span>
                             <span className="text-gray-900">8 / {currentPlan.userLimit}</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                             <div className="h-full bg-blue-900 rounded-full w-[40%]"></div>
                          </div>
                       </div>
                       <div className="space-y-2">
                          <div className="flex justify-between text-xs font-black uppercase tracking-tighter">
                             <span className="text-gray-500">Kuota SPPD (Bulanan)</span>
                             <span className="text-gray-900">142 / {currentPlan.sppdLimit === 9999 ? '∞' : currentPlan.sppdLimit}</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                             <div className="h-full bg-indigo-500 rounded-full w-[28%]"></div>
                          </div>
                       </div>
                    </div>
                 </div>

                 <div className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100 shadow-inner">
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Fitur Unggulan Aktif</h4>
                    <ul className="space-y-4">
                       {currentPlan.features.slice(0, 4).map((f, i) => (
                         <li key={i} className="flex items-center text-xs font-bold text-gray-700">
                            <div className="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mr-3 shrink-0">
                               <CheckCircle2 size={14} />
                            </div>
                            {f}
                         </li>
                       ))}
                    </ul>
                 </div>
              </div>

              <div className="px-10 py-8 bg-gray-900 flex flex-col md:flex-row items-center justify-between gap-6">
                 <div className="flex items-center space-x-4">
                    <div className="p-3 bg-white/10 rounded-2xl">
                       <Info size={20} className="text-blue-300" />
                    </div>
                    <p className="text-gray-400 text-xs font-medium leading-relaxed max-w-xs italic">
                       Butuh lebih banyak kapasitas untuk institusi Anda? Tingkatkan paket sekarang untuk akses fitur kustom.
                    </p>
                 </div>
                 <button 
                  onClick={() => setShowUpgradeModal(true)}
                  className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-50 transition-all shadow-xl flex items-center"
                 >
                    <ArrowUpCircle size={18} className="mr-2" />
                    Tingkatkan Layanan
                 </button>
              </div>
           </div>

           {/* Billing History Table */}
           <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/20">
                 <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white text-blue-900 rounded-2xl flex items-center justify-center shadow-sm border border-gray-100">
                       <History size={24} />
                    </div>
                    <div>
                       <h4 className="text-xl font-black text-gray-900">Riwayat Pembayaran</h4>
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Daftar Invoice & Status Billing</p>
                    </div>
                 </div>
                 <button className="text-[10px] font-black text-blue-900 uppercase tracking-widest hover:underline flex items-center">
                    Unduh Rekap (CSV) <ChevronRight size={14} />
                 </button>
              </div>
              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead>
                       <tr className="text-[10px] text-gray-400 uppercase font-black tracking-[0.2em] bg-gray-50/50 border-b border-gray-100">
                          <th className="px-10 py-6">ID Trx & Tanggal</th>
                          <th className="px-6 py-6">Paket Layanan</th>
                          <th className="px-6 py-6">Jumlah Bayar</th>
                          <th className="px-6 py-6 text-center">Status</th>
                          <th className="px-10 py-6 text-right">Aksi</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                       {institutionTransactions.length > 0 ? institutionTransactions.map((trx) => (
                         <tr key={trx.id} className="group hover:bg-blue-50/20 transition-all duration-300">
                            <td className="px-10 py-8">
                               <p className="font-mono text-xs font-black text-blue-900 leading-none">#{trx.id.toUpperCase()}</p>
                               <p className="text-[10px] text-gray-400 font-bold uppercase mt-1.5">{new Date(trx.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                            </td>
                            <td className="px-6 py-8">
                               <p className="text-sm font-black text-gray-800">{MOCK_PLANS.find(p => p.id === trx.planId)?.name}</p>
                            </td>
                            <td className="px-6 py-8 font-black text-gray-900">
                               Rp {trx.amount.toLocaleString('id-ID')}
                            </td>
                            <td className="px-6 py-8 text-center">
                               <span className={`inline-flex px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${trx.status === TransactionStatus.APPROVED ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'}`}>
                                  {trx.status}
                               </span>
                            </td>
                            <td className="px-10 py-8 text-right">
                               <button 
                                onClick={() => handleDownloadInvoice(trx.id)}
                                disabled={isProcessing === trx.id}
                                className="p-3 text-gray-400 hover:text-blue-900 hover:bg-white rounded-xl transition-all shadow-sm group/btn disabled:opacity-50"
                               >
                                  {isProcessing === trx.id ? <RefreshCw size={18} className="animate-spin" /> : <Download size={18} />}
                               </button>
                            </td>
                         </tr>
                       )) : (
                         <tr>
                            <td colSpan={5} className="p-20 text-center text-gray-300 font-bold uppercase text-xs tracking-widest italic">Belum ada riwayat transaksi...</td>
                         </tr>
                       )}
                    </tbody>
                 </table>
              </div>
           </div>
        </div>

        {/* Right Col: Support & Details */}
        <div className="space-y-8">
           <div className="bg-blue-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
              <div className="relative z-10">
                 <div className="w-16 h-16 bg-white/10 rounded-[1.5rem] flex items-center justify-center mb-8 shadow-inner">
                    <Receipt size={36} className="text-amber-400" />
                 </div>
                 <h4 className="text-2xl font-black mb-4 tracking-tight leading-tight">Metode Pembayaran Default</h4>
                 <p className="text-blue-100 text-sm leading-relaxed opacity-80 mb-10 font-medium italic">
                   Seluruh tagihan dikirimkan secara otomatis melalui email terdaftar pada tanggal 25 setiap bulannya.
                 </p>
                 
                 <div className="space-y-4">
                    <div className="p-5 bg-white/5 rounded-2xl border border-white/10 flex items-center space-x-4">
                       <CreditCard size={24} className="text-blue-300" />
                       <div>
                          <p className="text-[9px] font-black text-blue-300 uppercase tracking-widest">Channel</p>
                          <p className="text-sm font-bold">Transfer Bank (Mandiri/BNI)</p>
                       </div>
                    </div>
                 </div>

                 <button className="w-full mt-10 bg-white text-blue-900 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-50 transition-all shadow-xl">
                    Ganti Metode Utama
                 </button>
              </div>
              <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-1000"></div>
           </div>

           <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-8">
              <div className="flex items-center space-x-4">
                 <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center shadow-inner">
                    <BadgePercent size={24} />
                 </div>
                 <h5 className="text-xl font-black text-gray-900 uppercase tracking-tight">Program Loyalty</h5>
              </div>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">Dapatkan potongan harga <span className="text-blue-900 font-black">20%</span> untuk perpanjangan langganan tahunan di muka. Hubungi Account Manager Anda untuk penawaran khusus instansi pemerintah.</p>
              <button className="w-full py-4 border-2 border-dashed border-gray-100 rounded-2xl text-[10px] font-black text-gray-400 uppercase tracking-widest hover:border-blue-900 hover:text-blue-900 transition-all">
                 Pelajari Promo
              </button>
           </div>

           <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 flex items-start space-x-4">
              <ShieldCheck size={28} className="text-emerald-600 shrink-0 mt-1" />
              <p className="text-[10px] text-gray-500 font-bold uppercase leading-relaxed tracking-tight">Seluruh transaksi di platform E-SIMPerDin dijamin aman dan memenuhi standar audit keuangan kementerian keuangan.</p>
           </div>
        </div>
      </div>

      {/* UPGRADE MODAL */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-blue-900/60 backdrop-blur-md flex items-center justify-center z-[110] p-4">
           <div className="bg-white w-full max-w-5xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300 flex flex-col max-h-[90vh]">
              <div className="p-10 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
                 <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-blue-900 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-blue-900/20"><ArrowUpRight size={28} /></div>
                    <div>
                       <h4 className="text-3xl font-black text-gray-900 tracking-tight">Upgrade Kapasitas Institusi</h4>
                       <p className="text-sm text-gray-500 font-medium">Pilih paket yang paling sesuai dengan volume kerja Anda.</p>
                    </div>
                 </div>
                 <button onClick={() => setShowUpgradeModal(false)} className="p-4 bg-white border border-gray-100 hover:bg-gray-100 rounded-3xl text-gray-400 transition-all shadow-sm"><X size={24} /></button>
              </div>

              <div className="p-10 overflow-y-auto custom-scrollbar">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {MOCK_PLANS.map(p => (
                      <div key={p.id} className={`relative p-8 rounded-[2.5rem] border-2 transition-all cursor-pointer group flex flex-col ${p.id === currentPlan.id ? 'border-blue-900 bg-blue-50/30' : 'border-gray-100 hover:border-blue-900 hover:bg-blue-50/10'}`}>
                         {p.id === currentPlan.id && (
                           <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-900 text-white px-5 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl">Paket Aktif</div>
                         )}
                         <div className="mb-8">
                            <h5 className="text-xl font-black text-gray-900 mb-1">{p.name}</h5>
                            <div className="flex items-baseline space-x-1">
                               <span className="text-2xl font-black text-gray-900">Rp {(p.price / 1000).toLocaleString('id-ID')}K</span>
                               <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">/ Bulan</span>
                            </div>
                         </div>
                         <ul className="space-y-4 flex-1 mb-10">
                            <li className="flex items-center text-[11px] font-bold text-gray-600 uppercase"><CheckCircle2 size={14} className="mr-2 text-emerald-500" /> Max {p.userLimit} Users</li>
                            <li className="flex items-center text-[11px] font-bold text-gray-600 uppercase"><CheckCircle2 size={14} className="mr-2 text-emerald-500" /> {p.sppdLimit === 9999 ? 'Unlimited' : p.sppdLimit} SPPD / Bln</li>
                            <li className="flex items-center text-[11px] font-bold text-gray-600 uppercase"><CheckCircle2 size={14} className="mr-2 text-emerald-500" /> {p.approvalLevels} Level Approval</li>
                            <li className="flex items-center text-[11px] font-bold text-gray-600 uppercase"><CheckCircle2 size={14} className="mr-2 text-emerald-500" /> {p.storageGb} GB Storage</li>
                         </ul>
                         <button 
                           onClick={() => handleUpgrade(p.name)}
                           disabled={p.id === currentPlan.id}
                           className={`w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${p.id === currentPlan.id ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-blue-900 text-white hover:bg-blue-800 shadow-xl shadow-blue-900/10'}`}
                         >
                            {p.id === currentPlan.id ? 'Sudah Aktif' : 'Pilih Paket'}
                         </button>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="p-10 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                 <div className="flex items-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    <ShieldCheck size={20} className="mr-2 text-blue-900" /> Encrypted Financial Session
                 </div>
                 <div className="flex items-center space-x-3 text-[10px] font-bold text-amber-600 uppercase">
                    <AlertCircle size={16} />
                    <span>Harga belum termasuk PPN 11%</span>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default MySubscriptionPage;