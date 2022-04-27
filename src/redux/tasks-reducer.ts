import {v1} from 'uuid';

const initialState: Array<TaskType> = []

export const tasksReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case 'add-task':
            return [...state, {id: v1(), title: action.title, status: TaskStatus.New}]
        default: {
            return state
        }
    }
}


//actions
export const addTaskAC = (title: string) => ({type: 'add-task', title} as const)


//types

type ActionType = ReturnType<typeof addTaskAC>

enum TaskStatus {
    New,
    InProgress,
    Completed,
    Draft
}

export type TaskType = {
    id: string
    title: string
    status: TaskStatus
}

