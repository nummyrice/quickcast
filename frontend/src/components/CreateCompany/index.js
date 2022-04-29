import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
// import * as sessionActions from "../../store/session";
// import * as companyActions from "../../store/company";
import '../CompanyView/CompanyView.css'

function CreateCompany() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [companyName, setCompanyName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [details, setDetails] = useState('');
    const [image, setImage] = useState('');
    const [website, setWebsite] = useState('');
    const [errors, setErrors] = useState([]);
    // const history = useHistory();

    const onChangeImageFile = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions
            .createAndSetCompany({ companyName, phoneNumber, details, image, website }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    };
    // IN PROGRESS: redirect to company page
    if (!sessionUser) {
        // history.push('/')
        return (<Redirect to='/'/>)
    };

    if (sessionUser.Company) {
        return (<Redirect to='/company'/>);
    }
    return(
        <form className='company_card'onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <div>
            <label>Company Name
                <input
                type='text'
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                ></input>
            </label>
            </div>
            <div>
            <label>Phone Number
                <input
                type='tel'
                value={phoneNumber}
                placeholder='ex. 1-191-191-1919'
                onChange={(e) => setPhoneNumber(e.target.value)}
                ></input>
            </label>
            </div>
            <div>
            <label>Company Bio
                <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                ></textarea>
            </label>
            </div>
            <div>
            <label>Image or Logo
                <input
                type='file'
                // value={image}
                onChange={onChangeImageFile}
                ></input>
            </label>
            </div>
            <div>
            <label>Website
                <input
                type="url"
                value={website}
                placeholder="optional website url"
                onChange={(e) => setWebsite(e.target.value)}
                ></input>
            </label>
            </div>
            <div>
            <button type="submit">submit</button>
            </div>
        </form>
    )
};

export default CreateCompany;
