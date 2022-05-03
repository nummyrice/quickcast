import React from 'react';
import style from './Main.module.css'
import { Outlet } from 'react-router-dom';
import Widgets from '../Widgets';

const Main = () => {
    return(
        <>
            <div id={style.main} className={style.jesus}>
                <Outlet/>
            </div>
            <Widgets/>
        </>
    )
}

export default Main;
