import React, {useState} from 'react';
import'./Main.css'
import { Navigate, Outlet, useNavigate, useLocation } from 'react-router-dom';
import Widgets from '../Widgets';
import { useSelector, useDispatch } from 'react-redux';
import { addToRoles } from '../../store/roles';

const Main = () => {
    const session = useSelector(state => state.session)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const [roleOffset, setRoleOffset] = useState(0)
    const [appOffset, setAppOffset] = useState(0)
    const [portfolioOffset, setPortfolioOffset] = useState(0)
    if (!session.user) return <Navigate to='/welcome-to-quickcast'/>

    const scrollCheck = (e) => {
        // console.log('scrolling...')
        const { scrollTop, offsetHeight, scrollHeight } = e.target
        if ((scrollTop + offsetHeight) >= scrollHeight) {
            if (session.purpose === 'actor' && location.pathname === '/home')
          dispatch(addToRoles(roleOffset))
            .then(data => {
                setRoleOffset(roleOffset + data.rows.length + 1)
            })
        }
    }

    return(
        <>
            <div onScroll={scrollCheck} id='main'>
                {session.user.purpose === null && location.pathname === '/home' &&
                    <div id='choose_a_path'>
                        <p>{"Now let's set up your profile and portfolio so you can start searching."}</p>
                        <button className={`quickcast_submit_btn`}  onClick={e => navigate('/home/create-portfolio')}>{'Create Portfolio'}</button>
                        <p className={'low_visibility_link'} onClick={e => navigate('/home/create-company')}>{'looking to hire?'}</p>
                    </div>
                }
                <Outlet context={[session, roleOffset, setRoleOffset, appOffset, setAppOffset, portfolioOffset, setPortfolioOffset]}/>
                <div className={`mobile_nav_spacer`}/>
            </div>
            <Widgets/>
        </>
    )
}

export default Main;
