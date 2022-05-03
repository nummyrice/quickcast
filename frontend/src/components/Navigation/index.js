import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import { login } from '../../store/session';
import * as sessionActions from '../../store/session'


function Navigation({ sessionUser }){
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const password = 'password';
  const credential = 'demo@user.io';


// Splash Links
  // home
  // signup
  // login

// Home (Company)
  // My Company Portfolio
  //  My Gigs
  // Portfolios
  // Search (when on mobile sized screen only)

// Home (Actor)
  // My Portfolio
  // Search (when on mobile sized screen only)
  let sessionLinks;

  if (!sessionUser) {
    sessionLinks = (
      <>
        <NavLink to='/welcome-to-quickcast'>
          {"Splash Home Link"}
        </NavLink>
        <NavLink to='/welcome-to-quickcast/login'>
          {"Login"}
        </NavLink>
        <NavLink to='/welcome-to-quickcast/signup'>
          {"Sign Up"}
        </NavLink>
      </>
    )
  } else if (sessionUser.purpose === 'actor') {
    sessionLinks = (
      <>
        <NavLink to='/home'>
          {"actor home link"}
        </NavLink>
        <NavLink to='/home/my-portfolio'>
          {"My portfolio"}
        </NavLink>
        <div>
          {"Search"}
        </div>
        <button onClick={() => {
          dispatch(sessionActions.logout())
        }}>
          {"Logout"}
        </button>

      </>
    )
  } else if (sessionUser.purpose === 'company') {
    sessionLinks = (
      <>
        <NavLink to='/home'>
          {"company home"}
        </NavLink>
        <div>
          {"My company"}
        </div>
        <div>
          {"My gigs"}
        </div>
        <div>
          {"Search"}
        </div>
        <button onClick={() => {
          dispatch(sessionActions.logout())
        }}>
          {"Logout"}
        </button>
      </>
    )
  } else {
    sessionLinks = (
      <>
         <NavLink to='/home'>
          {"home"}
        </NavLink>
        <button onClick={() => {
          dispatch(sessionActions.logout())
        }}>
          {"Logout"}
        </button>
      </>
    )
  }

  return (
    <div className="navigation_bar">
        {sessionLinks}
    </div>
  );
}

export default Navigation;
