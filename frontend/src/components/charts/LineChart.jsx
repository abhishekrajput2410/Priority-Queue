export default function LineChart() {
  return (
    <div className="rounded-[2rem] bg-white/5 p-6 shadow-panel">
      <div className="mb-4">
        <p className="text-sm uppercase tracking-[0.3em] text-brand-300">Throughput</p>
        <h3 className="text-lg font-semibold text-white">Requests per minute</h3>
      </div>
      <div className="h-64 rounded-3xl bg-brand-800" />
    </div>
  );
}
