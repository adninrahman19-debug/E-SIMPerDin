
import React from 'react';
import { CreditCard, Download, Search, Package, Receipt, ArrowUpRight, History } from 'lucide-react';
import { MOCK_TRANSACTIONS } from '../../constants';

const SubscriptionBillingPage: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Arus Kas & Billing Global</h2>
          <p className="text-gray-500 text-sm font-medium">Monitoring pendapatan langganan platform dari seluruh instansi.</p>
        </div>
        <button className="bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest flex items-center space-x-2 shadow-sm hover:bg-gray-50 transition-all">
          <Download size={18} /> <span>Laporan Keuangan Platform</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
         <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Revenue YTD</p>
            <h4 className="text-2xl font-black text-blue-900">Rp 1.42 M</h4>
         </div>
         <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Pending Trx</p>
            <h4 className="text-2xl font-black text-amber-500">12 Trx</h4>
         </div>
         <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Active Tenants</p>
            <h4 className="text-2xl font-black text-gray-900">156</h4>
         </div>
         <div className="bg-blue-900 p-6 rounded-[2.5rem] text-white shadow-xl">
            <p className="text-[10px] font-black uppercase opacity-70 mb-2">Platform Goal</p>
            <h4 className="text-2xl font-black">94% Target</h4>
         </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
          <h4 className="font-black text-gray-900 flex items-center"><History className="mr-2" size={18} /> Transaksi Terbaru</h4>
          <div className="relative">
             <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
             <input type="text" placeholder="Cari Trx..." className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold outline-none" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] text-gray-400 uppercase font-black tracking-widest border-b border-gray-50">
                <th className="px-8 py-5">Trx ID</th>
                <th className="px-6 py-5">Lembaga</th>
                <th className="px-6 py-5">Nominal</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-8 py-5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {MOCK_TRANSACTIONS.map((trx) => (
                <tr key={trx.id} className="hover:bg-blue-50/20 transition-all">
                  <td className="px-8 py-6 font-mono text-xs font-black text-blue-900">#{trx.id.toUpperCase()}</td>
                  <td className="px-6 py-6 text-sm font-bold text-gray-700">DISHUB PROV</td>
                  <td className="px-6 py-6 font-black text-gray-900">Rp {trx.amount.toLocaleString('id-ID')}</td>
                  <td className="px-6 py-6">
                    <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase bg-emerald-50 text-emerald-700 border border-emerald-100">{trx.status}</span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 text-gray-400 hover:text-blue-900 transition-all"><ArrowUpRight size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionBillingPage;
