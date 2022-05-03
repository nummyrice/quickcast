import React from 'react';
import { restoreCSRF, csrfFetch } from './store/csrf';
import * as sessionActions from './store/session';

// STYLING
import'./index.css'

import ReactDOM from 'react-dom';

// REDUX STORE
import { Provider } from 'react-redux';

// ROUTING
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';

import configureStore from './store';
// CONTEXT FOR MODALS
import { ModalProvider } from "./context/Modal";
import Splash from './components/Splash';
import Main from './components/Main';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Widgets from './components/Widgets';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm'
import CreateActorPortfolio from './components/CreateActorPortfolio';
// do not expose store to the window in production
const store = configureStore();

// this gives your browser access to the various functions we've created.
// this is for testing purposes only so should not be set during production
if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();
  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

function Root() {
  return (
    <Provider store={store}>
      <ModalProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<App />}>
              <Route path='welcome-to-quickcast' element={<Splash/>}>
                <Route path='login' element={<LoginForm/>}/>
                <Route path='signup' element={<SignupForm/>}/>
              </Route>
              <Route path='home' element={<Main/>}>
                  <Route path='create-portfolio' element={<CreateActorPortfolio/>}/>
                </Route>
            </Route>
            <Route path='*' element={<Navigate to='/welcome-to-quickcast'/>}/>
          </Routes>
        </BrowserRouter>
      </ModalProvider>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
