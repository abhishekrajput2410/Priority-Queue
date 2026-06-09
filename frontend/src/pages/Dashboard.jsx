import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuthContext } from '../contexts/AuthContext';
import { fetchAnalytics } from '../api/analytics';
import PriorityBarChart from '../components/charts/PriorityBarChart';
import ThroughputAreaChart from '../components/charts/ThroughputAreaChart';

export default function Dashboard() {
  const { user } = useAuthContext();
  const userRole = user?.user?.role || '';
  const isAdmin = userRole === 'Admin';

  const { data, isLoading, error } = useQuery({
    queryKey: ['analytics'],
    queryFn: fetchAnalytics,
  });

  const stats = useMemo(() => [
    { label: 'Total Requests', value: data?.total ?? 0 },
    { label: 'Completed', value: data?.completed ?? 0 },
    { label: 'Failed', value: data?.failed ?? 0 },
    { label: 'SLA Violations', value: data?.slaViolations ?? 0 },
  ], [data]);

  const distribution = useMemo(
    () => data?.distribution?.map((item) => ({ name: item._id, value: item.count })) || [],
    [data],
  );

  if (isLoading) {
    return (
      <div className="rounded-[2rem] bg-white/5 p-10 text-center text-brand-300 shadow-panel">
        Loading dashboard data…
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-[2rem] bg-white/5 p-10 text-center text-red-400 shadow-panel">
        Unable to load dashboard data. Please refresh the page.
      </div>
    );
  }

  if (!isAdmin && data?.total === 0) {
    return (
      <div className="rounded-[2rem] bg-white/5 p-10 text-center text-brand-200 shadow-panel">
        <p className="text-xl font-semibold text-white">Welcome to Priority Queue!</p>
        <p className="mt-3 text-sm text-brand-300">Create your first request to get started.</p>
      </div>
    );
  }

  if (isAdmin && data?.total === 0) {
    return (
      <div className="rounded-[2rem] bg-white/5 p-10 text-center text-brand-200 shadow-panel">
        <p className="text-xl font-semibold text-white">No request data yet</p>
        <p className="mt-3 text-sm text-brand-300">Create a request from the Requests page to populate dashboard analytics.</p>
      </div>
    );
  }

  // User dashboard (limited view)
  if (!isAdmin) {
    return (
      <div className="space-y-6">
        <div className="grid gap-6 xl:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="rounded-[2rem] bg-white/5 p-6 shadow-panel">
              <p className="text-sm uppercase tracking-[0.3em] text-brand-300">{item.label}</p>
              <p className="mt-4 text-3xl font-semibold text-white">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Admin dashboard (full view)
  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-4">
        {stats.map((item) => (
          <div key={item.label} className="rounded-[2rem] bg-white/5 p-6 shadow-panel">
            <p className="text-sm uppercase tracking-[0.3em] text-brand-300">{item.label}</p>
            <p className="mt-4 text-3xl font-semibold text-white">{item.value}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <PriorityBarChart data={distribution} />
        <ThroughputAreaChart />
      </div>
    </div>
  );
}
