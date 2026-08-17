import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { getAndSetGigs } from '../../store/gigs';
import GigCard from './GigCard';

const GigView = () => {
    const dispatch = useDispatch()
    const gigs = useSelector(state => state.gigs)
    const [isLoaded, setIsLoaded] = useState(false)
    const [pageOffset, setPageOffset] = useState(0)

    useEffect(() => {
        dispatch(getAndSetGigs(pageOffset))
        .then(data => {
        }, err => console.log("REJECTED", err))
      .catch(err => console.log("restore user error: ", err))
      .finally(() => {
        setIsLoaded(true)
        }
          )
    }, [])
    return(
        <div>
            {isLoaded && gigs.map(gig => {
                return(
                    <GigCard key={gig.id} gig={gig}/>
                )
            })}
        </div>
    )
}
export default GigView
