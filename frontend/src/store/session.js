import { csrfFetch } from './csrf';
import { setErrors } from './errors'
// action type for storing the login and removing the login from the store
const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const SET_PORTFOLIO = 'session/userPortfolio/set';
const REMOVE_PORTFOLIO = 'session/userPortfolio/remove';
const SET_COMPANY = 'session/userCompany/set';
const REMOVE_COMPANY = 'session/userCompany/remove';
const SET_COMPANY_PURPOSE = 'session/user/purpose/setAsCompany'
const SET_ACTOR_PURPOSE = 'session/user/purpose/setAsActor'
const SET_PURPOSE = 'session/user/determine-purpose'

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

const setCompany = (company) => ({
  type: SET_COMPANY,
  payload: company
})

const removeCompany = () => ({
  type: REMOVE_COMPANY
})

const setPurposeAsCompany = () => ({
  type:SET_COMPANY_PURPOSE
})

const setPurposeAsActor = () => ({
  type:SET_ACTOR_PURPOSE
})

const setPurpose = (purpose) => ({
  type: SET_PURPOSE,
  payload: purpose
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
  dispatch(setPortfolio(data.actorPortfolio))
  dispatch(setCompany(data.company))
  if (data.user) {
    const purpose = getPurpose(data)
    dispatch(setPurpose(purpose))
  }
  return response;
};

//THUNK for logout
export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE',
  });
  dispatch(removeUser());
  dispatch(removeCompany())
  dispatch(removePortfolio())
  return response;
};

// THUNK for restoring session after page refreshes
export const restoreUser = (user) => async dispatch => {
  const response = await csrfFetch('/api/session');
  const data = await response.json();
  dispatch(setUser(data.user))
  dispatch(setPortfolio(data.actorPortfolio))
  dispatch(setCompany(data.company))
  if (data.user) {
    const purpose = getPurpose(data)
    dispatch(setPurpose(purpose))
  }
  return data;
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

//THUNK for user portfolio
export const createAndSetPortfolio = (portfolio) => async (dispatch) => {
    const portfolioData = new FormData();
    for (const key in portfolio) {
      portfolioData.append(key, portfolio[key])
    }
    // console.log('portfolioData', portfolio)
    try {
      const response = await csrfFetch('/api/actorPortfolio', {
        method: 'POST',
        body: portfolioData
      })
      const data = await response.json()
      if (response.ok) {
        dispatch(setPortfolio(data))
        dispatch(setPurposeAsActor())
      } else {
      console.log('THUNK ERRORS SENT TO ERROR REDUCER?, ', data)

        if (data.errors) dispatch(setErrors(data.errors))
      }
      return response;
    } catch(res) {
      res.json()
      .then((data) => {
        if (data.errors) dispatch(setErrors(data.errors))
      })
      return res;
    }
}

// THUNK for updating user portfolio
export const updateAndSetPortfolio = (portfolio) => async (dispatch) => {
  const portfolioData = new FormData();
  for (const key in portfolio) {
    portfolioData.append(key, portfolio[key])
  }
  // console.log('portfolioData', portfolio)
  try {
    const response = await csrfFetch('/api/actorPortfolio', {
      method: 'PUT',
      body: portfolioData
    })
    const data = await response.json()
    if (response.ok) {
      dispatch(setPortfolio(data))
      dispatch(setPurposeAsActor())
    }
    return response;

  } catch(res) {
    res.json()
    .then((data) => {
      console.log('test Update result before response check', data)
      if (data.message) dispatch(setErrors([data.message]))
    })
    return res;
  }

}

// THUNK for deleting portfolio
export const deleteAndRemovePortfolio = (portfolioId) => async (dispatch) => {
  try {
    const response = await csrfFetch('/api/actorPortfolio', {
      method: 'DELETE',
      body: JSON.stringify({portfolioId})
    })
    const data = await response.json()
    if (response.ok) {
      dispatch(removePortfolio())
      const purpose = getPurpose(data)
      dispatch(setPurpose(purpose))
    } else {
      console.log('THUNK ERRORS SENT TO ERROR REDUCER?, ', data)
      if (data.errors) dispatch(setErrors(data.errors))
    }
    return response;
  } catch (res) {
    res.json()
    .then((data) => {
      if (data.errors) dispatch(setErrors(data.errors))
    })
    return res;
  }
}

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
    // dispatch(updateCompany(updatedCompany));
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
const getPurpose = (data) => {
  // const purpose = Window.localStorage.getItem('purpose')
  const purpose = null;
  if (purpose && (purpose === 'actor' || purpose === 'company')) return purpose;
  if (data.actorPortfolio && data.company) {
    // Window.localStorage.setItem('purpose', 'actor')
    return 'actor'
  }
  if (data.actorPortfolio) {
    // Window.localStorage.setItem('purpose', 'actor')
    return 'actor'
  }
  if (data.company) {
    // Window.localStorage.setItem('purpose', 'company')
    return 'company'
  }
  return null;

}

const initialState = { user: null, actorPortfolio: null, company: null };
const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
        return {user: action.payload, actorPortfolio: state.actorPortfolio, company: state.company};
    case REMOVE_USER:
        return {user: null, actorPortfolio: null, company: null};
    case SET_PORTFOLIO:
        return {user: state.user, actorPortfolio: action.payload, company: state.company};
    case REMOVE_PORTFOLIO:
        return {user: state.user, actorPortfolio: null, company: state.company};
      case SET_COMPANY:
        return {user: state.user, actorPortfolio: state.actorPortfolio, company: action.payload};
      case REMOVE_COMPANY:
        return {user: state.user, actorPortfolio: state.actorPortfolio, company: null};
      case SET_PURPOSE:
        return {user: {...state.user, purpose: action.payload}, actorPortfolio: state.actorPortfolio, company: null}
      case SET_ACTOR_PURPOSE:
        return {user: {...state.user, purpose: 'actor'}, actorPortfolio: state.actorPortfolio, company: null}
      case SET_COMPANY_PURPOSE:
          return {user: {...state.user, purpose: 'company'}, actorPortfolio: state.actorPortfolio, company: null}
    default:
      return state;
  }
};

export default sessionReducer;
