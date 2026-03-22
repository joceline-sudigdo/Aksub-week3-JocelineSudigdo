import { useState, useEffect } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskGroup from "./components/TaskGroup";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    setTasks((prev) =>
      prev.filter((task) => {
        const deadline = new Date(task.date);
        deadline.setHours(0, 0, 0, 0);
        return deadline >= today;
      })
    );
  }, []);

  const handleAddTask = (title, date) => {
    const newTask = { id:Date.now(), title, date, completed:false};
    setTasks((prev) => [...prev, newTask]);
    // console.log("Task added:", { title, date });
  };

  const handleToggle = (id) => {
    setTasks((prev =>
      prev.map((task) =>
      task.id === id ? {...task, completed: !task.completed} : task)
    ))
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayFormatted = today.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const todayTasks = tasks.filter((task) => {
    const d = new Date(task.date);
    d.setHours(0, 0, 0, 0);
    return d.getTime() === today.getTime();
  });

  const otherTasks = tasks.filter((task) => {
    const d = new Date(task.date);
    d.setHours(0, 0, 0, 0);
    return d.getTime() !== today.getTime();
  });

  return (
    <div className="app">
      <h1>Good Morning, User 👋</h1>
      <p>It's {todayFormatted}</p>
      <TaskForm onAddTask={handleAddTask} />
      <TaskGroup title="Today" tasks={todayTasks} onToggle={handleToggle} />
      <TaskGroup title="Other" tasks={otherTasks} onToggle={handleToggle} />
    </div>
  );
}

export default App;