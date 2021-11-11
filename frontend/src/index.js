import React from 'react';
import { restoreCSRF, csrfFetch } from './store/csrf';
import * as sessionActions from './store/session';

// STYLING
import './index.css';

import ReactDOM from 'react-dom';

// REDUX STORE
import { Provider } from 'react-redux';

// ROUTING
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import configureStore from './store';
// CONTEXT FOR MODALS
import { ModalProvider } from "./context/Modal";

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
          <App />
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
