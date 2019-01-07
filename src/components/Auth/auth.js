import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import './auth.scss';
// import googleButton from './google-sign-in.png';


const loginButton = () => {
  const domString = `
  <div class="d-flex justify-content-center">
    <button id="google-auth" class="btn btn-light">
      Google Login
    </button>
  </div>
  `;
  $('#auth').html(domString);
  $('#google-auth').on('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  });
};

export default loginButton;
