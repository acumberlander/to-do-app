import $ from 'jquery';
import authHelpers from '../../helpers/authHelpers';
import taskData from '../../helpers/data/taskData';

const printSingleTask = (task) => {
  const taskString = `
    <div>
      <h1>${task.isCompleted}</h1>
      <h3>${task.task}</h3>
      <button class="btn btn-danger delete-btn" data-delete-id=${task.id}>Delete</button>
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
      <div class="card m-3">
        <div class="text-center"data-card-id=${task.id}>${task.task}
          <div class="d-flex row justify-content-end">
          <div class="d-flex justify-content-start">
            <div class="form-check form-check-inline">
              <label class="form-check-label m-2" for="${task.id}">Task Complete?</label>
              <input class="form-check-input completed-checkbox" type="checkbox" id="${task.id}">
            </div>
          </div>
            <button class="btn btn-info edit-btn mr-3 mb-1">Edit</button>
            <button class="btn btn-danger delete-btn mr-5 mb-1" data-delete-id=${task.id}>Delete</button>
          </div>
        </div>
      </div>
      `;
      $('#single-container').html(domString);
      if (task.isCompleted) {
        $('.completed-checkbox').attr('checked', true);
      }
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

const updateCompletedTask = (e) => {
  const taskId = e.target.id;
  const completed = e.target.checked;
  taskData.updateCompletedTask(taskId, completed)
    .then(() => {

    })
    .catch((err) => {
      console.error('error in updating flag', err);
    });
};

const bindEvents = () => {
  $('body').on('click', '.get-single', getSingleTask);
  $('body').on('click', '.delete-btn', deleteTask);
  $('body').on('change', '.completed-checkbox', updateCompletedTask);
};

const initializeTaskPage = () => {
  taskPage();
  bindEvents();
};

export default initializeTaskPage;
