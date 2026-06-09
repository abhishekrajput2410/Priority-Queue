import { motion } from 'framer-motion';

export default function BarChart({ data }) {
  return (
    <div className="space-y-4 rounded-[2rem] bg-white/5 p-6 shadow-panel">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-brand-300">Priority Distribution</p>
          <h3 className="text-lg font-semibold text-white">Queue split</h3>
        </div>
      </div>
      <div className="flex gap-3">
        {data.map((item) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 rounded-3xl bg-brand-700 p-4 text-center"
          >
            <div className="text-3xl font-semibold text-white">{item.value}</div>
            <div className="mt-2 text-sm uppercase tracking-[0.2em] text-brand-300">{item.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
