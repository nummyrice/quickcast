import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Navigate } from 'react-router-dom';
// import * as companiesActions from '../../store/company';
// should create unique companies view css?
import '../CompanyView/CompanyView.css';

function CompaniesView() {
    const dispatch = useDispatch();
    const companies = useSelector((state) => state.companies);
    const [displayContact, setDisplayContact] = useState(false);
    const history = useHistory();

    useEffect(() => {
        dispatch(companiesActions.getAndSetAllCompanies());
    }, [dispatch]);

        //TODO: should this page be restricted to logged in users? currently userAuth error
    return (
        <>
        {companies && (companies.map((company) => {
            return(
                //TODO: need to create company view for each company or adjust current one
                // onClick={() => {history.push(`/company/${company.id}`)}}
                <div  key={company.id} className="company_card">
                    <div className="title_photo_section">
                        <div>
                            <img className="company_photo" src={company.image || 'https://res.cloudinary.com/quickcast/image/upload/v1636597050/photo-1579546929518-9e396f3cc809_evnlww.jpg'} alt='company image'/>
                        </div>
                        <h1 className="company_title">{company.name}</h1>
                    </div>
                    <div>
                        <p className="company_biography">{company.details}</p>
                    </div>
                    <div>
                        <div>
                            {company.website && (<a href={company.website} target="_blank"><button className='company_buttons' >visit our website</button></a>)}
                        </div>
                        <div>
                            {displayContact && (company.phoneNumber)}
                        </div>
                        <div>
                            {!displayContact && (company.phoneNumber && (<button className='company_buttons' onClick={() => setDisplayContact(!displayContact)}>contact</button>))}
                        </div>
                        {/* <span>click to view details
                        </span> */}
                    </div>
                </div>
            );
        }))}
        </>
    )
};

export default CompaniesView;
