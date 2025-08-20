import { useDrag, useDrop } from "react-dnd";
import { X } from "lucide-react";
import { useRef } from "react";

interface Todo {
  _id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
}

interface BoardViewProps {
  todos: Todo[];
  onDelete: (id: string) => void;
  onStatusUpdate: (id: string, status: string) => void;
}

const ItemTypes = {
  TASK: "task",
};

function DraggableTask({
  todo,
  onDelete,
}: {
  todo: Todo;
  onDelete: (id: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.TASK,
      item: { id: todo._id, status: todo.status },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),

      end: (item, monitor) => {
        if (!monitor.didDrop()) {
          console.log("Drop was cancelled");
        }
      },
    }),
    [todo._id, todo.status]
  );

  drag(ref);

  return (
    <div
      ref={ref}
      className={`bg-white rounded-lg p-4 border border-gray-200 cursor-move transition-all ${
        isDragging ? "opacity-50" : "hover:border-gray-300"
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-gray-900">{todo.title}</h4>
        <button
          onClick={() => onDelete(todo._id)}
          className="text-gray-400 hover:text-red-600"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
        {todo.description}
      </p>
      <span
        className={`inline-block px-2 py-1 text-xs font-medium rounded ${
          todo.priority === "high"
            ? "bg-red-100 text-red-700"
            : todo.priority === "medium"
            ? "bg-yellow-100 text-yellow-700"
            : "bg-green-100 text-green-700"
        }`}
      >
        {todo.priority}
      </span>
    </div>
  );
}

function DroppableColumn({
  status,
  todos,
  onDrop,
  onDelete,
}: {
  status: string;
  todos: Todo[];
  onDrop: (taskId: string, newStatus: string) => void;
  onDelete: (id: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ItemTypes.TASK,
      drop: (item: { id: string; status: string }, monitor) => {
        if (item.status !== status && monitor.didDrop() === false) {
          onDrop(item.id, status);
          return { moved: true };
        }
        return undefined;
      },
      canDrop: (item: { id: string; status: string }) => {
        return item.status !== status;
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [status, onDrop]
  );

  drop(ref);

  return (
    <div
      ref={ref}
      className={`rounded-lg border p-4 min-h-[400px] transition-colors ${
        isOver && canDrop
          ? "border-blue-300 bg-blue-50"
          : isOver
          ? "border-gray-300 bg-gray-100"
          : "border-gray-200 bg-gray-50"
      }`}
    >
      <h3 className="font-semibold text-gray-900 mb-4 capitalize">
        {status.replace("-", " ")} ({todos.length})
      </h3>
      <div className="space-y-3">
        {todos.map((todo) => (
          <DraggableTask key={todo._id} todo={todo} onDelete={onDelete} />
        ))}
        {todos.length === 0 && (
          <div className="text-center py-8 text-gray-500 text-sm">
            Drop tasks here
          </div>
        )}
      </div>
    </div>
  );
}

export default function BoardView({
  todos,
  onDelete,
  onStatusUpdate,
}: BoardViewProps) {
  const columns = {
    pending: todos.filter((todo) => todo.status === "pending"),
    "in-progress": todos.filter((todo) => todo.status === "in-progress"),
    completed: todos.filter((todo) => todo.status === "completed"),
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {Object.entries(columns).map(([status, statusTodos]) => (
        <DroppableColumn
          key={status}
          status={status}
          todos={statusTodos}
          onDrop={onStatusUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
