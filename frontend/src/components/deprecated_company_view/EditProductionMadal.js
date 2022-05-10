import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";

function EditProductionModal({onComplete, userId, id, title, description, rehearsalProductionDates, compensationDetails, location, gigType}) {
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const [edit_title, setEdit_Title] = useState(title);
    const [edit_description, setEdit_Description] = useState(description);
    const [edit_rehearsalProductionDates, setEdit_RehearsalProductionDates] = useState(rehearsalProductionDates);
    const [edit_compensationDetails, setEdit_CompensationDetails] = useState(compensationDetails);
    const [edit_location, setEdit_Location] = useState(location);
    const [edit_gigType, setEdit_GigType] = useState(gigType);
    const [edit_tags, setEdit_Tags] = useState('');
    const history = useHistory();

    // const { id: userId } = sessionUser;
    // const companyId = sessionUser.Company.id;

    const handleSubmit = (e) => {
        e.preventDefault();
        // setErrors([]);
        return dispatch(sessionActions.updateGigSetGigs({
            userId,
            companyId: sessionUser.Company.id,
            title: edit_title,
            id,
            description: edit_description,
            rehearsalProductionDates: edit_rehearsalProductionDates,
            compensationDetails: edit_compensationDetails,
            location: edit_location,
            gigType: edit_gigType,
            tags: edit_tags,
        })).then(() => {
            // history.push(`./company/${sessionUser.Company.id}`);
            onComplete();
        })
    };

    return(
        <div>
        <form onSubmit={handleSubmit}>
            <div>
                <label> Production Title
                    <input
                    type='text'
                    value={edit_title}
                    onChange={(e) => setEdit_Title(e.target.value)}
                    ></input>
                </label>
            </div>
            <div>
                <label> Description
                    <input
                    type='text'
                    value={edit_description}
                    onChange={(e) => setEdit_Description(e.target.value)}
                    ></input>
                </label>
            </div>
            <div>
                <label> Please list rehearsal/production dates
                    <input
                    type='text'
                    value={edit_rehearsalProductionDates}
                    onChange={(e) => setEdit_RehearsalProductionDates(e.target.value)}
                    ></input>
                </label>
            </div>
            <div>
                <label> Compensation Details
                    <input
                    type='text'
                    value={edit_compensationDetails}
                    onChange={(e) => setEdit_CompensationDetails(e.target.value)}
                    ></input>
                </label>
            </div>
            <div>
                <label> Location
                    <input
                    type='text'
                    value={edit_location}
                    onChange={(e) => setEdit_Location(e.target.value)}
                    ></input>
                </label>
            </div>
            <div>
                <label> Production Category
                    <select
                    type='text'
                    value={edit_gigType}
                    onChange={(e) => setEdit_GigType(e.target.value)}>
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
                    value={edit_tags}
                    onChange={(e) => setEdit_Tags(e.target.value)}
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

export default EditProductionModal;
