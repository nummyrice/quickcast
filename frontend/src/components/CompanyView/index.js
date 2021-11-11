import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import './ComponentView.css';


function CompanyView() {
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const [displayContact, setDisplayContact] = useState(false);

    if (!sessionUser) history.push('/')
    return(
        <div className="company_card">
            <div className="title_photo_section">
                <div>
                    <img className="company_photo" src={sessionUser.Company.image || 'https://res.cloudinary.com/quickcast/image/upload/v1636597050/photo-1579546929518-9e396f3cc809_evnlww.jpg'} alt='company image'/>
                </div>
                <h1 className="company_title">{sessionUser.Company.name}</h1>
            </div>
            <div>
                <p className="company_biography"company_biography>{sessionUser.Company.details}</p>
            </div>
            <div>
                <div>
                    {sessionUser.Company.website && (<a href={sessionUser.Company.website} target="_blank"><button>visit our website</button></a>)}
                </div>
                <div>
                    {displayContact && (sessionUser.Company.phoneNumber)}
                </div>
                <div>
                    {!displayContact && (sessionUser.Company.phoneNumber && (<button onClick={() => setDisplayContact(!displayContact)}>contact</button>))}
                </div>
            </div>
        </div>
    );
};

export default CompanyView;
