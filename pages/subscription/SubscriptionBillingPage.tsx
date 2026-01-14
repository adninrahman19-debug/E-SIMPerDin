
import React, { useState } from 'react';
import PlanManagementPage from './PlanManagementPage';
import PaymentVerificationPage from './PaymentVerificationPage';
import { PackageSearch, CheckSquare } from 'lucide-react';

const SubscriptionBillingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'PLANS' | 'VERIFICATION'>('PLANS');

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-gray-900 tracking-tight">Subscription & Pembayaran</h2>
        <p className="text-gray-500 text-sm font-medium">Kelola paket layanan platform dan verifikasi transaksi tenant.</p>
      </div>

      <div className="flex bg-white p-1 rounded-2xl border border-gray-100 shadow-sm mb-8 w-fit">
        <button 
          onClick={() => setActiveTab('PLANS')}
          className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all flex items-center space-x-2 ${activeTab === 'PLANS' ? 'bg-blue-900 text-white shadow-lg' : 'text-gray-500 hover:text-blue-900'}`}
        >
          <PackageSearch size={16} />
          <span>Master Paket</span>
        </button>
        <button 
          onClick={() => setActiveTab('VERIFICATION')}
          className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all flex items-center space-x-2 ${activeTab === 'VERIFICATION' ? 'bg-blue-900 text-white shadow-lg' : 'text-gray-500 hover:text-blue-900'}`}
        >
          <CheckSquare size={16} />
          <span>Verifikasi Pembayaran</span>
        </button>
      </div>

      <div className="mt-4">
        {activeTab === 'PLANS' ? (
          <div className="animate-in slide-in-from-left-2 duration-300">
            {/* We render the existing content by calling the component but removing its own header if needed. 
                For simplicity in this mock, we assume the component is flexible. */}
            <PlanManagementPage />
          </div>
        ) : (
          <div className="animate-in slide-in-from-right-2 duration-300">
            <PaymentVerificationPage />
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionBillingPage;
