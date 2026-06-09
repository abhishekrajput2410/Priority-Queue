import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';

export default function Sidebar() {
  const { user } = useAuthContext();
  const userRole = user?.user?.role || '';
  const isAdmin = userRole === 'Admin';

  const adminNavItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'All Requests', path: '/requests' },
    { label: 'Workers', path: '/workers' },
    { label: 'Analytics', path: '/analytics' },
    { label: 'SLA Monitor', path: '/sla' },
    { label: 'Dead Letter', path: '/dead-letter' },
    { label: 'AI Insights', path: '/ai-insights' },
    { label: 'User Management', path: '/user-management' },
    { label: 'Settings', path: '/settings' },
  ];

  const userNavItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'My Requests', path: '/my-requests' },
    { label: 'Create Request', path: '/requests' },
    { label: 'Notifications', path: '/notifications' },
    { label: 'Profile', path: '/profile' },
  ];

  const navItems = isAdmin ? adminNavItems : userNavItems;

  return (
    <aside className="flex min-h-screen flex-col bg-brand-900 p-6 shadow-panel">
      <div className="mb-10">
        <div className="mb-3 text-2xl font-semibold">Priority Queue</div>
        <p className="text-sm text-brand-300">Real-time request prioritization</p>
        <p className="mt-2 text-xs text-brand-400">{isAdmin ? 'Admin' : 'User'}</p>
      </div>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `block rounded-2xl px-4 py-3 text-sm font-medium transition ${isActive ? 'bg-white/10 text-white' : 'text-brand-300 hover:bg-white/5 hover:text-white'}`}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
