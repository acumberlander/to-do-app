/* eslint-disable no-console */
import $ from 'jquery';
import authHelpers from '../../helpers/authHelpers';
import taskData from '../../helpers/data/taskData';
import './taskPage.scss';

const printSingleTask = (task) => {
  const taskString = `
    <div>
      <h3>${task.task}</h3>
      <button class="btn btn-danger delete-btn" data-delete-id=${task.id}>Delete</button>
      <button class="btn btn-info edit-btn" data-edit-id=${task.id}>Edit</button>
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
  taskArray.forEach((task) => {
    if (task.isCompleted === false) {
      domString += `
      <div class="card m-3">
        <div class="container">
          <div class="text-center" id=${task.id} data-card-id=${task.id}>
          <div class="notCompleted">
            ${task.task}
          </div>
            <div class="d-flex justify-content-around row">
              <div class="form-check form-check-inline">
                <label class="form-check-label m-2" for="${task.id}">Task Complete?</label>
                <input class="form-check-input notCompleted-checkbox" type="checkbox" id="${task.id}">
              </div>
            </div>
            <div mt-4>
              <button class="btn btn-info edit-btn m-2" data-edit-id=${task.id}>Edit</button>
              <button class="btn btn-danger delete-btn m-2" data-delete-id=${task.id}>Delete</button>
            </div>
          </div>
        </div>
      </div>
      `;
      $('#single-container').html(domString);
      $('.notCompleted-checkbox').attr('checked', false);
    }
  });
};

const printCompletedTasks = (taskArray) => {
  let domString = '';
  taskArray.forEach((task) => {
    if (task.isCompleted === true) {
      domString += `
      <div class="card m-3">
        <div class="container">
          <div class="text-center" id=${task.id} data-card-id=${task.id}>
            <div class="isCompleted">
              ${task.task}
            </div>
            <div class="d-flex justify-content-around row">
              <div class="form-check form-check-inline">
                <label class="form-check-label m-2" for="${task.id}">Task Complete?</label>
                <input class="form-check-input isCompleted-checkbox" type="checkbox" id="${task.id}">
              </div>
            </div>
              <div mt-4>
                <button class="btn btn-danger delete-btn m-2" data-delete-id=${task.id}>Delete</button>
              </div>
          </div>
        </div>
      </div>
      `;
      $('#completed').html(domString);
      $('.isCompleted-checkbox').attr('checked', true);
      $('.isCompleted').css('text-decoration', 'line-through');
    }
  });
};

const taskPage = () => {
  const uid = authHelpers.getCurrentUid();
  taskData.getAllTasks(uid)
    .then((taskArray) => {
      cardBuilder(taskArray);
      printCompletedTasks(taskArray);
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
      $('#completed').html('');
    })
    .catch((error) => {
      console.error('error in deleting task', error);
    });
};

const updateCompletedTask = (e) => {
  const taskId = e.target.id;
  const isCompleted = e.target.checked;
  // console.log(e.target);
  // if (isCompleted === true) {
  //   $(`.card #${taskId}`).html('');
  // }
  taskData.updatedCompleteTask(taskId, isCompleted)
    .then(() => {
      taskPage();
      $('#completed').html('');
    })
    .catch((err) => {
      console.error('error in updating flag', err);
    });
};

const bindEvents = () => {
  $('body').on('click', '.get-single', getSingleTask);
  $('body').on('click', '.delete-btn', deleteTask);
  $('body').on('change', '.isCompleted-checkbox', updateCompletedTask);
  $('body').on('change', '.notCompleted-checkbox', updateCompletedTask);
};

const initializeTaskPage = () => {
  taskPage();
  bindEvents();
};

export default initializeTaskPage;
