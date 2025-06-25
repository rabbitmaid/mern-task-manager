import { useEffect, useState } from "react";

export default function TaskList({ token }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingTask, setEditingTask] = useState(null);

  // Fetch tasks from backend
  const fetchTasks = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:3000/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to fetch tasks");
      } else {
        setTasks(data);
      }
    } catch {
      setError("Failed to fetch tasks");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      const res = await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        setTasks(tasks.filter((task) => task._id !== id));
      } else {
        const data = await res.json();
        alert(data.message || "Failed to delete task");
      }
    } catch {
      alert("Failed to delete task");
    }
  };

  // Called when task is created or updated, to refresh list
  const handleRefresh = () => {
    setEditingTask(null);
    fetchTasks();
  };

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Your Tasks</h2>
      <button
        onClick={() => setEditingTask({})}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        + Create Task
      </button>

      {editingTask && (
        <TaskForm
          token={token}
          task={editingTask}
          onCancel={() => setEditingTask(null)}
          onSave={handleRefresh}
        />
      )}

      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="p-4 border rounded flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{task.title}</h3>
                <p className="text-gray-600">{task.description}</p>
                <p className="text-sm italic text-gray-500">
                  Status: {task.status}
                </p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => setEditingTask(task)}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Lazy load TaskForm below or import if you want
import TaskForm from "./TaskForm";
