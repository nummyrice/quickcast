import React, { useEffect, useState } from 'react';
import {  useDispatch} from 'react-redux';
import blankProfilePhoto from './assets/blank_profile.png'

const PortfolioCard = ({portfolio}) => {
    const dispatch = useDispatch()
    // const [isLoaded, setIsLoaded] = useState(false)
    const [validatedUrl, setValidatedUrl] = useState(false)
    useEffect(() => {
        var request = new XMLHttpRequest();
        if (portfolio.profilePhoto) {
            request.open("GET", portfolio.profilePhoto, true);
            request.send();
            request.onload = function() {
                console.log("reqest status: ", request.status)
              if (request.status === 200) //if(statusText == OK)
              {
                  setValidatedUrl(true)
                console.log("image exists");
              } else {
                console.log("image doesn't exist");
              }
            }
        }
    }, [])


    return(
        <div className='portfolio_card'>
            {validatedUrl &&
            <img src={portfolio.profilePhoto}/>
            }
            {!validatedUrl &&
            <img src={blankProfilePhoto}/>

            }
            <h1>{portfolio.firstName}</h1>
            <h1>{portfolio.lastName}</h1>
            <p>{getAge(portfolio.dateOfBirth)}</p>
            <p>{portfolio.biography}</p>
            <p></p>



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
