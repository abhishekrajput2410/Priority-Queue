import { useMemo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './contexts/AuthContext';
import Sidebar from './components/layout/Sidebar';
import Topbar from './components/layout/Topbar';
import Dashboard from './pages/Dashboard';
import Requests from './pages/Requests';
import MyRequests from './pages/MyRequests';
import Profile from './pages/Profile';
import Workers from './pages/Workers';
import Analytics from './pages/Analytics';
import SlaMonitor from './pages/SlaMonitor';
import DeadLetter from './pages/DeadLetter';
import AiInsights from './pages/AiInsights';
import Settings from './pages/Settings';
import UserManagement from './pages/UserManagement';
import Notifications from './pages/Notifications';
import Login from './pages/Login';
import Register from './pages/Register';
import VerifyEmail from './pages/VerifyEmail';

function App() {
  const { user } = useAuthContext();

  const isAuthenticated = useMemo(() => Boolean(user?.accessToken), [user]);

  if (user === undefined) {
    return <div className="flex min-h-screen items-center justify-center">Loading…</div>;
  }

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<VerifyEmail />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  const userRole = user?.user?.role || '';
  const isAdmin = userRole === 'Admin';
  const isUser = userRole === 'User';

  const defaultRoute = isAdmin ? '/dashboard' : '/dashboard';

  return (
    <div className="min-h-screen bg-brand-900 text-white">
      <div className="grid min-h-screen grid-cols-[280px_1fr]">
        <Sidebar />
        <div className="flex flex-col">
          <Topbar />
          <main className="flex-1 p-6">
            <Routes>
              {/* Shared routes */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/notifications" element={<Notifications />} />

              {/* Admin only routes */}
              {isAdmin && <Route path="/requests" element={<Requests />} />}
              {isAdmin && <Route path="/workers" element={<Workers />} />}
              {isAdmin && <Route path="/analytics" element={<Analytics />} />}
              {isAdmin && <Route path="/sla" element={<SlaMonitor />} />}
              {isAdmin && <Route path="/dead-letter" element={<DeadLetter />} />}
              {isAdmin && <Route path="/ai-insights" element={<AiInsights />} />}
              {isAdmin && <Route path="/settings" element={<Settings />} />}
              {isAdmin && <Route path="/user-management" element={<UserManagement />} />}

              {/* User only routes */}
              {isUser && <Route path="/my-requests" element={<MyRequests />} />}

              <Route path="*" element={<Navigate to={defaultRoute} />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
