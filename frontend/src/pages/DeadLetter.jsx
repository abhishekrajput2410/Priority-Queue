import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteFailedJob, fetchFailedJobs, retryFailedJob } from '../api/deadLetter';

export default function DeadLetter() {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ['dead-letter'],
    queryFn: fetchFailedJobs,
  });

  const retryMutation = useMutation({
    mutationFn: retryFailedJob,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['dead-letter'] }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteFailedJob,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['dead-letter'] }),
  });

  if (isLoading) {
    return <div className="rounded-[2rem] bg-white/5 p-6 text-brand-300">Loading failed jobs…</div>;
  }

  if (error) {
    return <div className="rounded-[2rem] bg-white/5 p-6 text-red-400">Unable to load dead letter queue.</div>;
  }

  const jobs = data || [];

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] bg-white/5 p-6 shadow-panel">
        <h2 className="text-xl font-semibold text-white">Dead Letter Queue</h2>
        <p className="mt-2 text-sm text-brand-300">Review failed jobs and retry or delete items from the DLQ.</p>
      </div>
      <div className="rounded-[2rem] bg-white/5 p-6 shadow-panel overflow-x-auto">
        {!jobs.length ? (
          <p className="text-brand-300">No failed jobs in the queue.</p>
        ) : (
          <table className="min-w-full divide-y divide-white/10 text-left text-sm text-brand-200">
            <thead>
              <tr>
                <th className="px-4 py-3">Job ID</th>
                <th className="px-4 py-3">Request ID</th>
                <th className="px-4 py-3">Error</th>
                <th className="px-4 py-3">Attempts</th>
                <th className="px-4 py-3">Failed At</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {jobs.map((job) => (
                <tr key={job.jobId} className="hover:bg-white/5">
                  <td className="px-4 py-3">{job.jobId}</td>
                  <td className="px-4 py-3">{job.requestId}</td>
                  <td className="px-4 py-3 max-w-xs truncate">{job.error}</td>
                  <td className="px-4 py-3">{job.attemptsMade}</td>
                  <td className="px-4 py-3">{new Date(job.failedAt).toLocaleString()}</td>
                  <td className="px-4 py-3 space-x-2">
                    <button
                      type="button"
                      onClick={() => retryMutation.mutate(job.jobId)}
                      className="text-green-400 hover:text-green-300"
                    >
                      Retry
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteMutation.mutate(job.jobId)}
                      className="text-red-400 hover:text-red-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
