import {applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todolistReducer} from "./todolist-reducer";
import thunk from "redux-thunk"
import {authReducer} from "./auth-reducer";
import {appReducer} from "../app-reducer";


const rootState = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer,
    auth: authReducer,
    app: appReducer
})

export const store = createStore(rootState, applyMiddleware(thunk))


export type AppRootStateT = ReturnType<typeof rootState>