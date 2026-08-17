import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { getGallery, addPhoto, deletePhoto, updatePhoto } from '../../store/session';
import './CreateActorPortfolio.css';

const PortfolioGallery = () => {
    const session = useSelector(state => state.session)
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const [titles, setTitles] = useState({})

    useEffect(() => {
        console.log('SESSION_____: ', session.user)
        dispatch(getGallery(session.user.id))
        .then((res) => {
            console.log('succesfully loaded gallery')
        })
        .finally(() => setIsLoaded(true))
    }, [])

    const handleDeletePhoto = (photoId) => {
        dispatch(deletePhoto(photoId))
        .then((res) => {
            if (res.ok) console.log('successfully deleted photo')
        })
    }

    const handleAddPhoto = (file, order) => {
        console.log("file", file, session.user.id)
        const newPhoto = {image: file, order, userId: session.user.id, title: file.name}

        dispatch(addPhoto(newPhoto))
        .then((res) => {
            if (res.ok) console.log('successfully added photo')
        })
    }

    const handlePhotoUpdate = (title, id) => {
        dispatch(updatePhoto({title, id}))
        .then((res) => {
            if (res.ok) console.log('successfully updated photo')
        })
    }

    return(
        <div id='portfolio_gallery'>
            {isLoaded && session.gallery.length < 4 &&
                <div className='photo_block'>
                    <label htmlFor={`add_image`}>{"Add New Photo"}</label>
                    <input type='file' onChange={e => handleAddPhoto(e.target.files[0], session.gallery.length+1)} name={`add_image`}/>
                </div>
            }
            {isLoaded && session.gallery.map((photo, index) => {
                if (!titles[photo.id]) setTitles({...titles, [photo.id]: {value: photo.title, edit: false}})
                return(
                    <div key={photo.id} className='photo_block'>
                        <img alt={`gallery_${index}`} src={photo.photoUrl} onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src="https://quickcast-app.s3.amazonaws.com/1651176057051";
                            }}/>
                        <span>
                            <input readOnly={titles[photo.id] ? !titles[photo.id].edit : true} onClick={e => setTitles({...titles, [photo.id]: {value: titles[photo.id].value, edit: true}})} onChange={e => setTitles({...titles, [photo.id]: {value: e.target.value, edit: titles[photo.id].edit}})} value={titles[photo.id] ? titles[photo.id].value : ''}></input>
                        </span>
                        <button className={`quickcast_submit_btn`} onClick={() => {handlePhotoUpdate(titles[photo.id].value, photo.id )}}>{'Update Title'}</button>
                        <button className={`low_visibility_link`}  onClick={() => {handleDeletePhoto(photo.id)}}>{'Delete Photo'}</button>
                </div>
                )
            })}
        </div>
    )
}
export default PortfolioGallery;
