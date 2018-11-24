import $ from 'jquery';
import authHelpers from '../../helpers/authHelpers';
import taskData from '../../helpers/data/taskData';
import initializeTaskPage from '../TaskPage/taskPage';

const formBuilder = (task) => {
  const form = `
  <div class="form-group">
    <label for="form-task">Task</label>
    <input type="text" class="form-control" value="${task.task}" id="form-task-name" placeholder="Do your homework">
  </div>
  <div class="form-group">
    <label for="form-task-status">Status:</label>
    <input type="text" class="form-control" value="${task.isCompleted}" id="form-task-status" placeholder="True">
  </div>
  `;
  return form;
};

const getttingTaskFromForm = () => {
  const task = {
    task: $('#form-task').val(),
    isCompleted: false,
    uid: authHelpers.getCurrentUid(),
  };
  return task;
};

const buildAddForm = () => {
  const emptyTask = {
    name: '',
    address: '',
    phoneNumber: '',
    email: '',
    relationship: '',
  };

  let domString = '<h2>Add New Task</h2>';
  domString += formBuilder(emptyTask);
  domString += '<button class="btn btn-primary" id="add-task">Save New Task</button>';
  $('#add-edit-task').html(domString).show();
};

const addNewTask = () => {
  const newTask = getttingTaskFromForm();
  taskData.addNewTask(newTask)
    .then(() => {
      $('#add-edit-task').html('').show();
      $('#task').hide();
      initializeTaskPage();
    })
    .catch((error) => {
      console.error('error', error);
    });
};

// Edit
const showEditForm = (e) => {
  const idToEdit = e.target.dataset.editId;
  taskData.getSingleTask(idToEdit)
    .then((singleTask) => {
      let domString = '<h2>Edit Task</h2>';
      domString += formBuilder(singleTask);
      domString += `<button id="edit-task" data-single-edit-id=${singleTask.id}>Save Task</button>`;
      $('#add-edit-task').html(domString).show();
      $('#tasks').hide();
    })
    .catch((error) => {
      console.error('error in getting single for edit', error);
    });
};

const updateTask = (e) => {
  const updatedTask = getttingTaskFromForm();
  const taskId = e.target.dataset.singleEditId;
  taskData.updateTask(updatedTask, taskId)
    .then(() => {
      $('#add-edit-task').html('').hide();
      $('#single-container').html('');
      $('#tasks').show();
      initializeTaskPage();
    })
    .catch((error) => {
      console.error('error', error);
    });
};

$('body').on('click', '#add-task', addNewTask);
$('body').on('click', '.edit-btn', showEditForm);
$('body').on('click', '#edit-task', updateTask);

export default buildAddForm;
