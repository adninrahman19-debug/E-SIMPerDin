
import React, { useState } from 'react';
import { MOCK_INSTITUTIONS, MOCK_PLANS, MOCK_SUBSCRIPTIONS } from '../../constants';
import { SubscriptionStatus } from '../../types';
import { 
  Search, 
  Filter, 
  Calendar, 
  ArrowUpCircle, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Zap, 
  ChevronRight, 
  MoreVertical,
  History,
  Info,
  Building2,
  RefreshCw,
  X,
  CreditCard
} from 'lucide-react';

const TenantSubscriptionList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInstId, setSelectedInstId] = useState<string | null>(null);

  const getStatusBadge = (status: SubscriptionStatus) => {
    switch (status) {
      case SubscriptionStatus.ACTIVE: return <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-emerald-50 text-emerald-600 border border-emerald-100">Active</span>;
      case SubscriptionStatus.TRIAL: return <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-blue-50 text-blue-600 border border-blue-100">Trial</span>;
      case SubscriptionStatus.EXPIRED: return <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-red-50 text-red-600 border border-red-100">Expired</span>;
      case SubscriptionStatus.SUSPENDED: return <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-gray-100 text-gray-500 border border-gray-200">Suspended</span>;
      default: return null;
    }
  };

  const filtered = MOCK_INSTITUTIONS.filter(i => 
    i.name.toLowerCase().includes(searchTerm.toLowerCase()) || i.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-2">
         {[
           { label: 'Active Subscription', val: '148', icon: <CheckCircle2 className="text-emerald-500" /> },
           { label: 'Trialing Now', val: '8', icon: <Zap className="text-blue-500" /> },
           { label: 'Near Expiry (<7d)', val: '14', icon: <Clock className="text-amber-500" /> },
           { label: 'Total MRR', val: 'Rp 142Jt', icon: <CreditCard className="text-indigo-500" /> },
         ].map((s, i) => (
           <div key={i} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
              <div>
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">{s.label}</p>
                 <h4 className="text-xl font-black text-gray-900 leading-none">{s.val}</h4>
              </div>
              {s.icon}
           </div>
         ))}
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Cari Nama Instansi..." 
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none text-sm font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="p-2.5 text-gray-400 hover:text-blue-900"><Filter size={20} /></button>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] text-gray-400 uppercase font-black tracking-widest bg-gray-50/50 border-b border-gray-100">
              <th className="px-8 py-5">Identitas Tenant</th>
              <th className="px-6 py-5">Paket Aktif</th>
              <th className="px-6 py-5 text-center">Status</th>
              <th className="px-6 py-5">Masa Berlaku</th>
              <th className="px-8 py-5 text-right">Manajemen</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(inst => {
              const sub = MOCK_SUBSCRIPTIONS.find(s => s.institutionId === inst.id);
              const plan = MOCK_PLANS.find(p => p.id === sub?.planId);
              return (
                <tr key={inst.id} className="group hover:bg-blue-50/20 transition-all duration-300">
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-4">
                       <div className="w-10 h-10 bg-blue-900 text-white rounded-xl flex items-center justify-center font-black text-xs shadow-lg">{inst.name.charAt(0)}</div>
                       <div>
                          <p className="text-sm font-black text-gray-900 leading-none">{inst.name}</p>
                          <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase">{inst.code}</p>
                       </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex flex-col">
                       <span className="text-xs font-black text-blue-900 uppercase">{plan?.name || 'N/A'}</span>
                       <span className="text-[9px] font-bold text-gray-400 mt-0.5">Rp {plan?.price.toLocaleString()}/Bln</span>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-center">
                    {sub ? getStatusBadge(sub.status) : <span className="text-[9px] text-gray-300 font-bold uppercase italic tracking-tighter">No Subscription</span>}
                  </td>
                  <td className="px-6 py-6">
                    {sub ? (
                      <div className="flex items-center text-xs font-bold text-gray-500">
                        <Calendar size={12} className="mr-1.5 text-gray-300" />
                        {new Date(sub.endDate).toLocaleDateString('id-ID')}
                      </div>
                    ) : '-'}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end space-x-2">
                       <button 
                        onClick={() => { setSelectedInstId(inst.id); setIsModalOpen(true); }}
                        className="bg-gray-900 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-900 transition-all shadow-md"
                       >
                         Manage Sub
                       </button>
                       <button className="p-2 text-gray-400 hover:text-blue-900 transition-all"><History size={18}/></button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Subscription Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-blue-900/60 backdrop-blur-md flex items-center justify-center z-[100] p-4">
           <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300 flex flex-col max-h-[90vh]">
              <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
                 <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-900 text-white rounded-2xl flex items-center justify-center shadow-lg"><RefreshCw size={24} /></div>
                    <div>
                       <h4 className="text-xl font-black text-gray-900">Manage Tenant Subscription</h4>
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Tenant ID: {selectedInstId}</p>
                    </div>
                 </div>
                 <button onClick={() => setIsModalOpen(false)} className="p-2 bg-white border border-gray-100 hover:bg-gray-100 rounded-xl text-gray-400"><X size={24} /></button>
              </div>

              <div className="p-8 space-y-8 overflow-y-auto">
                 <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Ubah Paket</label>
                       <select className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold text-sm text-blue-900">
                          {MOCK_PLANS.map(p => <option key={p.id} value={p.id}>{p.name} Plan</option>)}
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Status Otorisasi</label>
                       <select className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold text-sm">
                          <option value="ACTIVE">ACTIVE (Akses Penuh)</option>
                          <option value="SUSPENDED">SUSPENDED (Kunci Akses)</option>
                          <option value="EXPIRED">FORCE EXPIRED</option>
                       </select>
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Masa Berlaku Sampai</label>
                    <div className="relative">
                       <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                       <input type="date" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold" />
                    </div>
                 </div>

                 <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start space-x-4">
                    <Info size={20} className="text-blue-900 shrink-0 mt-0.5" />
                    <p className="text-[10px] text-blue-800 font-bold leading-relaxed uppercase tracking-tight">
                       Perubahan paket akan langsung merubah batasan (quota) SPPD dan user pada dashboard instansi secara real-time. Perpanjangan masa aktif akan memperbarui tanggal kedaluwarsa sistem.
                    </p>
                 </div>
              </div>

              <div className="p-8 bg-gray-50 border-t border-gray-100 flex justify-end space-x-3">
                 <button onClick={() => setIsModalOpen(false)} className="px-6 py-3 font-bold text-gray-500 hover:text-gray-900">Batal</button>
                 <button className="bg-blue-900 text-white px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-900/20 hover:bg-blue-800 transition-all flex items-center space-x-2">
                    <ArrowUpCircle size={16} />
                    <span>Terapkan Perubahan</span>
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default TenantSubscriptionList;
