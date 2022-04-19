import {v1} from 'uuid';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const initState: Array<TaskType> = []

export const tasksReducer = (state: Array<TaskType> = initState, action: ActionType): Array<TaskType> => {
    switch (action.type) {
        case 'add-task': {
            const newTask = {
                id: v1(),
                title: action.taskTitle,
                isDone: false
            }
            return [...state, newTask]
        }
        case 'remove-task': {
            return state.filter(t => t.id !== action.taskId)
        }
        case 'change-task-status': {
            const task = state.find(t => t.id === action.taskId)
            if (task) {
                task.isDone = action.isDone
            }
            return [...state]
        }
        default: {
            return state
        }
    }
}

type ActionType = AddTaskAT | removeTaskAT | changeTaskStatusAT

type AddTaskAT = {
    type: 'add-task'
    taskTitle: string
}

type removeTaskAT = {
    type: 'remove-task'
    taskId: string
}

type changeTaskStatusAT = {
    type: 'change-task-status'
    taskId: string
    isDone: boolean
}

export const addTaskAC = (taskTitle: string): AddTaskAT => ({type: 'add-task', taskTitle})
export const removeTaskAC = (taskId: string): removeTaskAT => ({type: 'remove-task', taskId})
export const changeTaskStatusAC = (taskId: string, isDone: boolean): changeTaskStatusAT => ({
    type: 'change-task-status',
    taskId,
    isDone
})

