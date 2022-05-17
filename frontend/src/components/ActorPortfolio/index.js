import React, {useState} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateAndSetPortfolio, deleteAndRemovePortfolio } from '../../store/session';

const ActorPortfolio = () => {
    const session = useSelector(state => state.session)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState({value: session.actorPortfolio?.firstName, edit: false})
    const [lastName, setLastName] = useState({value: session.actorPortfolio?.lastName, edit: false})
    const [phoneNumber, setPhoneNumber] = useState({value: session.actorPortfolio?.phoneNumber, edit: false})
    const [dateOfBirth, setDateOfBirth] = useState({value: session.actorPortfolio?.dateOfBirth, edit: false})
    const [biography, setBiography] = useState({value: session.actorPortfolio?.biography, edit: false})
    const [profilePhoto, setProfilePhoto] = useState({value: session.actorPortfolio?.profilePhoto, edit: false})
    const [website, setWebsite] = useState({value: session.actorPortfolio?.website, edit: false})
    const [location, setLocation] = useState({value: session.actorPortfolio?.location, edit: false})

    const handleSubmit = (e) => {
        e.preventDefault()
        const barePhoneNumber = phoneNumber.value.replace(/\D/g, '');
        const editPortfolio = {id:session.actorPortfolio.id, userId: session.user.id}
        if (firstName.edit) editPortfolio.firstName = firstName.value;
        if (lastName.edit) editPortfolio.lastName = lastName.value;
        if (phoneNumber.edit) editPortfolio.phoneNumber = barePhoneNumber;
        if (dateOfBirth.edit) editPortfolio.dateOfBirth = dateOfBirth.value;
        if (biography.edit) editPortfolio.biography = biography.value;
        if (profilePhoto.edit) editPortfolio.image = profilePhoto.value;
        if (website.edit) editPortfolio.website = website.value;
        if (location.edit) editPortfolio.location = location.value;
        dispatch(updateAndSetPortfolio(editPortfolio))
        .then(result => {
            console.log("actor portfolio succesffully updated")
            if (result.ok) return  navigate('/home');
        })
        // .finally()

    }

    const handleDelete = (e) => {
        e.preventDefault()
        dispatch(deleteAndRemovePortfolio(session.actorPortfolio.id))
        .then(() => {
            console.log('successfully deleted portfolio')
            navigate('/home')
        })
    }
    if (!session.actorPortfolio) return <Navigate to='/home/create-portfolio'/>
    return(
        <form className={`quickcast_edit_form`} onSubmit={e => handleSubmit(e)} id='edit_portfolio_form'>
            <img className={`edit_profile`} alt='actor avatar' id='profile_photo' src={session.actorPortfolio.profilePhoto} onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src="https://quickcast-app.s3.us-west-1.amazonaws.com/Screen+Shot+2022-05-10+at+1.42.17+PM.png";
            }}/>
            <label htmlFor='profilePhoto'>{"Profile Photo"}</label>
            <input type='file' onChange={e => setProfilePhoto({value:e.target.files[0], edit: true})} name='profilePhoto'/>
            <label htmlFor='firstName'>{"First Name"}</label>
            <span>
                <input  readOnly={!firstName.edit} onClick={e => setFirstName({value: firstName.value, edit:true })} name='firstName' onChange={e => setFirstName({value: e.target.value, edit: firstName.edit})} value={firstName.value}/>
            </span>
            <label htmlFor='lastName'>{"Last Name"}</label>
            <span>
                <input  readOnly={!lastName.edit} name='lastName' onClick={e => { setLastName({value: lastName.value, edit:true })}} onChange={e => setLastName({value: e.target.value, edit: lastName.edit})} value={lastName.value}/>
            </span>
            <label htmlFor='phone'>{"Phone"}</label>
            <span>
                <input  readOnly={!phoneNumber.edit} type='tel'  name='phone' onClick={e => { setPhoneNumber({value: phoneNumber.value, edit:true })}}  onChange={e => setPhoneNumber({value: formatPhoneNumber(e.target.value), edit: phoneNumber.edit})} value={phoneNumber.value}/>
            </span>
            <label htmlFor='dateOfBirth'>{"Date of Birth"}</label>
            <span>
                <input  readOnly={!dateOfBirth.edit} type='date' name='dateOfBirth' onClick={e => { setDateOfBirth({value: dateOfBirth.value, edit:true })}} onChange={e => setDateOfBirth({value: e.target.value, edit: dateOfBirth.edit})} value={dateOfBirth.value}/>
            </span>
            <label htmlFor='biography'>{"Biography"}</label>
            <span>
                <input  readOnly={!biography.edit} type='text' name='biography' onClick={e => { setBiography({value: biography.value, edit:true })}} onChange={e => setBiography({value: e.target.value, edit: biography.edit})} value={biography.value}/>
            </span>
            <label htmlFor='website'>{"Website"}</label>
            <span>
                <input  readOnly={!website.edit} type='url' name='website' onClick={e => { setWebsite({value: website.value, edit:true })}} onChange={e => setWebsite({value: e.target.value, edit: website.edit})} value={website.value}/>
            </span>
            <label htmlFor='location' >{"Zip / Postal Code"}</label>
            <span>
                <input  readOnly={!location.edit} type='text' name='location' onClick={e => { setLocation({value: location.value, edit:true })}} onChange={e => setLocation({value: e.target.value, edit: location.edit})} value={location.value}/>
            </span>
            <button className={`quickcast_submit_btn`} form='edit_portfolio_form' type='submit'>{'Submit'}</button>
            <button className={`low_visibility_link`} onClick={e => handleDelete(e)}>{"Delete Portfolio"}</button>
        </form>
    )
}

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

export default ActorPortfolio;
