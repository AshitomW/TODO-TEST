import Link from "next/link";
import { Plus, CheckCircle } from "lucide-react";

export default function QuickActions() {
  return (
    <div className="bg-white rounded-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
      </div>

      <div className="p-4 space-y-3">
        <Link
          href="/dashboard/todos"
          className="flex items-center p-3 text-left w-full rounded border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center mr-3">
            <Plus className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900">Add Todo</div>
            <div className="text-xs text-gray-600">Create a new task</div>
          </div>
        </Link>

        <Link
          href="/dashboard/todos"
          className="flex items-center p-3 text-left w-full rounded border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center mr-3">
            <CheckCircle className="w-4 h-4 text-green-600" />
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900">View Todo</div>
            <div className="text-xs text-gray-600">See all your Todos</div>
          </div>
        </Link>
      </div>
    </div>
  );
}
