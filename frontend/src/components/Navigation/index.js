import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import { login } from '../../store/session';
import * as sessionActions from '../../store/session'


function Navigation({ session }){
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

  if (!session.user) {
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
  } else if (session.user.purpose === 'actor') {
    sessionLinks = (
      <>
        <NavLink to='/home'>
          {"actor home link"}
        </NavLink>
        <NavLink to='/home/my-portfolio'>
          {"My portfolio"}
        </NavLink>
        <NavLink to='/home/my-gallery'>
          {"My Gallery"}
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
  } else if (session.user.purpose === 'company') {
    sessionLinks = (
      <>
        <NavLink to='/home'>
          {"company home"}
        </NavLink>
        <NavLink to='/home/my-company'>
          {"My Company"}
        </NavLink>
        <div>
          {"My gigs"}
        </div>
        <NavLink to='/home/search-portfolios'>
          {"Search Talent"}
        </NavLink>
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
        <NavLink to='/home/create-portfolio'>
          {"Looking for a Gig"}
        </NavLink>
        <NavLink to='/home/create-company'>
          {"Looking for talent"}
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
        {session.user && session.company && session.actorPortfolio &&
          <div onClick={e => dispatch(sessionActions.toggleAndSetPurpose())}>
            {'Toggle Purpose'}
          </div>
        }
    </div>
  );
}

export default Navigation;
