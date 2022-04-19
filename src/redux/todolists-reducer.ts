import {v1} from 'uuid';

type TodolistType = {
    id: string
    title: string
    filter: string
}

export const todolistsReducer = (state: TodolistType[] = [], action: ActionT): TodolistType[] => {
    switch (action.type) {
        case 'add-todolist': {
            const newTodolist = {
                id: action.todolistId,
                title: action.todolistTitle,
                filter: 'all'
            }
            return [...state, newTodolist]
        }
        case 'remove-todolist': {
            return state.filter(tl => tl.id !== action.todolistId)
        }
        default: {
            return state
        }
    }
}


type ActionT = AddTodolistAT | RemoveTodolistAT

export type AddTodolistAT = {
    type: 'add-todolist'
    todolistTitle: string
    todolistId: string
}

export type RemoveTodolistAT = {
    type: 'remove-todolist'
    todolistId: string
}

export const addTodolistAC = (todolistTitle: string): AddTodolistAT => ({
    type: 'add-todolist',
    todolistTitle,
    todolistId: v1()
})

export const removeTodolistAC = (todolistId: string): RemoveTodolistAT => ({type: 'remove-todolist', todolistId})


