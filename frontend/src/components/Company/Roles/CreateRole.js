import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { useDispatch } from "react-redux";
import { createAndSetRole} from "../../../store/session";
import './Roles.css';


function CreateRole({sessionUser, gigs}) {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [gigId, setGigId] = useState(gigs[0].id)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [gender, setGender] = useState('Male or Female')

    const [minAge, setMinAge] = useState(0)
    const [maxAge, setMaxAge] = useState(100)

    const handleSubmit = (e) => {
        e.preventDefault();
        const ageRange = [minAge, maxAge]
        dispatch(createAndSetRole({
            userId: sessionUser.id,
            title,
            description,
            gender,
            ageRange,
            gigId

        })).then(res => {
            // TODO: here is where state should be cleared
            // navigate('/home/my-company')
            console.log('succesfully created role')
        })
    };

    return(
        <form className={`quickcast_form`}  id='create_role_form' onSubmit={handleSubmit}>
                <label>{'Role Name'}</label>
                    <input
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    ></input>
                <label>{'Description'}</label>
                    <input
                    type='text'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    ></input>
                <label>{'Gender'}</label>
                    <select
                    className={`select_dropdown`}
                    type='text'
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    >
                        <option value='Male or Female'>{'Male or Female'}</option>
                        <option value='Female'>{'Female'}</option>
                        <option value='Male'>{'Male'}</option>
                    </select>
                <label>{'Age Range'}</label>
                    <input
                    type='number'
                    value={minAge}
                    onChange={(e) => setMinAge(e.target.value)}
                    />
                     <input
                    type='number'
                    value={maxAge}
                    onChange={(e) => setMaxAge(e.target.value)}
                    />
                <label>{'Production'}</label>
                    <select
                    className={`select_dropdown`}
                    type='text'
                    value={gigId}
                    onChange={(e) => setGigId(e.target.value)}
                    >
                        {gigs.map(gig => <option key={gig.id} value={gig.id}>{gig.title}</option>)}
                    </select>

                <button className={`quickcast_submit_btn`} form='create_role_form' type="submit">submit</button>

        </form>
    )
};

export default CreateRole;
