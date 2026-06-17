import { useState } from 'react';
import { useTodos } from '@/hooks/useTodos';
import AddTodoForm from '@/components/AddTodoForm';
import TodoList from '@/components/TodoList';
import FilterBar from '@/components/FilterBar';
import StatsBar from '@/components/StatsBar';
import SearchBar from '@/components/SearchBar';
import { CheckSquare } from 'lucide-react';

export default function TodoPage() {
  const {
    filteredTodos,
    filter,
    setFilter,
    categoryFilter,
    setCategoryFilter,
    searchQuery,
    setSearchQuery,
    categories,
    activeCount,
    completedCount,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
  } = useTodos();

  const [showCompleted, setShowCompleted] = useState(true);

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
            <CheckSquare className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 leading-none">My Todos</h1>
            <p className="text-sm text-slate-500 mt-0.5">Stay organized, get things done</p>
          </div>
        </div>

        {/* Stats */}
        <StatsBar
          activeCount={activeCount}
          completedCount={completedCount}
          totalCount={activeCount + completedCount}
        />

        {/* Add Todo */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 mb-4">
          <AddTodoForm onAdd={addTodo} />
        </div>

        {/* Search */}
        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        {/* Filters */}
        <FilterBar
          filter={filter}
          setFilter={setFilter}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          categories={categories}
          completedCount={completedCount}
          onClearCompleted={clearCompleted}
          showCompleted={showCompleted}
          setShowCompleted={setShowCompleted}
        />

        {/* Todo List */}
        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />

        {filteredTodos.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckSquare className="w-8 h-8 text-indigo-300" />
            </div>
            <p className="text-slate-500 font-medium">No todos found</p>
            <p className="text-slate-400 text-sm mt-1">Add one above to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
}
