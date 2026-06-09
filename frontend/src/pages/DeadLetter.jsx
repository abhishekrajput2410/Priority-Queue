export default function DeadLetter() {
  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] bg-white/5 p-6 shadow-panel">
        <h2 className="text-xl font-semibold text-white">Dead Letter Queue</h2>
        <p className="mt-2 text-sm text-brand-300">Review failed jobs and retry or delete items from the DLQ.</p>
      </div>
      <div className="rounded-[2rem] bg-white/5 p-6 shadow-panel">
        <p className="text-brand-300">No failed jobs currently loaded.</p>
      </div>
    </div>
  );
}
