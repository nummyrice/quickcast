import React, { useState } from 'react';
import { useDispatch} from 'react-redux';
import './PortfolioView.css';

const PortfolioCard = ({portfolio}) => {
    const dispatch = useDispatch()
    // const [isLoaded, setIsLoaded] = useState(false)
    console.log('portfolio___: ', portfolio)
    return(
        <div className='portfolio_card'>
            <img className={`profile_image`} alt='portfolio' src={portfolio.profilePhoto}  onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src="https://quickcast-app.s3.amazonaws.com/1651176057051";
            }}/>
            <h1>{portfolio.firstName}</h1>
            <h1>{portfolio.lastName}</h1>
            <p>{`Age: ${getAge(portfolio.dateOfBirth)}`}</p>
            <p>{portfolio.biography}</p>
            <p>{portfolio.location}</p>
            <div className={`gallery_scroll`}>
                {portfolio.gallery.map(galleryImage => {
                    return(
                        <img className={`gallery_image`} alt={`${galleryImage.title}`} src={galleryImage.photoUrl} onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src="https://quickcast-app.s3.amazonaws.com/1651176057051";
                        }}>{}</img>
                    )
                })}
            </div>
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
