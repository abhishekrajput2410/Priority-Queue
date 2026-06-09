import { useQuery } from '@tanstack/react-query';
import api from '../api/api';

const fetchWorkers = async () => {
  const { data } = await api.get('/workers');
  return data;
};

export default function Workers() {
  const { data, isLoading } = useQuery({
    queryKey: ['workers'],
    queryFn: fetchWorkers,
  });

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] bg-white/5 p-6 shadow-panel">
        <h2 className="text-xl font-semibold text-white">Worker cluster</h2>
        <p className="mt-2 text-sm text-brand-300">Track active workers and processing throughput.</p>
      </div>
      <div className="rounded-[2rem] bg-white/5 p-6 shadow-panel overflow-x-auto">
        {isLoading ? (
          <div className="py-12 text-center text-brand-300">Loading workers…</div>
        ) : (
          <table className="min-w-full divide-y divide-white/10 text-left text-sm text-brand-200">
            <thead>
              <tr>
                <th className="px-4 py-3">Worker ID</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Jobs Processed</th>
                <th className="px-4 py-3">Last Seen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {data?.map((worker) => (
                <tr key={worker.workerId} className="hover:bg-white/5">
                  <td className="px-4 py-3">{worker.workerId}</td>
                  <td className="px-4 py-3">{worker.status}</td>
                  <td className="px-4 py-3">{worker.jobsProcessed}</td>
                  <td className="px-4 py-3">{new Date(worker.lastSeen).toLocaleTimeString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
