import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { getPortfolios } from '../../store/portfolio';
import PortfolioCard from './PortfolioCard';

const PortfolioView = () => {
    const dispatch = useDispatch()
    const actorPortfolios = useSelector(state => state.portfolios)
    const [isLoaded, setIsLoaded] = useState(false)
    const [pageOffset, setPageOffset] = useState(0)

    useEffect(() => {
        dispatch(getPortfolios(pageOffset))
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
            {isLoaded && actorPortfolios.map(portfolio => {
                return(
                    <PortfolioCard key={portfolio.id} portfolio={portfolio}/>
                )
            })}
        </div>
    )
}
export default PortfolioView
