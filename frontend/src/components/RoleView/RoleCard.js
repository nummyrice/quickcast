import React, { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import './RoleView.css';

const RoleCard = ({role, gigName, user, apply}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const [isLoaded, setIsLoaded] = useState(false)
    console.log('CURRENT ROLE: ', role.applicants)
     let applicationDetails;
     if (role.applicants.some(applicant => applicant.applicantId === user.id)) {
         applicationDetails = (
         <>
            <p>Your application has been submit</p>
            <button onClick={e => navigate('/home')}>{'View Status'}</button>
         </>)
     } else {
         applicationDetails = (
            <button onClick={e => apply(role.gig.companyId, user.id, role.id)}>{'Apply'}</button>
         )
     }
    return(
        <div className='role_card'>
            <h1>{role.title}</h1>
            <h1>{role.gender}</h1>
            <p>{role.ageRange}</p>
            <p>{role.description}</p>
            {/* <p>{gigName}</p> */}
            {applicationDetails}

        </div>
    )
}
export default RoleCard
