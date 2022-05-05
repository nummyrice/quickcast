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
const TOGGLE_PURPOSE = 'session/user/toggle-purpose'
const SET_GALLERY = 'session/user/gallery/set'
const REMOVE_GALLERY = 'session/user/gallery/remove'
const SET_PRODUCTIONS = 'session/user/productions/set'
const SET_PRODUCTION = 'session/user/production/set'
const REMOVE_RODUCTION = 'session/user/production/remove'
const CLEAR_PRODUCTIONS = 'session/user/productions/clear'
const UPDATE_PRODUCTIONS = 'session/user/productions/update'
const SET_ROLES = 'session/user/roles/set'
const SET_ROLE = 'session/user/role/set'
const REMOVE_ROLE = 'session/user/role/remove'
const UPDATE_ROLE = 'session/user/role/update'
const CLEAR_ROLES = 'session/user/roles/clear'

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

const togglePurpose = () => ({
  type: TOGGLE_PURPOSE
})

const setGallery = (gallery) => ({
  type: SET_GALLERY,
  payload: gallery
})

const removeGallery = () => ({
  type: REMOVE_GALLERY
})

const setProductions = (productions) => ({
  type: SET_PRODUCTIONS,
  payload: productions
})

const setProduction = (production) => ({
  type: SET_PRODUCTION,
  payload: production
})

const updateProductions = (production) => ({
  type: UPDATE_PRODUCTIONS,
  payload: production
})

const removeProduction = (productionId) => ({
  type: REMOVE_RODUCTION,
  payload: productionId
})
const clearProductions = () => ({
  type: CLEAR_PRODUCTIONS
})

const setRoles = (roles) => ({
  type: SET_ROLES,
  payload: roles
})

const setRole = (role) => ({
  type: SET_ROLE,
  payload: role
})

const updateRole = (role) => ({
  type: UPDATE_ROLE,
  payload: role
})

const removeRole = (gigId, roleId) => ({
  type: REMOVE_ROLE,
  payload: {roleId, gigId}
})

