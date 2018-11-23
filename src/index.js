import firebase from 'firebase/app';
import 'bootstrap';
import './index.scss';
import apiKeys from '../db/apiKeys.json';
import createNavbar from './components/Navbar/navbar';
import loginButton from './components/Auth/auth';
import authHelpers from './helpers/authHelpers';
import taskPage from './components/TaskPage/taskPage';
import showAddForm from './components/AddEditTasks/addEditTasks';


const initializeApp = () => {
  firebase.initializeApp(apiKeys.fireBaseKeys);
  createNavbar();
  authHelpers.checkLoginStatus(taskPage);
  loginButton();
  $('#show-task-form').on('click', showAddForm);
};

initializeApp();
