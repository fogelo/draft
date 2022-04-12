import {combineReducers, createStore} from 'redux';
import {profileReducer} from './profile-reducer';

const state = combineReducers({
    profilePage: profileReducer
})

export const store = createStore(state)

export type RootState = ReturnType<typeof state>