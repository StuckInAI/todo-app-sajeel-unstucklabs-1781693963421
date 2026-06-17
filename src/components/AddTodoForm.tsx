import { useState } from 'react';
import { Plus, ChevronDown, ChevronUp } from 'lucide-react';
import clsx from 'clsx';
import type { Priority } from '@/types';

type AddTodoFormProps = {
  onAdd: (text: string, priority: Priority, category: string) => void;
};

const PRIORITIES: { value: Priority; label: string; color: string }[] = [
  { value: 'low', label: 'Low', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  { value: 'medium', label: 'Medium', color: 'bg-amber-100 text-amber-700 border-amber-200' },
  { value: 'high', label: 'High', color: 'bg-rose-100 text-rose-700 border-rose-200' },
];

export default function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [category, setCategory] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text, priority, category);
    setText('');
    setCategory('');
    setPriority('medium');
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition"
        />
        <button
          type="button"
          onClick={() => setShowOptions((v) => !v)}
          className="px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100 transition flex items-center gap-1 text-sm"
        >
          {showOptions ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        <button
          type="submit"
          disabled={!text.trim()}
          className="px-4 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-200 text-white font-medium text-sm transition flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add
        </button>
      </div>

      {showOptions && (
        <div className="mt-3 flex flex-wrap gap-3 items-center pt-3 border-t border-slate-100">
          <div>
            <p className="text-xs text-slate-400 mb-1.5 font-medium uppercase tracking-wide">Priority</p>
            <div className="flex gap-1.5">
              {PRIORITIES.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setPriority(p.value)}
                  className={clsx(
                    'px-2.5 py-1 rounded-lg text-xs font-medium border transition',
                    priority === p.value
                      ? p.color + ' ring-2 ring-offset-1 ring-indigo-300'
                      : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
                  )}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 min-w-32">
            <p className="text-xs text-slate-400 mb-1.5 font-medium uppercase tracking-wide">Category</p>
            <input
              type="text"
              value={category}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCategory(e.target.value)}
              placeholder="e.g. Work, Personal..."
              className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition"
            />
          </div>
        </div>
      )}
    </form>
  );
}
