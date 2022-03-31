import {combineReducers, createStore} from 'redux';
import {todolistsReducer} from './todolists-reducer';

const state = combineReducers({
    todolists: todolistsReducer
})


export type  RootStateType = ReturnType<typeof state>
export const store = createStore(state)