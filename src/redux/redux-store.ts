import {combineReducers, createStore} from 'redux';
import {profileReducer} from './profile-reducer';
import {usersReducer} from './users-reducer';
import {authReducer} from './auth-reducer';
import { reducer as formReducer } from 'redux-form'

const state = combineReducers({
    profilePage: profileReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer
})

export const store = createStore(state)

export type RootState = ReturnType<typeof state>