import {v1} from 'uuid';
import {StateType} from '../App';


type AddTodolistAT = {
    type: 'ADD-TODOLIST',
    title: string
}
type ChangeTodolistTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE',
    todolistId: string
    title: string
}

type RemoveTodolistAT = {
    type: 'REMOVE-TODOLIST',
    todolistId: string
}

type AddTaskAT = {
    type: 'ADD-TASK'
    todolistId: string
    title: string
}

type ChangeTaskTitleAT = {
    type: 'CHANGE-TASK-TITLE'
    todolistId: string
    taskId: string
    title: string
}
type ChangeTaskStatusAT = {
    type: 'CHANGE-TASK-STATUS'
    todolistId: string
    taskId: string
    isDone: boolean
}
type RemoveTaskAT = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}

type ActionType =
    AddTodolistAT
    | ChangeTodolistTitleAT
    | RemoveTodolistAT
    | AddTaskAT
    | ChangeTaskTitleAT
    | ChangeTaskStatusAT
    | RemoveTaskAT

export const addTodolistAC = (title: string): AddTodolistAT => {
    return {type: 'ADD-TODOLIST', title}
}
export const changeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleAT => {
    return {type: 'CHANGE-TODOLIST-TITLE', todolistId, title}
}
export const removeTodolistAC = (todolistId: string): RemoveTodolistAT => {
    return {type: 'REMOVE-TODOLIST', todolistId}
}
export const addTaskAC = (todolistId: string, title: string): AddTaskAT => {
    return {type: 'ADD-TASK', todolistId, title}
}
export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string): ChangeTaskTitleAT => {
    return {type: 'CHANGE-TASK-TITLE', todolistId, taskId, title}
}
export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean): ChangeTaskStatusAT => {
    return {type: 'CHANGE-TASK-STATUS', todolistId, taskId, isDone}
}
export const removeTaskAC = (todolistId: string, taskId: string,): RemoveTaskAT => {
    return {type: 'REMOVE-TASK', todolistId, taskId}
}

const initialState = [
    {
        id: v1(), title: 'what to learn', tasks: [
            {id: v1(), title: 'html', isDone: true},
            {id: v1(), title: 'css', isDone: true},
            {id: v1(), title: 'react', isDone: true},
            {id: v1(), title: 'redux', isDone: false},]
    },
    {
        id: v1(), title: 'what to buy', tasks: [
            {id: v1(), title: 'milk', isDone: true},
            {id: v1(), title: 'meat', isDone: true},
            {id: v1(), title: 'egs', isDone: false},]
    },
]

export const todolistsReducer = (state: StateType = initialState, action: ActionType): StateType => {
    switch (action.type) {
        case 'ADD-TODOLIST': {
            const newTodolist = {
                id: v1(),
                title: action.title,
                tasks: []
            }
            return [...state, newTodolist]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.todolistId)
            if (todolist) {
                todolist.title = action.title
            }
            return [...state]
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.todolistId)
        }
        case 'ADD-TASK': {
            const newTask = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            const todolist = state.find(tl => tl.id === action.todolistId)
            if (todolist) {
                todolist.tasks = [...todolist.tasks, newTask]
            }
            return [...state]
        }
        case 'CHANGE-TASK-TITLE': {
            const todolist = state.find(tl => tl.id === action.todolistId)
            if (todolist) {
                const task = todolist.tasks.find(t => t.id === action.taskId)
                if (task) {
                    task.title = action.title
                }
            }
            return [...state]
        }
        case 'CHANGE-TASK-STATUS': {
            const todolist = state.find(tl => tl.id === action.todolistId)
            if (todolist) {
                const task = todolist.tasks.find(t => t.id === action.taskId)
                if (task) {
                    task.isDone = action.isDone
                }
            }
            return [...state]
        }
        case 'REMOVE-TASK': {
            const todolist = state.find(tl => tl.id === action.todolistId)
            if (todolist) {
                todolist.tasks = todolist.tasks.filter(t => t.id !== action.taskId)
            }
            return [...state]
        }
        default: {
            return state
        }
    }
}


// const removeTask = (todolistId: string, taskId: string) => {
//     const todolist = todolists.find(tl => tl.id === todolistId)
//     if (todolist) {
//         todolist.tasks = todolist.tasks.filter(t => t.id !== taskId)
//     }
//     setTodolists([...todolists])
// }