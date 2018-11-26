import $ from 'jquery';
import authHelpers from '../../helpers/authHelpers';
import taskData from '../../helpers/data/taskData';

const printSingleTask = (task) => {
  const taskString = `
    <div>
      <h1>${task.isCompleted}</h1>
      <h3>${task.task}</h3>
      <button class="btn btn-danger delete-btn" data-delete-id=${task.id}>X</button>
      <button class="btn btn-info edit-btn">Edit</button>
    </div>
  `;
  $('#single-container').html(taskString);
};

const getSingleTask = (e) => {
  // firebase id
  const taskId = e.target.dataset.dropdownId;
  console.log(taskId);
  taskData.getSingleTask(taskId)
    .then((singleTask) => {
      printSingleTask(singleTask);
    })
    .catch((error) => {
      console.error('error in getting one task', error);
    });
};

const cardBuilder = (taskArray) => {
  let domString = '';
  if (taskArray.length) {
    taskArray.forEach((task) => {
      domString += `
      <div class="card">
        <div class=""data-card-id=${task.id}>${task.task}</div>
        <div class=""></div>
      </div>
      `;
      $('#single-container').html(domString);
    });
  }
};

const taskPage = () => {
  const uid = authHelpers.getCurrentUid();
  taskData.getAllTasks(uid)
    .then((taskArray) => {
      cardBuilder(taskArray);
    })
    .catch((error) => {
      console.error('error in getting tasks', error);
    });
};

const deleteTask = (e) => {
  // firebase id
  const idToDelete = e.target.dataset.deleteId;
  taskData.deleteTask(idToDelete)
    .then(() => {
      taskPage();
      $('#single-container').html('');
    })
    .catch((error) => {
      console.error('error in deleting task', error);
    });
};

const bindEvents = () => {
  $('body').on('click', '.get-single', getSingleTask);
  $('body').on('click', '.delete-btn', deleteTask);
};

const initializeTaskPage = () => {
  taskPage();
  bindEvents();
};

export default initializeTaskPage;
