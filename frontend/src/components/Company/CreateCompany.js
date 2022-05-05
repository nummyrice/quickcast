import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import * as sessionActions from "../../store/session";
// import * as companyActions from "../../store/company";
import '../CompanyView/CompanyView.css'

function CreateCompany() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const session = useSelector((state) => state.session)
    const [companyName, setCompanyName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [details, setDetails] = useState('')
    const [image, setImage] = useState('')
    const [website, setWebsite] = useState('')

    const onChangeImageFile = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(sessionActions.createAndSetCompany({userId: session.user.id, companyName, phoneNumber:phoneNumber.replace(/\D/g, ''), details, image, website }))
        .then(result => {
            console.log("actor portfolio successfully submitted", result)
            if (result.ok) navigate('/home/my-company')
        })
    }

    if (session.company) {
        return (<Navigate to='/my-company'/>);
    }
    return(
        <form id='create_company_form' className='company_card' onSubmit={handleSubmit}>
            <label>{"Company Name"}</label>
                <input
                type='text'
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                ></input>
            <label>{"Phone Number"}</label>
                <input
                type='tel'
                value={phoneNumber}
                placeholder='ex. 191-191-1919'
                onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
                ></input>
            <label>{"Company Bio"}</label>
                <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                ></textarea>
            <label>{"Image or Logo"}</label>
                <input
                type='file'
                onChange={onChangeImageFile}
                ></input>
            <label>{"Website"}</label>
                <input
                type="url"
                value={website}
                placeholder="optional website url"
                onChange={(e) => setWebsite(e.target.value)}
                ></input>
            <button form='create_company_form' type="submit">{"Submit"}</button>

        </form>
    )
};

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

export default CreateCompany;
