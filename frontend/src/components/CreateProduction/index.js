import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import '../CompanyView/CompanyView.css';


function CreateProduction() {
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [rehearsalProductionDates, setrehearsalProductionDates] = useState('');
    const [compensationDetails, setCompensationDetails] = useState('');
    const [location, setLocation] = useState('');
    const [gigType, setGigType] = useState('Film');
    const [tags, setTags] = useState('');
    const history = useHistory();

    const { id: userId } = sessionUser;
    const companyId = sessionUser.Company.id;

    const handleSubmit = (e) => {
        e.preventDefault();
        // setErrors([]);
        return dispatch(sessionActions.submitGigSetGigs({
            userId,
            companyId,
            title,
            description,
            rehearsalProductionDates,
            compensationDetails,
            location,
            gigType,
            tags
        })).then( history.push(`./company/${sessionUser.Company.id}`))
    };
    return(
        <div className='company_card'>
            <form onSubmit={handleSubmit}>
                <div>
                    <label> Production Title
                        <input
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        ></input>
                    </label>
                </div>
                <div>
                    <label> Description
                        <input
                        type='text'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        ></input>
                    </label>
                </div>
                <div>
                    <label> Please list rehearsal/production dates
                        <input
                        type='text'
                        value={rehearsalProductionDates}
                        onChange={(e) => setrehearsalProductionDates(e.target.value)}
                        ></input>
                    </label>
                </div>
                <div>
                    <label> Compensation Details
                        <input
                        type='text'
                        value={compensationDetails}
                        onChange={(e) => setCompensationDetails(e.target.value)}
                        ></input>
                    </label>
                </div>
                <div>
                    <label> Location
                        <input
                        type='text'
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        ></input>
                    </label>
                </div>
                <div>
                    <label> Production Category
                        <select
                        type='text'
                        value={gigType}
                        onChange={(e) => setGigType(e.target.value)}>
                            <option value="Film">Film</option>
                            <option value="Theatre">Theatre</option>
                            <option value="TV & Video">TV & Video</option>
                            <option value="Commercials">Commercials</option>
                            <option value="Modeling">Modeling</option>
                            <option value="Performing Arts">Performing Arts</option>
                            <option value="Voiceover">Voiceover</option>
                            <option value="Other">Other</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label> Tags (seperate using a comma only)
                        <input
                        type='text'
                        placeholder="example: animals, british accent, "
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        ></input>
                    </label>
                </div>
                <div>
                    <button type="submit">submit</button>
                </div>
            </form>
        </div>
    )
};

export default CreateProduction;
