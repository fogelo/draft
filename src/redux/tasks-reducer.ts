import {v1} from 'uuid';
import {AddTodolistAT, RemoveTodolistAT} from './todolists-reducer';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type StateType = {
    [key: string]: TaskType[]
}

const initState: StateType = {}

export const tasksReducer = (state: StateType = initState, action: ActionType): StateType => {
    switch (action.type) {
        case 'add-task': {
            const newTask = {
                id: v1(),
                title: action.taskTitle,
                isDone: false
            }
            const tasks = state[action.todolistId]
            state[action.todolistId] = [...tasks, newTask]
            return {...state}
        }
        case 'remove-task': {
            const tasks = state[action.todolistId]
            state[action.todolistId] = tasks.filter(t => t.id !== action.taskId)
            return {...state}
        }
        case 'change-task-status': {
            const tasks = state[action.todolistId]
            const task = tasks.find(t => t.id === action.taskId)
            if (task) {
                task.isDone = action.isDone
            }
            return {...state}
        }
        case 'change-task-title': {
            const tasks = state[action.todolistId]
            const task = tasks.find(t => t.id === action.taskId)
            if (task) {
                task.title = action.taskTitle
            }
            return {...state}
        }
        case 'add-todolist': {
            return {...state, [action.todolistId]: []}
        }
        case 'remove-todolist': {
            delete state[action.todolistId]
            return {...state}
        }
        default: {
            return state
        }
    }
}

type ActionType = AddTaskAT | removeTaskAT | changeTaskStatusAT | changeTaskTitleAT | AddTodolistAT | RemoveTodolistAT

type AddTaskAT = {
    type: 'add-task'
    taskTitle: string
    todolistId: string
}

type removeTaskAT = {
    type: 'remove-task'
    taskId: string
    todolistId: string
}

type changeTaskStatusAT = {
    type: 'change-task-status'
    taskId: string
    isDone: boolean
    todolistId: string
}

type changeTaskTitleAT = {
    type: 'change-task-title'
    taskId: string
    taskTitle: string
    todolistId: string
}

export const addTaskAC = (taskTitle: string, todolistId: string): AddTaskAT => ({
    type: 'add-task',
    taskTitle,
    todolistId
})
export const removeTaskAC = (taskId: string, todolistId: string): removeTaskAT => ({
    type: 'remove-task',
    taskId,
    todolistId
})
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): changeTaskStatusAT => ({
    type: 'change-task-status',
    taskId,
    isDone,
    todolistId
})

export const changeTaskTitleAC = (taskId: string, taskTitle: string, todolistId: string): changeTaskTitleAT => ({
    type: 'change-task-title',
    taskId,
    taskTitle,
    todolistId
})