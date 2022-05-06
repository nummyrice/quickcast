import React, { useState } from 'react';
import { useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './GigView.css';

const GigCard = ({gig}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const [isLoaded, setIsLoaded] = useState(false)

    // on click navigate to gigRole info
        // navigate to /home/view

    return(
        <div className='gig_card'>
            <h1>{gig.title}</h1>
            <h1>{gig.lastName}</h1>
            <p>{gig.description}</p>
            <p>{gig.rehearsalProductionDates}</p>
            <p>{gig.compensationDetails}</p>
            <p>{gig.location}</p>
            <p>{gig.gigType}</p>
            {gig.gigRoles.map(role => {
                return(
                    <div key={role.id}>
                        <h4>{gig.title}</h4>
                        <button onClick={() => navigate(`/home/view-role/${role.id}`)}>{'Details'}</button>
                    </div>
                )
            })}
        </div>

    )
}
export default GigCard
