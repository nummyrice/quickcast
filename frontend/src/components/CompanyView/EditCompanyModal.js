import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import { Redirect } from "react-router-dom";
import  { useHistory } from 'react-router-dom';
import './CompanyView.css';



function EditCompanyModal({ onComplete }) {
    //TODO if a falsey value exists in the database for a field in Company profile then the default value should be an empty string
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [companyName, setCompanyName] = useState(sessionUser.Company.name);
    const [phoneNumber, setPhoneNumber] = useState(sessionUser.Company.phoneNumber);
    const [details, setDetails] = useState(sessionUser.Company.details);
    const [image, setImage] = useState();
    const [website, setWebsite] = useState(sessionUser.Company.website);
    const [errors, setErrors] = useState([]);
    const [deleteWarning, setDeleteWarning] = useState(true);
    const history = useHistory();


    const onChangeImageFile = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };
    // Submits put request to update database
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions
            .updateAndSetCompany({ companyName, phoneNumber, details, image, website }))
            .then((res) => {
                history.push('/company')
                onComplete();
            })
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });

    };

    const submitDeleteRequest = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.deleteCompany(sessionUser.Company));
    };

    if (!sessionUser || !sessionUser.Company) {
        return (<Redirect to='/'/>)
    };
    return(
        <form onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <label>Company Name
                <input
                type='text'
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                ></input>
            </label>
            <label>Phone Number
                <input
                type='tel'
                value={phoneNumber}
                placeholder='ex. 1-191-191-1919'
                onChange={(e) => setPhoneNumber(e.target.value)}
                ></input>
            </label>
            <label>Company Bio
                <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                ></textarea>
            </label>
            <label>Image or Logo
                <input
                type='file'
                // value={image}
                onChange={onChangeImageFile}
                ></input>
            </label>
            <label>Website
                <input
                type="url"
                value={website}
                placeholder="optional website url"
                onChange={(e) => setWebsite(e.target.value)}
                ></input>
            </label>
            <button type="submit">submit</button>
            {!deleteWarning && (
                <div>
                    <span>Proceed to delete this company?</span>
                    <button onClick={submitDeleteRequest}>delete company</button>
                </div>
            )}
            {deleteWarning &&(<button onClick={() => setDeleteWarning(false)}>delete company</button>)}
        </form>
    )
}

export default EditCompanyModal;
