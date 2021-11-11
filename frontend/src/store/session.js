import { csrfFetch } from './csrf';

// action type for storing the login and removing the login from the store
const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const SET_USERS_COMPANY = 'session/setCompany';
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

const setUsersCompany = (company) => {
  return {
    type: SET_USERS_COMPANY,
    payload: company,
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
          company[data] = undefined
      };
  };
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
  // console.log('CREATEANDSETCOMPANY: RESPONSE: ', response);

  const newCompany = await response.json();
  dispatch(setUsersCompany(newCompany));
  return response;
};

// THUNK for restoring session after page refreshes
export const restoreUser = (user) => async dispatch => {
  const response = await csrfFetch('/api/session');
  const data = await response.json();
  dispatch(setUser(data.user));
  console.log('DEBUGGER IN RESTORE THUNK FOR USER DATA INCLUDING COMPANY',data.user)
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
      console.log('SESSION REDUCER LOG FOR COMPANY PAYLOAD', action.payload);
      newState = Object.assign({}, state);
      newState.user.Company = action.payload.company;
    default:
      return state;
  }
};

export default sessionReducer;
