import {useState} from 'react';

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !date) return;
    onAddTask(title, date);
    setTitle('');
    setDate('');
  };

  return (
    <form className='task-form' onSubmit={handleSubmit}>
      <div className='form-field'>
        <label className='input-title'>What do you want to do?</label>
        <input type="text" placeholder='Study for mid exams...' value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className='form-field'>
        <label className='input-title'>When should it be done?</label>
        <input type="date" className={date ? "":"empty"} value={date} onChange={(e) => setDate(e.target.value)}/>
      </div>
      <button type='submit'>Create</button>
    </form>
  );
}

export default TaskForm;