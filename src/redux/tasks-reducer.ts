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
                title: action.title,
                isDone: false
            }
            return state
        }
        default: {
            return state
        }
    }
}

type ActionType = AddTaskAT

type AddTaskAT = {
    type: 'add-task'
    title: string
}

export const addTaskAC = (title: string) => ({type: 'add-task', title})