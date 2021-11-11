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



const initialState = { currentCompany: null };

const companyReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_COMPANY:
            newState = Object.assign({}, state);
            newState.currentCompany = action.payload.company;
            return newState;
        case REMOVE_COMPANY:
            newState = Object.assign({}, state);
            newState.currentCompany = null;
            return newState;
        default:
            return state;
    }
};

export default companyReducer;
