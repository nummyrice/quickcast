import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import { getAndSetFeed, clearRoles } from '../../store/roles';




const ActorFeed = () => {
    const dispatch = useDispatch()
    const roles = useSelector(state => state.roles)
    const navigate = useNavigate()
    const [isLoaded, setIsLoaded] = useState(false)
    const [offset, setOffset] = useState(0)


    useEffect(() => {
        // dispatch(clearRoles())
        console.log('how many times?')
        dispatch(getAndSetFeed(offset))
        .then(async data => {
            setOffset(offset + data.count)
            setIsLoaded(true)
        }, err => console.log("REJECTED", err))
      .catch(err => {console.log("unable to acquire actor feed ", err)})
    //   .finally(() => {
    //     })
    }, [])


    return(
        <div id='actor_feed'>
            {isLoaded && roles.map(role => {
                return(
                    <div key={role.id} className={`feed_role_entry`}>
                        <img className={`feed_profile_image`} alt='portfolio' src={role.gig.Company.image}  onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src="https://quickcast-app.s3.amazonaws.com/1651176057051";
                        }}/>
                        <h1>{role.title}</h1>
                        <h3>{role.gender}</h3>
                        <p>{role.ageRange}</p>
                        <p>{role.description}</p>
                        <h3>{role.gig.title}</h3>
                        <button className={`quickcast_submit_btn`} onClick={e => navigate(`/home/view-role/${role.id}`)}>{'Details and Apply'}</button>
                    </div>
                )
            })}

        </div>
    )
}
export default ActorFeed
