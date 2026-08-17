import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateAndSetProduction, deleteAndRemoveProduction } from '../../../store/session';

const EditProduction = ({gig}) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [title, setTitle] = useState({value: gig.title, edit: false})
    const [rehearsalProductionDates, setRehearsalProductionDates] = useState({value: gig.rehearsalProductionDates, edit: false})
    const [description, setDescription] = useState({value: gig?.description, edit: false})
    const [compensationDetails, setCompensationDetails] = useState({value: gig.compensationDetails, edit: false})
    const [location, setLocation] = useState({value: gig.location, edit: false})
    const [gigType, setGigType] = useState({value:gig.gigType, edit: false})
    const [addTags, setAddTags] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        const editGig = {id: gig.id, userId: gig.userId}
        if (title.edit) editGig.name = title.value
        if (rehearsalProductionDates.edit) editGig.rehearsalProductionDates = rehearsalProductionDates
        if (description.edit) editGig.description = description.value
        if (compensationDetails.edit) editGig.compensationDetails = compensationDetails.value
        if (location.edit) editGig.location = location.value
        if (gigType.edit) editGig.gigType = gigType.value
        if (addTags) editGig.tags = addTags.split(',').map(tag => tag.trim())
        dispatch(updateAndSetProduction(editGig))
        .then(result => {
            console.log("actor portfolio succesffully updated")
            if (result.ok) return  navigate('/home');
        })
        // .finally()
    }

    const handleDelete = (e) => {
        e.preventDefault()
        dispatch(deleteAndRemoveProduction(gig.id))
        .then(() => {
            console.log('successfully deleted portfolio')
        })
    }
    return(
        <form className={`quickcast_edit_form`} onSubmit={e => handleSubmit(e)} id='edit_gig_form'>
            <label htmlFor='title'>{"Production Title"}</label>
            <span>
                <input  readOnly={!title.edit} onClick={e => setTitle({value: title.value, edit:true })} name='title' onChange={e => setTitle({value: e.target.value, edit: title.edit})} value={title.value}/>
            </span>
            <label htmlFor='description'>{"Description"}</label>
            <span>
                <input  readOnly={!description.edit} type='text'  name='description' onClick={e => { setDescription({value: description.value, edit:true })}}  onChange={e => setDescription({value: e.target.value, edit: description.edit})} value={description.value}/>
            </span>
            <label htmlFor='rehearsalProductionDates'>{"Dates Needed"}</label>
            <span>
                <input  readOnly={!rehearsalProductionDates.edit} type='text' name='rehearsalProductionDates' onClick={e => { setRehearsalProductionDates({value: rehearsalProductionDates.value, edit:true })}} onChange={e => setRehearsalProductionDates({value: e.target.value, edit: rehearsalProductionDates.edit})} value={rehearsalProductionDates.value}/>
            </span>
            <label htmlFor='compensationDetails'>{"Pay"}</label>
            <span>
                <input  readOnly={!compensationDetails.edit} type='text' name='compensationDetails' onClick={e => { setCompensationDetails({value: compensationDetails.value, edit:true })}} onChange={e => setCompensationDetails({value: e.target.value, edit: compensationDetails.edit})} value={compensationDetails.value}/>
            </span>
            <label htmlFor='location'>{"Location"}</label>
            <span>
                <input  readOnly={!location.edit} type='text' name='location' onClick={e => { setLocation({value: location.value, edit:true })}} onChange={e => setLocation({value: e.target.value, edit: location.edit})} value={location.value}/>
            </span>
            <span>
            <label>{'Production Category'}</label>
                <select
                type='text'
                value={gigType}
                onChange={(e) => setGigType({value: e.target.value, edit: gigType.edit})}
                onClick={e => setGigType({value: gigType.value, edit: true})}
                >
                    <option value="Film">Film</option>
                    <option value="Theatre">Theatre</option>
                    <option value="TV & Video">TV & Video</option>
                    <option value="Commercials">Commercials</option>
                    <option value="Modeling">Modeling</option>
                    <option value="Performing Arts">Performing Arts</option>
                    <option value="Voiceover">Voiceover</option>
                    <option value="Other">Other</option>
                </select>
            </span>
            <label htmlFor='tags'>{"Tags"}</label>
            <span>
                <input  readOnly={!addTags.edit} type='text' name='tags' onClick={e => { setAddTags({value: addTags.value, edit:true })}} onChange={e => setAddTags({value: e.target.value, edit: addTags.edit})} value={addTags.value}/>
            </span>
            <ul>
                {gig.tags && gig.tags.map(tag => {
                    return(
                        <li>{tag.name}</li>
                    )
                })}
            </ul>
            <button className={`quickcast_submit_btn`} form='edit_gig_form' type='submit'>{'Submit'}</button>
            <button className={`low_visibility_link`} onClick={e => handleDelete(e)}>{"Delete Production"}</button>
        </form>
    )
}

export default EditProduction;
