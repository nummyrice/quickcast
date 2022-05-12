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
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm'
import CreateActorPortfolio from './components/ActorPortfolio/CreateActorPortfolio';
import ActorPortfolio from './components/ActorPortfolio';
import PortfolioGallery from './components/ActorPortfolio/PortfolioGallery';
import CreateCompany from './components/Company/CreateCompany'
import Company from './components/Company';
import EditCompany from './components/Company/EditCompany';
import Productions from './components/Company/Productions';
import Roles from './components/Company/Roles'
import PortfolioView from './components/PortfolioView'
import GigView from './components/GigView';
import ViewOne from './components/Main/ViewOne';
import Applications from './components/Applications';
import FeedSplitter from './components/Main/FeedSplitter'
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
                  <Route index element={<FeedSplitter/>}/>
                  <Route path='create-portfolio' element={<CreateActorPortfolio/>}/>
                  <Route path='my-portfolio' element={<ActorPortfolio/>}/>
                  <Route path='my-gallery' element={<PortfolioGallery/>}/>
                  <Route path='create-company' element={<CreateCompany/>}/>
                  <Route path='my-company' element={<Company/>}>
                    <Route index element={<EditCompany/>}/>
                    <Route path='productions' element={<Productions/>}/>
                    <Route path='roles' element={<Roles/>}/>
                  </Route>
                  <Route path='search-portfolios' element={<PortfolioView/>}/>
                  <Route path='search-gigs' element={<GigView/>}/>
                  <Route path='view-role/:id' element={<ViewOne/>}/>
                  <Route path='my-applications' element={<Applications/>}/>
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
