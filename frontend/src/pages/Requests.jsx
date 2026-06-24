import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthContext } from '../contexts/AuthContext';
import { fetchRequests, createRequest } from '../api/requests';
import RequestForm from '../components/ui/RequestForm';
import RequestTable from '../components/tables/RequestTable';

export default function Requests() {
  const { user } = useAuthContext();
  const userRole = user?.user?.role || '';
  const isAdmin = userRole === 'Admin';

  const [page] = useState(1);
  const [limit] = useState(20);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['requests', { page, limit }],
    queryFn: fetchRequests,
  });

  const mutation = useMutation({
    mutationFn: createRequest,
    onSuccess: () => queryClient.invalidateQueries(['requests', { page, limit }]),
  });

  const handleSubmit = async (payload) => {
    try {
      await mutation.mutateAsync(payload);
    } catch {
      // Error state is surfaced via mutation.isError below.
    }
  };

  const submitError = mutation.error?.response?.data?.message
    || mutation.error?.message
    || 'Failed to submit request. Please try again.';

  if (isAdmin) {
    return (
      <div className="space-y-6">
        <div className="rounded-[2rem] bg-white/5 p-6 shadow-panel">
          <h2 className="text-xl font-semibold text-white">All Requests</h2>
          <p className="mt-2 text-sm text-brand-300">Monitor incoming request queue status and SLA coverage.</p>
        </div>
        <RequestForm onSubmit={handleSubmit} />
        <div className="rounded-[2rem] bg-white/5 p-6 shadow-panel">
          {mutation.isError && <p className="text-sm text-red-400">{submitError}</p>}
          {mutation.isSuccess && <p className="text-sm text-green-300">Request queued successfully.</p>}
          {isLoading ? (
            <div className="py-12 text-center text-brand-300">Loading requests…</div>
          ) : (
            <RequestTable requests={data?.requests || []} />
          )}
        </div>
      </div>
    );
  }

  // User view - only for creating requests
  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] bg-white/5 p-6 shadow-panel">
        <h2 className="text-xl font-semibold text-white">Create a Request</h2>
        <p className="mt-2 text-sm text-brand-300">Submit a new request for processing.</p>
      </div>
      <RequestForm onSubmit={handleSubmit} />
      {mutation.isError && (
        <div className="rounded-[2rem] bg-red-500/10 p-6 border border-red-500/30 shadow-panel">
          <p className="text-sm text-red-400">{submitError}</p>
        </div>
      )}
      {mutation.isSuccess && (
        <div className="rounded-[2rem] bg-green-500/10 p-6 border border-green-500/30 shadow-panel">
          <p className="text-sm text-green-300">Request submitted successfully! You can view it in My Requests.</p>
        </div>
      )}
    </div>
  );
}
