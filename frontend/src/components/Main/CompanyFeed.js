import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import {  useNavigate, useOutletContext } from 'react-router-dom';
import { getAndSetCompanyFeed, clearPortfolios, get } from '../../store/portfolio';
import PortfolioCard from '../PortfolioView/PortfolioCard';




const CompanyFeed = () => {
    const dispatch = useDispatch()
    const portfolios = useSelector(state => state.portfolios)
    const navigate = useNavigate()
    const [isLoaded, setIsLoaded] = useState(false)

    const [session, roleOffset, setRoleOffset, appOffset, setAppOffset, portfolioOffset, setPortfolioOffset] = useOutletContext()

    useEffect(() => {
        // dispatch(clearRoles())
        console.log('how many times?')
        dispatch(getAndSetCompanyFeed(portfolioOffset))
        .then(async data => {
            setPortfolioOffset(portfolioOffset + data.rows.length + 1)
            setIsLoaded(true)
        }, err => console.log("REJECTED", err))
      .catch(err => {console.log("unable to acquire company feed ", err)})
    //   .finally(() => {
    //     })
    }, [])

    return(
        <div id='company_feed'>
            {isLoaded && portfolios.map(portfolio => {
                return(
                   <PortfolioCard portfolio={portfolio} />
                )
            })}

        </div>
    )
}
export default CompanyFeed
