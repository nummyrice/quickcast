import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import { login } from '../../store/session';


function Navigation({ isLoaded }){
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const password = 'password';
  const credential = 'demo@user.io';


  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <div>
          <LoginFormModal/>
        </div>
        <div>
          <button onClick={() => {dispatch(login({password, credential}))}}> Demo User</button>
        </div>
        <div>
          <NavLink className="button signup" to="/signup">Sign Up</NavLink>
        </div>
      </>
    );
  }

  return (
    <div className="navigation_bar">
      <div>
        <NavLink className="button home" exact to="/">quickCast</NavLink>
      </div>
        {isLoaded && sessionLinks}
    </div>
  );
}

export default Navigation;

        // <form action='api/test'>
        //   <input type='file' name='fileUpload'></input>
        //   <input type='submit'></input>
        // </form>
