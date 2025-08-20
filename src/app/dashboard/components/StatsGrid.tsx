import { BarChart3, CheckCircle, Clock, AlertCircle } from "lucide-react";

interface StatsGridProps {
  stats: {
    total: number;
    completed: number;
    pending: number;
    inProgress: number;
  };
}

export default function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-2  gap-6 mb-8">
      <div className="bg-white p-4 rounded-sm border border-gray-200">
        <div className="flex items-center gap-3">
          <BarChart3 className="w-6 h-6 text-gray-700" />
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {stats.total}
            </div>
            <div className="text-sm text-gray-600">Total</div>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-sm border border-gray-200">
        <div className="flex items-center gap-3">
          <CheckCircle className="w-6 h-6 text-green-600" />
          <div>
            <div className="text-2xl font-bold text-green-600">
              {stats.completed}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-sm border border-gray-200">
        <div className="flex items-center gap-3">
          <Clock className="w-6 h-6 text-yellow-600" />
          <div>
            <div className="text-2xl font-bold text-yellow-600">
              {stats.inProgress}
            </div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-sm border border-gray-200">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-6 h-6 text-red-600" />
          <div>
            <div className="text-2xl font-bold text-red-600">
              {stats.pending}
            </div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
        </div>
      </div>
    </div>
  );
}
