
import React, { useState } from 'react';
import { MOCK_PLANS } from '../../constants';
import { SubscriptionPlan } from '../../types';
import { 
  Plus, 
  Package, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  X, 
  Save, 
  ShieldCheck, 
  FileCode, 
  Database, 
  Users, 
  ArrowRightLeft,
  Settings2,
  AlertCircle,
  ToggleRight,
  ToggleLeft,
  RefreshCw,
  Zap
} from 'lucide-react';

const PlanManagementPage: React.FC = () => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>(MOCK_PLANS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [modalMode, setModalMode] = useState<'ADD' | 'EDIT'>('ADD');

  const handleOpenModal = (mode: 'ADD' | 'EDIT', plan: SubscriptionPlan | null = null) => {
    setModalMode(mode);
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPlan(null);
  };

  const handleSavePlan = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate CRUD
    if (modalMode === 'ADD') {
      alert("Paket layanan baru berhasil diterbitkan ke katalog global.");
    } else {
      alert(`Parameter paket ${selectedPlan?.name} berhasil diperbarui.`);
    }
    closeModal();
  };

  const handleDeletePlan = (id: string, name: string) => {
    if (confirm(`Yakin ingin menghapus paket '${name}'? Instansi yang menggunakan paket ini akan dialihkan ke paket Free Trial.`)) {
      setPlans(plans.filter(p => p.id !== id));
      alert("Paket berhasil dihapus dari sistem.");
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1 leading-none">Subscription Engine</p>
          <h3 className="text-3xl font-black text-gray-900 tracking-tight">Katalog Produk & Paket</h3>
        </div>
        <button 
          onClick={() => handleOpenModal('ADD')}
          className="bg-blue-900 text-white px-8 py-4 rounded-2xl flex items-center space-x-3 hover:bg-blue-800 transition-all font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-900/20"
        >
          <Plus size={20} />
          <span>Buat Paket Baru</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {plans.map((plan) => (
          <div key={plan.id} className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col group hover:shadow-2xl hover:border-blue-900/20 transition-all duration-500">
            <div className="p-10 bg-gray-50/50 border-b border-gray-100 relative">
              <div className="flex items-center justify-between mb-8">
                <div className="w-16 h-16 bg-blue-900 text-white rounded-[1.5rem] flex items-center justify-center shadow-xl shadow-blue-900/20 group-hover:scale-110 transition-transform">
                  <Package size={32} />
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleOpenModal('EDIT', plan)}
                    className="p-3 text-gray-400 hover:text-blue-900 bg-white rounded-xl border border-gray-100 shadow-sm hover:border-blue-900 transition-all"
                  >
                    <Edit3 size={20} />
                  </button>
                  <button 
                    onClick={() => handleDeletePlan(plan.id, plan.name)}
                    className="p-3 text-gray-400 hover:text-red-600 bg-white rounded-xl border border-gray-100 shadow-sm hover:border-red-600 transition-all"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
              <h3 className="text-2xl font-black text-gray-900 tracking-tight">{plan.name}</h3>
              <div className="flex items-baseline mt-2">
                <span className="text-3xl font-black text-blue-900">Rp {(plan.price / 1000).toLocaleString('id-ID')}K</span>
                <span className="text-[10px] font-black text-gray-400 ml-2 uppercase tracking-widest">/ Per Bulan</span>
              </div>
            </div>
            
            <div className="p-10 flex-1 space-y-10">
              <div className="space-y-6">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Technical Limitation</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 group-hover:bg-white transition-colors">
                    <Users size={16} className="text-blue-900 mb-2" />
                    <p className="text-[9px] font-black text-gray-400 uppercase">Max Users</p>
                    <p className="text-sm font-black text-gray-900">{plan.userLimit === 9999 ? '∞' : plan.userLimit}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 group-hover:bg-white transition-colors">
                    <ArrowRightLeft size={16} className="text-emerald-600 mb-2" />
                    <p className="text-[9px] font-black text-gray-400 uppercase">SPPD Quota</p>
                    <p className="text-sm font-black text-gray-900">{plan.sppdLimit === 9999 ? '∞' : plan.sppdLimit}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 group-hover:bg-white transition-colors">
                    <ShieldCheck size={16} className="text-amber-600 mb-2" />
                    <p className="text-[9px] font-black text-gray-400 uppercase">Approval</p>
                    <p className="text-sm font-black text-gray-900">{plan.approvalLevels} Level</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 group-hover:bg-white transition-colors">
                    <Database size={16} className="text-indigo-600 mb-2" />
                    <p className="text-[9px] font-black text-gray-400 uppercase">S3 Storage</p>
                    <p className="text-sm font-black text-gray-900">{plan.storageGb} GB</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Privilege Support</p>
                <div className={`flex items-center p-4 rounded-2xl border ${plan.hasCustomTemplates ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-gray-50 text-gray-400 border-gray-100'}`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${plan.hasCustomTemplates ? 'bg-white shadow-sm' : 'bg-gray-200'}`}>
                      {plan.hasCustomTemplates ? <FileCode size={18} /> : <X size={18} />}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest">Custom Document Template</span>
                </div>
              </div>
            </div>

            <div className="px-10 py-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Status Katalog</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">AKTIF LIVE</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal CRUD Paket */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-blue-900/60 backdrop-blur-md flex items-center justify-center z-[110] p-4">
          <div className="bg-white w-full max-w-4xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300 flex flex-col max-h-[95vh]">
            <form onSubmit={handleSavePlan} className="flex flex-col h-full">
               <div className="p-10 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
                  <div>
                    <h4 className="text-3xl font-black text-gray-900 tracking-tight">
                      {modalMode === 'ADD' ? 'Rilis Paket Layanan Baru' : `Konfigurasi Paket: ${selectedPlan?.name}`}
                    </h4>
                    <p className="text-sm text-gray-500 font-medium mt-1 uppercase tracking-widest leading-none">Subscription Engine v2.0</p>
                  </div>
                  <button type="button" onClick={closeModal} className="p-4 bg-gray-100 hover:bg-red-50 hover:text-red-600 rounded-3xl text-gray-400 transition-all">
                    <X size={24} />
                  </button>
               </div>

               <div className="p-10 overflow-y-auto custom-scrollbar">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                      <h6 className="text-[10px] font-black text-blue-900 uppercase tracking-widest border-l-4 border-blue-900 pl-4 leading-none">Branding & Pricing</h6>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nama Produk Layanan</label>
                          <input required type="text" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-900/5 font-black text-gray-900" defaultValue={selectedPlan?.name} placeholder="E.g. Government Elite Suite" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Biaya Langganan Bulanan</label>
                          <div className="relative">
                            <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-gray-300 text-xl">Rp</span>
                            <input required type="number" className="w-full pl-16 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-900/5 font-black text-blue-900 text-2xl" defaultValue={selectedPlan?.price} />
                          </div>
                        </div>
                        <div className="p-8 bg-gray-900 rounded-[2.5rem] border border-gray-800 flex items-center justify-between group">
                           <div className="flex items-center space-x-5">
                              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-amber-400 shadow-inner group-hover:scale-110 transition-transform">
                                 <Zap size={24} />
                              </div>
                              <div>
                                 <p className="text-sm font-black text-white uppercase tracking-tighter">Status Katalog</p>
                                 <p className="text-[9px] text-gray-500 font-bold uppercase">Terpublikasi di Landing Page</p>
                              </div>
                           </div>
                           <button type="button" className="text-emerald-500">
                             <ToggleRight size={48} />
                           </button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-8">
                      <h6 className="text-[10px] font-black text-blue-900 uppercase tracking-widest border-l-4 border-blue-900 pl-4 leading-none">Quota & Infrastructure</h6>
                      <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">User Max Limit</label>
                          <input required type="number" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-black text-gray-800" defaultValue={selectedPlan?.userLimit} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">SPPD/Bulan Limit</label>
                          <input required type="number" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-black text-gray-800" defaultValue={selectedPlan?.sppdLimit} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Hierarchy Approval</label>
                          <select className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-black text-sm">
                            <option value={1} selected={selectedPlan?.approvalLevels === 1}>1 Level</option>
                            <option value={2} selected={selectedPlan?.approvalLevels === 2}>2 Level</option>
                            <option value={3} selected={selectedPlan?.approvalLevels === 3}>3 Level</option>
                            <option value={5} selected={selectedPlan?.approvalLevels === 5}>5 Level</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Cloud Bucket (GB)</label>
                          <input required type="number" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-black text-gray-800" defaultValue={selectedPlan?.storageGb} />
                        </div>
                      </div>
                      <div className="p-8 bg-blue-50 rounded-[2.5rem] border border-blue-100 flex items-center justify-between">
                         <div className="flex items-center space-x-4">
                            <FileCode size={24} className="text-blue-900" />
                            <span className="text-sm font-black text-blue-900 uppercase tracking-tight">Kustomisasi Template</span>
                         </div>
                         <input type="checkbox" className="w-8 h-8 accent-blue-900 rounded-xl" defaultChecked={selectedPlan?.hasCustomTemplates} />
                      </div>
                      <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100 flex items-start space-x-4">
                         <AlertCircle size={20} className="text-amber-600 shrink-0 mt-0.5" />
                         <p className="text-[9px] text-amber-800 font-bold leading-relaxed uppercase tracking-tight">
                           PERUBAHAN GLOBAL: Setiap update pada quota paket akan langsung merubah limitasi pada seluruh instansi yang berlangganan paket ini secara real-time.
                         </p>
                      </div>
                    </div>
                  </div>
               </div>

               <div className="p-10 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    <Settings2 size={20} className="mr-3 text-blue-900" /> Platform Monetization Engine v2.4
                  </div>
                  <div className="flex space-x-4">
                    <button type="button" onClick={closeModal} className="px-10 py-4 font-black text-[10px] uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-all">Batalkan</button>
                    <button type="submit" className="bg-blue-900 text-white px-12 py-4 rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-blue-900/20 hover:bg-blue-800 transition-all flex items-center">
                      <Save size={18} className="mr-2" />
                      <span>{modalMode === 'ADD' ? 'Daftarkan Paket' : 'Perbarui Master Paket'}</span>
                    </button>
                  </div>
               </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanManagementPage;
