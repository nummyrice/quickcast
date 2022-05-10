import React, {useState} from 'react';
import { NavLink, Navigate, useNavigate, Outlet} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as CompanyIcon } from '../../assets/company.svg';
import { ReactComponent as ProductionIcon } from '../../assets/video_camera.svg'
import { ReactComponent as RolesIcon } from '../../assets/recent_actors.svg'
import './Company.css';

const Company = () => {
    const session = useSelector(state => state.session)
    const dispatch = useDispatch()
    const navigate = useNavigate()



    if (!session.company) return <Navigate to='/home/create-company'/>
    return(
        <>
            <div id='company_nav'>
                <NavLink style={{textDecoration: 'none'}} to='/home/my-company' end>
                    <CompanyIcon/>
                    <h3>{"Company"}</h3>
                </NavLink>
                <NavLink style={{textDecoration: 'none'}} to='/home/my-company/productions'>
                    <ProductionIcon/>
                    <h3>{"Productions"}</h3>
                </NavLink>
                <NavLink style={{textDecoration: 'none'}} to='/home/my-company/roles'>
                    <RolesIcon/>
                    <h3>{"Roles"}</h3>
                </NavLink>
            </div>
            <Outlet context={[session]}/>
        </>
    )
}

export default Company;
