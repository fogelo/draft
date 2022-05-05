import {todolistAPI, TodolistType} from "../dal/todolist-api";
import {Dispatch} from "redux";
import {setAppStatusAC} from "../app-reducer";


const initialState: Array<TodolistDomainType> = []

export const todolistReducer = (state = initialState, action: TodolistActionType) => {
    switch (action.type) {
        case "set-todolists":
            return action.todolists.map(tl => ({...tl, filter: "all"}))
        case "add-todolist":
            return [...state, {...action.todolist, filter: "all"}]
        case "remove-todolist":
            return state.filter(tl => tl.id !== action.id)
        case "change-todolist-title":
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case "change-filter":
            return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.filter} : tl)
        default: {
            return state
        }
    }
}


//actions
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: "set-todolists", todolists} as const)
export const addTodolistAC = (todolist: TodolistType) => ({type: "add-todolist", todolist} as const)
export const removeTodolistAC = (id: string) => ({type: "remove-todolist", id} as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: "change-todolist-title",
    id,
    title
} as const)
export const changeFilterAC = (todolistId: string, filter: string) => ({
    type: "change-filter",
    todolistId,
    filter
} as const)


//thunks
export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
    todolistAPI.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC(res.data))
        })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    todolistAPI.createTodolist(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setAppStatusAC("succeeded"))
            }
        })
}
export const removeTodolistTC = (id: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTodolist(id)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTodolistAC(id))
            }
        })
}
export const changeTodolistTitleTC = (id: string, title: string) => (dispatch: Dispatch) => {
    todolistAPI.updateTodolist(id, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(changeTodolistTitleAC(id, title))
            }
        })
}


//types
export type TodolistActionType =
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeFilterAC>

export type TodolistDomainType = TodolistType & { filter: "all" | "active" | "completed" }
