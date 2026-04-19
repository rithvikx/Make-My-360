/**
 * AdminApp.jsx — Root of the admin panel (lives at /admin/*)
 * Completely separate from the marketing site shell.
 */
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import AdminLayout from './AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import AdminServices from './pages/AdminServices';
import AdminPortfolio from './pages/AdminPortfolio';
import AdminAbout from './pages/AdminAbout';
import AdminFAQ from './pages/AdminFAQ';

const ADMIN_KEY = 'mm360_admin_auth';
const ADMIN_PASSWORD = 'admin@360'; // Change before production

function RequireAuth({ children }) {
  const isAuth = sessionStorage.getItem(ADMIN_KEY) === 'true';
  return isAuth ? children : <Navigate to="/admin/login" replace />;
}

export default function AdminApp() {
  const login = (pass) => {
    if (pass === ADMIN_PASSWORD) {
      sessionStorage.setItem(ADMIN_KEY, 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem(ADMIN_KEY);
  };

  return (
    <div className="admin-shell" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Routes>
        <Route path="login" element={<AdminLogin onLogin={login} />} />
        <Route
          path="*"
          element={
            <RequireAuth>
              <AdminLayout onLogout={logout}>
                <Routes>
                  <Route index element={<AdminDashboard />} />
                  <Route path="services" element={<AdminServices />} />
                  <Route path="portfolio" element={<AdminPortfolio />} />
                  <Route path="about" element={<AdminAbout />} />
                  <Route path="faq" element={<AdminFAQ />} />
                </Routes>
              </AdminLayout>
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
}
