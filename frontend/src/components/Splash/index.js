import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";
import "./Splash.css";

function Splash() {
    const sessionUser = useSelector((state) => state.session?.user);
    return(
    <div className="splash_main">
        <div>
            <h1>Welcome to quickCast</h1>
        </div>
        <div className='splash_description'>
            <p>Here we look to bring actors, performers and artists together with companies from across the country who are searching for talent. Please start by signing in and</p>
        </div>
        <div>
            <div className='splash_description'>
                <NavLink to='/companies'>View Companies</NavLink>
            </div>
            <div className='splash_description'>
                <NavLink to='create-company'> Create Company</NavLink>
            </div>
            {sessionUser?.Company && (<div className='splash_description'>
                <NavLink to='company'>View My Company</NavLink>
            </div>)}
        </div>
        <div className='splash_decor'>
            <img src='https://res.cloudinary.com/quickcast/image/upload/v1636991177/cinema_hu0ibf.jpg'/>
        </div>
        <div className='splash_decor'>
            <img  src='https://res.cloudinary.com/quickcast/image/upload/v1636991186/casting2_cs9ruh.jpg'/>
        </div>
    </div>)
};
export default Splash;
