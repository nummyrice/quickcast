import { csrfFetch } from './csrf';

const SET_COMPANY = 'company/add';
const REMOVE_COMPANY = 'company/remove';

const setCompany = (company) => {
    return {
        type: SET_COMPANY,
        payload: company,
    };
};

const removeCompany = () => {
    return {
        type: REMOVE_COMPANY,
    };
};

// THUNK for storing company
export const createAndSetCompany = (company) => async (dispatch) => {
    for (const data in company) {
        if (!company[data]) {
            company[data] = undefined
        };
    }
    console.log('THUNK DEBUGGING; COMPANY: ', company);
    const { companyName, phoneNumber, details, image, website } = company
    // builds company multipart form data including image buffer
    const companyData = new FormData();
    companyData.append('companyName', companyName);
    companyData.append('phoneNumber', phoneNumber);
    companyData.append('details', details);
    companyData.append('companyImage', image);
    companyData.append('website', website);

    const response = await csrfFetch('/api/company', {
        method: 'POST',
        body: companyData,
    });

    const company = await response.json();
    dispatch(setCompany(company));
    console.log('THUNK create Company: ', companyData);
    return response;
};

const initialState = { company: null };

const companyReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_COMPANY:
            newState = Object.assign({}, state);
            newState.company = action.payload;
            return newState;
        case REMOVE_COMPANY:
            newState = Object.assign({}, state);
            newState.company = null;
            return newState;
        default:
            return state;
    }
};

export default companyReducer;
