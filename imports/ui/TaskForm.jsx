import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';

export const TaskForm = () => {
  const [text, setText] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text) return; //沒打字就送出的檢查

    //新增一筆至task
    // TaskCollection.insert({
    //   userId: user._id,
    //   text: text.trim(), //移除空格
    //   createdAt: new Date(),
    // });
    Meteor.call('tasks.insert', text);

    setText(''); //clear input
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type to add new tasks"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />

      <button type="submit">Add Task</button>
    </form>
  );
};
