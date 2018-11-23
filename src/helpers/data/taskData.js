import axios from 'axios';
import apiKeys from '../../../db/apiKeys.json';

const firebaseUrl = apiKeys.fireBaseKeys.databaseURL;

const getAllTasks = () => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/tasks.json`)
    .then((results) => {
      const tasksObject = results.data;
      const taskArray = [];
      if (tasksObject !== null) {
        Object.keys(tasksObject).forEach((taskId) => {
          tasksObject[taskId].id = taskId;
          taskArray.push(tasksObject[taskId]);
        });
      }
      resolve(taskArray);
    })
    .catch((error) => {
      reject(error);
    });
});

const getSingleTask = taskId => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/tasks/${taskId}.json`)
    .then((result) => {
      const singleTask = result.data;
      singleTask.id = taskId;
      resolve(singleTask);
    })
    .catch((error) => {
      reject(error);
    });
});

const deleteTask = taskId => axios.delete(`${firebaseUrl}/tasks/${taskId}.json`);

const addNewTask = tasksObject => axios.post(`${firebaseUrl}/tasks.json`, JSON.stringify(tasksObject));

const updateTask = (tasksObject, taskId) => axios.put(`${firebaseUrl}/tasks/${taskId}.json`, JSON.stringify(tasksObject));

export default {
  getAllTasks,
  getSingleTask,
  deleteTask,
  addNewTask,
  updateTask,
};
