import { csrfFetch } from './csrf';
const SET_COMPANIES = 'companies/set';
const CLEAR_COMPANIES = 'companies/clear';
const REMOVE_COMPANY = 'companies/remove';

const setCompany = (companies) => ({
  type: SET_COMPANIES,
  payload: companies
})

const removeCompany = (companyId) => ({
  type: REMOVE_COMPANY,
  payload: companyId
})

const clearCompanies = () => ({
  type: CLEAR_COMPANIES
})

const initialState = [];
const companyReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_COMPANIES:
            return action.payload;
        case REMOVE_COMPANY:
            const companyIndex = state.findIndex(company => company.id === action.payload)
            state.splice(companyIndex, 1)
            return [...state];
        case CLEAR_COMPANIES:
            return [];
        default:
            return state;
    }
};

export default companyReducer;
