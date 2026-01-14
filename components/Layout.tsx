
import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { UserRole } from '../types';
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  CreditCard, 
  FileCode, 
  Globe, 
  Activity, 
  Lock, 
  Database, 
  Megaphone, 
  Settings, 
  Target, 
  LifeBuoy, 
  User as UserIcon, 
  LogOut,
  Menu,
  ShieldCheck,
  PlusCircle,
  FileText,
  History,
  Archive,
  Building,
  Zap,
  CheckCircle,
  Search,
  Bell
} from 'lucide-react';

const SidebarItem: React.FC<{ to: string, icon: React.ReactNode, label: string, active: boolean }> = ({ to, icon, label, active }) => (
  <Link 
    to={to} 
    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
      active ? 'bg-blue-800 text-white shadow-lg' : 'text-blue-100 hover:bg-blue-800/50'
    }`}
  >
    {icon}
    <span className="font-bold text-xs leading-none">{label}</span>
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
    { to: '/super-admin/institusi', icon: <Building2 size={18} />, label: 'Instansi' },
    { to: '/super-admin/users', icon: <Users size={18} />, label: 'User Global' },
    { to: '/super-admin/billing', icon: <CreditCard size={18} />, label: 'Subscription & Pembayaran' },
    { to: '/super-admin/templates', icon: <FileCode size={18} />, label: 'Template Global' },
    { to: '/super-admin/sbm', icon: <Globe size={18} />, label: 'Standar Biaya' },
    { to: '/super-admin/monitoring', icon: <Activity size={18} />, label: 'Monitoring & Audit Log' },
    { to: '/super-admin/security', icon: <Lock size={18} />, label: 'Keamanan' },
    { to: '/super-admin/backup', icon: <Database size={18} />, label: 'Backup & Maintenance' },
    { to: '/super-admin/communications', icon: <Megaphone size={18} />, label: 'Notifikasi' },
    { to: '/super-admin/settings', icon: <Settings size={18} />, label: 'Pengaturan Platform' },
    { to: '/super-admin/demo', icon: <Target size={18} />, label: 'Demo Mode' },
    { to: '/super-admin/support', icon: <LifeBuoy size={18} />, label: 'Help & Support' },
    { to: '/profile', icon: <UserIcon size={18} />, label: 'Profil Saya' },
  ];

  const renderAdminInstansiMenu = () => [
    { to: '/dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
    { to: '/admin/profile', icon: <Building size={18} />, label: 'Profil Lembaga' },
    { to: '/admin/users', icon: <Users size={18} />, label: 'Pegawai & Akses' },
    { to: '/admin/master-data', icon: <Database size={18} />, label: 'Master Data' },
    { to: '/admin/sbm', icon: <CreditCard size={18} />, label: 'SBM Unit' },
    { to: '/admin/templates', icon: <FileCode size={18} />, label: 'Template Surat' },
    { to: '/admin/reports', icon: <Activity size={18} />, label: 'Laporan Internal' },
    { to: '/admin/config', icon: <Settings size={18} />, label: 'Konfigurasi' },
    { to: '/admin/subscription', icon: <Zap size={18} />, label: 'Langganan' },
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
    if (isPegawai) return renderPegawaiMenu();
    // Default Operator/Approver
    return [
        { to: '/dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
        { to: '/sppd', icon: <FileText size={18} />, label: 'Manajemen SPPD' },
        { to: '/profile', icon: <UserIcon size={18} />, label: 'Profil Saya' },
    ];
  };

  const isActive = (path: string) => {
    if (path === '/dashboard') return location.pathname === '/dashboard';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen flex bg-gray-50 overflow-hidden">
      <aside className={`${isSidebarOpen ? 'w-72' : 'w-24'} bg-blue-900 text-white transition-all duration-300 flex flex-col shadow-2xl z-30`}>
        <div className="p-6 flex items-center justify-between border-b border-blue-800">
          {isSidebarOpen ? (
            <Link to="/dashboard" className="text-xl font-black tracking-tighter">E-SIMPerDin <span className="text-[10px] text-blue-400">PRO</span></Link>
          ) : (
            <Link to="/dashboard" className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-blue-900 font-black">E</Link>
          )}
        </div>

        <nav className="flex-1 p-3 space-y-1 mt-4 overflow-y-auto custom-scrollbar">
          {getMenu().map((item, idx) => (
            <SidebarItem key={idx} to={item.to} icon={item.icon} label={isSidebarOpen ? item.label : ''} active={isActive(item.to)} />
          ))}
        </nav>

        <div className="p-4 border-t border-blue-800">
          <button onClick={handleLogout} className="flex items-center space-x-3 px-4 py-3 w-full text-red-300 hover:text-white hover:bg-red-600/30 rounded-xl transition-all font-bold">
            <LogOut size={18} />
            {isSidebarOpen && <span className="text-xs">Keluar Sistem</span>}
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 z-20">
          <div className="flex items-center space-x-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-gray-400 hover:bg-gray-50 rounded-xl"><Menu size={20} /></button>
            <div className="hidden md:block">
               <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Environment: </span>
               <span className="text-[10px] font-black uppercase text-blue-900">{isSuperAdmin ? 'PLATFORM MASTER' : subscription?.status || 'ACTIVE'}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-blue-900 transition-colors relative">
               <Bell size={20} />
               <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-px h-6 bg-gray-100"></div>
            <div className="flex items-center space-x-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-black text-gray-900 leading-none">{user?.name}</p>
                <p className="text-[9px] text-blue-600 uppercase font-black mt-1 tracking-widest">{user?.role.replace('_', ' ')}</p>
              </div>
              <div className="w-9 h-9 bg-gradient-to-br from-blue-900 to-indigo-800 text-white rounded-xl flex items-center justify-center font-black shadow-lg">{user?.name.charAt(0)}</div>
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-8 bg-gray-50/50">
          <div className="max-w-7xl mx-auto"><Outlet /></div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
