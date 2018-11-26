import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';

const checkLoginStatus = (initializeTaskPage) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      $('#tasks').hide();
      $('#auth').hide();
      $('#navbar-button-auth').hide();
      $('#navbar-button-tasks').show();
      $('#navbar-button-logout').show();
      initializeTaskPage();
    } else {
      $('#tasks').hide();
      $('#auth').show();
      $('#navbar-button-auth').show();
      $('#navbar-button-tasks').hide();
      $('#navbar-button-logout').hide();
    }
  });
};

const getCurrentUid = () => firebase.auth().currentUser.uid;

export default { checkLoginStatus, getCurrentUid };
