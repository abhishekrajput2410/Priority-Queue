import { useQuery } from '@tanstack/react-query';
import { fetchAnalytics } from '../api/analytics';
import Card from '../components/ui/Card';

export default function Analytics() {
  const { data, isLoading } = useQuery({
    queryKey: ['analytics'],
    queryFn: fetchAnalytics,
  });

  if (isLoading) {
    return <div className="rounded-[2rem] bg-white/5 p-6 text-brand-300">Loading analytics…</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-4">
        <Card title={data.total} subtitle="Total Requests" />
        <Card title={data.completed} subtitle="Completed" />
        <Card title={data.failed} subtitle="Failed" />
        <Card title={data.slaViolations} subtitle="SLA Violations" />
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-[2rem] bg-white/5 p-6 shadow-panel">
          <h2 className="text-lg font-semibold text-white">Priority Distribution</h2>
          <pre className="mt-4 overflow-auto text-sm text-brand-200">{JSON.stringify(data.distribution, null, 2)}</pre>
        </div>
        <div className="rounded-[2rem] bg-white/5 p-6 shadow-panel">
          <h2 className="text-lg font-semibold text-white">Average Processing</h2>
          <p className="mt-4 text-3xl font-semibold text-white">
            {Math.round(data.averageProcessing)}
            {' '}
            ms
          </p>
        </div>
      </div>
    </div>
  );
}
