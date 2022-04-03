import {combineReducers, createStore} from 'redux';
import {profileReducer} from './profile-reducer';

const rootState = combineReducers({
    profilePage: profileReducer
})

export const store = createStore(rootState)