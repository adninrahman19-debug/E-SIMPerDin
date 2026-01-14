
import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';
import SPPDList from './pages/SPPD/SPPDList';
import SPPDForm from './pages/SPPD/SPPDForm';
import UserManagement from './pages/Management/UserManagement';
import InstitutionManagement from './pages/Management/InstitutionManagement';
import CostStandards from './pages/Management/CostStandards';
import { User, UserRole } from './types';
import { MOCK_USERS } from './constants';

interface AuthContextType {
  user: User | null;
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('simperdin_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (username: string) => {
    const foundUser = MOCK_USERS.find(u => u.username === username);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('simperdin_user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('simperdin_user');
  };

  if (loading) return <div className="flex h-screen items-center justify-center">Memuat...</div>;

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <HashRouter>
        <Routes>
          <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
          
          <Route element={user ? <Layout /> : <Navigate to="/login" />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/sppd" element={<SPPDList />} />
            <Route path="/sppd/baru" element={<SPPDForm />} />
            <Route path="/sppd/edit/:id" element={<SPPDForm />} />
            
            {/* Role Based Access Routes */}
            {user?.role === UserRole.SUPER_ADMIN && (
              <Route path="/institusi" element={<InstitutionManagement />} />
            )}
            {(user?.role === UserRole.ADMIN_INSTANSI || user?.role === UserRole.SUPER_ADMIN) && (
              <>
                <Route path="/users" element={<UserManagement />} />
                <Route path="/standar-biaya" element={<CostStandards />} />
              </>
            )}
          </Route>
        </Routes>
      </HashRouter>
    </AuthContext.Provider>
  );
};

export default App;
