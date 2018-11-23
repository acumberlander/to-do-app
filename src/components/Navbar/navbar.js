import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import './navbar.scss';

const navbarEvents = () => {
  $('.nav-link').on('click', (e) => {
    if (e.target.id === 'navbar-button-logout') {
      firebase.auth().signOut().then(() => {
        // $('#toDo').show();

      }).catch((err) => {
        console.error('you still logged in', err);
      });
    } else if (e.target.id === 'navbar-button-tasks') {
      $('#auth').hide();
    } else {
      // click authentication
      $('#auth').show();
    }
  });
};

const createNavbar = () => {
  const domString = `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#">Home for the Holidays</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a id="navbar-button-auth" class="nav-link">Authentication</a>
          </li>
          <li class="nav-item">
            <a id="navbar-button-holidays" class="nav-link">Holidays</a>
          </li>
          <li class="nav-item">
            <a id="navbar-button-tasks" class="nav-link">tasks</a>
          </li>
          <li class="nav-item">
            <a id="navbar-button-logout" class="nav-link">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  `;

  $('#navbar').html(domString);
  navbarEvents();
};

export default createNavbar;
