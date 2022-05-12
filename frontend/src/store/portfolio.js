import { csrfFetch } from "./csrf";
import { setErrors } from "./errors";

const SET_PORTFOLIOS = 'portfolios/set';
const CLEAR_PORTFOLIOS = 'portfolios/clear';
const REMOVE_PORTFOLIO = 'portfolios/remove';
const ADD_PORTFOLIOS = 'portfolios/add';

const setPortfolios = (portfolios) => ({
  type: SET_PORTFOLIOS,
  payload: portfolios
})

const removePortfolio = (portfolioId) => ({
  type: REMOVE_PORTFOLIO,
  payload: portfolioId
})

const clearPortfolios = () => ({
  type: CLEAR_PORTFOLIOS
})

const addPortfolios = (portfolios) => ({
  type: ADD_PORTFOLIOS,
  payload: portfolios
})

// THUNK to get all actor portfolios paginated
export const getPortfolios = (offset) => async (dispatch) => {
  try {
    const response = await csrfFetch('/api/actorPortfolio/all', {
      method: 'POST',
      body: JSON.stringify({offset})
    })
    const data = await response.json()

    data.portfolios.forEach(portfolio => {
      if (data.galleries[portfolio.userId]) {
        portfolio.gallery = data.galleries[portfolio.userId]
      } else {
        portfolio.gallery = []
      }
      return;
      })
      dispatch(setPortfolios(data.portfolios))

  } catch (res) {
    res.json()
    .then((data) => {
      if (data.errors) dispatch(setErrors(data.errors))
    })
    return res;
  }
}

export const getAndSetCompanyFeed = (offset) => async (dispatch) => {
  try {
    const response = await csrfFetch('/api/actorPortfolio/feed', {
      method: 'POST',
      body: JSON.stringify({offset})
    })
    const data = await response.json()
    data.portfolios.forEach(portfolio => {
      if (data.galleries[portfolio.userId]) {
        portfolio.gallery = data.galleries[portfolio.userId]
      } else {
        portfolio.gallery = []
      }
      return;
      })
    dispatch(setPortfolios(data.portfolios))
    return data
  } catch (res) {
    res.json()
    .then((data) => {
      if (data.errors) dispatch(setErrors(data.errors))
    })
    return res;
  }
}

export const addToPortfolios = (offset) => async (dispatch) => {
  try {
    const response = await csrfFetch('/api/ActingPortfolio/feed', {
      method: 'POST',
      body: JSON.stringify({offset})
    })
    const data = await response.json()
      dispatch(addPortfolios(data.rows))
    return data
  } catch (res) {
    res.json()
    .then((data) => {
      if (data.errors) dispatch(setErrors(data.errors))
    })
    return res;
  }
}

const initialState = [];
const portfolioReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PORTFOLIOS:
            return action.payload;
        case ADD_PORTFOLIOS:
          return [...state, ...action.payload]
        case CLEAR_PORTFOLIOS:
            return [];
        case REMOVE_PORTFOLIO:
            const portfolioIndex = state.findIndex(portfolio => portfolio.id === action.payload)
            const newPortfolios = [...state]
            newPortfolios.splice(portfolioIndex, 1)
            return newPortfolios
        default:
            return state;
    }
};

export default portfolioReducer;
