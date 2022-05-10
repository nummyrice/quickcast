import React, {useState} from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateAndSetRole, deleteAndRemoveRole } from '../../../store/session';

const EditRole = ({role, gigs, session}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [title, setTitle] = useState({value: role.title, edit: false})
    const [gender, setGender] = useState({value: role.gender, edit: false})
    const [description, setDescription] = useState({value: role?.description, edit: false})
    const [minAge, setMinAge] = useState({value: role.ageRange?.[0], edit: false})
    const [maxAge, setMaxAge] = useState({value: role.ageRange?.[1], edit: false})
    const [gigId, setGigId] = useState({value:role.gigId, edit: false})
    const handleSubmit = (e) => {
        e.preventDefault()
        const editRole = {id: role.id}
        if (minAge.edit || minAge.edit) editRole.ageRange = [minAge.value, maxAge.value];
        if (title.edit) editRole.title = title.value
        if (gender.edit) editRole.gender = gender.value
        if (description.edit) editRole.description = description.value
        if (gigId.edit) editRole.gigId = parseInt(gigId.value, 10)
        dispatch(updateAndSetRole(editRole))
        .then(result => {
            console.log("gig role successfully updated")
            // if (result.ok) return  navigate('/home');
        })
        // .finally()
    }

    const handleDelete = (e) => {
        e.preventDefault()
        dispatch(deleteAndRemoveRole(role.id, role.gigId))
        .then(() => {
            console.log('successfully deleted role')
        })
    }
    return(
        <form className='quickcast_edit_form'  onSubmit={e => handleSubmit(e)} id='edit_gig_form'>
            <label htmlFor='title'>{"Role Name"}</label>
            <span>
                <input  readOnly={!title.edit} onClick={e => setTitle({value: title.value, edit:true })} name='title' onChange={e => setTitle({value: e.target.value, edit: title.edit})} value={title.value}/>
            </span>
            <label htmlFor='description'>{"Description"}</label>
            <span>
                <input  readOnly={!description.edit} type='text'  name='description' onClick={e => { setDescription({value: description.value, edit:true })}}  onChange={e => setDescription({value: e.target.value, edit: description.edit})} value={description.value}/>
            </span>
            <label htmlFor='gender'>{"Gender"}</label>
            <span>
                <select className={`select-dropdown`}  readOnly={!gender.edit}  name='gender' onClick={e => { setGender({value: gender.value, edit:true })}} onChange={e => setGender({value: e.target.value, edit: gender.edit})} value={gender.value}>
                    <option value='Male or Female'>{'Male or Female'}</option>
                    <option value='Female'>{'Female'}</option>
                    <option value='Male'>{'Male'}</option>
                </select>
            </span>
            <label htmlFor='minAge'>{"Age Range"}</label>
            <span>
            <input
                    type='number'
                    value={minAge.value}
                    onChange={(e) => setMinAge({value:e.target.value, edit: minAge.edit})}
                    />
            </span>
            <span>
            <input
                    type='number'
                    value={maxAge.value}
                    onChange={(e) => setMaxAge({value:e.target.value, edit: maxAge.edit})}
                    />
            </span>
            <label>{'Production'}</label>
            <span>
                <select
                type='text'
                value={gigId.value}
                className={`select-dropdown`}
                onChange={(e) => setGigId({value: e.target.value, edit: gigId.edit})}
                onClick={e => setGigId({value: gigId.value, edit: true})}
                >
                {gigs.map(gig => <option key={gig.id} value={gig.id}>{gig.title}</option>)}
                </select>
            </span>
            <button className={`quickcast_submit_btn`} form='edit_gig_form' type='submit'>{'Submit'}</button>
            <button className={`low_visibility_link`}  onClick={e => handleDelete(e)}>{"Delete Production"}</button>
        </form>
    )
}

export default EditRole;
