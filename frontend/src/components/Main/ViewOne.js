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
    const user = useSelector(state => state.session.user)
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

    const apply = async (companyId, applicantId, roleId) => {
        try {
            const response = await csrfFetch('/api/application', {
                method: 'POST',
                body: JSON.stringify({companyId, applicantId, roleId})
            })
                const updatedApplicants = [...role.applicants]
                updatedApplicants.push({applicantId: user.id})
              setRole({...role, applicants: updatedApplicants})
            return response;
          } catch (res) {
            res.json()
            .then((data) => {
              if (data.errors) dispatch(setErrors(data.errors))
            })
            return res;
          }
    }
    return(
        <div>
            {isLoaded && role &&
                <RoleCard apply={apply} role={role} user={user}/>
            }
        </div>
    )
}
export default ViewOne
