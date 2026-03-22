function getDayLabel(dateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const taskDate = new Date(dateStr);
  taskDate.setHours(0, 0, 0, 0);

  if(taskDate.getTime() === today.getTime()) return "Today";
  if(taskDate.getTime() === tomorrow.getTime()) return "Tomorrow";

  return taskDate.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    });
  }

  function TaskItem({ task, onToggle }) {
    const label = getDayLabel(task.date);

    const labelClass =
      label === "Today" ? "label-today" :
      label === "Tomorrow" ? "label-tomorrow" :
      "label-other";

    return (
      <div className={`task-item ${task.completed ? "completed" : ""}`}>
        <input type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)} />
        <span className="task-title">{task.title}</span>
        <span className={`task-day-label ${labelClass}`}>{label}</span>
      </div>
    );
}

export default TaskItem;