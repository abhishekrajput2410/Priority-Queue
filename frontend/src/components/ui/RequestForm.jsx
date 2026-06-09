import { useState } from 'react';

const priorities = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW', 'UNKNOWN'];
const categories = ['billing', 'support', 'security', 'performance', 'compliance'];
const types = ['ingest', 'compute', 'report', 'audit', 'notification'];

export default function RequestForm({ onSubmit }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'billing',
    type: 'ingest',
    payload: '',
    priority: 'UNKNOWN',
    slaDeadline: new Date(Date.now() + 30 * 60000).toISOString().slice(0, 16),
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      ...form,
      payload: { size: Math.floor(Math.random() * 2500) + 100, details: form.payload || 'Automated workload payload' },
      slaDeadline: new Date(form.slaDeadline).toISOString(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-[2rem] bg-white/5 p-6 shadow-panel space-y-4">
      <h3 className="text-lg font-semibold text-white">Create a new request</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm text-brand-300">
          Title
          <input name="title" value={form.title} onChange={handleChange} required className="w-full rounded-3xl border border-white/10 bg-brand-800 px-4 py-3 text-white outline-none" />
        </label>
        <label className="space-y-2 text-sm text-brand-300">
          Priority
          <select name="priority" value={form.priority} onChange={handleChange} className="w-full rounded-3xl border border-white/10 bg-brand-800 px-4 py-3 text-white outline-none">
            {priorities.map((priority) => <option key={priority} value={priority}>{priority}</option>)}
          </select>
        </label>
      </div>
      <label className="space-y-2 text-sm text-brand-300">
        Description
        <textarea name="description" value={form.description} onChange={handleChange} rows="4" className="w-full rounded-3xl border border-white/10 bg-brand-800 px-4 py-3 text-white outline-none" />
      </label>
      <div className="grid gap-4 md:grid-cols-3">
        <label className="space-y-2 text-sm text-brand-300">
          Category
          <select name="category" value={form.category} onChange={handleChange} className="w-full rounded-3xl border border-white/10 bg-brand-800 px-4 py-3 text-white outline-none">
            {categories.map((category) => <option key={category} value={category}>{category}</option>)}
          </select>
        </label>
        <label className="space-y-2 text-sm text-brand-300">
          Type
          <select name="type" value={form.type} onChange={handleChange} className="w-full rounded-3xl border border-white/10 bg-brand-800 px-4 py-3 text-white outline-none">
            {types.map((type) => <option key={type} value={type}>{type}</option>)}
          </select>
        </label>
        <label className="space-y-2 text-sm text-brand-300">
          SLA Deadline
          <input type="datetime-local" name="slaDeadline" value={form.slaDeadline} onChange={handleChange} className="w-full rounded-3xl border border-white/10 bg-brand-800 px-4 py-3 text-white outline-none" />
        </label>
      </div>
      <button type="submit" className="rounded-3xl bg-brand-300 px-6 py-3 text-sm font-semibold text-brand-950 transition hover:bg-white">Submit Request</button>
    </form>
  );
}
