import React from 'react';
import'./Main.css'
import { Navigate, Outlet, useNavigate, useLocation } from 'react-router-dom';
import Widgets from '../Widgets';
import { useSelector } from 'react-redux';

const Main = () => {
    const session = useSelector(state => state.session)
    const navigate = useNavigate()
    const location = useLocation()
    if (!session.user) return <Navigate to='/welcome-to-quickcast'/>
    return(
        <>
            <div id='main'>
                {session.user.purpose === null && location.pathname === '/home' &&
                    <div id='choose_a_path'>
                        <p>{"Now let's set up your profile and portfolio so you can start searching."}</p>
                        <button className={`quickcast_submit_btn`}  onClick={e => navigate('/home/create-portfolio')}>{'Create Portfolio'}</button>
                        <p className={'low_visibility_link'} onClick={e => navigate('/home/create-company')}>{'looking to hire?'}</p>
                    </div>
                }
                <Outlet context={[session]}/>
                <div className={`mobile_nav_spacer`}/>
            </div>
            <Widgets/>
        </>
    )
}

export default Main;
