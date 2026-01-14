
import React from 'react';
import { MOCK_PLANS } from '../../constants';
import { Plus, Package, Edit3, Trash2, CheckCircle2 } from 'lucide-react';

const PlanManagementPage: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Master Paket Langganan</h2>
          <p className="text-gray-500 text-sm">Kelola paket harga, limitasi fitur, dan masa aktif untuk institusi.</p>
        </div>
        <button className="bg-blue-900 text-white px-5 py-2.5 rounded-lg flex items-center space-x-2 hover:bg-blue-800 transition-all font-bold shadow-md">
          <Plus size={18} />
          <span>Buat Paket Baru</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_PLANS.map((plan) => (
          <div key={plan.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            <div className="p-8 bg-blue-50/50 border-b border-blue-100">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-900 text-white rounded-xl shadow-lg">
                  <Package size={24} />
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-400 hover:text-blue-900 bg-white rounded-lg border border-gray-100 shadow-sm"><Edit3 size={18} /></button>
                  <button className="p-2 text-gray-400 hover:text-red-600 bg-white rounded-lg border border-gray-100 shadow-sm"><Trash2 size={18} /></button>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
              <p className="text-3xl font-extrabold text-blue-900 mt-2">
                Rp {plan.price.toLocaleString('id-ID')} <span className="text-sm font-normal text-gray-400">/ bln</span>
              </p>
            </div>
            
            <div className="p-8 flex-1 space-y-6">
              <div className="space-y-4">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Kapasitas & Limit</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <p className="text-xs text-gray-400">User Max</p>
                    <p className="text-sm font-bold text-gray-800">{plan.userLimit === 9999 ? 'Tak Terbatas' : plan.userLimit}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <p className="text-xs text-gray-400">SPPD / Bln</p>
                    <p className="text-sm font-bold text-gray-800">{plan.sppdLimit === 9999 ? 'Tak Terbatas' : plan.sppdLimit}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <p className="text-xs text-gray-400">Approval</p>
                    <p className="text-sm font-bold text-gray-800">{plan.approvalLevels} Level</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <p className="text-xs text-gray-400">Penyimpanan</p>
                    <p className="text-sm font-bold text-gray-800">{plan.storageGb} GB</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Fitur Unggulan</p>
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-600">
                      <CheckCircle2 size={16} className="text-emerald-500 mr-3 mt-0.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="px-8 py-4 bg-gray-50 border-t border-gray-100">
              <p className="text-xs text-center text-gray-400">ID: {plan.id}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanManagementPage;
