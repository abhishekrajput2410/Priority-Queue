import { useMemo } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';

export default function Topbar() {
  const { user, logout } = useAuthContext();
  const greeting = useMemo(() => `Hi, ${user?.user?.name || 'Operator'}`, [user]);

  return (
    <header className="flex items-center justify-between border-b border-white/10 bg-brand-900 px-6 py-4 shadow-panel">
      <div>
        <div className="text-xs uppercase tracking-[0.3em] text-brand-300">Enterprise Queue Monitoring</div>
        <h1 className="text-2xl font-semibold text-white">{greeting}</h1>
      </div>
      <button type="button" onClick={logout} className="rounded-2xl bg-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/20">
        Sign out
      </button>
    </header>
  );
}
