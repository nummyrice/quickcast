const SET_PORTFOLIOS = 'portfolios/set';
const CLEAR_PORTFOLIOS = 'portfolios/clear';
const REMOVE_PORTFOLIO = 'portfolios/remove';

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

export const getPortfolios = (id) => async (dispatch) => {

    dispatch(setPortfolios())
}

const initialState = [];
const portfolioReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PORTFOLIOS:
            return action.payload;
        case CLEAR_PORTFOLIOS:
            return [];
        case REMOVE_PORTFOLIO:
            const portfolioIndex = state.findIndex(portfolio => portfolio.id === action.payload)
            state.splice(portfolioIndex, 1)
            return [...state];
        default:
            return state;
    }
};

export default portfolioReducer;
