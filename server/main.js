import { Meteor } from 'meteor/meteor';
import { TaskCollection } from '../imports/api/TaskCollection';
import { Accounts } from 'meteor/accounts-base';

const insertTask = (taskText, user) => {
  TaskCollection.insert({
    text: taskText,
    userID: user._id,
    createdAt: new Date(),
  });
};

// console.log('TaskCollection',TaskCollection);
const SEED_USERNAME = 'meteorite';
const SEED_PASSWORD = 'password';
Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

  const user = Accounts.findUserByUsername(SEED_USERNAME);

  // 幫使用者預設建立的tasks
  if (TaskCollection.find().count() === 0) {
    [
      'First Task',
      'Second Task',
      'Third Task',
      'Fourth Task',
      'Fifth Task',
      'Sixth Task',
      'Seventh Task',
    ].forEach((taskText) => insertTask(taskText, user));
  }
});
