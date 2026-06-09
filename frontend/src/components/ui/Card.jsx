export default function Card({ title, subtitle, children }) {
  return (
    <div className="rounded-[2rem] bg-white/5 p-6 shadow-panel backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-brand-300">{subtitle}</p>
          <h2 className="text-xl font-semibold text-white">{title}</h2>
        </div>
      </div>
      {children}
    </div>
  );
}
