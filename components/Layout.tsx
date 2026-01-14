
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
  CreditCard,
  AlertCircle,
  Settings2,
  Globe,
  Activity,
  ShieldCheck,
  DatabaseBackup,
  Megaphone,
  Settings,
  Zap,
  LifeBuoy,
  Building,
  Database,
  BarChart3,
  Sliders,
  Archive,
  PlusCircle,
  ClipboardList,
  Search,
  History,
  CheckCircle,
  User as UserIcon
} from 'lucide-react';

const SidebarItem: React.FC<{ to: string, icon: React.ReactNode, label: string, active: boolean }> = ({ to, icon, label, active }) => (
  <Link 
    to={to} 
    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
      active ? 'bg-blue-800 text-white shadow-lg' : 'text-blue-100 hover:bg-blue-800/50'
    }`}
  >
    {icon}
    <span className="font-bold text-sm leading-none">{label}</span>
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

  const isOperator = user?.role === UserRole.OPERATOR;
  const isApprover = user?.role === UserRole.PEJABAT_PENYETUJU;
  const isPegawai = user?.role === UserRole.PEGAWAI;

  // Menu for Operator
  const operatorMenuItems = [
    { to: '/dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
    { to: '/sppd/baru', icon: <PlusCircle size={18} />, label: 'Buat SPPD' },
    { to: '/sppd', icon: <FileText size={18} />, label: 'Daftar SPPD' },
    { to: '/monitoring', icon: <ShieldCheck size={18} />, label: 'Monitoring' },
    { to: '/arsip-digital', icon: <Archive size={18} />, label: 'Arsip' },
    { to: '/profile', icon: <UserIcon size={18} />, label: 'Profil Saya' },
  ];

  // Menu for Approver
  const approverMenuItems = [
    { to: '/dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
    { to: '/sppd', icon: <CheckCircle size={18} />, label: 'Persetujuan' },
    { to: '/riwayat-persetujuan', icon: <History size={18} />, label: 'Riwayat' },
    { to: '/profile', icon: <UserIcon size={18} />, label: 'Profil Saya' },
  ];

  // Menu for Pegawai (Final)
  const pegawaiMenuItems = [
    { to: '/dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
    { to: '/sppd/baru', icon: <PlusCircle size={18} />, label: 'Ajukan SPPD' },
    { to: '/sppd', icon: <FileText size={18} />, label: 'SPPD Saya' },
    { to: '/profile', icon: <UserIcon size={18} />, label: 'Profil Saya' },
  ];

  // Menu for Admin
  const adminMenuItems = [
    { to: '/dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard', roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN_INSTANSI] },
    { to: '/institusi', icon: <Building2 size={18} />, label: 'Instansi', roles: [UserRole.SUPER_ADMIN] },
    { to: '/subscription-billing', icon: <CreditCard size={18} />, label: 'Subscription', roles: [UserRole.SUPER_ADMIN] },
    { to: '/system-monitoring', icon: <Activity size={18} />, label: 'System Vitals', roles: [UserRole.SUPER_ADMIN] },
    { to: '/institution-profile', icon: <Building size={18} />, label: 'Profil Instansi', roles: [UserRole.ADMIN_INSTANSI] },
    { to: '/users', icon: <Users size={18} />, label: 'Pengguna', roles: [UserRole.ADMIN_INSTANSI, UserRole.SUPER_ADMIN] },
    { to: '/master-data', icon: <Database size={18} />, label: 'Data Master', roles: [UserRole.ADMIN_INSTANSI] },
    { to: '/standar-biaya', icon: <WalletCards size={18} />, label: 'Standar Biaya', roles: [UserRole.ADMIN_INSTANSI] },
    { to: '/sppd', icon: <FileText size={18} />, label: 'Kelola SPPD', roles: [UserRole.ADMIN_INSTANSI] },
    { to: '/laporan', icon: <BarChart3 size={18} />, label: 'Laporan', roles: [UserRole.ADMIN_INSTANSI] },
    { to: '/institution-config', icon: <Sliders size={18} />, label: 'Pengaturan', roles: [UserRole.ADMIN_INSTANSI] },
    { to: '/profile', icon: <UserIcon size={18} />, label: 'Profil Saya', roles: [UserRole.ADMIN_INSTANSI, UserRole.SUPER_ADMIN] },
  ];

  const currentMenuItems = 
    isOperator ? operatorMenuItems :
    isApprover ? approverMenuItems :
    isPegawai ? pegawaiMenuItems :
    adminMenuItems.filter(item => user && item.roles?.includes(user.role));

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
            <Link to="/dashboard" className="text-xl font-black tracking-tighter">E-SIMPerDin</Link>
          ) : (
            <Link to="/dashboard" className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-blue-900 font-black">E</Link>
          )}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-blue-200 hover:text-white lg:hidden">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 mt-4 overflow-y-auto custom-scrollbar">
          {isSidebarOpen && (
            <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] px-4 mb-4">
              {isApprover ? 'Menu Pimpinan' : isPegawai ? 'Menu Pegawai' : 'Main Menu'}
            </p>
          )}
          {currentMenuItems.map((item, index) => (
            <SidebarItem 
              key={index} 
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
            className="flex items-center space-x-3 px-4 py-3 w-full text-blue-200 hover:text-white hover:bg-red-600/20 rounded-xl transition-all"
          >
            <LogOut size={18} />
            {isSidebarOpen && <span className="font-bold text-sm">Logout</span>}
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-20">
          <div className="flex items-center space-x-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-gray-500 hover:text-blue-900 hover:bg-gray-50 rounded-xl transition-all">
              <Menu size={24} />
            </button>
            {user?.role !== UserRole.SUPER_ADMIN && (
              <div className={`hidden md:flex items-center px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-wider ${getSubStatusColor()}`}>
                <AlertCircle size={14} className="mr-2" />
                Status: {subscription?.status || 'Bukan Pelanggan'}
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-black text-gray-800 leading-none">{user?.name}</p>
              <p className="text-[10px] text-blue-600 uppercase font-black tracking-widest mt-1">
                {user?.role === UserRole.OPERATOR ? 'Staf Administrasi' : user?.role.replace('_', ' ')}
              </p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-900 to-indigo-800 text-white rounded-2xl flex items-center justify-center font-black border-2 border-white shadow-lg">
              {user?.name.charAt(0)}
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/50">
          <div className="max-w-7xl mx-auto">
             <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
