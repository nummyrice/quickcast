import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { csrfFetch } from '../../store/csrf';
// import { getAndSetGigs } from '../../store/gigs';
// import GigCard from './GigCard';
import RoleCard from '../RoleView/RoleCard';
import { setErrors } from '../../store/errors';

const ViewOne = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const navigate = useNavigate()
    const [role, setRole] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)


    useEffect(() => {
        csrfFetch(`/api/gigrole/${params.id}`)
        .then(async res => {
            const data = await res.json()
            setRole(data)
            setIsLoaded(true)
        }, err => {dispatch(setErrors(['unable to locate role, redirecting...'])); console.log("REJECTED", err); navigate('/home')})
      .catch(err => {dispatch(setErrors([err])); console.log("get role by ID error: ", err);  navigate('/home')})
      .finally(() => {
        }
          )
    }, [])
    return(
        <div>
            {isLoaded && role &&
                <RoleCard role={role}/>
            }
        </div>
    )
}
export default ViewOne
