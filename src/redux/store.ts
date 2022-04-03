import {combineReducers, createStore} from 'redux';
import {profileReducer} from './profile-reducer';
import {usersReducer} from './users-reducer';

const rootState = combineReducers({
    profilePage: profileReducer,
    usersPage: usersReducer
})

export const store = createStore(rootState)