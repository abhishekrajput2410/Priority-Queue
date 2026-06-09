export default function AiInsights() {
  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] bg-white/5 p-6 shadow-panel">
        <h2 className="text-xl font-semibold text-white">AI Insights</h2>
        <p className="mt-2 text-sm text-brand-300">Priority predictions and AI-driven queue recommendations.</p>
      </div>
      <div className="rounded-[2rem] bg-white/5 p-6 shadow-panel">
        <p className="text-brand-300">
          AI service is available at
          <span className="text-white">/api/ai</span>
          .
        </p>
      </div>
    </div>
  );
}
