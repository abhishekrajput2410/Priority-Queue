export default function Settings() {
  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] bg-white/5 p-6 shadow-panel">
        <h2 className="text-xl font-semibold text-white">Settings</h2>
        <p className="mt-2 text-sm text-brand-300">Manage user access, API keys, and queue configuration.</p>
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-[2rem] bg-white/5 p-6 shadow-panel">
          <h3 className="text-lg font-semibold text-white">User preferences</h3>
          <p className="mt-3 text-brand-300">Configure dashboard themes, notifications, and alerts.</p>
        </div>
        <div className="rounded-[2rem] bg-white/5 p-6 shadow-panel">
          <h3 className="text-lg font-semibold text-white">System settings</h3>
          <p className="mt-3 text-brand-300">Node pool, queue retention, and health checks.</p>
        </div>
      </div>
    </div>
  );
}
