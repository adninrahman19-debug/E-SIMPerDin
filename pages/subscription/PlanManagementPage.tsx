
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
  ToggleLeft
} from 'lucide-react';

const PlanManagementPage: React.FC = () => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>(MOCK_PLANS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);

  const handleOpenModal = (plan: SubscriptionPlan | null = null) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPlan(null);
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1 leading-none">Subscription Engine</p>
          <h3 className="text-2xl font-black text-gray-900 tracking-tight">Katalog Produk & Paket</h3>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-blue-900 text-white px-6 py-3 rounded-xl flex items-center space-x-2 hover:bg-blue-800 transition-all font-bold shadow-lg shadow-blue-900/20"
        >
          <Plus size={18} />
          <span className="text-xs uppercase tracking-widest font-black">Buat Paket Baru</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div key={plan.id} className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col group hover:shadow-2xl hover:border-blue-100 transition-all duration-300">
            <div className="p-10 bg-gray-50/50 border-b border-gray-100 relative">
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 bg-blue-900 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-blue-900/20 group-hover:scale-110 transition-transform">
                  <Package size={28} />
                </div>
                <div className="flex space-x-1">
                  <button 
                    onClick={() => handleOpenModal(plan)}
                    className="p-2.5 text-gray-400 hover:text-blue-900 bg-white rounded-xl border border-gray-100 shadow-sm hover:border-blue-900 transition-all"
                  >
                    <Edit3 size={18} />
                  </button>
                  <button className="p-2.5 text-gray-400 hover:text-red-600 bg-white rounded-xl border border-gray-100 shadow-sm hover:border-red-600 transition-all">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <h3 className="text-2xl font-black text-gray-900 tracking-tight">{plan.name}</h3>
              <div className="flex items-baseline mt-2">
                <span className="text-3xl font-black text-blue-900">Rp {(plan.price / 1000).toLocaleString('id-ID')}K</span>
                <span className="text-sm font-bold text-gray-400 ml-2 uppercase tracking-widest">/ bulan</span>
              </div>
            </div>
            
            <div className="p-10 flex-1 space-y-8">
              <div className="space-y-4">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Parameter Limitasi</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center space-x-3">
                    <Users size={16} className="text-blue-900" />
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase">User Max</p>
                      <p className="text-xs font-bold text-gray-900">{plan.userLimit === 9999 ? '∞' : plan.userLimit}</p>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center space-x-3">
                    <ArrowRightLeft size={16} className="text-emerald-600" />
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase">SPPD/Bln</p>
                      <p className="text-xs font-bold text-gray-900">{plan.sppdLimit === 9999 ? '∞' : plan.sppdLimit}</p>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center space-x-3">
                    <ShieldCheck size={16} className="text-amber-600" />
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase">Approval</p>
                      <p className="text-xs font-bold text-gray-900">{plan.approvalLevels} Level</p>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center space-x-3">
                    <Database size={16} className="text-indigo-600" />
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase">Storage</p>
                      <p className="text-xs font-bold text-gray-900">{plan.storageGb} GB</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Priviledge & Templates</p>
                <div className="flex items-center text-sm font-bold text-gray-700">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${plan.hasCustomTemplates ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400'}`}>
                      {plan.hasCustomTemplates ? <CheckCircle2 size={14} /> : <X size={14} />}
                    </div>
                    <span className={plan.hasCustomTemplates ? 'text-gray-900' : 'text-gray-400 line-through'}>Custom Template Support</span>
                </div>
              </div>
            </div>

            <div className="px-10 py-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Status Paket</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">AKTIF</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal CRUD Paket */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-blue-900/60 backdrop-blur-md flex items-center justify-center z-[100] p-4">
          <div className="bg-white w-full max-w-4xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300 flex flex-col max-h-[90vh]">
            <div className="p-10 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h4 className="text-2xl font-black text-gray-900 tracking-tight">
                  {selectedPlan ? `Update Konfigurasi: ${selectedPlan.name}` : 'Rilis Paket Baru'}
                </h4>
                <p className="text-sm text-gray-500 font-medium mt-1">Tentukan parameter limitasi dan harga produk.</p>
              </div>
              <button onClick={closeModal} className="p-3 bg-gray-50 hover:bg-gray-100 rounded-2xl text-gray-400 transition-all">
                <X size={24} />
              </button>
            </div>

            <div className="p-10 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <h6 className="text-[10px] font-black text-blue-900 uppercase tracking-widest border-l-4 border-blue-900 pl-4 leading-none">Visual & Pricing</h6>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nama Paket Layanan</label>
                      <input type="text" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-black text-gray-900" defaultValue={selectedPlan?.name} placeholder="E.g. Government Suite" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Biaya Langganan Bulanan (IDR)</label>
                      <div className="relative">
                        <span className="absolute left-5 top-1/2 -translate-y-1/2 font-black text-gray-300 text-lg">Rp</span>
                        <input type="number" className="w-full pl-14 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-black text-blue-900 text-xl" defaultValue={selectedPlan?.price} />
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-6 bg-gray-50 rounded-[2rem] border border-gray-100">
                       <div>
                          <p className="text-sm font-black text-gray-900 uppercase tracking-tighter">Status Katalog</p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase">Terlihat di landing page</p>
                       </div>
                       <ToggleRight className="text-emerald-500" size={32} />
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <h6 className="text-[10px] font-black text-blue-900 uppercase tracking-widest border-l-4 border-blue-900 pl-4 leading-none">Technical Limitation</h6>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">User Limit</label>
                      <input type="number" className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-xl font-bold" defaultValue={selectedPlan?.userLimit} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">SPPD/Bln</label>
                      <input type="number" className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-xl font-bold" defaultValue={selectedPlan?.sppdLimit} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Level Approval</label>
                      <select className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-xl font-bold text-sm">
                        <option value={1}>1 Level</option>
                        <option value={2}>2 Level</option>
                        <option value={3}>3 Level</option>
                        <option value={5}>5 Level</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Cloud Storage (GB)</label>
                      <input type="number" className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-xl font-bold" defaultValue={selectedPlan?.storageGb} />
                    </div>
                  </div>
                  <div className="p-6 bg-indigo-50 rounded-[2rem] border border-indigo-100 flex items-center justify-between">
                     <div className="flex items-center space-x-3">
                        <FileCode size={20} className="text-indigo-600" />
                        <span className="text-xs font-black text-indigo-900 uppercase">Akses Custom Template</span>
                     </div>
                     <input type="checkbox" className="w-6 h-6 accent-indigo-600" defaultChecked={selectedPlan?.hasCustomTemplates} />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-10 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center text-xs font-bold text-gray-400 uppercase tracking-widest">
                <Settings2 size={16} className="mr-2" /> Monetization Cluster v2.0
              </div>
              <div className="flex space-x-3">
                <button onClick={closeModal} className="px-8 py-3.5 font-bold text-gray-500 hover:text-gray-900 uppercase text-[10px] tracking-widest">Batal</button>
                <button className="bg-blue-900 text-white px-10 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-blue-900/20 hover:bg-blue-800 transition-all flex items-center">
                  <Save size={16} className="mr-2" />
                  <span>Update Master Paket</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanManagementPage;
