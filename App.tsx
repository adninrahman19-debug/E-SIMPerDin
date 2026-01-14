
import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import { User, UserRole, Subscription } from './types';
import { MOCK_USERS, MOCK_SUBSCRIPTIONS } from './constants';

// Auth & Public
import LoginPage from './pages/auth/LoginPage';
import LandingPage from './pages/LandingPage';

// Shared & Core Transactions (SPPD)
import DashboardPage from './pages/dashboard/DashboardPage';
import SPPDListPage from './pages/sppd/SPPDListPage';
import SPPDFormPage from './pages/sppd/SPPDFormPage';
import DigitalArchivePage from './pages/sppd/DigitalArchivePage';
import MonitoringPage from './pages/sppd/MonitoringPage';
import ApprovalHistoryPage from './pages/sppd/ApprovalHistoryPage';

// Shared User
import ProfilePage from './pages/user/ProfilePage';

// SUPER ADMIN PAGES (Global Platform Management)
import InstitutionManagementPage from './pages/super-admin/InstitutionManagementPage';
import SubscriptionBillingPage from './pages/super-admin/SubscriptionBillingPage';
import GlobalTemplatePage from './pages/super-admin/GlobalTemplatePage';
import GlobalCostStandardsPage from './pages/super-admin/GlobalCostStandardsPage';
import SystemMonitoringPage from './pages/super-admin/SystemMonitoringPage';
import SecurityControlPage from './pages/super-admin/SecurityControlPage';
import BackupMaintenancePage from './pages/super-admin/BackupMaintenancePage';
import CommunicationPage from './pages/super-admin/CommunicationPage';
import SystemSettingsPage from './pages/super-admin/SystemSettingsPage';
import DemoManagementPage from './pages/super-admin/DemoManagementPage';
import SupportCenterPage from './pages/super-admin/SupportCenterPage';

// ADMIN INSTANSI PAGES (Local Institution Management)
import InstitutionProfilePage from './pages/admin-instansi/InstitutionProfilePage';
import InstitutionConfigPage from './pages/admin-instansi/InstitutionConfigPage';
import MasterDataPage from './pages/admin-instansi/MasterDataPage';
import ReportsPage from './pages/admin-instansi/ReportsPage';
import CostStandardsPage from './pages/admin-instansi/CostStandardsPage';
import MySubscriptionPage from './pages/admin-instansi/MySubscriptionPage';
import TemplateManagementPage from './pages/admin-instansi/TemplateManagementPage';
import TemplateEditorPage from './pages/admin-instansi/TemplateEditorPage';
import UserManagementPage from './pages/admin-instansi/UserManagementPage';

// Landing Detail Pages
import FeaturesPage from './pages/details/FeaturesPage';
import RolesPage from './pages/details/RolesPage';
import PricingPage from './pages/details/PricingPage';
import SecurityPage from './pages/details/SecurityPage';

interface AuthContextType {
  user: User | null;
  subscription: Subscription | null;
  login: (username: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('simperdin_user');
    if (savedUser) {
      const parsedUser: User = JSON.parse(savedUser);
      setUser(parsedUser);
      if (parsedUser.institutionId) {
        const sub = MOCK_SUBSCRIPTIONS.find(s => s.institutionId === parsedUser.institutionId);
        setSubscription(sub || null);
      }
    }
    setLoading(false);
  }, []);

  const login = (username: string) => {
    const foundUser = MOCK_USERS.find(u => u.username === username);
    if (foundUser) {
      setUser(foundUser);
      if (foundUser.institutionId) {
        const sub = MOCK_SUBSCRIPTIONS.find(s => s.institutionId === foundUser.institutionId);
        setSubscription(sub || null);
      }
      localStorage.setItem('simperdin_user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setSubscription(null);
    localStorage.removeItem('simperdin_user');
  };

  if (loading) return <div className="flex h-screen items-center justify-center">Memuat Platform...</div>;

  return (
    <AuthContext.Provider value={{ user, subscription, login, logout }}>
      <HashRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/fitur" element={<FeaturesPage />} />
          <Route path="/peran" element={<RolesPage />} />
          <Route path="/harga" element={<PricingPage />} />
          <Route path="/keamanan" element={<SecurityPage />} />
          <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/dashboard" />} />
          
          {/* Authenticated Layout */}
          <Route element={user ? <Layout /> : <Navigate to="/login" />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            
            {/* CORE TRANSACTIONS (SPPD) - Accessible based on role inside components */}
            <Route path="/sppd" element={<SPPDListPage />} />
            <Route path="/sppd/baru" element={<SPPDFormPage />} />
            <Route path="/sppd/edit/:id" element={<SPPDFormPage />} />
            <Route path="/monitoring" element={<MonitoringPage />} />
            <Route path="/riwayat-persetujuan" element={<ApprovalHistoryPage />} />
            <Route path="/arsip-digital" element={<DigitalArchivePage />} />

            {/* SUPER ADMIN MODULES (Global Management) */}
            {user?.role === UserRole.SUPER_ADMIN && (
              <>
                <Route path="/super-admin/institusi" element={<InstitutionManagementPage />} />
                <Route path="/super-admin/billing" element={<SubscriptionBillingPage />} />
                <Route path="/super-admin/templates" element={<GlobalTemplatePage />} />
                <Route path="/super-admin/sbm" element={<GlobalCostStandardsPage />} />
                <Route path="/super-admin/monitoring" element={<SystemMonitoringPage />} />
                <Route path="/super-admin/security" element={<SecurityControlPage />} />
                <Route path="/super-admin/backup" element={<BackupMaintenancePage />} />
                <Route path="/super-admin/communications" element={<CommunicationPage />} />
                <Route path="/super-admin/settings" element={<SystemSettingsPage />} />
                <Route path="/super-admin/demo" element={<DemoManagementPage />} />
                <Route path="/super-admin/support" element={<SupportCenterPage />} />
              </>
            )}

            {/* ADMIN INSTANSI MODULES (Local Management) */}
            {user?.role === UserRole.ADMIN_INSTANSI && (
              <>
                <Route path="/admin/profile" element={<InstitutionProfilePage />} />
                <Route path="/admin/config" element={<InstitutionConfigPage />} />
                <Route path="/admin/master-data" element={<MasterDataPage />} />
                <Route path="/admin/reports" element={<ReportsPage />} />
                <Route path="/admin/sbm" element={<CostStandardsPage />} />
                <Route path="/admin/subscription" element={<MySubscriptionPage />} />
                <Route path="/admin/templates" element={<TemplateManagementPage />} />
                <Route path="/admin/templates/baru" element={<TemplateEditorPage />} />
                <Route path="/admin/templates/edit/:id" element={<TemplateEditorPage />} />
                <Route path="/admin/users" element={<UserManagementPage />} />
              </>
            )}
          </Route>
        </Routes>
      </HashRouter>
    </AuthContext.Provider>
  );
};

export default App;
