import React, { useState } from 'react';
import {TaskCollection} from '../api/TaskCollection'

export const TaskForm = () => {
  const [text, setText] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text) return; //沒打字跳出

    //新增一筆至task
    TaskCollection.insert({
      text: text.trim(), //移除空格
      createdAt: new Date(),
    });

    setText(''); //clear input
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type to add new tasks"
        value={text}
        onChange={(e)=>{
            setText(e.target.value);
        }}
      />

      <button type="submit">Add Task</button>
    </form>
  );
};
