import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { getAndSetApplications } from '../../store/session';
import { useOutletContext } from 'react-router-dom';
import './Applications.css'
// import GigCard from './GigCard';

const Applications = () => {
    const dispatch = useDispatch()
    const myApplications = useSelector(state => state.session.applications)
    const [ session ] = useOutletContext()
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getAndSetApplications(session.user.id))
        .then(data => {
        }, err => console.log("REJECTED", err))
      .catch(err => console.log("restore user error: ", err))
      .finally(() => {
        setIsLoaded(true)
        }
          )
    }, [])

    console.log('LETS CHECK OUT APPLICATIONS', myApplications)
    return(
        <div id={`apps_list`}>
            {isLoaded && myApplications.map(roleApp => {

                /* ROLEAPP
                {
                    applicantId: 1
                    companyId: 2
                    createdAt: "2022-05-06T20:39:39.880Z"
                    id: 1
                    roleDetails: {id: 1, gigId: 2, title: 'woof', gender: 'Female', ageRange: Array(2), …}
                    roleId: 2
                    status: "rejected"
                    updatedAt: "2022-
                }*/
                return(
                    <div className={`app_entry`} key={roleApp.id}>
                        <h1>{roleApp.roleDetails.title}</h1>
                        <label>{'Status:'}</label>
                        <p>{roleApp.status}</p>
                        <p>{roleApp.createdAt}</p>
                    </div>
                )
            })}
        </div>
    )
}
export default Applications
