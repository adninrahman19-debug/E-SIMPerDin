
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
  Bell,
  ChevronRight,
  ShieldCheck,
  PlusCircle,
  FileText,
  Zap,
  Building,
  Archive,
  X,
  AlertTriangle,
  ClipboardList,
  Search,
  Clock,
  History,
  FileSearch,
  CheckCircle2
} from 'lucide-react';

const SidebarItem: React.FC<{ to: string, icon: React.ReactNode, label: string, active: boolean, isOpen: boolean }> = ({ to, icon, label, active, isOpen }) => (
  <Link 
    to={to} 
    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
      active ? 'bg-white text-blue-900 shadow-lg shadow-black/10' : 'text-blue-100 hover:bg-blue-800/50'
    }`}
  >
    <div className={`${active ? 'text-blue-900' : 'text-blue-200'}`}>
      {icon}
    </div>
    {isOpen && <span className="font-bold text-[11px] uppercase tracking-wider leading-none">{label}</span>}
  </Link>
);

const Layout: React.FC = () => {
  const { user, subscription, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleFinalLogout = () => {
    logout();
    setShowLogoutModal(false);
    navigate('/login');
  };

  const isSuperAdmin = user?.role === UserRole.SUPER_ADMIN;
  const isAdmin = user?.role === UserRole.ADMIN_INSTANSI;
  const isOperator = user?.role === UserRole.OPERATOR;
  const isPejabat = user?.role === UserRole.PEJABAT_PENYETUJU;
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
  ];

  const renderAdminInstansiMenu = () => [
    { to: '/dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
    { to: '/admin/profile', icon: <Building size={18} />, label: 'Profil Instansi' },
    { to: '/admin/users', icon: <Users size={18} />, label: 'Pengguna' },
    { to: '/admin/master-data', icon: <Database size={18} />, label: 'Data Master' },
    { to: '/admin/sbm', icon: <CreditCard size={18} />, label: 'Standar Biaya' },
    { to: '/sppd', icon: <FileText size={18} />, label: 'SPPD' },
    { to: '/admin/reports', icon: <Activity size={18} />, label: 'Laporan' },
    { to: '/admin/subscription', icon: <Zap size={18} />, label: 'Subscription' },
    { to: '/admin/config', icon: <Settings size={18} />, label: 'Pengaturan' },
  ];

  const renderPejabatMenu = () => [
    { to: '/dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
    { to: '/sppd', icon: <ClipboardList size={18} />, label: 'Persetujuan' },
    { to: '/riwayat-persetujuan', icon: <History size={18} />, label: 'Riwayat' },
  ];

  const renderOperatorMenu = () => [
    { to: '/dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
    { to: '/sppd', icon: <FileText size={18} />, label: 'Manajemen SPPD' },
    { to: '/monitoring', icon: <Clock size={18} />, label: 'Monitoring Approval' },
    { to: '/arsip-digital', icon: <Archive size={18} />, label: 'Arsip Digital' },
  ];

  // Updated menu label based on user request for PEGAWAI
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
    if (isPejabat) return renderPejabatMenu();
    if (isPegawai) return renderPegawaiMenu();
    return [
        { to: '/dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
        { to: '/sppd', icon: <FileText size={18} />, label: 'Manajemen SPPD' },
    ];
  };

  const isActive = (path: string) => {
    if (path === '/dashboard') return location.pathname === '/dashboard';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen flex bg-gray-50 overflow-hidden">
      <aside className={`${isSidebarOpen ? 'w-72' : 'w-24'} bg-blue-900 text-white transition-all duration-300 flex flex-col shadow-2xl z-30`}>
        <div className="p-6 flex items-center justify-between border-b border-blue-800 h-20">
          {isSidebarOpen ? (
            <Link to="/dashboard" className="text-xl font-black tracking-tighter flex items-center">
              <div className="w-8 h-8 bg-white text-blue-900 rounded-lg flex items-center justify-center mr-3 font-black shadow-lg">E</div>
              E-SIMPerDin <span className="ml-1 text-[10px] text-blue-400 font-bold uppercase">Pro</span>
            </Link>
          ) : (
            <Link to="/dashboard" className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-900 font-black shadow-xl mx-auto">E</Link>
          )}
        </div>

        <nav className="flex-1 p-4 space-y-1 mt-4 overflow-y-auto custom-scrollbar">
          {getMenu().map((item, idx) => (
            <SidebarItem 
              key={idx} 
              to={item.to} 
              icon={item.icon} 
              label={item.label} 
              active={isActive(item.to)} 
              isOpen={isSidebarOpen}
            />
          ))}
        </nav>

        <div className="p-4 border-t border-blue-800 space-y-1">
          {/* For non-pegawai, Profile is still at the bottom, for Pegawai it's in the list above per request */}
          {!isPegawai && (
            <SidebarItem to="/profile" icon={<UserIcon size={18} />} label="Profil Saya" active={isActive('/profile')} isOpen={isSidebarOpen} />
          )}
          <button 
            onClick={() => setShowLogoutModal(true)} 
            className="flex items-center space-x-3 px-4 py-3 w-full text-red-300 hover:text-white hover:bg-red-600/30 rounded-xl transition-all font-bold group"
          >
            <LogOut size={18} className="group-hover:rotate-12 transition-transform" />
            {isSidebarOpen && <span className="text-[11px] uppercase tracking-wider">Logout</span>}
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 z-20 shadow-sm">
          <div className="flex items-center space-x-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2.5 text-gray-400 hover:bg-gray-50 rounded-xl border border-gray-100 transition-all shadow-sm"><Menu size={20} /></button>
            <div className="hidden md:block">
               <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Environment</span>
               <div className="flex items-center space-x-2 mt-0.5">
                  <div className={`w-2 h-2 rounded-full ${isSuperAdmin ? 'bg-indigo-600 animate-pulse' : 'bg-emerald-50'}`}></div>
                  <span className="text-[11px] font-black uppercase text-blue-900 tracking-tighter">{isSuperAdmin ? 'Platform Authority' : subscription?.status || 'Active Tenant'}</span>
               </div>
            </div>
          </div>
          <div className="flex items-center space-x-5">
            <div className="hidden sm:flex items-center space-x-2 bg-gray-50 border border-gray-100 px-4 py-2 rounded-2xl">
               <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
               <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">System Online</span>
            </div>
            <button className="p-2.5 text-gray-400 hover:text-blue-900 transition-colors relative bg-white border border-gray-100 rounded-xl shadow-sm">
               <Bell size={20} />
               <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-px h-8 bg-gray-100"></div>
            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-black text-gray-900 leading-none">{user?.name}</p>
                <p className="text-[9px] text-blue-600 uppercase font-black mt-1.5 tracking-[0.1em]">{user?.role.replace('_', ' ')}</p>
              </div>
              <div className="w-11 h-11 bg-gradient-to-br from-blue-900 to-indigo-800 text-white rounded-2xl flex items-center justify-center font-black shadow-xl shadow-blue-900/10 border-2 border-white ring-1 ring-gray-100">{user?.name.charAt(0)}</div>
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-8 bg-gray-50/50 custom-scrollbar">
          <div className="max-w-7xl mx-auto h-full"><Outlet /></div>
        </div>
      </main>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-blue-900/60 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setShowLogoutModal(false)}></div>
          <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden animate-in zoom-in duration-300">
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-amber-50 text-amber-600 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-inner">
                <LogOut size={40} className="ml-1.5" />
              </div>
              <h4 className="text-2xl font-black text-gray-900 tracking-tight">Konfirmasi Keluar</h4>
              <p className="text-gray-500 text-sm mt-3 leading-relaxed font-medium">
                Apakah Anda yakin ingin mengakhiri sesi ini? Pastikan seluruh data penginputan Anda telah tersimpan ke server.
              </p>
              
              <div className="mt-8 flex flex-col gap-3">
                <button 
                  onClick={handleFinalLogout}
                  className="w-full py-4 bg-red-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-700 transition-all shadow-xl shadow-red-600/20 flex items-center justify-center space-x-2"
                >
                  <ShieldCheck size={18} />
                  <span>Ya, Keluar Sekarang</span>
                </button>
                <button 
                  onClick={() => setShowLogoutModal(false)}
                  className="w-full py-4 bg-gray-50 text-gray-500 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-100 transition-all border border-gray-100"
                >
                  Batalkan
                </button>
              </div>
            </div>
            <div className="bg-gray-50 px-8 py-4 border-t border-gray-100 flex items-center justify-center space-x-2">
              <AlertTriangle size={14} className="text-amber-500" />
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Sesi Anda akan dihapus secara permanen dari perangkat ini.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
