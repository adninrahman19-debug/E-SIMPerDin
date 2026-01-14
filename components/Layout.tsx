
import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { UserRole } from '../types';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Building2, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  ChevronRight,
  WalletCards,
  History
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
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { to: '/', icon: <LayoutDashboard size={20} />, label: 'Dashboard', roles: Object.values(UserRole) },
    { to: '/sppd', icon: <FileText size={20} />, label: 'Manajemen SPPD', roles: [UserRole.ADMIN_INSTANSI, UserRole.OPERATOR, UserRole.PEJABAT_PENYETUJU, UserRole.PEGAWAI] },
    { to: '/users', icon: <Users size={20} />, label: 'Manajemen Pengguna', roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN_INSTANSI] },
    { to: '/institusi', icon: <Building2 size={20} />, label: 'Manajemen Institusi', roles: [UserRole.SUPER_ADMIN] },
    { to: '/standar-biaya', icon: <WalletCards size={20} />, label: 'Standar Biaya', roles: [UserRole.ADMIN_INSTANSI] },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-blue-900 text-white transition-all duration-300 ease-in-out flex flex-col shadow-xl z-30`}
      >
        <div className="p-6 flex items-center justify-between border-b border-blue-800">
          {isSidebarOpen ? (
            <h1 className="text-xl font-bold tracking-tight">E-SIMPerDin</h1>
          ) : (
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-blue-900 font-bold">E</div>
          )}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-blue-200 hover:text-white lg:hidden">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4 overflow-y-auto">
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

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-20">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-500 hover:text-blue-900 lg:block hidden">
            <Menu size={24} />
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-gray-800">{user?.name}</p>
              <p className="text-xs text-gray-500 uppercase tracking-wider">{user?.role.replace('_', ' ')}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 text-blue-900 rounded-full flex items-center justify-center font-bold border-2 border-blue-900/10">
              {user?.name.charAt(0)}
            </div>
          </div>
        </header>

        {/* Page Content */}
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
