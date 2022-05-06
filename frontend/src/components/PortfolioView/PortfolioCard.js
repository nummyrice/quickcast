import React, { useState } from 'react';
import { useDispatch} from 'react-redux';
import './PortfolioView.css';

const PortfolioCard = ({portfolio}) => {
    const dispatch = useDispatch()
    // const [isLoaded, setIsLoaded] = useState(false)

    return(
        <div className='portfolio_card'>
            <img alt='portfolio' src={portfolio.profilePhoto}/>
            <h1>{portfolio.firstName}</h1>
            <h1>{portfolio.lastName}</h1>
            <p>{getAge(portfolio.dateOfBirth)}</p>
            <p>{portfolio.biography}</p>
            <p>{portfolio.location}</p>
        </div>
    )
}
export default PortfolioCard

function getAge(dateString) {
    var birthday = new Date(dateString);
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}
