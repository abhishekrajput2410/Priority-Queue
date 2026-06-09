export default function SlaMonitor() {
  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] bg-white/5 p-6 shadow-panel">
        <h2 className="text-xl font-semibold text-white">SLA Monitor</h2>
        <p className="mt-2 text-sm text-brand-300">Real-time SLA breach tracking and escalation details.</p>
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-[2rem] bg-white/5 p-6 shadow-panel">
          <p className="text-sm uppercase tracking-[0.3em] text-brand-300">Current SLA Breaches</p>
          <div className="mt-8 text-5xl font-semibold text-white">23</div>
        </div>
        <div className="rounded-[2rem] bg-white/5 p-6 shadow-panel">
          <p className="text-sm uppercase tracking-[0.3em] text-brand-300">Escalation Events</p>
          <div className="mt-8 text-5xl font-semibold text-white">12</div>
        </div>
      </div>
    </div>
  );
}
