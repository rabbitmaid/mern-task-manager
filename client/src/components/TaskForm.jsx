import { useState, useEffect } from "react";

export default function TaskForm({ token, task, onCancel, onSave }) {
  const [title, setTitle] = useState(task.title || "");
  const [description, setDescription] = useState(task.description || "");
  const [status, setStatus] = useState(task.status || "pending");
  const [error, setError] = useState("");

  useEffect(() => {
    // Reset form when task changes
    setTitle(task.title || "");
    setDescription(task.description || "");
    setStatus(task.status || "pending");
    setError("");
  }, [task]);

  const isEdit = !!task._id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    try {
      const res = await fetch(
        isEdit
          ? `http://localhost:3000/api/tasks/${task._id}`
          : "http://localhost:3000/api/tasks",
        {
          method: isEdit ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title, description, status }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to save task");
      } else {
        onSave();
      }
    } catch {
      setError("Failed to save task");
    }
  };

  return (
    <div className="mb-6 p-4 border rounded bg-gray-50">
      <h3 className="text-lg font-semibold mb-3">
        {isEdit ? "Edit Task" : "Create Task"}
      </h3>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          className="w-full p-2 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
        <select
          className="w-full p-2 border rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <div className="flex space-x-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {isEdit ? "Update" : "Create"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-400 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
