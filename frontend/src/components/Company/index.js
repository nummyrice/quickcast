import React, {useState} from 'react';
import { NavLink, Navigate, useNavigate, Outlet} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Company.css';

const Company = () => {
    const session = useSelector(state => state.session)
    const dispatch = useDispatch()
    const navigate = useNavigate()



    if (!session.company) return <Navigate to='/home/create-company'/>
    return(
        <>
            <div id='company_nav'>
                <NavLink to='/home/my-company'>{"My Company"}</NavLink>
                <NavLink to='/home/my-company/productions'>{"Productions"}</NavLink>
                <NavLink to='/home/my-company/roles'>{"Roles"}</NavLink>
            </div>
            <Outlet context={[session]}/>
        </>
    )
}

export default Company;
