import {combineReducers, createStore} from 'redux';
import {tasksReducer} from './tasks-reducer';
import {todolistReducer} from "./todolist-reducer";


const rootState = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer
})

export const store = createStore(rootState)


export type AppRootStateT = ReturnType<typeof rootState>