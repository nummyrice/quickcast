import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';


function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);



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
          <NavLink className="button signup" to="/signup">Sign Up</NavLink>
        </div>
      </>
    );
  }

  return (
    <div className="navigation_bar">
      <div>
        <NavLink className="button home" exact to="/">Home</NavLink>
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
