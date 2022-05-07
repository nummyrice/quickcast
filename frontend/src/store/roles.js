import { csrfFetch } from "./csrf";
import { setErrors } from "./errors";

const SET_ROLES = 'roles/set';
const CLEAR_ROLES = 'roles/clear';
const REMOVE_ROLE = 'roles/remove';

const setRoles = (portfolios) => ({
  type: SET_ROLES,
  payload: portfolios
})

const removeRole = (portfolioId) => ({
  type: REMOVE_ROLE,
  payload: portfolioId
})

const clearRoles = () => ({
  type: CLEAR_ROLES
})

// THUNK to get all actor portfolios paginated
export const getPortfolios = (offset) => async (dispatch) => {
  try {
    const response = await csrfFetch('/api/gigrole/all', {
      method: 'POST',
      body: JSON.stringify({offset})
    })
    const data = await response.json()
      dispatch(setRoles(data))
    return response
  } catch (res) {
    res.json()
    .then((data) => {
      if (data.errors) dispatch(setErrors(data.errors))
    })
    return res;
  }
}

const initialState = [];
const roleReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ROLES:
            return action.payload;
        case CLEAR_ROLES:
            return [];
        case REMOVE_ROLE:
            const roleIndex = state.findIndex(role => role.id === action.payload)
            const newRoles = [...state]
            newRoles.splice(roleIndex, 1)
            return newRoles
        default:
            return state;
    }
};

export default roleReducer;
