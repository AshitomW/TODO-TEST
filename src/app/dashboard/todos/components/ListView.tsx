import { Plus, X } from "lucide-react";

interface Todo {
  _id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
}

interface ListViewProps {
  todos: Todo[];
  onDelete: (id: string) => void;
  onStatusUpdate: (id: string, status: string) => void;
  onShowAddForm: () => void;
}

export default function ListView({
  todos,
  onDelete,
  onStatusUpdate,
  onShowAddForm,
}: ListViewProps) {
  return (
    <div>
      {todos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 p-2">No tasks found</p>
          <button
            onClick={onShowAddForm}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add your first Todo
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {todos.map((todo) => (
            <div
              key={todo._id}
              className="flex items-center bg-white mb-4 justify-between p-6 border-1 rounded-sm border-gray-200 hover:bg-gray-50"
            >
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{todo.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{todo.description}</p>
                <div className="flex items-center mt-2 space-x-2">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded ${
                      todo.priority === "high"
                        ? "bg-red-100 text-red-700"
                        : todo.priority === "medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {todo.priority} priority
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <select
                  value={todo.status}
                  onChange={(e) => onStatusUpdate(todo._id, e.target.value)}
                  className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                <button
                  onClick={() => onDelete(todo._id)}
                  className="text-red-600 hover:text-red-800 p-1"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
