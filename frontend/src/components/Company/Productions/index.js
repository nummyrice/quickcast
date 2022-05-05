import React, { useState, useEffect } from 'react';
import { useOutletContext} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import CreateProduction from './CreateProduction';
import EditProduction from './EditProduction'
import { getAndSetProductions } from '../../../store/session';
import './Productions.css';

function Productions() {
    const dispatch = useDispatch()
    const productions = useSelector(state => state.session.productions)
    const [ session ] = useOutletContext()
    const [isLoaded, setIsLoaded] = useState(false)
    useEffect(() => {
        dispatch(getAndSetProductions(session.user.id))
        .then(data => {
          }, err => console.log("REJECTED", err))
        .catch(err => console.log("restore user error: ", err))
        .finally(() => {
          setIsLoaded(true)
          }
            )
          }, []);
    // /home/my-company/productions
        // displays productions tab
    // /home/my-company/roles
        // displays role tabs
            // roles are sorted by production
    return(
    <div id='my_productions'>
        {isLoaded &&
            productions.map(gig => {
                return(
                    <EditProduction gig={gig}/>
                )
            })
        }
        <CreateProduction/>
    </div>
    )
};

export default Productions;
