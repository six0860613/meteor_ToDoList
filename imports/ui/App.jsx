import React, { useState } from 'react';

import { Task } from './Task.jsx';
import { TaskForm } from './TaskForm.jsx';
import { TaskCollection } from '../api/TaskCollection';

import { useTracker } from 'meteor/react-meteor-data';

export const App = () => {
  const [hideCompleted, setHideCompleted] = useState(false);

  // 篩選已check並隱藏 //$ne為mongodb語法 不等於
  const hideCompletedFilter = { isChecked: { $ne: true } };

  const tasks = useTracker(() =>
    TaskCollection.find(
      hideCompleted ? hideCompletedFilter : {},
      { sort: { createdAt: -1 } }
    ).fetch()
  );

  const pendingTasksCount = useTracker(() =>
    TaskCollection.find(hideCompletedFilter).count()
  );

  const pendingTasksTitle = `${
    pendingTasksCount ? ` (${pendingTasksCount})` : ''
  }`;

  // checkbox切換
  const toggleChecked = ({ _id, isChecked }) => {
    TaskCollection.update(_id, {
      $set: {
        isChecked: !isChecked,
      },
    });
  };
  // 移除task
  const deleteTask = (_id) => {
    TaskCollection.remove(_id);
  };

  return (
    <>
      <div className="app">
        <header>
          <div className="app-bar">
            <div className="app-header">
              <h1>To Do List</h1>
              {pendingTasksTitle}
            </div>
          </div>
        </header>

        <div className="main">
          <TaskForm />
          <div className="filter">
            <button
              onClick={() =>
                setHideCompleted(!hideCompleted)
              }
            >
              {hideCompleted
                ? 'Show All'
                : 'Hide Completed'}
            </button>
          </div>

          <ul className="tasks">
            {tasks.map((v) => (
              <Task
                key={v._id}
                task={v}
                clickCheckBox={toggleChecked}
                onDelete={deleteTask}
              />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
