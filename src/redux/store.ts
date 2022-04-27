import {combineReducers, createStore} from 'redux';
import {tasksReducer} from './tasks-reducer';


const rootState = combineReducers({
    tasks: tasksReducer
})

export const store = createStore(rootState)


export type AppRootStateT = ReturnType<typeof rootState>