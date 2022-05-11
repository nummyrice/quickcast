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
            <p className={`app_status_text`}>Your application has been submitted</p>
            <button className={`quickcast_submit_btn`} onClick={e => navigate('/home/my-applications')}>{'View Status'}</button>
         </>)
     } else {
         applicationDetails = (
            <button className={`quickcast_submit_btn`} onClick={e => apply(role.gig.companyId, user.id, role.id)}>{'Apply'}</button>
         )
     }
    return(
        <div className='role_card'>
            <h1>{role.title}</h1>
            <h3>{role.gender}</h3>
            <p>{role.ageRange}</p>
            <p>{role.description}</p>
            {/* <p>{gigName}</p> */}
            {applicationDetails}
        </div>
    )
}
export default RoleCard
