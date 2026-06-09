export default function RequestTable({ requests }) {
  return (
    <div className="rounded-[2rem] bg-white/5 p-6 shadow-panel overflow-x-auto">
      <table className="min-w-full divide-y divide-white/10 text-left text-sm text-brand-200">
        <thead>
          <tr>
            <th className="px-4 py-3">Request</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Priority</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">SLA</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {requests.map((request) => (
            <tr key={request.requestId} className="hover:bg-white/5">
              <td className="px-4 py-3 font-medium text-white">{request.title}</td>
              <td className="px-4 py-3">{request.category}</td>
              <td className="px-4 py-3">{request.priority}</td>
              <td className="px-4 py-3">{request.status}</td>
              <td className="px-4 py-3">{new Date(request.slaDeadline).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
