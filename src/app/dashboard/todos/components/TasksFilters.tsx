import { Search, List, Grid, Kanban } from "lucide-react";

interface TasksFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  filterPriority: string;
  setFilterPriority: (priority: string) => void;
  viewMode: "list" | "card" | "board";
  setViewMode: (mode: "list" | "card" | "board") => void;
}

export default function TasksFilters({
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus,
  filterPriority,
  setFilterPriority,
  viewMode,
  setViewMode,
}: TasksFiltersProps) {
  return (
    <div className="mb-6 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="flex flex-wrap gap-4 items-center justify-between">
        {/* Filters */}
        <div className="flex gap-4">
          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          {/* Priority Filter */}
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>

        {/* View Mode Toggle */}
        <div className="flex bg-gray-100 rounded-sm p-1">
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-md transition-colors ${
              viewMode === "list"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <List className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode("card")}
            className={`p-2 rounded-md transition-colors ${
              viewMode === "card"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Grid className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode("board")}
            className={`p-2 rounded-md transition-colors ${
              viewMode === "board"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Kanban className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
