
import React from 'react';
import { useAuth } from '../../App';
import { UserRole } from '../../types';

// Role-based Dashboards Components
import SuperAdminDashboard from './SuperAdminDashboard';
import AdminInstansiDashboard from './AdminInstansiDashboard';
import OperatorDashboard from './OperatorDashboard';
import PejabatDashboard from './PejabatDashboard';
import PegawaiDashboard from './PegawaiDashboard';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  const renderContent = () => {
    switch(user?.role) {
      case UserRole.SUPER_ADMIN: return <SuperAdminDashboard />;
      case UserRole.ADMIN_INSTANSI: return <AdminInstansiDashboard />;
      case UserRole.OPERATOR: return <OperatorDashboard />;
      case UserRole.PEJABAT_PENYETUJU: return <PejabatDashboard />;
      case UserRole.PEGAWAI: return <PegawaiDashboard />;
      default: return <PegawaiDashboard />;
    }
  };

  return (
    <div className="animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Halo, {user?.name}</h2>
          <p className="text-gray-500 font-medium mt-1">
            Selamat datang di Pusat Kendali E-SIMPerDin Versi 2.5
          </p>
        </div>
      </div>
      {renderContent()}
    </div>
  );
};

export default DashboardPage;
