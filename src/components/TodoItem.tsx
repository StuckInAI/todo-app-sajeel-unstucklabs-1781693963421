import { useState } from 'react';
import { Trash2, Pencil, Check, X } from 'lucide-react';
import clsx from 'clsx';
import type { Todo, Priority } from '@/types';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
};

const priorityConfig: Record<Priority, { dot: string; badge: string; label: string }> = {
  low: { dot: 'bg-emerald-400', badge: 'bg-emerald-50 text-emerald-600', label: 'Low' },
  medium: { dot: 'bg-amber-400', badge: 'bg-amber-50 text-amber-600', label: 'Med' },
  high: { dot: 'bg-rose-400', badge: 'bg-rose-50 text-rose-600', label: 'High' },
};

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.text);

  function handleEditSave() {
    onEdit(todo.id, editValue);
    setIsEditing(false);
  }

  function handleEditCancel() {
    setEditValue(todo.text);
    setIsEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleEditSave();
    if (e.key === 'Escape') handleEditCancel();
  }

  const pConfig = priorityConfig[todo.priority];

  return (
    <div
      className={clsx(
        'bg-white rounded-2xl border border-slate-200 px-4 py-3.5 flex items-start gap-3 shadow-sm transition group',
        todo.completed && 'opacity-60'
      )}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={clsx(
          'mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition',
          todo.completed
            ? 'bg-indigo-500 border-indigo-500'
            : 'border-slate-300 hover:border-indigo-400'
        )}
      >
        {todo.completed && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <input
            autoFocus
            type="text"
            value={editValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full text-sm text-slate-800 bg-slate-50 border border-indigo-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        ) : (
          <p
            className={clsx(
              'text-sm text-slate-800 break-words leading-snug',
              todo.completed && 'line-through text-slate-400'
            )}
          >
            {todo.text}
          </p>
        )}
        <div className="flex items-center gap-2 mt-1.5">
          <span
            className={clsx(
              'text-xs font-medium px-1.5 py-0.5 rounded-md',
              pConfig.badge
            )}
          >
            {pConfig.label}
          </span>
          <span className="w-1 h-1 rounded-full bg-slate-300" />
          <span className="text-xs text-slate-400">{todo.category}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 flex-shrink-0">
        {isEditing ? (
          <>
            <button
              onClick={handleEditSave}
              className="p-1.5 rounded-lg text-emerald-500 hover:bg-emerald-50 transition"
            >
              <Check className="w-4 h-4" />
            </button>
            <button
              onClick={handleEditCancel}
              className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="p-1.5 rounded-lg text-slate-300 hover:text-indigo-500 hover:bg-indigo-50 transition opacity-0 group-hover:opacity-100"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="p-1.5 rounded-lg text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition opacity-0 group-hover:opacity-100"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
