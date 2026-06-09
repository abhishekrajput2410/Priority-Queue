import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function PriorityBarChart({ data }) {
  return (
    <div className="rounded-[2rem] bg-white/5 p-6 shadow-panel">
      <div className="mb-4">
        <p className="text-sm uppercase tracking-[0.3em] text-brand-300">Priority Distribution</p>
        <h3 className="text-lg font-semibold text-white">Queue priorities</h3>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.12)" />
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip wrapperStyle={{ background: '#0f172a', borderRadius: 16 }} />
            <Bar dataKey="value" fill="#38bdf8" radius={[12, 12, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
