import {useState} from 'react';
import TaskItem from './TaskItem';

function TaskGroup({title, tasks, onToggle}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className='task-group'>
      <div className='group-header' onClick={() => setIsOpen(!isOpen)}>
        <svg
          className={`arrow ${isOpen ? "open" : ""}`}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M2 4L6 8L10 4" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <h2>
          <svg className='calendar-icon' width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 4H5C3.895 4 3 4.895 3 6V20C3 21.105 3.895 22 5 22H19C20.105 22 21 21.105 21 20V6C21 4.895 20.105 4 19 4Z" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 2V6M8 2V6M3 10H21" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {title}
          <span className='task-count'>{tasks.length}</span>
        </h2>
      </div>

      {isOpen && (
        <div className='group-content'>
          {tasks.length === 0 ? (
            <p className='empty-msg'>No tasks here.</p>
          ) : (
            tasks.map((task) => (
              <TaskItem key={task.id} task={task} onToggle={onToggle} />
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default TaskGroup;