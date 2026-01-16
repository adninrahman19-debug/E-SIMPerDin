
import React, { useState } from 'react';
import PlanManagementPage from './PlanManagementPage';
import PaymentVerificationPage from './PaymentVerificationPage';
import TenantSubscriptionList from './TenantSubscriptionList';
import { PackageSearch, CheckSquare, Users, CreditCard, TrendingUp } from 'lucide-react';

const SubscriptionBillingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'PLANS' | 'VERIFICATION' | 'TENANTS'>('PLANS');

  return (
    <div className="animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Subscription & Monetisasi</h2>
          <p className="text-gray-500 text-sm font-medium">Kelola ekosistem ekonomi platform, paket layanan, dan penagihan tenant.</p>
        </div>
        <div className="flex items-center space-x-3 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
           <div className="px-4 text-right border-r border-gray-100">
              <p className="text-[8px] font-black text-gray-400 uppercase leading-none mb-1">Total Revenue YTD</p>
              <p className="text-sm font-black text-blue-900 leading-none">Rp 1.42 M</p>
           </div>
           <TrendingUp className="text-emerald-500 mx-2" size={20} />
        </div>
      </div>

      <div className="flex bg-white p-1 rounded-2xl border border-gray-100 shadow-sm mb-8 w-fit overflow-x-auto max-w-full">
        <button 
          onClick={() => setActiveTab('PLANS')}
          className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all flex items-center space-x-2 whitespace-nowrap ${activeTab === 'PLANS' ? 'bg-blue-900 text-white shadow-lg' : 'text-gray-500 hover:text-blue-900'}`}
        >
          <PackageSearch size={16} />
          <span>Master Paket</span>
        </button>
        <button 
          onClick={() => setActiveTab('VERIFICATION')}
          className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all flex items-center space-x-2 whitespace-nowrap ${activeTab === 'VERIFICATION' ? 'bg-blue-900 text-white shadow-lg' : 'text-gray-500 hover:text-blue-900'}`}
        >
          <CheckSquare size={16} />
          <span>Verifikasi Pembayaran</span>
        </button>
        <button 
          onClick={() => setActiveTab('TENANTS')}
          className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all flex items-center space-x-2 whitespace-nowrap ${activeTab === 'TENANTS' ? 'bg-blue-900 text-white shadow-lg' : 'text-gray-500 hover:text-blue-900'}`}
        >
          <Users size={16} />
          <span>Langganan Instansi</span>
        </button>
      </div>

      <div className="mt-4">
        {activeTab === 'PLANS' && (
          <div className="animate-in slide-in-from-left-2 duration-300">
            <PlanManagementPage />
          </div>
        )}
        {activeTab === 'VERIFICATION' && (
          <div className="animate-in slide-in-from-right-2 duration-300">
            <PaymentVerificationPage />
          </div>
        )}
        {activeTab === 'TENANTS' && (
          <div className="animate-in zoom-in-95 duration-300">
            <TenantSubscriptionList />
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionBillingPage;
