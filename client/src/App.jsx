import { useState } from "react";
import Login from "./components/Login";
import TaskList from "./components/TaskList";

function App() {
  const [auth, setAuth] = useState({
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
  });

  if (!auth.token) {
    return <Login setAuth={setAuth} />;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Welcome, {auth.user.name}!</h1>
        <button
          onClick={() => {
            setAuth({ user: null, token: null });
            localStorage.clear();
          }}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Logout
        </button>
      </header>

      <TaskList token={auth.token} />
    </div>
  );
}

export default App;
