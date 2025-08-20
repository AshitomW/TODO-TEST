"use client";

import { useState } from "react";
import { Plus, Search, List, Grid, Kanban } from "lucide-react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import TasksHeader from "./TasksHeader";
import TasksFilters from "./TasksFilters";
import ListView from "./ListView";
import CardView from "./CardView";
import BoardView from "./BoardView";
import AddTaskModal from "./AddTaskModal";

interface Todo {
  _id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
}

interface TasksContainerProps {
  initialTodos: Todo[];
}

export default function TasksContainer({ initialTodos }: TasksContainerProps) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [viewMode, setViewMode] = useState<"list" | "card" | "board">("list");
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.ok) {
        setTodos(todos.filter((todo) => todo._id !== id));
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setTodos(
          todos.map((todo) =>
            todo._id === id ? { ...todo, status: newStatus as any } : todo
          )
        );
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleAddTask = async (taskData: Omit<Todo, "_id">) => {
    try {
      const res = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(taskData),
      });

      if (res.ok) {
        const newTodo = await res.json();
        setTodos([...todos, newTodo]);
        setShowAddForm(false);
      }
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const filteredTodos = todos.filter((todo: Todo) => {
    const matchesSearch =
      todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      todo.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || todo.status === filterStatus;
    const matchesPriority =
      filterPriority === "all" || todo.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const renderContent = () => {
    switch (viewMode) {
      case "list":
        return (
          <ListView
            todos={filteredTodos}
            onDelete={handleDelete}
            onStatusUpdate={handleStatusUpdate}
            onShowAddForm={() => setShowAddForm(true)}
          />
        );
      case "card":
        return (
          <CardView
            todos={filteredTodos}
            onDelete={handleDelete}
            onStatusUpdate={handleStatusUpdate}
            onShowAddForm={() => setShowAddForm(true)}
          />
        );
      case "board":
        return (
          <DndProvider backend={HTML5Backend}>
            <BoardView
              todos={filteredTodos}
              onDelete={handleDelete}
              onStatusUpdate={handleStatusUpdate}
            />
          </DndProvider>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <TasksHeader onShowAddForm={() => setShowAddForm(true)} />

      <TasksFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        filterPriority={filterPriority}
        setFilterPriority={setFilterPriority}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {renderContent()}

      {showAddForm && (
        <AddTaskModal
          onClose={() => setShowAddForm(false)}
          onSubmit={handleAddTask}
        />
      )}
    </>
  );
}
