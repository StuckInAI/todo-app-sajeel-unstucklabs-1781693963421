import clsx from 'clsx';
import { Trash2 } from 'lucide-react';
import type { FilterType } from '@/types';

type FilterBarProps = {
  filter: FilterType;
  setFilter: (f: FilterType) => void;
  categoryFilter: string;
  setCategoryFilter: (c: string) => void;
  categories: string[];
  completedCount: number;
  onClearCompleted: () => void;
  showCompleted: boolean;
  setShowCompleted: (v: boolean) => void;
};

const FILTER_OPTIONS: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

export default function FilterBar({
  filter,
  setFilter,
  categoryFilter,
  setCategoryFilter,
  categories,
  completedCount,
  onClearCompleted,
}: FilterBarProps) {
  return (
    <div className="mb-4 space-y-2">
      <div className="flex items-center justify-between">
        {/* Status filters */}
        <div className="flex gap-1 bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
          {FILTER_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilter(opt.value)}
              className={clsx(
                'px-3 py-1.5 rounded-lg text-xs font-medium transition',
                filter === opt.value
                  ? 'bg-indigo-500 text-white shadow-sm'
                  : 'text-slate-500 hover:bg-slate-100'
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Clear completed */}
        {completedCount > 0 && (
          <button
            onClick={onClearCompleted}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-rose-500 hover:bg-rose-50 border border-rose-100 transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear {completedCount} done
          </button>
        )}
      </div>

      {/* Category filter */}
      {categories.length > 2 && (
        <div className="flex gap-1.5 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={clsx(
                'px-2.5 py-1 rounded-lg text-xs font-medium border transition capitalize',
                categoryFilter === cat
                  ? 'bg-indigo-50 text-indigo-600 border-indigo-200'
                  : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
