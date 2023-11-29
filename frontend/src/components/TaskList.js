// frontend/src/components/TaskList.js
import React from 'react';

const TaskList = ({ tasks, onDelete }) => {
  return (
    <div>
      <h2>ToDoリスト</h2>
      {tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              {task.text}
              <button onClick={() => onDelete(task.id)}>削除</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
