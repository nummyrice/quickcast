import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { createAndSetProduction} from "../../../store/session";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import './Productions.css';


function CreateProduction() {
    const session = useSelector((state) => state.session);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [rehearsalProductionDates, setrehearsalProductionDates] = useState('');
    const [compensationDetails, setCompensationDetails] = useState('');
    // const [location, setLocation] = useState('');
    const [gigType, setGigType] = useState('Film');
    const [tags, setTags] = useState('');
    const [address, setAddress] = React.useState("");
    const [coordinates, setCoordinates] = React.useState({
      lat: null,
      lng: null
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const tagsArray = tags.split(',').map(tag => {
            return tag.trim()
        })
        dispatch(createAndSetProduction({
            userId: session.user.id,
            companyId: session.company.id,
            title,
            description,
            rehearsalProductionDates,
            compensationDetails,
            location: address,
            gigType,
            tags:tagsArray
        })).then(res => {
            navigate('/home/my-company')
            console.log('succesfully created production')
        })
    };

    const handleSelect = async value => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        setAddress(value);
        setCoordinates(latLng);
      };
    // /home/my-company/productions
        // displays productions tab
    // /home/my-company/roles
        // displays role tabs
            // roles are sorted by production
    return(
        <form className={`quickcast_form`}id='create_production_form' onSubmit={handleSubmit}>
                <label> Production Title
                    </label>
                    <input
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    ></input>
                <label> Description
                    </label>
                    <input
                    type='text'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    ></input>
                <label> Please list rehearsal/production dates
                    </label>
                    <input
                    type='text'
                    value={rehearsalProductionDates}
                    onChange={(e) => setrehearsalProductionDates(e.target.value)}
                    ></input>
                <label> Compensation Details
                    </label>
                    <input
                    type='text'
                    value={compensationDetails}
                    onChange={(e) => setCompensationDetails(e.target.value)}
                    ></input>
                    <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
                       {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
                           return(
                            <>
                            <label> Location
                                </label>
                                <input {...getInputProps({placeholder: 'Type Address'})}
                                //  type='text'
                                //  value={location}
                                //  onChange={(e) => setLocation(e.target.value)}
                                />
                                <div>
                                    {loading ? <div>{'...loading'}</div> : null}
                                    {suggestions.map((suggestion) => {
                                           const style = {
                                            backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                                          };
                                        return(
                                            <div key={suggestion.placeId} {...getSuggestionItemProps(suggestion, {style})}>
                                                {suggestion.description}
                                            </div>
                                        )
                                    })}
                                </div>
                            </>

                           )
                       }}
                    </PlacesAutocomplete>
                <label> Production Category
                </label>
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
                <label> Tags (seperate using a comma only)
                    </label>
                    <input
                    type='text'
                    placeholder="example: animals, british accent, "
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    ></input>
                <button className={`quickcast_submit_btn`} form='create_production_form' type="submit">submit</button>

        </form>
    )
};

export default CreateProduction;
