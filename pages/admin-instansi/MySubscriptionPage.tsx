
import React from 'react';
import { useAuth } from '../../App';
import { MOCK_PLANS } from '../../constants';
import { CreditCard, Zap, CheckCircle2, History, Download, Clock, Receipt, BadgePercent, ShieldCheck, AlertCircle, Info } from 'lucide-react';

const MySubscriptionPage: React.FC = () => {
  const { subscription } = useAuth();
  const currentPlan = MOCK_PLANS.find(p => p.id === subscription?.planId) || MOCK_PLANS[0];

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="mb-10">
        <h2 className="text-3xl font-black text-gray-900 tracking-tight">Layanan Kami</h2>
        <p className="text-gray-500 text-sm font-medium">Monitoring paket langganan dan administrasi billing instansi.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
           <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden group">
              <div className="p-10 border-b border-gray-50 flex items-start justify-between bg-gradient-to-br from-white to-blue-50/20">
                 <div>
                    <span className="px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest">Active Plan</span>
                    <h3 className="text-4xl font-black text-gray-900 mt-4 tracking-tight">{currentPlan.name}</h3>
                    <p className="text-gray-500 mt-2 font-bold uppercase text-[10px] tracking-widest">Valid Until: 31 Des 2024</p>
                 </div>
                 <div className="w-16 h-16 bg-blue-900 text-white rounded-3xl flex items-center justify-center shadow-xl"><Zap size={32} /></div>
              </div>
              <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
                 <div className="space-y-4">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Resources Limits</p>
                    <div className="space-y-4">
                       <div className="flex justify-between items-end">
                          <span className="text-xs font-bold text-gray-600">User Account</span>
                          <span className="text-sm font-black text-gray-900">8 / {currentPlan.userLimit}</span>
                       </div>
                       <div className="h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-blue-900 w-[40%]"></div></div>
                    </div>
                 </div>
                 <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Included Features</h4>
                    <ul className="space-y-2">
                       {currentPlan.features.slice(0,3).map((f, i) => (
                         <li key={i} className="flex items-center text-xs font-bold text-gray-700"><CheckCircle2 size={14} className="mr-2 text-emerald-500" /> {f}</li>
                       ))}
                    </ul>
                 </div>
              </div>
              <div className="px-10 py-6 bg-gray-900 flex justify-between items-center">
                 <p className="text-gray-400 text-xs font-medium">Butuh upgrade kuota pegawai?</p>
                 <button className="bg-white text-gray-900 px-6 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-50 transition-all">Hubungi Sales</button>
              </div>
           </div>
        </div>

        <div className="space-y-6">
           <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
              <h4 className="font-black text-gray-900 flex items-center"><History className="mr-2" size={18} /> Faktur Terbaru</h4>
              <div className="space-y-4">
                 <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between group hover:bg-white transition-all">
                    <div>
                       <p className="text-xs font-black text-gray-900">INV-2024-001</p>
                       <p className="text-[9px] text-gray-400 font-bold uppercase mt-1">Mei 2024</p>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-blue-900"><Download size={16} /></button>
                 </div>
              </div>
           </div>
           <div className="p-6 bg-amber-50 rounded-[2rem] border border-amber-100 flex items-start space-x-3">
              <Info className="text-amber-600 shrink-0" size={20} />
              <p className="text-[9px] text-amber-800 font-bold uppercase">Seluruh pembayaran diproses melalui gateway terenkripsi standar kementerian keuangan.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default MySubscriptionPage;
