import React from 'react';

export const Task = ({ task, clickCheckBox, onDelete }) => {
  return (
    <>
      <li>
        <input
          id={`list${task._id}`}
          type="checkbox"
          checked={!!task.isChecked}
          onClick={() => clickCheckBox(task)}
          readOnly
        />

        <label htmlFor={`list${task._id}`}>
          {task.text}
        </label>
        <button onClick={() => onDelete(task._id)}>
          &times;
        </button>
      </li>
    </>
  );
};
