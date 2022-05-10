import React from 'react';
import'./Main.css'
import { Navigate, Outlet } from 'react-router-dom';
import Widgets from '../Widgets';
import { useSelector } from 'react-redux';

const Main = () => {
    const session = useSelector(state => state.session)
    if (!session.user) return <Navigate to='/welcome-to-quickcast'/>
    return(
        <>
            <div id='main'>
                <Outlet context={[session]}/>
                <div className={`mobile_nav_spacer`}/>
            </div>
            <Widgets/>
        </>
    )
}

export default Main;
