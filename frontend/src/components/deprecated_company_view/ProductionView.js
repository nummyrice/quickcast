import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import EditProductionModal from './EditProductionMadal';
import { Modal } from '../../context/Modal';
import './ProductionView.css';


function ProductionView({userId, id, title, description, rehearsalProductionDates, compensationDetails, location, gigType}) {
    const sessionUser = useSelector((state) => state.session.user);
    const [showModal, setShowModal] = useState(false);


    return (
        <div className='production_card'>
            <div>
                <h1>{`${title}`}</h1>
            </div>
            <div>
                <p>{`${description}`}</p>
            </div>
            <div>
                <p>{`${rehearsalProductionDates}`}</p>
            </div>
            <div>
                <p>{`${compensationDetails}`}</p>
            </div>
            <div>
                <p>{`${location}`}</p>
            </div>
            <div>
                <p>{`${gigType}`}</p>
            </div>
            {(userId === sessionUser?.id) && (
                <div>
                    <button onClick={() => setShowModal(true)}>edit</button>
                </div>
            )}
            { showModal &&
            (<Modal onClose={() => setShowModal(false)}>
                <EditProductionModal onComplete={() => {setShowModal(false)}} userId={userId} id={id} title={title} description={description} rehearsalProductionDates={rehearsalProductionDates} compensationDetails={compensationDetails} location={location} gigType={gigType}/>
            </Modal>
            )}
        </div>
    );
};

export default ProductionView;
