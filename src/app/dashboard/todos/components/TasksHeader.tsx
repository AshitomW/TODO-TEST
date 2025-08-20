import { Plus } from "lucide-react";

interface TasksHeaderProps {
  onShowAddForm: () => void;
}

export default function TasksHeader({ onShowAddForm }: TasksHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Todos</h1>
        <p className="text-gray-600 mt-1">Manage and organize your todos</p>
      </div>
      <button
        onClick={onShowAddForm}
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Todo
      </button>
    </div>
  );
}
