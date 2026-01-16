
import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { User, Subscription } from './types';
import { MOCK_USERS, MOCK_SUBSCRIPTIONS } from './constants';

// Dasar & Auth
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import Layout from './components/Layout';

// Detail Pages (Public)
import FeaturesPage from './pages/details/FeaturesPage';
import RolesPage from './pages/details/RolesPage';
import SecurityPage from './pages/details/SecurityPage';
import PricingPage from './pages/details/PricingPage';

// Dashboard Router
import DashboardPage from './pages/dashboard/DashboardPage';

// Modul SPPD (Umum & Pegawai)
import SPPDListPage from './pages/sppd/SPPDListPage';
import SPPDFormPage from './pages/sppd/SPPDFormPage';
import MonitoringPage from './pages/sppd/MonitoringPage';
import ApprovalHistoryPage from './pages/sppd/ApprovalHistoryPage';
import DigitalArchivePage from './pages/sppd/DigitalArchivePage';

// Modul Admin Instansi
import UserManagementPageInstansi from './pages/admin-instansi/UserManagementPage';
import MasterDataPageInstansi from './pages/admin-instansi/MasterDataPage';
import CostStandardsPageInstansi from './pages/admin-instansi/CostStandardsPage';
import InstitutionProfilePageInstansi from './pages/admin-instansi/InstitutionProfilePage';
import InstitutionConfigPageInstansi from './pages/admin-instansi/InstitutionConfigPage';
import ReportsPageInstansi from './pages/admin-instansi/ReportsPage';
import TemplateManagementPageInstansi from './pages/admin-instansi/TemplateManagementPage';
import TemplateEditorPageInstansi from './pages/admin-instansi/TemplateEditorPage';

// Modul Super Admin
import InstitutionManagementPageSuper from './pages/super-admin/InstitutionManagementPage';
import SubscriptionBillingPageSuper from './pages/super-admin/SubscriptionBillingPage';
import GlobalCostStandardsPageSuper from './pages/super-admin/GlobalCostStandardsPage';
import GlobalTemplatePageSuper from './pages/super-admin/GlobalTemplatePage';
import SystemMonitoringPageSuper from './pages/super-admin/SystemMonitoringPage';
import SecurityControlPageSuper from './pages/super-admin/SecurityControlPage';
import BackupMaintenancePageSuper from './pages/super-admin/BackupMaintenancePage';
import CommunicationPageSuper from './pages/super-admin/CommunicationPage';
import SystemSettingsPageSuper from './pages/super-admin/SystemSettingsPage';
import DemoManagementPageSuper from './pages/super-admin/DemoManagementPage';
import SupportCenterPageSuper from './pages/super-admin/SupportCenterPage';

// User Profile
import ProfilePage from './pages/user/ProfilePage';

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
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      const sub = MOCK_SUBSCRIPTIONS.find(s => s.institutionId === parsedUser.institutionId);
      setSubscription(sub || null);
    }
    setLoading(false);
  }, []);

  const login = (username: string): boolean => {
    const foundUser = MOCK_USERS.find(u => u.username === username);
    if (foundUser) {
      setUser(foundUser);
      const sub = MOCK_SUBSCRIPTIONS.find(s => s.institutionId === foundUser.institutionId);
      setSubscription(sub || null);
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

  if (loading) return null;

  return (
    <AuthContext.Provider value={{ user, subscription, login, logout }}>
      <HashRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/roles" element={<RolesPage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/dashboard" />} />
          
          {/* Protected Routes */}
          <Route element={user ? <Layout /> : <Navigate to="/login" />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            
            <Route path="/sppd" element={<SPPDListPage />} />
            <Route path="/sppd/baru" element={<SPPDFormPage />} />
            <Route path="/sppd/edit/:id" element={<SPPDFormPage />} />
            <Route path="/sppd/monitoring" element={<MonitoringPage />} />
            <Route path="/sppd/history" element={<ApprovalHistoryPage />} />
            <Route path="/arsip-digital" element={<DigitalArchivePage />} />

            <Route path="/admin/users" element={<UserManagementPageInstansi />} />
            <Route path="/admin/master-data" element={<MasterDataPageInstansi />} />
            <Route path="/admin/sbm" element={<CostStandardsPageInstansi />} />
            <Route path="/admin/profile" element={<InstitutionProfilePageInstansi />} />
            <Route path="/admin/config" element={<InstitutionConfigPageInstansi />} />
            <Route path="/admin/reports" element={<ReportsPageInstansi />} />
            <Route path="/admin/templates" element={<TemplateManagementPageInstansi />} />
            <Route path="/admin/templates/baru" element={<TemplateEditorPageInstansi />} />
            <Route path="/admin/templates/edit/:id" element={<TemplateEditorPageInstansi />} />

            <Route path="/super/tenants" element={<InstitutionManagementPageSuper />} />
            <Route path="/super/billing" element={<SubscriptionBillingPageSuper />} />
            <Route path="/super/sbm" element={<GlobalCostStandardsPageSuper />} />
            <Route path="/super/templates" element={<GlobalTemplatePageSuper />} />
            <Route path="/super/monitoring" element={<SystemMonitoringPageSuper />} />
            <Route path="/super/security" element={<SecurityControlPageSuper />} />
            <Route path="/super/backup" element={<BackupMaintenancePageSuper />} />
            <Route path="/super/communication" element={<CommunicationPageSuper />} />
            <Route path="/super/settings" element={<SystemSettingsPageSuper />} />
            <Route path="/super/demo" element={<DemoManagementPageSuper />} />
            <Route path="/super/support" element={<SupportCenterPageSuper />} />

            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </HashRouter>
    </AuthContext.Provider>
  );
};

export default App;
