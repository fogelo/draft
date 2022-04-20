import {v1} from 'uuid';

export type FilterType = 'all' | 'active' | 'completed'


type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

export const todolistsReducer = (state: TodolistType[] = [], action: ActionT): TodolistType[] => {
    switch (action.type) {
        case 'add-todolist': {
            const newTodolist: TodolistType = {
                id: action.todolistId,
                title: action.todolistTitle,
                filter: 'all'
            }
            return [...state, newTodolist]
        }
        case 'remove-todolist': {
            return state.filter(tl => tl.id !== action.todolistId)
        }
        case 'change-todolist-title': {
            const todolist = state.find(tl => tl.id === action.todolistId)
            if (todolist) {
                todolist.title = action.todolistTitle
            }
            return [...state]
        }
        case 'change-filter': {
            const todolist = state.find(tl => tl.id === action.todolistId)
            if (todolist) {
                todolist.filter = action.filter
            }
            return [...state]
        }
        default: {
            return state
        }
    }
}


type ActionT = AddTodolistAT | RemoveTodolistAT | ChangeTodolistAT | ChangeFilterAT

export type AddTodolistAT = {
    type: 'add-todolist'
    todolistTitle: string
    todolistId: string
}

export type RemoveTodolistAT = {
    type: 'remove-todolist'
    todolistId: string
}

type ChangeTodolistAT = {
    type: 'change-todolist-title'
    todolistTitle: string
    todolistId: string
}

type ChangeFilterAT = {
    type: 'change-filter'
    filter: FilterType
    todolistId: string
}

export const addTodolistAC = (todolistTitle: string): AddTodolistAT => ({
    type: 'add-todolist',
    todolistTitle,
    todolistId: v1()
})

export const removeTodolistAC = (todolistId: string): RemoveTodolistAT => ({type: 'remove-todolist', todolistId})

export const changeTodolistTitleAC = (todolistTitle: string, todolistId: string): ChangeTodolistAT => ({
    type: 'change-todolist-title',
    todolistId,
    todolistTitle
})

export const changeFilterAC = (filter: FilterType, todolistId: string): ChangeFilterAT => ({
    type: 'change-filter',
    filter,
    todolistId
})



