import { useState } from "react";
import { X } from "lucide-react";

interface Todo {
  _id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
}

interface AddTaskModalProps {
  onClose: () => void;
  onSubmit: (taskData: Omit<Todo, "_id">) => void;
}

export default function AddTaskModal({ onClose, onSubmit }: AddTaskModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending" as const,
    priority: "medium" as const,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      title: "",
      description: "",
      status: "pending",
      priority: "medium",
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-sm p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Add New Task</h3>
          <button onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              required
              rows={1}
              maxLength={100}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
            <div className="text-sm text-gray-500 mt-1">
              {formData.description.length}/100 characters
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value as any })
                }
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.priority}
                onChange={(e) =>
                  setFormData({ ...formData, priority: e.target.value as any })
                }
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              className="flex-1 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              Add Todo
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
