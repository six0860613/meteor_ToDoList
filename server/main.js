import { Meteor } from 'meteor/meteor';
import { TaskCollection } from '../imports/api/TaskCollection';

const insertTask = (taskText) => {
  TaskCollection.insert({ text: taskText });
};
 
console.log('TaskCollection',TaskCollection);
Meteor.startup(() => {
  if (TaskCollection.find().count() === 0) {
    [
      'First Task',
      'Second Task',
      'Third Task',
      'Fourth Task',
      'Fifth Task',
      'Sixth Task',
      'Seventh Task'
    ].forEach(insertTask);
  }
});
