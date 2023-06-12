import { combineReducers, createStore } from 'redux';
import authReducer from './reducer/authReducer'

const totalReducers = combineReducers({
    main: authReducer
});

export const store = createStore(totalReducers);
