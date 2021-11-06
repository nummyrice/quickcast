import React from 'react';

// STYLING
import './index.css';

import ReactDOM from 'react-dom';

// REDUX STORE
import { Provider } from 'react-redux';

// ROUTING
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import configureStore from './store';

// do not expose store to the window in production
const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
}

function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
