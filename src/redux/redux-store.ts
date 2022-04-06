import {combineReducers, createStore} from 'redux';
import {profileReducer} from './profile-reducer';
import {usersReducer} from './users-reducer';
import {authReducer} from './auth-reducer';

export const rootState = combineReducers({
    profilePage: profileReducer,
    usersPage: usersReducer,
    auth: authReducer
})

export const store: any = createStore(rootState)
