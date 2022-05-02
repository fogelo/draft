import {applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todolistReducer} from "./todolist-reducer";
import thunk from "redux-thunk"


const rootState = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer
})

export const store = createStore(rootState, applyMiddleware(thunk))


export type AppRootStateT = ReturnType<typeof rootState>