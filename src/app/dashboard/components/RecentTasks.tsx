import Link from "next/link";
import { CheckCircle, Clock, AlertCircle, Plus } from "lucide-react";

interface Todo {
  _id: string;
  title: string;
  description?: string;
  status: "completed" | "in-progress" | "pending";
}

interface RecentTasksProps {
  todos: Todo[];
}

export default function RecentTasks({ todos }: RecentTasksProps) {
  return (
    <div className="bg-white rounded-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900">Recent Tasks</h2>
          <Link
            href="/dashboard/todos"
            className="text-blue-600 hover:text-blue-700 text-sm"
          >
            View all
          </Link>
        </div>
      </div>

      <div className="p-4">
        {todos.length > 0 ? (
          <div className="space-y-3">
            {todos.map((todo) => (
              <div key={todo._id} className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900 mb-1">
                    {todo.title}
                  </h3>
                  {todo.description && (
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {todo.description}
                    </p>
                  )}
                </div>
                <div className="ml-3">
                  <span
                    className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded ${
                      todo.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : todo.status === "in-progress"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {todo.status === "completed" ? (
                      <CheckCircle className="w-3 h-3 mr-1" />
                    ) : todo.status === "in-progress" ? (
                      <Clock className="w-3 h-3 mr-1" />
                    ) : (
                      <AlertCircle className="w-3 h-3 mr-1" />
                    )}
                    {todo.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-2">
              <CheckCircle className="w-8 h-8 mx-auto" />
            </div>
            <p className="text-gray-600 text-sm mb-3">No tasks yet</p>
            <Link
              href="/dashboard/todos"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-1" />
              Create Task
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
