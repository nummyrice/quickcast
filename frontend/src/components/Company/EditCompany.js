import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAndRemoveCompany, updateAndSetCompany } from '../../store/session';

const EditCompany = () => {
    const session = useSelector(state => state.session)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [name, setName] = useState({value: session.company?.name, edit: false})
    const [phoneNumber, setPhoneNumber] = useState({value: session.company?.phoneNumber, edit: false})
    const [details, setDetails] = useState({value: session.company?.details, edit: false})
    const [image, setImage] = useState({value: session.company?.image, edit: false})
    const [website, setWebsite] = useState({value: session.company?.website, edit: false})

    const handleSubmit = (e) => {
        e.preventDefault()
        const barePhoneNumber = phoneNumber.value.replace(/\D/g, '');
        const editCompany = {id:session.company.id, userId: session.user.id}
        if (name.edit) editCompany.name = name.value
        if (phoneNumber.edit) editCompany.phoneNumber = barePhoneNumber
        if (details.edit) editCompany.details = details.value
        if (image.edit) editCompany.image = image.value
        if (website.edit) editCompany.website = website.value
        dispatch(updateAndSetCompany(editCompany))
        .then(result => {
            console.log("actor portfolio succesffully updated")
            if (result.ok) return  navigate('/home');
        })
        // .finally()
    }

    const handleDelete = (e) => {
        e.preventDefault()
        dispatch(deleteAndRemoveCompany(session.company.id))
        .then(() => {
            console.log('successfully deleted portfolio')
        })
    }
    return(
        <form className={`quickcast_edit_form`} onSubmit={e => handleSubmit(e)} id='edit_company_form'>
            <img className={`edit_profile`} alt='company logo' id='company_image' src={image.value} onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src="https://quickcast-app.s3.amazonaws.com/1651176057051";
            }}/>
            <label htmlFor='profilePhoto'>{"Profile Photo"}</label>
            <input type='file' onChange={e => setImage({value:e.target.files[0], edit: true})} name='profilePhoto'/>
            <label htmlFor='companyName'>{"Company"}</label>
            <span>
                <input  readOnly={!name.edit} onClick={e => setName({value: name.value, edit:true })} name='name' onChange={e => setName({value: e.target.value, edit: name.edit})} value={name.value}/>
            </span>
            <label htmlFor='phone'>{"Phone"}</label>
            <span>
                <input  readOnly={!phoneNumber.edit} type='tel'  name='phone' onClick={e => { setPhoneNumber({value: phoneNumber.value, edit:true })}}  onChange={e => setPhoneNumber({value: formatPhoneNumber(e.target.value), edit: phoneNumber.edit})} value={phoneNumber.value}/>
            </span>
            <label htmlFor='details'>{"Details"}</label>
            <span>
                <input  readOnly={!details.edit} type='text' name='details' onClick={e => { setDetails({value: details.value, edit:true })}} onChange={e => setDetails({value: e.target.value, edit: details.edit})} value={details.value}/>
            </span>
            <label htmlFor='website'>{"Website"}</label>
            <span>
                <input  readOnly={!website.edit} type='url' name='website' onClick={e => { setWebsite({value: website.value, edit:true })}} onChange={e => setWebsite({value: e.target.value, edit: website.edit})} value={website.value}/>
            </span>
            <button className={`quickcast_submit_btn`} form='edit_company_form' type='submit'>{'Submit'}</button>
            <button className={`low_visibility_link`} onClick={e => handleDelete(e)}>{"Delete Company"}</button>
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

export default EditCompany;
