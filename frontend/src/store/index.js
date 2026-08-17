import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import companyReducer from './company';
import portfolioReducer from './portfolio';
import sessionReducer from './session';
import errorsReducer from './errors';
import gigReducer from './gigs';
import roleReducer from './roles';

const rootReducer = combineReducers({
    session: sessionReducer,
    companies: companyReducer,
    portfolios: portfolioReducer,
    gigs: gigReducer,
    roles: roleReducer,
    errors: errorsReducer
});

let enhancer;

if (import.meta.env.PROD) {
    enhancer = applyMiddleware(thunk);
} else {
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
};

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
