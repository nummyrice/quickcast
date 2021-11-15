import { csrfFetch } from './csrf';

const SET_COMPANIES = 'companies/add';
const REMOVE_COMPANIES = 'companies/remove';

const setCompanies = (companies) => {
    return {
        type: SET_COMPANIES,
        payload: companies,
    };
};

const removeCompanies = () => {
    return {
        type: REMOVE_COMPANIES,
    };
};

//THUNK for retrieving all companies
export const getAndSetAllCompanies = () => async (dispatch) => {

    const response = await csrfFetch('api/company/all');
    const companiesArray = await response.json();

    dispatch(setCompanies(companiesArray));
    return response;
};


const initialState = null;

const companyReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_COMPANIES:
            //TODO: is this copy deep enough?
            newState = Object.assign({}, state);
            newState = action.payload;
            return newState;
        case REMOVE_COMPANIES:
            newState = Object.assign({}, state);
            newState = null;
            return newState;
        default:
            return state;
    }
};

export default companyReducer;
