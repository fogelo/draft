import {TaskType} from "../dal/todolist-api";

const initialState: TaskStateType = {}

export const tasksReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case "set-tasks": {
            return {...state, [action.todolistId]: action.tasks}
        }
        case "add-task":
            return {...state, [action.task.todoListId]: [...state[action.task.todoListId], action.task]}
        case "remove-task":
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        default: {
            return state
        }
    }
}


//actions
export const setTasksAC = (todolistId: string, tasks: TaskType[]) => ({type: "set-tasks", todolistId, tasks} as const)
export const addTaskAC = (task: TaskType) => ({type: "add-task", task} as const)
export const removeTaskAC = (todolistId: string, taskId: string) => ({type: "remove-task", todolistId, taskId} as const)


//types
type ActionType = ReturnType<typeof addTaskAC> | ReturnType<typeof setTasksAC> | ReturnType<typeof removeTaskAC>

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

