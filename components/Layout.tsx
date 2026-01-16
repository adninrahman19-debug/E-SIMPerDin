
import React, { useState, useRef, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { UserRole } from '../types';
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  Users, 
  LogOut, 
  Menu, 
  Bell, 
  User as UserIcon,
  Archive,
  Wallet,
  Layers,
  BarChart3,
  ShieldCheck,
  Building2,
  Package,
  Globe,
  Activity,
  Lock,
  Database,
  Megaphone,
  Zap,
  LifeBuoy,
  ChevronRight,
  ClipboardList,
  History,
  CheckCircle2,
  AlertCircle,
  Clock,
  X,
  MessageSquare,
  Sparkles,
  AlertTriangle
} from 'lucide-react';

const SidebarItem: React.FC<{ to: string, icon: any, label: string, active: boolean, isOpen: boolean }> = ({ to, icon: Icon, label, active, isOpen }) => (
  <Link 
    to={to} 
    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
      active 
        ? 'bg-blue-900 text-white shadow-lg shadow-blue-900/30' 
        : 'text-gray-500 hover:bg-blue-50 hover:text-blue-900'
    }`}
  >
    <Icon size={20} className={`${active ? 'text-white' : 'text-gray-400 group-hover:text-blue-900'}`} />
    {isOpen && <span className="font-bold text-sm whitespace-nowrap">{label}</span>}
  </Link>
);

const SidebarSection: React.FC<{ label: string, isOpen: boolean }> = ({ label, isOpen }) => (
  isOpen ? (
    <div className="px-4 mt-6 mb-2">
      <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{label}</span>
    </div>
  ) : (
    <div className="h-px bg-gray-100 my-4 mx-4"></div>
  )
);

const Layout: React.FC = () => {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleActualLogout = () => {
    logout();
    navigate('/login');
  };

  // Check for login success on mount
  useEffect(() => {
    const justLoggedIn = sessionStorage.getItem('just_logged_in');
    if (justLoggedIn === 'true') {
      setShowSuccessToast(true);
      sessionStorage.removeItem('just_logged_in');
      const timer = setTimeout(() => setShowSuccessToast(false), 4000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isSA = user?.role === UserRole.SUPER_ADMIN;
  const isAI = user?.role === UserRole.ADMIN_INSTANSI;
  const isOP = user?.role === UserRole.OPERATOR;
  const isPJ = user?.role === UserRole.PEJABAT_PENYETUJU;
  const isPG = user?.role === UserRole.PEGAWAI;

  // Mock Notifications Data
  const getMockNotifications = () => {
    if (isSA) return [
      { id: 1, title: 'Pembayaran Baru', desc: 'Dinas Kesehatan Prov. Maluku telah mengunggah bukti bayar paket Enterprise.', time: '5m ago', type: 'billing', icon: Wallet, color: 'text-emerald-500 bg-emerald-50' },
      { id: 2, title: 'Peringatan Server', desc: 'Penggunaan RAM pada Cluster-01 mencapai 85%.', time: '1h ago', type: 'system', icon: AlertCircle, color: 'text-red-500 bg-red-50' },
      { id: 3, title: 'Tenant Baru', desc: 'Bappeda Kab. Bogor telah melakukan registrasi trial.', time: '3h ago', type: 'tenant', icon: Building2, color: 'text-blue-500 bg-blue-50' },
    ];
    if (isAI) return [
      { id: 1, title: 'User Registrasi', desc: 'Andi Pratama menunggu verifikasi akun pegawai.', time: '10m ago', type: 'user', icon: Users, color: 'text-blue-500 bg-blue-50' },
      { id: 2, title: 'Sisa Kuota SPPD', desc: 'Kuota SPPD bulan ini tersisa 12 dari 500.', time: '5h ago', type: 'billing', icon: AlertCircle, color: 'text-amber-500 bg-amber-50' },
      { id: 3, title: 'Update SBM', desc: 'Super Admin memperbarui Standar Biaya Masukan Nasional 2024.', time: '1d ago', type: 'config', icon: Settings, color: 'text-indigo-500 bg-indigo-50' },
    ];
    return [
      { id: 1, title: 'SPPD Disetujui', desc: 'Pengajuan SPPD ke Bandung #042 telah disetujui Kepala Dinas.', time: '2m ago', type: 'status', icon: CheckCircle2, color: 'text-emerald-500 bg-emerald-50' },
      { id: 2, title: 'Revisi Diperlukan', desc: 'Mohon perbaiki lampiran pada pengajuan SPPD Surabaya.', time: '45m ago', type: 'revision', icon: History, color: 'text-amber-500 bg-amber-50' },
      { id: 3, title: 'Tugas Baru', desc: 'Anda ditugaskan sebagai pendamping teknis di Jakarta besok.', time: '2h ago', type: 'assignment', icon: ClipboardList, color: 'text-blue-500 bg-blue-50' },
    ];
  };

  const notifications = getMockNotifications();

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Login Success Toast */}
      {showSuccessToast && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] flex items-center bg-white/80 backdrop-blur-xl border border-emerald-100 px-6 py-4 rounded-[2rem] shadow-2xl shadow-emerald-500/10 animate-in slide-in-from-top-8 duration-500">
           <div className="w-10 h-10 bg-emerald-500 text-white rounded-2xl flex items-center justify-center mr-4 shadow-lg shadow-emerald-500/20">
              <CheckCircle2 size={20} />
           </div>
           <div>
              <p className="text-sm font-black text-gray-900 leading-none">Login Berhasil!</p>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1.5 flex items-center">
                 Selamat Datang, {user?.name} <Sparkles size={10} className="ml-1 text-amber-500" />
              </p>
           </div>
           <button 
             onClick={() => setShowSuccessToast(false)}
             className="ml-6 p-2 hover:bg-emerald-50 rounded-xl text-gray-400 transition-all"
           >
              <X size={16} />
           </button>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-blue-900/40 backdrop-blur-sm flex items-center justify-center z-[200] p-6">
          <div className="bg-white w-full max-w-sm rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            <div className="p-10 text-center">
              <div className="w-20 h-20 bg-red-50 text-red-600 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-inner">
                <AlertTriangle size={40} />
              </div>
              <h4 className="text-2xl font-black text-gray-900 tracking-tight">Konfirmasi Keluar</h4>
              <p className="text-gray-500 text-sm mt-3 font-medium leading-relaxed italic">
                Apakah Anda yakin ingin mengakhiri sesi kerja Anda saat ini?
              </p>
              
              <div className="mt-10 space-y-3">
                <button 
                  onClick={handleActualLogout}
                  className="w-full py-4 bg-red-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-700 transition-all shadow-xl shadow-red-600/20 flex items-center justify-center space-x-2"
                >
                  <LogOut size={16} />
                  <span>Ya, Keluar Sistem</span>
                </button>
                <button 
                  onClick={() => setShowLogoutConfirm(false)}
                  className="w-full py-4 bg-gray-100 text-gray-700 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-all"
                >
                  Batalkan
                </button>
              </div>
            </div>
            <div className="px-10 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-center">
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">Secure Session Management</span>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside 
        className={`${isSidebarOpen ? 'w-72' : 'w-24'} bg-white border-r border-gray-100 transition-all duration-300 flex flex-col z-30 shadow-sm`}
      >
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3 overflow-hidden">
            <div className="w-10 h-10 bg-blue-900 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-xl shadow-blue-900/20 shrink-0">
              E
            </div>
            {isSidebarOpen && (
              <div className="flex flex-col">
                <span className="text-lg font-black text-blue-900 leading-none tracking-tight">SIMPerDin</span>
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">Enterprise 2.5</span>
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 px-3 space-y-1 mt-4 overflow-y-auto custom-scrollbar pb-10">
          <SidebarItem 
            to="/dashboard" 
            icon={LayoutDashboard} 
            label="Dashboard" 
            active={location.pathname === '/dashboard'} 
            isOpen={isSidebarOpen}
          />

          <SidebarSection label="Operasional" isOpen={isSidebarOpen} />
          <SidebarItem 
            to="/sppd" 
            icon={FileText} 
            label={isPG ? "SPPD Saya" : "Daftar SPPD"} 
            active={location.pathname === '/sppd'} 
            isOpen={isSidebarOpen}
          />
          {(isOP || isAI || isPG) && (
            <SidebarItem 
              to="/sppd/baru" 
              icon={Zap} 
              label="Buat SPPD Baru" 
              active={location.pathname === '/sppd/baru'} 
              isOpen={isSidebarOpen}
            />
          )}
          {(isOP || isAI) && (
            <SidebarItem 
              to="/sppd/monitoring" 
              icon={Activity} 
              label="Monitoring" 
              active={location.pathname === '/sppd/monitoring'} 
              isOpen={isSidebarOpen}
            />
          )}
          {isPJ && (
            <SidebarItem 
              to="/sppd/history" 
              icon={History} 
              label="Riwayat Otoritas" 
              active={location.pathname === '/sppd/history'} 
              isOpen={isSidebarOpen}
            />
          )}
          <SidebarItem 
            to="/arsip-digital" 
            icon={Archive} 
            label="Arsip Digital" 
            active={location.pathname === '/arsip-digital'} 
            isOpen={isSidebarOpen}
          />

          {isAI && (
            <>
              <SidebarSection label="Manajemen Unit" isOpen={isSidebarOpen} />
              <SidebarItem to="/admin/users" icon={Users} label="SDM & Pegawai" active={location.pathname === '/admin/users'} isOpen={isSidebarOpen} />
              <SidebarItem to="/admin/master-data" icon={Layers} label="Data Master" active={location.pathname === '/admin/master-data'} isOpen={isSidebarOpen} />
              <SidebarItem to="/admin/sbm" icon={Wallet} label="Standar Biaya" active={location.pathname === '/admin/sbm'} isOpen={isSidebarOpen} />
              <SidebarItem to="/admin/templates" icon={ClipboardList} label="Template Dinas" active={location.pathname.startsWith('/admin/templates')} isOpen={isSidebarOpen} />
              <SidebarItem to="/admin/reports" icon={BarChart3} label="Rekapitulasi" active={location.pathname === '/admin/reports'} isOpen={isSidebarOpen} />
              
              <SidebarSection label="Konfigurasi" isOpen={isSidebarOpen} />
              <SidebarItem to="/admin/profile" icon={Building2} label="Profil Instansi" active={location.pathname === '/admin/profile'} isOpen={isSidebarOpen} />
              <SidebarItem to="/admin/config" icon={Settings} label="Alur Kerja" active={location.pathname === '/admin/config'} isOpen={isSidebarOpen} />
            </>
          )}

          {isSA && (
            <>
              <SidebarSection label="Ekosistem Platform" isOpen={isSidebarOpen} />
              <SidebarItem to="/super/tenants" icon={Globe} label="Manajemen Tenant" active={location.pathname === '/super/tenants'} isOpen={isSidebarOpen} />
              <SidebarItem to="/super/billing" icon={Package} label="Billing & Paket" active={location.pathname === '/super/billing'} isOpen={isSidebarOpen} />
              <SidebarItem to="/super/sbm" icon={ShieldCheck} label="Master SBM Global" active={location.pathname === '/super/sbm'} isOpen={isSidebarOpen} />
              <SidebarItem to="/super/templates" icon={ClipboardList} label="Template Global" active={location.pathname === '/super/templates'} isOpen={isSidebarOpen} />
              <SidebarItem to="/super/demo" icon={Zap} label="Demo Suites" active={location.pathname === '/super/demo'} isOpen={isSidebarOpen} />
              
              <SidebarSection label="Infrastruktur" isOpen={isSidebarOpen} />
              <SidebarItem to="/super/monitoring" icon={Activity} label="Health Monitor" active={location.pathname === '/super/monitoring'} isOpen={isSidebarOpen} />
              <SidebarItem to="/super/security" icon={Lock} label="Security Engine" active={location.pathname === '/super/security'} isOpen={isSidebarOpen} />
              <SidebarItem to="/super/backup" icon={Database} label="Backup & Recovery" active={location.pathname === '/super/backup'} isOpen={isSidebarOpen} />
              <SidebarItem to="/super/communication" icon={Megaphone} label="Notifikasi Global" active={location.pathname === '/super/communication'} isOpen={isSidebarOpen} />
              <SidebarItem to="/super/support" icon={LifeBuoy} label="Support Center" active={location.pathname === '/super/support'} isOpen={isSidebarOpen} />
              <SidebarItem to="/super/settings" icon={Settings} label="System Config" active={location.pathname === '/super/settings'} isOpen={isSidebarOpen} />
            </>
          )}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className={`mb-4 transition-all duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
             <Link to="/profile" className="flex items-center space-x-3 p-3 bg-gray-50 rounded-2xl border border-gray-100 hover:border-blue-900/20 transition-all group">
                <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center font-bold text-blue-900 border border-gray-100 group-hover:bg-blue-900 group-hover:text-white transition-colors">
                   {user?.name.charAt(0)}
                </div>
                <div className="flex flex-col">
                   <span className="text-xs font-black text-gray-900 truncate max-w-[120px]">{user?.name}</span>
                   <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Lihat Profil</span>
                </div>
             </Link>
          </div>
          <button 
            onClick={handleLogoutClick}
            className="flex items-center space-x-3 px-4 py-3 w-full text-red-500 hover:bg-red-50 rounded-xl transition-all font-black text-sm group"
          >
            <LogOut size={20} className="group-hover:scale-110 transition-transform" />
            {isSidebarOpen && <span>Keluar Sistem</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-20">
          <div className="flex items-center space-x-4">
             <button 
               onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
               className="p-3 text-gray-400 hover:bg-gray-100 rounded-2xl transition-all shadow-sm border border-transparent hover:border-gray-100"
             >
               <Menu size={22} />
             </button>
             <div className="hidden md:flex items-center space-x-2 text-xs font-bold text-gray-400">
                <span>E-SIMPerDin</span>
                <ChevronRight size={12} />
                <span className="text-blue-900 capitalize font-black">{location.pathname.split('/').pop()?.replace('-', ' ') || 'Dashboard'}</span>
             </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="hidden lg:flex items-center space-x-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100">
               <ShieldCheck size={14} />
               <span className="text-[10px] font-black uppercase tracking-widest">Secure Session</span>
            </div>

            <div className="flex items-center space-x-3 relative" ref={notificationRef}>
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`p-3 relative bg-gray-50 rounded-2xl transition-all border border-transparent hover:border-gray-100 ${showNotifications ? 'text-blue-900 bg-blue-50 ring-2 ring-blue-900/10' : 'text-gray-400 hover:text-blue-900'}`}
              >
                <Bell size={20} />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>

              {/* Notification Pop-up */}
              {showNotifications && (
                <div className="absolute top-full right-0 mt-4 w-[380px] bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <div>
                      <h4 className="text-lg font-black text-gray-900 leading-none">Notifikasi</h4>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1.5">Pembaruan Aktivitas Sistem</p>
                    </div>
                    <button className="text-[10px] font-black text-blue-900 uppercase hover:underline">Tandai Dibaca</button>
                  </div>

                  <div className="max-h-[400px] overflow-y-auto custom-scrollbar divide-y divide-gray-50">
                    {notifications.map((notif) => (
                      <div key={notif.id} className="p-5 hover:bg-gray-50 transition-colors cursor-pointer group">
                        <div className="flex items-start space-x-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${notif.color}`}>
                            <notif.icon size={18} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-1">
                              <h5 className="text-sm font-black text-gray-900 group-hover:text-blue-900 transition-colors truncate">{notif.title}</h5>
                              <span className="text-[9px] font-bold text-gray-400 whitespace-nowrap ml-2 uppercase">{notif.time}</span>
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed font-medium line-clamp-2">{notif.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
                    <button className="text-[10px] font-black text-blue-900 uppercase tracking-widest flex items-center justify-center w-full hover:underline">
                      Lihat Semua Notifikasi <ChevronRight size={14} className="ml-1" />
                    </button>
                  </div>
                </div>
              )}

              <div className="w-px h-8 bg-gray-100 mx-2"></div>
              <div className="flex items-center space-x-4 pl-2">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-black text-gray-900 leading-none">{user?.name}</p>
                  <p className="text-[9px] text-gray-400 uppercase font-black tracking-widest mt-1.5">{user?.role.replace('_', ' ')}</p>
                </div>
                <Link to="/profile" className="w-12 h-12 bg-gradient-to-br from-blue-900 to-indigo-950 rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-blue-900/20 hover:scale-105 transition-transform border-2 border-white">
                  {user?.name.charAt(0)}
                </Link>
              </div>
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
