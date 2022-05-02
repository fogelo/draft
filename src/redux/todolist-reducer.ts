import {TodolistType} from "../dal/todolist-api";


const initialState: Array<TodolistType> = []

export const todolistReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case "set-todolists": {
            return [...state, ...action.todolists]
        }
        case "add-todolist": {
            return [...state, action.todolist]
        }
        case "remove-todolist": {
            return state.filter(tl => tl.id !== action.id)
        }
        default: {
            return state
        }
    }
}


//actions
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: "set-todolists", todolists} as const)
export const addTodolistAC = (todolist: TodolistType) => ({type: "add-todolist", todolist} as const)
export const removeTodolistAC = (id: string) => ({type: "remove-todolist", id} as const)

//types
type ActionType =
    | ReturnType<typeof addTodolistAC> | ReturnType<typeof removeTodolistAC> | ReturnType<typeof setTodolistsAC>

