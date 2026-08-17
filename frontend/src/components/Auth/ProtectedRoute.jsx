import React from 'react';
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

const ProtectedRoute = props => {
    const sessionUser = useSelector(state => state.session.user)
    return (
        (sessionUser)? props.children  : <Navigate to='/welcome-to-quickcast/login' />
    )
}

export default ProtectedRoute;
