import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './CreateActorPortfolio.css';
import { createAndSetPortfolio } from '../../store/session';

const CreateActorPortfolio = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [biography, setBiography] = useState('')
    const [profilePhoto, setProfilePhoto] = useState('')
    const [website, setWebsite] = useState('')
    const [location, setLocation] = useState('')

    function formatPhoneNumber(value) {
        // if input value is falsy eg if the user deletes the input, then just return
        if (!value) return value;

        // clean the input for any non-digit values.
        const phoneNumber = value.replace(/[^\d]/g, '');

        // phoneNumberLength is used to know when to apply our formatting for the phone number
        const phoneNumberLength = phoneNumber.length;

        // we need to return the value with no formatting if its less then four digits
        // this is to avoid weird behavior that occurs if you  format the area code to early

        if (phoneNumberLength < 4) return phoneNumber;

        // if phoneNumberLength is greater than 4 and less the 7 we start to return
        // the formatted number
        if (phoneNumberLength < 7) {
          return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
        }

        // finally, if the phoneNumberLength is greater then seven, we add the last
        // bit of formatting and return it.
        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
          3,
          6
        )}-${phoneNumber.slice(6, 10)}`;
      }

    const handleSubmit = (e) => {
        e.preventDefault()
        const newPortfolio = {
            userId: user.id,
            firstName,
            lastName,
            phoneNumber,
            dateOfBirth,
            biography,
            profilePhoto,
            website,
            location
        }
        dispatch(createAndSetPortfolio(newPortfolio))
    }

    return(
        <form onSubmit={e => handleSubmit(e)} id='create_portfolio_form'>
            <label htmlFor='firstName'>{"First Name"}</label>
            <input name='firstName'onChange={e => setFirstName(e.target.value)} value={firstName}/>
            <label htmlFor='lastName'>{"Last Name"}</label>
            <input name='lastName' onChange={e => setLastName(e.target.value)} value={lastName}/>
            <label htmlFor='phone'>{"Phone"}</label>
            <input type='tel' pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"  name='phone' onChange={e => setPhoneNumber(formatPhoneNumber(e.target.value))} value={phoneNumber}/>
            <label htmlFor='dateOfBirth'>{"Date of Birth"}</label>
            <input type='date' name='dateOfBirth' onChange={e => setDateOfBirth(e.target.value)} value={dateOfBirth}/>
            <label htmlFor='biography'>{"Biography"}</label>
            <input type='text' name='biography'  onChange={e => setBiography(e.target.value)} value={biography}/>
            <label htmlFor='profilePhoto'>{"Profile Photo"}</label>
            <input type='file' onChange={e => setProfilePhoto(e.target.files[0])} name='profilePhoto' value={profilePhoto}/>
            <label htmlFor='website'>{"Website"}</label>
            <input type='url' name='website'onChange={e => setWebsite(e.target.value)} value={website}/>
            <label htmlFor='location' >{"Zip / Postal Code"}</label>
            <input type='text' name='location' onChange={e => setLocation(e.target.value)} value={location}/>
            <button type='submit'>{'Submit'}</button>
        </form>
    )
}

export default CreateActorPortfolio;
