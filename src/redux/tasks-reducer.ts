import {TaskType} from "../dal/todolist-api";

const initialState: TaskStateType = {}

export const tasksReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case "set-tasks": {
            return {...state, [action.todolistId]: action.tasks}
        }
        case "add-task":
            return {...state, [action.task.todoListId]: [...state[action.task.todoListId], action.task]}
        default: {
            return state
        }
    }
}


//actions
export const setTasksAC = (todolistId: string, tasks: TaskType[]) => ({type: "set-tasks", todolistId, tasks} as const)
export const addTaskAC = (task: TaskType) => ({type: "add-task", task} as const)


//types
type ActionType = ReturnType<typeof addTaskAC> | ReturnType<typeof setTasksAC>

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

