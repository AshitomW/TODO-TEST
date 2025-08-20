import { Plus, X } from "lucide-react";

interface Todo {
  _id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
}

interface CardViewProps {
  todos: Todo[];
  onDelete: (id: string) => void;
  onStatusUpdate: (id: string, status: string) => void;
  onShowAddForm: () => void;
}

export default function CardView({
  todos,
  onDelete,
  onStatusUpdate,
  onShowAddForm,
}: CardViewProps) {
  if (todos.length == 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 p-2">No todos found</p>
        <button
          onClick={onShowAddForm}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add your first Todo
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {todos.map((todo) => (
        <div
          key={todo._id}
          className="bg-white rounded-sm border border-gray-200 p-6"
        >
          <div className="flex items-start justify-between mb-4">
            <h3 className="font-semibold text-gray-900">{todo.title}</h3>
            <button
              onClick={() => onDelete(todo._id)}
              className="text-gray-400 hover:text-red-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <p className="text-gray-600 text-sm mb-4">{todo.description}</p>
          <div className="flex items-center justify-between">
            <span
              className={`px-2 py-1 text-xs font-medium rounded ${
                todo.priority === "high"
                  ? "bg-red-100 text-red-700"
                  : todo.priority === "medium"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {todo.priority}
            </span>
            <select
              value={todo.status}
              onChange={(e) => onStatusUpdate(todo._id, e.target.value)}
              className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}
