
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
  AlertCircle
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
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Master Paket Langganan</h2>
          <p className="text-gray-500 text-sm font-medium">Konfigurasi produk, limitasi fitur, dan strategi monetisasi platform.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-blue-900 text-white px-6 py-3 rounded-xl flex items-center space-x-2 hover:bg-blue-800 transition-all font-bold shadow-lg shadow-blue-900/20"
        >
          <Plus size={18} />
          <span>Buat Paket Baru</span>
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
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Kapasitas & Otoritas</p>
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
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Fitur & Aksesibilitas</p>
                <ul className="space-y-4">
                  <li className="flex items-center text-sm font-bold text-gray-700">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${plan.hasCustomTemplates ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400'}`}>
                      {plan.hasCustomTemplates ? <CheckCircle2 size={14} /> : <X size={14} />}
                    </div>
                    <span className={plan.hasCustomTemplates ? 'text-gray-900' : 'text-gray-400 line-through'}>Template Custom</span>
                  </li>
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm font-bold text-gray-600">
                      <CheckCircle2 size={18} className="text-blue-900 mr-3 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="px-10 py-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Status Paket</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Aktif</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CRUD Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-blue-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            <div className="p-8 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h4 className="text-2xl font-black text-gray-900">
                  {selectedPlan ? `Edit Paket: ${selectedPlan.name}` : 'Konfigurasi Paket Baru'}
                </h4>
                <p className="text-sm text-gray-500 font-medium">Tentukan parameter limitasi dan harga untuk produk ini.</p>
              </div>
              <button onClick={closeModal} className="p-3 bg-gray-50 hover:bg-gray-100 rounded-2xl text-gray-400 transition-all">
                <X size={24} />
              </button>
            </div>

            <div className="p-8 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <h5 className="text-xs font-black text-blue-900 uppercase tracking-widest border-l-4 border-blue-900 pl-3">Identitas & Monetisasi</h5>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Nama Paket</label>
                      <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-900/10 font-medium" defaultValue={selectedPlan?.name} placeholder="E.g. Government Enterprise" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Harga Per Bulan (IDR)</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">Rp</span>
                        <input type="number" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-900/10 font-bold" defaultValue={selectedPlan?.price} placeholder="0" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Durasi Dasar (Hari)</label>
                      <input type="number" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none font-medium" defaultValue={selectedPlan?.durationDays || 30} />
                    </div>
                  </div>

                  <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100 space-y-3">
                    <div className="flex items-center text-amber-900 font-black text-xs uppercase tracking-wider">
                      <AlertCircle size={16} className="mr-2" /> Penting
                    </div>
                    <p className="text-[10px] text-amber-800 leading-relaxed font-bold uppercase tracking-tight">
                      Perubahan harga hanya berlaku untuk langganan baru. Tenant lama tetap menggunakan harga lama hingga masa berlaku habis.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <h5 className="text-xs font-black text-blue-900 uppercase tracking-widest border-l-4 border-blue-900 pl-3">Parameter Limitasi</h5>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">User Max</label>
                      <input type="number" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none font-bold" defaultValue={selectedPlan?.userLimit} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">SPPD/Bulan</label>
                      <input type="number" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none font-bold" defaultValue={selectedPlan?.sppdLimit} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Approval Level</label>
                      <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none font-bold" defaultValue={selectedPlan?.approvalLevels}>
                        <option value={1}>1 Level</option>
                        <option value={2}>2 Level</option>
                        <option value={3}>3 Level</option>
                        <option value={5}>5 Level</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Storage (GB)</label>
                      <input type="number" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none font-bold" defaultValue={selectedPlan?.storageGb} />
                    </div>
                  </div>

                  <div className="space-y-4 pt-4">
                    <label className="flex items-center space-x-3 cursor-pointer group">
                      <div className="relative">
                        <input type="checkbox" className="sr-only peer" defaultChecked={selectedPlan?.hasCustomTemplates} />
                        <div className="w-10 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-900 transition-all"></div>
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:left-5"></div>
                      </div>
                      <span className="text-sm font-bold text-gray-700 group-hover:text-blue-900">Akses Custom Template Dokumen</span>
                    </label>
                    
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Daftar Fitur Tambahan (Per Baris)</label>
                      <textarea rows={4} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none font-medium text-sm" defaultValue={selectedPlan?.features.join('\n')}></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center text-xs font-bold text-gray-400">
                <Settings2 size={16} className="mr-2" />
                Sistem Konfigurasi Versi 2.0
              </div>
              <div className="flex space-x-3">
                <button onClick={closeModal} className="px-6 py-2.5 font-bold text-gray-500 hover:text-gray-900">Batal</button>
                <button className="bg-blue-900 text-white px-8 py-2.5 rounded-xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-900/20 hover:bg-blue-800 transition-all flex items-center space-x-2">
                  <Save size={18} />
                  <span>Simpan Paket</span>
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
