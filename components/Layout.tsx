
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
  Activity,
  ShieldCheck,
  Megaphone,
  Zap,
  LifeBuoy,
  Building,
  Database,
  BarChart3,
  Sliders,
  Archive,
  PlusCircle,
  History,
  CheckCircle,
  User as UserIcon,
  Globe,
  FileCode,
  Lock,
  Target
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
    if(confirm("Apakah Anda yakin ingin keluar dari sistem?")) {
      logout();
      navigate('/login');
    }
  };

  const isSuperAdmin = user?.role === UserRole.SUPER_ADMIN;
  const isAdmin = user?.role === UserRole.ADMIN_INSTANSI;
  const isOperator = user?.role === UserRole.OPERATOR;
  const isApprover = user?.role === UserRole.PEJABAT_PENYETUJU;
  const isPegawai = user?.role === UserRole.PEGAWAI;

  const renderSuperAdminMenu = () => [
    { to: '/dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
    { to: '/super-admin/institusi', icon: <Building2 size={18} />, label: 'Lembaga' },
    { to: '/super-admin/billing', icon: <CreditCard size={18} />, label: 'Billing & Paket' },
    { to: '/super-admin/sbm', icon: <Globe size={18} />, label: 'SBM Nasional' },
    { to: '/super-admin/templates', icon: <FileCode size={18} />, label: 'Template Global' },
    { to: '/super-admin/monitoring', icon: <Activity size={18} />, label: 'System Health' },
    { to: '/super-admin/security', icon: <Lock size={18} />, label: 'Keamanan' },
    { to: '/super-admin/communications', icon: <Megaphone size={18} />, label: 'Broadcast' },
    { to: '/super-admin/demo', icon: <Target size={18} />, label: 'Demo Center' },
    { to: '/super-admin/support', icon: <LifeBuoy size={18} />, label: 'Tiket Support' },
    { to: '/profile', icon: <UserIcon size={18} />, label: 'Profil Saya' },
  ];

  const renderAdminInstansiMenu = () => [
    { to: '/dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
    { to: '/admin/profile', icon: <Building size={18} />, label: 'Profil Lembaga' },
    { to: '/admin/users', icon: <Users size={18} />, label: 'Pegawai & Akses' },
    { to: '/admin/master-data', icon: <Database size={18} />, label: 'Master Data' },
    { to: '/admin/sbm', icon: <WalletCards size={18} />, label: 'SBM Unit' },
    { to: '/admin/templates', icon: <FileCode size={18} />, label: 'Template Surat' },
    { to: '/admin/reports', icon: <BarChart3 size={18} />, label: 'Laporan Internal' },
    { to: '/admin/config', icon: <Sliders size={18} />, label: 'Konfigurasi' },
    { to: '/admin/subscription', icon: <Zap size={18} />, label: 'Langganan' },
    { to: '/profile', icon: <UserIcon size={18} />, label: 'Profil Saya' },
  ];

  const renderOperatorMenu = () => [
    { to: '/dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
    { to: '/sppd/baru', icon: <PlusCircle size={18} />, label: 'Input SPPD' },
    { to: '/sppd', icon: <FileText size={18} />, label: 'Daftar SPPD' },
    { to: '/monitoring', icon: <ShieldCheck size={18} />, label: 'Monitoring' },
    { to: '/arsip-digital', icon: <Archive size={18} />, label: 'Arsip Digital' },
    { to: '/profile', icon: <UserIcon size={18} />, label: 'Profil Saya' },
  ];

  const renderApproverMenu = () => [
    { to: '/dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
    { to: '/sppd', icon: <CheckCircle size={18} />, label: 'Otorisasi SPPD' },
    { to: '/riwayat-persetujuan', icon: <History size={18} />, label: 'Riwayat Approval' },
    { to: '/profile', icon: <UserIcon size={18} />, label: 'Profil Saya' },
  ];

  const renderPegawaiMenu = () => [
    { to: '/dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
    { to: '/sppd/baru', icon: <PlusCircle size={18} />, label: 'Ajukan SPPD' },
    { to: '/sppd', icon: <FileText size={18} />, label: 'SPPD Saya' },
    { to: '/profile', icon: <UserIcon size={18} />, label: 'Profil Saya' },
  ];

  const getMenu = () => {
    if (isSuperAdmin) return renderSuperAdminMenu();
    if (isAdmin) return renderAdminInstansiMenu();
    if (isOperator) return renderOperatorMenu();
    if (isApprover) return renderApproverMenu();
    return renderPegawaiMenu();
  };

  return (
    <div className="min-h-screen flex bg-gray-50 overflow-hidden">
      <aside className={`${isSidebarOpen ? 'w-72' : 'w-24'} bg-blue-900 text-white transition-all duration-300 flex flex-col shadow-2xl z-30`}>
        <div className="p-8 flex items-center justify-between border-b border-blue-800">
          {isSidebarOpen ? (
            <Link to="/dashboard" className="text-2xl font-black tracking-tighter">E-SIMPerDin</Link>
          ) : (
            <Link to="/dashboard" className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-900 font-black">E</Link>
          )}
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4 overflow-y-auto custom-scrollbar">
          {getMenu().map((item, idx) => (
            <SidebarItem key={idx} to={item.to} icon={item.icon} label={isSidebarOpen ? item.label : ''} active={location.pathname === item.to} />
          ))}
        </nav>

        <div className="p-6 border-t border-blue-800">
          <button onClick={handleLogout} className="flex items-center space-x-3 px-4 py-3 w-full text-red-300 hover:text-white hover:bg-red-600/30 rounded-xl transition-all font-bold">
            <LogOut size={18} />
            {isSidebarOpen && <span className="text-sm">Keluar Sistem</span>}
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-10 z-20">
          <div className="flex items-center space-x-6">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-3 text-gray-400 hover:bg-gray-50 rounded-2xl transition-all"><Menu size={24} /></button>
            <div className="hidden md:flex items-center px-4 py-2 rounded-xl bg-gray-50 border border-gray-100 text-[10px] font-black uppercase text-gray-500 tracking-widest">
               <ShieldCheck size={14} className="mr-2 text-blue-900" /> Environment: {subscription?.status || 'Active'}
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-black text-gray-900 leading-none">{user?.name}</p>
              <p className="text-[10px] text-blue-600 uppercase font-black mt-1.5 tracking-widest">{user?.role.replace('_', ' ')}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-900 to-indigo-800 text-white rounded-2xl flex items-center justify-center font-black shadow-lg shadow-blue-900/20 border-2 border-white">{user?.name.charAt(0)}</div>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-10 bg-gray-50/50">
          <div className="max-w-7xl mx-auto"><Outlet /></div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
