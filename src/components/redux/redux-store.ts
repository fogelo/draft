import {combineReducers, createStore} from 'redux';
import {profileReducer} from './profile-reducer';

export const rootState = combineReducers({
    profilePage: profileReducer
})

export const store = createStore(rootState)
