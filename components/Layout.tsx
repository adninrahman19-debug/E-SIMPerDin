import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { UserRole, SubscriptionStatus } from '../types';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Building2, 
  LogOut, 
  Menu, 
  X, 
  WalletCards,
  PackageSearch,
  CheckSquare,
  CreditCard,
  AlertCircle,
  FileCode
} from 'lucide-react';

const SidebarItem: React.FC<{ to: string, icon: React.ReactNode, label: string, active: boolean }> = ({ to, icon, label, active }) => (
  <Link 
    to={to} 
    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
      active ? 'bg-blue-800 text-white shadow-md' : 'text-blue-100 hover:bg-blue-800/50'
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </Link>
);

const Layout: React.FC = () => {
  const { user, subscription, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { to: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard', roles: Object.values(UserRole) },
    { to: '/sppd', icon: <FileText size={20} />, label: 'Manajemen SPPD', roles: [UserRole.ADMIN_INSTANSI, UserRole.OPERATOR, UserRole.PEJABAT_PENYETUJU, UserRole.PEGAWAI] },
    { to: '/users', icon: <Users size={20} />, label: 'Manajemen Pengguna', roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN_INSTANSI] },
    
    // Super Admin Only
    { to: '/institusi', icon: <Building2 size={20} />, label: 'Institusi', roles: [UserRole.SUPER_ADMIN] },
    { to: '/master-paket', icon: <PackageSearch size={20} />, label: 'Master Paket', roles: [UserRole.SUPER_ADMIN] },
    { to: '/verifikasi-pembayaran', icon: <CheckSquare size={20} />, label: 'Verifikasi Bayar', roles: [UserRole.SUPER_ADMIN] },
    
    // Institution Admin Only
    { to: '/standar-biaya', icon: <WalletCards size={20} />, label: 'Standar Biaya', roles: [UserRole.ADMIN_INSTANSI] },
    { to: '/templates', icon: <FileCode size={20} />, label: 'Template Dokumen', roles: [UserRole.ADMIN_INSTANSI] },
    { to: '/langganan', icon: <CreditCard size={20} />, label: 'Billing & Paket', roles: [UserRole.ADMIN_INSTANSI] },
  ];

  const getSubStatusColor = () => {
    if (!subscription) return 'bg-amber-100 text-amber-800 border-amber-200';
    switch (subscription.status) {
      case SubscriptionStatus.ACTIVE: return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case SubscriptionStatus.EXPIRED: return 'bg-red-50 text-red-800 border-red-200';
      case SubscriptionStatus.TRIAL: return 'bg-blue-50 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50 overflow-hidden">
      <aside 
        className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-blue-900 text-white transition-all duration-300 ease-in-out flex flex-col shadow-xl z-30`}
      >
        <div className="p-6 flex items-center justify-between border-b border-blue-800">
          {isSidebarOpen ? (
            <Link to="/dashboard" className="text-xl font-bold tracking-tight">E-SIMPerDin</Link>
          ) : (
            <Link to="/dashboard" className="w-8 h-8 bg-white rounded flex items-center justify-center text-blue-900 font-bold">E</Link>
          )}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-blue-200 hover:text-white lg:hidden">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4 overflow-y-auto">
          {/* Fix: Simplified filtering logic to check if user.role exists in item.roles array */}
          {menuItems.filter(item => user && item.roles.includes(user.role)).map((item) => (
            <SidebarItem 
              key={item.to} 
              to={item.to} 
              icon={item.icon} 
              label={isSidebarOpen ? item.label : ''} 
              active={location.pathname === item.to}
            />
          ))}
        </nav>

        <div className="p-4 border-t border-blue-800">
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 w-full text-blue-200 hover:text-white hover:bg-red-600/20 rounded-lg transition-all"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span className="font-medium">Keluar</span>}
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-20">
          <div className="flex items-center space-x-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-500 hover:text-blue-900">
              <Menu size={24} />
            </button>
            {user?.role !== UserRole.SUPER_ADMIN && (
              <div className={`hidden md:flex items-center px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider ${getSubStatusColor()}`}>
                <AlertCircle size={14} className="mr-2" />
                Status: {subscription?.status || 'Bukan Pelanggan'}
                {subscription?.endDate && ` (Berakhir ${subscription.endDate})`}
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-xs font-semibold text-blue-900 hover:underline mr-4">Lihat Landing Page</Link>
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-gray-800">{user?.name}</p>
              <p className="text-xs text-gray-500 uppercase tracking-wider">{user?.role.replace('_', ' ')}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 text-blue-900 rounded-full flex items-center justify-center font-bold border-2 border-blue-900/10">
              {user?.name.charAt(0)}
            </div>
          </div>
        </header>

        {subscription?.status === SubscriptionStatus.EXPIRED && user?.role !== UserRole.SUPER_ADMIN && (
          <div className="bg-red-600 text-white px-6 py-2 text-center text-sm font-bold flex items-center justify-center animate-pulse">
            <AlertCircle size={16} className="mr-2" />
            Masa aktif langganan Anda telah berakhir. Harap melakukan pembayaran untuk terus menggunakan fitur E-SIMPerDin.
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
             <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;