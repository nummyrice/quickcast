import React from 'react';
import style from './Main.module.css'
import { Navigate, Outlet } from 'react-router-dom';
import Widgets from '../Widgets';
import { useSelector } from 'react-redux';

const Main = () => {
    const session = useSelector(state => state.session)
    if (!session.user) return <Navigate to='/welcome-to-quickcast'/>
    return(
        <>
            <div id={style.main} className={style.jesus}>
                <Outlet context={[session]}/>
            </div>
            <Widgets/>
        </>
    )
}

export default Main;