const clearRoles = () => ({
  type: CLEAR_ROLES
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
      dispatch(setPortfolio(data))
      dispatch(setPurposeAsActor())
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
    dispatch(setPortfolio(data))
    dispatch(setPurposeAsActor())
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
    dispatch(removePortfolio())
    const purpose = getPurpose(data)
    dispatch(setPurpose(purpose))

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
    // builds company multipart form data including image buffer
    const companyData = new FormData();
    for (const key in company) {
      companyData.append(key, company[key])
    }
  try {
    const response = await csrfFetch('/api/company', {
      method: 'POST',
      body: companyData,
    });
    const data = await response.json();
    dispatch(setCompany(data));
    dispatch(setPurposeAsCompany())
    return response;
  } catch(res) {
    res.json()
    .then((data) => {
      console.log('test Update result before response check', data)
      if (data.message) dispatch(setErrors([data.message]))
    })
    return res;
  }
};

// THUNK for updating company
export const updateAndSetCompany = (company) => async (dispatch) => {
  try {
    // create formData and send a put request to update the database
    const companyData = new FormData()
    for (const key in company) {
      companyData.append(key, company[key])
    }

    const response = await csrfFetch('/api/company', {
      method: 'PUT',
      body: companyData,
    });

  const data = await response.json()
  dispatch(setCompany(data));
  return response;

  } catch(res) {
    res.json()
    .then((data) => {
      // console.log('test Update result before response check', data)
      if (data.message) dispatch(setErrors([data.message]))
    })
    return res;
  }
}

// THUNK for deleting company
export const deleteAndRemoveCompany = (companyId) => async (dispatch) => {
  try {
    const response = await csrfFetch('/api/company', {
      method: 'DELETE',
      body: JSON.stringify({id:companyId}),
    });
    dispatch(removeCompany());
    dispatch(clearProductions())
    return response;
  } catch(res) {
    res.json()
    .then((data) => {
      // console.log('test Update result before response check', data)
      if (data.message) dispatch(setErrors([data.message]))
    })
    return res;
  }
};

// THUNK for getting user gigs
export const getAndSetProductions = (userId) => async (dispatch) => {
  try {
    const response = await csrfFetch('/api/actingGig/by_user', {
        method: 'POST',
        body: JSON.stringify({userId}),
    });
    // returns all gigs for the user
    const data = await response.json();
    dispatch(setProductions(data))
    return response;

  } catch(res) {
    res.json()
    .then((data) => {
      // console.log('test Update result before response check', data)
      if (data.message) dispatch(setErrors([data.message]))
    })
    return res;
  }
};

// THUNK for submitting new gig
export const createAndSetProduction = (newGig) => async (dispatch) => {
  try {
    const response = await csrfFetch('/api/actingGig', {
        method: 'POST',
        body: JSON.stringify(newGig),
    });
    // returns newGig with all tags attached
    const data = await response.json();
    dispatch(setProduction(data))
    return response;

  } catch(res) {
    res.json()
    .then((data) => {
      // console.log('test Update result before response check', data)
      if (data.message) dispatch(setErrors([data.message]))
    })
    return res;
  }
};


// THUNK for updating a gig
export const updateAndSetProduction = (gigToUpdate) => async (dispatch) => {
  try {
    const response = await csrfFetch('/api/actingGig', {
      method: 'PUT',
      body: JSON.stringify(gigToUpdate),
    });
    // returns the updated gig
    const data = await response.json();
    dispatch(updateProductions(data));
    return response;
  } catch(res) {
    res.json()
    .then((data) => {
      // console.log('test Update result before response check', data)
      if (data.message) dispatch(setErrors([data.message]))
    })
    return res;
  }
};

// THUNK for deleting user photo
export const deleteAndRemoveProduction = (gigId) => async (dispatch) => {
  try {
    // returns success message
    const response = await csrfFetch('/api/actingGig', {
      method: 'DELETE',
      body: JSON.stringify({gigId}),
    });
    dispatch(removeProduction(gigId))
    return response
  } catch(res) {
    res.json()
    .then((data) => {
      if (data.errors) dispatch(setErrors(data.errors))
    })
    return res;
  }
}

// THUNK for getting users roles sorted by gig
export const getAndSetRoles = (userId) => async (dispatch) => {
  try {
    const response = await csrfFetch('/api/gigrole/by_user', {
        method: 'POST',
        body: JSON.stringify({userId}),
    });
    // returns all roles grouped by gig
    /*
    [{
      id:2,
      gigRoles: [{
        id:1,
        title: Scooby Doo
       }]
    }]
    */
    const data = await response.json();
    dispatch(setRoles(data))
    return response;

  } catch(res) {
    res.json()
    .then((data) => {
      // console.log('test Update result before response check', data)
      if (data.message) dispatch(setErrors([data.message]))
    })
    return res;
  }
};

// THUNK for createing gig role
export const createAndSetRole = (newRole) => async (dispatch) => {
  try {
    const response = await csrfFetch('/api/gigrole', {
        method: 'POST',
        body: JSON.stringify(newRole),
    });
    // returns newGig with all tags attached
    const data = await response.json();
    dispatch(setRole(data))
    return response;

  } catch(res) {
    res.json()
    .then((data) => {
      // console.log('test Update result before response check', data)
      if (data.message) dispatch(setErrors([data.message]))
    })
    return res;
  }
};

// THUNK for updating a gig role
export const updateAndSetRole = (roleToUpdate) => async (dispatch) => {
  try {
    const response = await csrfFetch('/api/gigrole', {
      method: 'PUT',
      body: JSON.stringify(roleToUpdate),
    });
    // returns the updated gig
    const data = await response.json();
    dispatch(updateRole(data));
    return response;
  } catch(res) {
    res.json()
    .then((data) => {
      // console.log('test Update result before response check', data)
      if (data.message) dispatch(setErrors([data.message]))
    })
    return res;
  }
};

// THUNK FOR deleting a gig role
export const deleteAndRemoveRole = (roleId, gigId) => async (dispatch) => {
  try {
    // returns success message
    const response = await csrfFetch('/api/gigrole', {
      method: 'DELETE',
      body: JSON.stringify({roleId}),
    });
    dispatch(removeRole(gigId, roleId))
    return response
  } catch(res) {
    res.json()
    .then((data) => {
      if (data.errors) dispatch(setErrors(data.errors))
    })
    return res;
  }
}

// THUNK for retrieving user's Gallery
export const getGallery = (userId) => async (dispatch) => {
  try {
    const response = await csrfFetch('/api/portfolioGallery/by_user', {
      method: 'POST',
      body: JSON.stringify({userId}),
    });
    const data = await response.json();
    if (response.ok) {
      dispatch(setGallery(data))
    }
    return response
  } catch(res) {
    console.log("get gallery error", res)
    res.json()
    .then((data) => {
      if (data.errors) dispatch(setErrors(data.errors))
    })
    return res;
  }
};

// THUNK for adding user's photo
export const addPhoto = (newPhoto) => async (dispatch) => {
  const photoData = new FormData();
  photoData.append('userId', newPhoto.userId);
  photoData.append('image', newPhoto.image);
  photoData.append('title', newPhoto.title);
  photoData.append('order', newPhoto.order)
  try {
    const response = await csrfFetch('/api/portfolioGallery', {
      method: 'POST',
      body: photoData,
    });
    const data = await response.json();
    if (response.ok) {
      dispatch(setGallery(data))
    }
    return response
  } catch(res) {
    res.json()
    .then((data) => {
      if (data.errors) dispatch(setErrors(data.errors))
    })
    return res;
  }
}


// THUNK for adding user's photo
export const updatePhoto = (updatedPhoto) => async (dispatch) => {

  try {
    const response = await csrfFetch('/api/portfolioGallery', {
      method: 'PUT',
      body: JSON.stringify(updatedPhoto),
    });
    const data = await response.json();
    if (response.ok) {
      dispatch(setGallery(data))
    }
    return response
  } catch(res) {
    res.json()
    .then((data) => {
      if (data.errors) dispatch(setErrors(data.errors))
    })
    return res;
  }
}


// THUNK for deleting user photo
export const deletePhoto = (photoId) => async (dispatch) => {
  try {
    const response = await csrfFetch('/api/portfolioGallery', {
      method: 'DELETE',
      body: JSON.stringify({photoId}),
    });
    const data = await response.json();
    if (response.ok) {
      dispatch(setGallery(data))
    }
    return response
  } catch(res) {
    res.json()
    .then((data) => {
      if (data.errors) dispatch(setErrors(data.errors))
    })
    return res;
  }
}

// THUNK for toggling purpose
export const toggleAndSetPurpose = () => async (dispatch) => {
  dispatch(togglePurpose())
}

const initialState = { user: null, actorPortfolio: null, company: null, gallery: [], productions: [], roles: [] };
const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
        return {user: action.payload, actorPortfolio: state.actorPortfolio, company: state.company, gallery: state.gallery, productions: state.productions, roles: state.roles};
    case REMOVE_USER:
        return initialState;
    case SET_PORTFOLIO:
        return {...state, actorPortfolio: action.payload};
    case REMOVE_PORTFOLIO:
        return {...state, actorPortfolio: null};
    case SET_COMPANY:
      return {...state, company: action.payload};
    case REMOVE_COMPANY:
      return {...state, company: null};
    case SET_PURPOSE:
      return {...state, user: {...state.user, purpose: action.payload}}
    case TOGGLE_PURPOSE:
      const currentPurpose = state.user.purpose
      if (currentPurpose === 'actor') return {...state, user: {...state.user, purpose: 'company'}}
      if (currentPurpose === 'company') return {...state, user: {...state.user, purpose: 'actor'}}
      return state;
    case SET_ACTOR_PURPOSE:
      return {...state, user: {...state.user, purpose: 'actor'}}
    case SET_COMPANY_PURPOSE:
        return {...state, user: {...state.user, purpose: 'company'}}
    case SET_GALLERY:
      return {...state, gallery: action.payload}
    case REMOVE_GALLERY:
      return {...state, gallery: []}
    case SET_PRODUCTIONS:
      return {...state, productions: action.payload}
    case SET_PRODUCTION:
      const newProductions = [...state.productions]
      newProductions.push(action.payload)
      return {...state, productions: newProductions}
    case REMOVE_RODUCTION:
      const productionIndex = state.productions.findIndex((gig) => gig.id === action.payload)
      const updatedProductions = [...state.productions]
      updatedProductions.splice(productionIndex, 1)
      return {...state, productions: updatedProductions}
    case UPDATE_PRODUCTIONS:
      const updatedProductionIndex = state.productions.findIndex(gig => gig.id === action.payload.id)
      const updatedGigs = [...state.productions]
      updatedGigs.splice(updatedProductionIndex, 1, action.payload)
      return {...state, productions: updatedGigs}
    case CLEAR_PRODUCTIONS:
      return {...state, productions: []}
    case SET_ROLES:
      return {...state, roles: action.payload}
    case SET_ROLE:
      const gigIndex = state.roles.findIndex(gig => gig.id === action.payload.gigId)
      const newGigs = [...state.roles]
      const newRoles = [...state.roles[gigIndex].gigRoles]
      newRoles.push(action.payload)
      newGigs.splice(gigIndex, 1, {...state.roles[gigIndex], gigRoles: newRoles})
      return {...state, roles:newGigs};
    case UPDATE_ROLE:{
      console.log('MADE IT TO UPDATE ROLE', action.payload)
      const gigIndex = state.roles.findIndex(gig => gig.id === action.payload.gigId)
      console.log('GIG INFO: ', gigIndex, state.roles[gigIndex])
      const roleIndex = state.roles[gigIndex].gigRoles.findIndex(role => role.id === action.payload.id)
      const newRoles = [...state.roles[gigIndex].gigRoles]
      newRoles.splice(roleIndex, 1, action.payload)
      const newGigs = [...state.roles]
      newGigs.splice(gigIndex, 1, {...state.roles[gigIndex], gigRoles: newRoles} )
      return {...state, roles:newGigs};
    }
    case REMOVE_ROLE:{
      const gigIndex = state.roles.findIndex(gig => gig.id === action.payload.gigId)
      const roleIndex = state.roles[gigIndex].gigRoles.findIndex(role => role.id === action.payload.id)
      const newRoles = [...state.roles[gigIndex].gigRoles]
      const spliced = newRoles.splice(roleIndex, 1)
      console.log('SPLICED: ', spliced)
      const newGigs = [...state.roles]
      newGigs.splice(gigIndex, 1, {id:action.payload.gigId, gigRoles: newRoles} )
      return {...state, roles:newGigs};
    }
    case CLEAR_ROLES:
      return {...state, roles: []}
    default:
      return state;
          }
};

function  getPurpose(data) {
  // const purpose = Window.localStorage.getItem('purpose')
  const purpose = null;
  if (purpose && (purpose === 'actor' || purpose === 'company')) return purpose;
  if (data.actorPortfolio && data.company) {
    // Window.localStorage.setItem('purpose', 'actor')
    return 'company'
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

export default sessionReducer;
