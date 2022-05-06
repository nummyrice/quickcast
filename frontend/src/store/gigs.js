import { csrfFetch } from "./csrf";
import { setErrors } from "./errors";

const SET_GIGS = 'gigs/set';
const CLEAR_GIGS = 'gigs/clear';
const REMOVE_GIG = 'gigs/remove';

const setGigs = (gigs) => ({
  type: SET_GIGS,
  payload: gigs
})

const removeGig = (gigId) => ({
  type: REMOVE_GIG,
  payload: gigId
})

const clearGigs = () => ({
  type: CLEAR_GIGS
})

// THUNK to get all gigs paginated
export const getAndSetGigs = (offset) => async (dispatch) => {
  try {
    const response = await csrfFetch('/api/actingGig/all', {
      method: 'POST',
      body: JSON.stringify({offset})
    })
    const data = await response.json()
      dispatch(setGigs(data))

  } catch (res) {
    res.json()
    .then((data) => {
      if (data.errors) dispatch(setErrors(data.errors))
    })
    return res;
  }
}

const initialState = [];
const gigReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_GIGS:
            return action.payload;
        case CLEAR_GIGS:
            return [];
        case REMOVE_GIG:
            const gigIndex = state.findIndex(gig => gig.id === action.payload)
            const newGigs = [...state]
            newGigs.splice(gigIndex, 1)
            return newGigs
        default:
            return state;
    }
};

export default gigReducer;
