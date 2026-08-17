import React, { useState, useEffect } from 'react';
import { useOutletContext} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import CreateRole from './CreateRole';
import EditRole from './EditRole'
import { getAndSetRoles } from '../../../store/session';
import './Roles.css';

function Roles() {
    const dispatch = useDispatch()
    const roles = useSelector(state => state.session.roles)
    const [ session ] = useOutletContext()
    const [isLoaded, setIsLoaded] = useState(false)
    useEffect(() => {
        dispatch(getAndSetRoles(session.user.id))
        .then(data => {
          }, err => console.log("REJECTED", err))
        .catch(err => console.log("restore user error: ", err))
        .finally(() => {
          setIsLoaded(true)
          }
            )
          }, []);

    // /home/my-company/roles
        // displays role tabs
            // roles are sorted by production
    return(
    <div id='my_roles'>
        {isLoaded && roles.length > 0 && <CreateRole sessionUser={session.user.id} gigs={roles}/>}
        {isLoaded &&
            roles.map(gig => {
                return(
                    <div key={gig.id}>
                        <h1>{gig.title}</h1>
                        {gig.gigRoles.map(role => {
                            return(
                                <EditRole key={role.id} role={role} gigs={roles} session={session}/>
                            )
                        })}
                    </div>
                )
            })
        }
    </div>
    )
};

export default Roles;
