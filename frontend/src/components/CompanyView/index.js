import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Navigate } from 'react-router-dom';
import './CompanyView.css';
import { Modal } from '../../context/Modal';
import EditCompanyModal from './EditCompanyModal.js';
import ProductionView from "./ProductionView";


function CompanyView() {
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const [displayContact, setDisplayContact] = useState(false);
    //toggle edit modal
    const [showModal, setShowModal] = useState(false);

    //ensures that if there is no session user, the page is not rendered
    // TODO: Optimize?
    if (!sessionUser || !sessionUser.Company) {
        // history.push('/')
        return (<Navigate to='/'/>)
    };
    return(
        <>
        <div className="company_card">
            <div className="title_photo_section">
                <div>
                    <img className="company_photo" src={sessionUser?.Company?.image || 'https://res.cloudinary.com/quickcast/image/upload/v1636597050/photo-1579546929518-9e396f3cc809_evnlww.jpg'} alt='company image'/>
                </div>
                <h1 className="company_title">{sessionUser.Company.name}</h1>
            </div>
            <div>
                <p className="company_biography">{sessionUser.Company.details}</p>
            </div>
            <div>
                <div>
                    {sessionUser.Company.website && (<a href={sessionUser.Company.website} target="_blank"><button className='company_buttons' >visit our website</button></a>)}
                </div>
                <div>
                    {displayContact && (sessionUser.Company.phoneNumber)}
                </div>
                <div>
                    {!displayContact && (sessionUser.Company.phoneNumber && (<button className='company_buttons' onClick={() => setDisplayContact(!displayContact)}>contact</button>))}
                </div>
                <div>
                    <button className='company_buttons' onClick={() => setShowModal(true)}>edit</button>
                    {showModal && (
                        <Modal onClose={() => setShowModal(false)}>
                            <EditCompanyModal onComplete={() => {setShowModal(false)}}/>
                        </Modal>
                    )}

                </div>
            </div>
        </div>
        {sessionUser.ActingGigs.map((gig) => {
            return(
                <ProductionView key={gig.id} userId={gig.userId} id={gig.id} title={gig.title} description={gig.description} rehearsalProductionDates={gig.rehearsalProductionDates} compensationDetails={gig.compensationDetails} location={gig.location} gigType={gig.gigType}/>
            );
        })}
        </>
    );
};

export default CompanyView;
