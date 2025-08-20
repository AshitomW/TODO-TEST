import { cookies } from "next/headers";
import TasksContainer from "./components/TasksContainer";

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
    });

    if (res.ok) {
      return await res.json();
    }
    return [];
  } catch (error) {
    console.error("Error fetching todos:", error);
    return [];
  }
}

export default async function TasksPage() {
  const todos = await getTodos();

  return (
    <div className="min-h-screen bg-gray-50 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TasksContainer initialTodos={todos} />
      </div>
    </div>
  );
}
