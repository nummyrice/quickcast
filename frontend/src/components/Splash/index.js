import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import "./Splash.css";

function Splash() {
    return(
    <div className="splash_main">
        <div>
            <h1>Welcome to quickCast</h1>
        </div>
        <div className='splash_description'>
            <p>here we look to bring actors, performers and artists together with companies from across the country who are searching for talent</p>
        </div>
        <div>
            <div className='splash_description'>
                <NavLink to='/companies'>View Companies</NavLink>
            </div>
            <div className='splash_description'>
                <NavLink to='create-company'> Create Company</NavLink>
            </div>
        </div>
    </div>)
};
export default Splash;
