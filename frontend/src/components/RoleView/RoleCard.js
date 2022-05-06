import React, { useState } from 'react';
import { useDispatch} from 'react-redux';
import { useParams } from 'react-router-dom';
import './RoleView.css';

const RoleCard = ({role, gigName}) => {
    const dispatch = useDispatch()
    // const [isLoaded, setIsLoaded] = useState(false)

    return(
        <div className='role_card'>
            <h1>{role.title}</h1>
            <h1>{role.gender}</h1>
            <p>{role.ageRange}</p>
            <p>{role.description}</p>
            {/* <p>{gigName}</p> */}
        </div>
    )
}
export default RoleCard
