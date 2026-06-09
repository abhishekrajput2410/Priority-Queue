import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const sampleData = [
  { name: '00:00', value: 30 },
  { name: '02:00', value: 45 },
  { name: '04:00', value: 28 },
  { name: '06:00', value: 62 },
  { name: '08:00', value: 54 },
  { name: '10:00', value: 70 },
  { name: '12:00', value: 92 },
];

export default function ThroughputAreaChart() {
  return (
    <div className="rounded-[2rem] bg-white/5 p-6 shadow-panel">
      <div className="mb-4">
        <p className="text-sm uppercase tracking-[0.3em] text-brand-300">Queue throughput</p>
        <h3 className="text-lg font-semibold text-white">Requests processed per hour</h3>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={sampleData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.12)" />
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip wrapperStyle={{ background: '#0f172a', borderRadius: 16 }} />
            <Area type="monotone" dataKey="value" stroke="#38bdf8" fillOpacity={1} fill="url(#colorValue)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
