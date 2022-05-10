import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import { login } from '../../store/session';
import * as sessionActions from '../../store/session'
import { ReactComponent as Home} from '../../assets/home.svg'
import { ReactComponent as MyPortfolio} from '../../assets/my_portfolio.svg'
import { ReactComponent as MyGallery} from '../../assets/camera.svg'
import { ReactComponent as SearchIcon } from '../../assets/magnifying_glass.svg'
import { ReactComponent as MyApplications} from '../../assets/clipboard.svg'
import { ReactComponent as CompanyDetailsIcon } from '../../assets/details.svg'
import { ReactComponent as SearchTalentIcon } from '../../assets/search_group2.svg'
import { ReactComponent as XClose } from '../../assets/x_close.svg'

function Navigation({ session }){
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const password = 'password';
  const credential = 'demo@user.io';
  const [openMenu, setOpenMenu] = useState(false)


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
        <NavLink  title='Home' style={{textDecoration: 'none'}} to='/welcome-to-quickcast'>
          <Home className={`nav_icon nav_home`}/>
          <h3>{"Home"}</h3>
        </NavLink>
        <NavLink style={{textDecoration: 'none'}} to='/welcome-to-quickcast/login'>
          {"Login"}
        </NavLink>
        <NavLink style={{textDecoration: 'none'}} to='/welcome-to-quickcast/signup'>
          {"Sign Up"}
        </NavLink>
      </>
    )
  } else if (session.user.purpose === 'actor') {
    sessionLinks = (
      <>
        <NavLink title='Home' to='/home' style={{textDecoration: 'none'}}>
          <Home className={`nav_icon nav_home`}/>
          <h3>{"Home"}</h3>
        </NavLink>
        <NavLink className={`move_to_side_menu`} to='/home/my-portfolio' style={{textDecoration: 'none'}}>
          <MyPortfolio className={`nav_icon`}/>
         <h3>{"My portfolio"}</h3>
        </NavLink>
        <NavLink className={`move_to_side_menu`} to='/home/my-gallery' style={{textDecoration: 'none'}}>
        <MyGallery className={`nav_icon`}/>
          <h3>{"My Gallery"}</h3>
        </NavLink>
        <NavLink to='/home/search-gigs' style={{textDecoration: 'none'}}>
          <SearchIcon className={`nav_icon`}/>
          <h3>{"Search Productions"}</h3>
        </NavLink>
        <NavLink to='/home/my-applications' style={{textDecoration: 'none'}}>
          <MyApplications className={`nav_icon`}/>
          <h3>{"My Applications"}</h3>
        </NavLink>
        <button className={`move_to_side_menu logout_btn`} onClick={() => {
          dispatch(sessionActions.logout()).then(
            // navigate('/welcome-to-quickcast')
          )
        }}>
          {"Logout"}
        </button>
        <div onClick={e => setOpenMenu(!openMenu)} id='profile_section'>
          <img alt='avatar' src={session.actorPortfolio.profilePhoto} onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src="https://quickcast-app.s3.amazonaws.com/1651176057051";
          }}/>
          <h3>{session.user.userName}</h3>
        </div>
        <div className={`toggle_wrapper`}>
          {session.user && session.company && session.actorPortfolio &&
            <Toggle dispatch={dispatch} session={session}/>
          }
        </div>
        <div id='mobile_slide_menu_actor' className={`${openMenu ? 'openMenu' : null}`}>
          <div className={`profile_header`}>
            <img alt='avatar' src={session.actorPortfolio.profilePhoto} onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src="https://quickcast-app.s3.amazonaws.com/1651176057051";
            }}/>
            <XClose onClick={e => setOpenMenu(false)}/>
          </div>
          <NavLink to='/home/my-portfolio' style={{textDecoration: 'none'}}>
            <MyPortfolio className={`nav_icon`}/>
          <h3>{"My portfolio"}</h3>
          </NavLink>
          <NavLink className={`move_to_side_menu`} to='/home/my-gallery' style={{textDecoration: 'none'}}>
          <MyGallery className={`nav_icon`}/>
            <h3>{"My Gallery"}</h3>
          </NavLink>
          <button  className={`logout_btn`} onClick={() => {
            dispatch(sessionActions.logout()).then(
              // navigate('/welcome-to-quickcast')
            )
            }}>
          {"Logout"}
          </button>
          <Toggle dispatch={dispatch} session={session}/>
        </div>

      </>
    )
  } else if (session.user.purpose === 'company') {
    sessionLinks = (
      <>
        <NavLink to='/home' style={{textDecoration: 'none'}}>
          <Home className={`nav_icon nav_home`}/>
          <h3>{"Home"}</h3>
        </NavLink>
        <NavLink to='/home/my-company' style={{textDecoration: 'none'}}>
          <CompanyDetailsIcon className={`nav_icon`}/>
          <h3>{"My Company"}</h3>
        </NavLink>
        <NavLink to='/home/search-portfolios' style={{textDecoration: 'none'}}>
          <SearchTalentIcon className={`nav_icon`}/>
          <h3>{"Search Talent"}</h3>
        </NavLink>
        <button className={`move_to_side_menu logout_btn`} onClick={() => {
          dispatch(sessionActions.logout()).then(
            // navigate('/welcome-to-quickcast')
          )
        }}>
          {"Logout"}
        </button>
        <div onClick={e => setOpenMenu(!openMenu)} id='profile_section'>
          <img alt='avatar' src={session.company.image} onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src="https://quickcast-app.s3.amazonaws.com/1651176057051";
          }}/>

        </div>
        <div className={`toggle_wrapper`}>
          {session.user && session.company && session.actorPortfolio &&
            <Toggle dispatch={dispatch} session={session}/>
          }
        </div>
        <div id='mobile_slide_menu_company' className={`${openMenu ? 'openMenu' : null}`}>
          <div className={`profile_header`}>
            <img alt='avatar' src={session.company.image} onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src="https://quickcast-app.s3.amazonaws.com/1651176057051";
            }}/>
            <XClose onClick={e => setOpenMenu(false)}/>
          </div>
          <button className={`logout_btn`} onClick={() => {
            dispatch(sessionActions.logout()).then(
              // navigate('/welcome-to-quickcast')
            )
            }}>
          {"Logout"}
          </button>
          <Toggle dispatch={dispatch} session={session}/>
        </div>
      </>
    )
  } else {
    sessionLinks = (
      <>
         <NavLink to='/home' style={{textDecoration: 'none'}}>
         <Home className={`nav_icon nav_home`}/>
         <h3>{"Home"}</h3>
        </NavLink>
        <NavLink to='/home/create-portfolio'>
          {"Looking for a Gig"}
        </NavLink>
        <NavLink to='/home/create-company'>
          {"Looking for talent"}
        </NavLink>
        <button className={`logout_btn`} onClick={() => {
          dispatch(sessionActions.logout()).then(
            // navigate('/welcome-to-quickcast')
          )
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


function Toggle({dispatch, session}) {
  return(
    <div id='purpose_toggle_shell'>
      <div onClick={e => dispatch(sessionActions.toggleAndSetPurpose())} id='toggle'>
        <div id='switch' className={`${session.user.purpose === 'actor' ? 'actor_active' : 'company_active'}`}>
          <div id='toggle_icon_actor' className={`toggle_icon`}>{'👨‍🎤'}</div>
          <div id='toggle_icon_company' className={`toggle_icon`}>{'👩‍💼'}</div>
        </div>
      </div>
      <h3>{session.user.purpose === 'actor' ? 'Performer': 'Company'}</h3>
    </div>
  )
}
export default Navigation;
