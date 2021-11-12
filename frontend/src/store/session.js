import { csrfFetch } from './csrf';




// action type for storing the login and removing the login from the store
const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const SET_USERS_COMPANY = 'session/setCompany';
const DELETE_USERS_COMPANY = 'session/removeCompany';
const UPDATE_USERS_COMPANY = 'session/updateCompany';
//TODO
// edit company
// remove company

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
// issues with how this payload is set up. The current action
// and reducer together are requiring that you key into the payload at .company
const setUsersCompany = (company) => {
  return {
    type: SET_USERS_COMPANY,
    payload: company,
  }
};

const updateUsersCompany = (updatedCompany) => {
  return {
    type: UPDATE_USERS_COMPANY,
    payload: updatedCompany,
  }
}

const deleteUsersCompany = () => {
  return {
    type:DELETE_USERS_COMPANY,
  }
}

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

  dispatch(setUsersCompany(newCompany));
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
  dispatch(updateUsersCompany(updatedCompany));
  // return the response in case there were errors
  // const history = useHistory();
  // if (response.status <= 400) history.push('/company');
  return response;
}

// THUNK for deleting company
export const deleteCompany = (company) => async (dispatch) => {

  const response = await csrfFetch('/api/company', {
    method: 'DELETE',
    body: JSON.stringify(company),
  });

  const data = await response.json();
  if (data.successfullyDeleted) {
    dispatch(deleteUsersCompany());
    return response;
  } else {
    return response;
  }
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

//THUNK for logout
export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE',
  });
  dispatch(removeUser());
  return response;
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
    case SET_USERS_COMPANY:
      newState = { user: {...state.user, Company: {...action.payload.company}}}
      return newState;
    case UPDATE_USERS_COMPANY:
      newState = { user: {...state.user, Company: {...action.payload.updatedCompany}}}
      return newState;
    case DELETE_USERS_COMPANY:
      newState = { user: {...state.user, Company: null}};
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
