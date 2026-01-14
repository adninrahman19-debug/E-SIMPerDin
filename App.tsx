
import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import Layout from './components/Layout';
import SPPDListPage from './pages/sppd/SPPDListPage';
import SPPDFormPage from './pages/sppd/SPPDFormPage';
import UserManagementPage from './pages/admin/UserManagementPage';
import InstitutionManagementPage from './pages/admin/InstitutionManagementPage';
import CostStandardsPage from './pages/admin/CostStandardsPage';
import PlanManagementPage from './pages/subscription/PlanManagementPage';
import PaymentVerificationPage from './pages/subscription/PaymentVerificationPage';
import MySubscriptionPage from './pages/subscription/MySubscriptionPage';
import TemplateManagementPage from './pages/admin/TemplateManagementPage';
import TemplateEditorPage from './pages/admin/TemplateEditorPage';
import { User, UserRole, Subscription } from './types';
import { MOCK_USERS, MOCK_SUBSCRIPTIONS } from './constants';

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

  if (loading) return <div className="flex h-screen items-center justify-center">Memuat...</div>;

  return (
    <AuthContext.Provider value={{ user, subscription, login, logout }}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/dashboard" />} />
          
          <Route element={user ? <Layout /> : <Navigate to="/login" />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/sppd" element={<SPPDListPage />} />
            <Route path="/sppd/baru" element={<SPPDFormPage />} />
            <Route path="/sppd/edit/:id" element={<SPPDFormPage />} />
            
            {/* Super Admin Access */}
            {user?.role === UserRole.SUPER_ADMIN && (
              <>
                <Route path="/institusi" element={<InstitutionManagementPage />} />
                <Route path="/master-paket" element={<PlanManagementPage />} />
                <Route path="/verifikasi-pembayaran" element={<PaymentVerificationPage />} />
              </>
            )}

            {/* Admin Instansi Access */}
            {user?.role === UserRole.ADMIN_INSTANSI && (
              <>
                <Route path="/standar-biaya" element={<CostStandardsPage />} />
                <Route path="/langganan" element={<MySubscriptionPage />} />
                <Route path="/templates" element={<TemplateManagementPage />} />
                <Route path="/templates/baru" element={<TemplateEditorPage />} />
                <Route path="/templates/edit/:id" element={<TemplateEditorPage />} />
              </>
            )}

            {/* Admin Instansi / Shared Access */}
            {(user?.role === UserRole.ADMIN_INSTANSI || user?.role === UserRole.SUPER_ADMIN) && (
              <Route path="/users" element={<UserManagementPage />} />
            )}
          </Route>
        </Routes>
      </HashRouter>
    </AuthContext.Provider>
  );
};

export default App;
