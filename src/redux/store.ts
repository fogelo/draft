import {combineReducers, createStore} from 'redux';
import {todolistsReducer} from './todolists-reducer';
import {tasksReducer} from './tasks-reducer';

const rootState = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})


export type RootStateType = ReturnType<typeof rootState>

export const store = createStore(rootState)

