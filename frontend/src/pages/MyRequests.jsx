import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchRequests } from '../api/requests';
import RequestTable from '../components/tables/RequestTable';

export default function MyRequests() {
  const [page] = useState(1);
  const [limit] = useState(20);
  const { data, isLoading, error } = useQuery({
    queryKey: ['requests', { page, limit }],
    queryFn: fetchRequests,
  });

  if (isLoading) {
    return (
      <div className="rounded-[2rem] bg-white/5 p-10 text-center text-brand-300 shadow-panel">
        Loading your requests…
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-[2rem] bg-white/5 p-10 text-center text-red-400 shadow-panel">
        Unable to load requests. Please refresh the page.
      </div>
    );
  }

  if (!data?.requests?.length) {
    return (
      <div className="rounded-[2rem] bg-white/5 p-10 text-center text-brand-200 shadow-panel">
        <p className="text-xl font-semibold text-white">No requests yet</p>
        <p className="mt-3 text-sm text-brand-300">Create your first request from the Requests page.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] bg-white/5 p-6 shadow-panel">
        <h2 className="text-xl font-semibold text-white">My Requests</h2>
        <p className="mt-2 text-sm text-brand-300">View and manage your submitted requests.</p>
      </div>
      <div className="rounded-[2rem] bg-white/5 p-6 shadow-panel">
        <RequestTable requests={data?.requests || []} />
      </div>
    </div>
  );
}
