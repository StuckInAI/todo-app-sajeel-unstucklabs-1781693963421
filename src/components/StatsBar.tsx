type StatsBarProps = {
  activeCount: number;
  completedCount: number;
  totalCount: number;
};

export default function StatsBar({ activeCount, completedCount, totalCount }: StatsBarProps) {
  const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-slate-800">{totalCount}</p>
            <p className="text-xs text-slate-400 font-medium">Total</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-indigo-500">{activeCount}</p>
            <p className="text-xs text-slate-400 font-medium">Active</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-emerald-500">{completedCount}</p>
            <p className="text-xs text-slate-400 font-medium">Done</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-slate-800">{progress}%</p>
          <p className="text-xs text-slate-400 font-medium">Complete</p>
        </div>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-indigo-400 to-indigo-500 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
