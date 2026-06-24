import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchAiHealth, predictPriority } from '../api/ai';

export default function AiInsights() {
  const [form, setForm] = useState({
    type: 'ingest',
    payloadSize: 500,
    waitTime: 120,
    queueSize: 10,
    sla: new Date(Date.now() + 3600000).toISOString(),
  });

  const { data: health, isLoading, error } = useQuery({
    queryKey: ['ai-health'],
    queryFn: fetchAiHealth,
    retry: 1,
  });

  const predictMutation = useMutation({
    mutationFn: predictPriority,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePredict = (event) => {
    event.preventDefault();
    predictMutation.mutate({
      type: form.type,
      payloadSize: Number(form.payloadSize),
      waitTime: Number(form.waitTime),
      queueSize: Number(form.queueSize),
      sla: new Date(form.sla).toISOString(),
    });
  };

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] bg-white/5 p-6 shadow-panel">
        <h2 className="text-xl font-semibold text-white">AI Insights</h2>
        <p className="mt-2 text-sm text-brand-300">Priority predictions and AI-driven queue recommendations.</p>
      </div>

      <div className="rounded-[2rem] bg-white/5 p-6 shadow-panel">
        <h3 className="text-lg font-semibold text-white">Service Health</h3>
        {isLoading && <p className="mt-4 text-brand-300">Checking AI service…</p>}
        {error && <p className="mt-4 text-red-400">AI service is unavailable. Start the ai-service container or run python app.py locally.</p>}
        {health && (
          <p className="mt-4 text-green-400">
            {health.service || 'AI Priority Predictor'}
            {' '}
            —
            {' '}
            {health.status}
          </p>
        )}
      </div>

      <form onSubmit={handlePredict} className="rounded-[2rem] bg-white/5 p-6 shadow-panel space-y-4">
        <h3 className="text-lg font-semibold text-white">Predict Priority</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm text-brand-300">
            Type
            <select name="type" value={form.type} onChange={handleChange} className="w-full rounded-3xl border border-white/10 bg-brand-800 px-4 py-3 text-white outline-none">
              <option value="ingest">ingest</option>
              <option value="compute">compute</option>
              <option value="report">report</option>
              <option value="audit">audit</option>
              <option value="notification">notification</option>
            </select>
          </label>
          <label className="space-y-2 text-sm text-brand-300">
            Payload Size
            <input type="number" name="payloadSize" value={form.payloadSize} onChange={handleChange} className="w-full rounded-3xl border border-white/10 bg-brand-800 px-4 py-3 text-white outline-none" />
          </label>
          <label className="space-y-2 text-sm text-brand-300">
            Wait Time (seconds)
            <input type="number" name="waitTime" value={form.waitTime} onChange={handleChange} className="w-full rounded-3xl border border-white/10 bg-brand-800 px-4 py-3 text-white outline-none" />
          </label>
          <label className="space-y-2 text-sm text-brand-300">
            Queue Size
            <input type="number" name="queueSize" value={form.queueSize} onChange={handleChange} className="w-full rounded-3xl border border-white/10 bg-brand-800 px-4 py-3 text-white outline-none" />
          </label>
        </div>
        <label className="space-y-2 text-sm text-brand-300">
          SLA Deadline
          <input type="datetime-local" name="sla" value={form.sla.slice(0, 16)} onChange={handleChange} className="w-full rounded-3xl border border-white/10 bg-brand-800 px-4 py-3 text-white outline-none" />
        </label>
        <button type="submit" className="rounded-3xl bg-brand-300 px-6 py-3 text-sm font-semibold text-brand-950 transition hover:bg-white">
          Run Prediction
        </button>
        {predictMutation.data && (
          <p className="text-green-400">
            Predicted priority:
            {' '}
            <span className="font-semibold text-white">{predictMutation.data.predictedPriority}</span>
          </p>
        )}
        {predictMutation.isError && (
          <p className="text-red-400">Prediction failed. Ensure the AI service is running.</p>
        )}
      </form>
    </div>
  );
}
