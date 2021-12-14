import React, { useState, Fragment } from 'react';
import { Meteor } from 'meteor/meteor';

import { Task } from './Task.jsx';
import { TaskForm } from './TaskForm.jsx';
import { TaskCollection } from '../db/TaskCollection';
import { LoginForm } from './LoginForm';

import '/imports/api/tasksMethods';
import { useTracker } from 'meteor/react-meteor-data';

export const App = () => {
  const [hideCompleted, setHideCompleted] = useState(false);
  const user = useTracker(() => Meteor.user());
  const userLogout = () => Meteor.logout();

  // 篩選已check並隱藏 //$ne為mongodb語法 不等於
  const hideCompletedFilter = { isChecked: { $ne: true } };
  const userFilter = user ? { userId: user._id } : {};
  const pendingOnlyFilter = {
    ...hideCompletedFilter,
    ...userFilter,
  };

  const { tasks, pendingTasksCount, isLoading } =
    useTracker(() => {
      const noData = { tasks: [], pendingTasksCount: 0 };
      if (!Meteor.user()) {
        // no login user = no data
        return noData;
      }
      const handler = Meteor.subscribe('tasks');
      if (!handler.ready()) {
        // 尚在讀取中
        return { ...noData, isLoading: true };
      }

      const tasks = TaskCollection.find(
        hideCompleted ? pendingOnlyFilter : userFilter,
        { sort: { createdAt: -1 } }
      ).fetch();
      const pendingTasksCount = TaskCollection.find(
        pendingOnlyFilter
      ).count();

      return { tasks, pendingTasksCount };
    });

  const pendingTasksTitle = `${
    pendingTasksCount ? ` (${pendingTasksCount})` : ''
  }`;

  // checkbox切換
  const toggleChecked = ({ _id, isChecked }) => {
    Meteor.call('tasks.setIsChecked', _id, !isChecked);
  };
  // 移除task
  const deleteTask = (_id) => {
    Meteor.call('tasks.remove', _id);
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
          {user ? (
            <Fragment>
              <div className="user" onClick={userLogout}>
                {user.username} 🚪
              </div>
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

              {isLoading && (
                <div className="loading">loading...</div>
              )}

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
            </Fragment>
          ) : (
            <LoginForm />
          )}
        </div>
      </div>
    </>
  );
};
