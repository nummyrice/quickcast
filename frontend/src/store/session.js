import { csrfFetch } from './csrf';
// action type for storing the login and removing the login from the store
const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const SET_PORTFOLIO = 'session/userPortfolio/set';
const REMOVE_PORTFOLIO = 'session/userPortfolio/remove';
const UPDATE_PORTFOLIO = 'session/userPortfolio/update';
const SET_COMPANY = 'userCompany/set';
const REMOVE_COMPANY = 'userCompany/remove';
const UPDATE_COMPANY = 'userCompany/update';

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

const setPortfolio = (portfolio) => ({
  type: SET_PORTFOLIO,
  payload: portfolio
})

const removePortfolio = () => ({
  type: REMOVE_PORTFOLIO
})

const updatePortfolio = (updatedPortfolio) => ({
  type: UPDATE_PORTFOLIO,
  payload: updatedPortfolio
})

const setCompany = (company) => ({
  type: SET_COMPANY,
  payload: company
})

const updateCompany = (updatedCompany) => ({
  type: UPDATE_COMPANY,
  payload: updateCompany
})

const removeCompany = () => ({
  type: REMOVE_COMPANY
})

// THUNK for Login
export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

//THUNK for logout
export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE',
  });
  dispatch(removeUser());
  return response;
};

// THUNK for restoring session after page refreshes
export const restoreUser = (user) => async dispatch => {
  const response = await csrfFetch('/api/session');
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

// THUNK for signup
export const signup = ({username, email, password}) => async (dispatch) => {
  const response = await csrfFetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({
      username,
      email,
      password,
    })
  });
  const data = await response.json();
  dispatch(setUser(data.user))
  return response;
};

// THUNK for storing company in user
export const createAndSetCompany = (company) => async (dispatch) => {
  // ensures there is no null, unefined is used instead
  for (const data in company) {
      if (!company[data]) {
          company[data] = ''
      };
  };
  const { companyName, phoneNumber, details, image, website } = company
  let response;
  if (image) {
    // builds company multipart form data including image buffer
    const companyData = new FormData();
    companyData.append('companyName', companyName);
    companyData.append('phoneNumber', phoneNumber);
    companyData.append('details', details);
    companyData.append('companyImage', image);
    companyData.append('website', website);

    response = await csrfFetch('/api/company', {
      method: 'POST',
      body: companyData,
    });
  } else {
    response = await csrfFetch('/api/company', {
      method: 'POST',
      body: JSON.stringify(company),
    });
  };
  const newCompany = await response.json();

  dispatch(setCompany(newCompany));
  return response;
};

  // THUNK for updating company
  export const updateAndSetCompany = (company) => async (dispatch) => {
    const { companyName, phoneNumber, details, image, website } = company
    let response;
    // if image file was provided
    if (company.image) {
      // create formData and send a put request to update the database
      const companyData = new FormData();
      companyData.append('companyName', companyName);
      companyData.append('phoneNumber', phoneNumber);
      companyData.append('details', details);
      companyData.append('companyImage', image);
      companyData.append('website', website);

      response = await csrfFetch('/api/company', {
        method: 'PUT',
        body: companyData,
      });
      //  else send company in a put fetch request to update the database
    } else {
      const companyData = {companyName, phoneNumber, details, website};
      response = await csrfFetch('/api/company', {
        method: 'PUT',
        body: JSON.stringify(companyData),
      });
    };
    //await response data
    const updatedCompany = await response.json()
    // dispatch updatedCompany data to the store
    dispatch(updateCompany(updatedCompany));
    // return the response in case there were errors
    // const history = useHistory();
    // if (response.status <= 400) history.push('/company');
    return response;
  }

//THUNK for submitting new gig
// export const submitGigSetGigs = (newGig) => async (dispatch) => {
//   // await csrf fetch to server
//   const response = await csrfFetch('api/company/gig/create', {
//       method: 'POST',
//       body: JSON.stringify(newGig),
//   });
//   // await json() gigs for this company
//   const allGigs = await response.json();
//   //TODO: might not need newGig sent back from the server
//   // const {allGigs} = gigsAndNewGig;
//   // dispatch update gigs for this company
//   dispatch(setUsersGigs(allGigs));
//   // return response
//   return response;
// };

//THUNK for updating a gig
// export const updateGigSetGigs = (gigToUpdate) => async (dispatch) => {
//   const response = await csrfFetch('api/company/gig/update', {
//     method: 'PUT',
//     body: JSON.stringify(gigToUpdate),
//   });
//   const allGigs = await response.json();
//   dispatch(setUsersGigs(allGigs));
//   return response;
// };

// THUNK for deleting company
export const deleteCompany = (company) => async (dispatch) => {

  const response = await csrfFetch('/api/company', {
    method: 'DELETE',
    body: JSON.stringify(company),
  });

  const data = await response.json();
  if (data.successfullyDeleted) {
    dispatch(removeCompany());
    return response;
  } else {
    return response;
  }
};

const initialState = { user: null };
const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    case SET_PORTFOLIO:
        return action.payload;
    case UPDATE_PORTFOLIO:
        return action.payload;
    case REMOVE_PORTFOLIO:
        return null;
      case SET_COMPANY:
          return action.payload;
      case UPDATE_COMPANY:
          return action.payload;
      case REMOVE_COMPANY:
          return null;
    default:
      return state;
  }
};

export default sessionReducer;
