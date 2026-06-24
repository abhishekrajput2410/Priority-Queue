import { useQuery } from '@tanstack/react-query';
import { fetchAnalytics } from '../api/analytics';

export default function SlaMonitor() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['analytics'],
    queryFn: fetchAnalytics,
  });

  if (isLoading) {
    return <div className="rounded-[2rem] bg-white/5 p-6 text-brand-300">Loading SLA data…</div>;
  }

  if (error) {
    return <div className="rounded-[2rem] bg-white/5 p-6 text-red-400">Unable to load SLA monitor data.</div>;
  }

  const breaches = data?.slaViolations ?? 0;
  const queued = (data?.total ?? 0) - (data?.completed ?? 0) - (data?.failed ?? 0);

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] bg-white/5 p-6 shadow-panel">
        <h2 className="text-xl font-semibold text-white">SLA Monitor</h2>
        <p className="mt-2 text-sm text-brand-300">Real-time SLA breach tracking and escalation details.</p>
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-[2rem] bg-white/5 p-6 shadow-panel">
          <p className="text-sm uppercase tracking-[0.3em] text-brand-300">Current SLA Breaches</p>
          <div className="mt-8 text-5xl font-semibold text-white">{breaches}</div>
          <p className="mt-4 text-sm text-brand-300">Queued requests past their SLA deadline.</p>
        </div>
        <div className="rounded-[2rem] bg-white/5 p-6 shadow-panel">
          <p className="text-sm uppercase tracking-[0.3em] text-brand-300">Active Queue</p>
          <div className="mt-8 text-5xl font-semibold text-white">{Math.max(queued, 0)}</div>
          <p className="mt-4 text-sm text-brand-300">Requests still waiting to be processed.</p>
        </div>
      </div>
    </div>
  );
}
