import { cookies } from "next/headers";
import StatsGrid from "./components/StatsGrid";
import RecentTasks from "./components/RecentTasks";
import QuickActions from "./components/QuickActions";

async function getTodos() {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;

    if (!token) {
      return [];
    }

    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/todos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });
    if (res.ok) {
      return await res.json();
    }
    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function DashboardPage() {
  const todos = await getTodos();

  const stats = {
    total: todos.length,
    completed: todos.filter((t: any) => t.status === "completed").length,
    pending: todos.filter((t: any) => t.status === "pending").length,
    inProgress: todos.filter((t: any) => t.status === "in-progress").length,
  };

  const recentTodos = todos.slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Welcome back! Here's an overview of your tasks and productivity.
          </p>
        </div>

        <StatsGrid stats={stats} />
        <div className="grid md:grid-cols-2 gap-6">
          <RecentTasks todos={recentTodos} />
          <QuickActions />
        </div>
      </div>
    </div>
  );
}
