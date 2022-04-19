import {v1} from 'uuid';

type TodolistType = {
    id: string
    title: string
    filter: string
}

export const todolistsReducer = (state: TodolistType[], action: ActionT) => {
    switch (action.type) {
        case 'add-todolist': {
            const newTodolist = {
                id: v1(),
                title: action.todolistTitle
            }
            return [...state, newTodolist]
        }
        default: {
            return state
        }
    }
}


type ActionT = AddTodolistAT

type AddTodolistAT = {
    type: 'add-todolist'
    todolistTitle: string
}

export const addTodolistAC = (todolistTitle: string): AddTodolistAT => ({type: 'add-todolist', todolistTitle})

