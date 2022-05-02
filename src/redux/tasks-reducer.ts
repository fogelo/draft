import {TaskType, todolistAPI, UpdateTaskRequestType} from "../dal/todolist-api";
import {AnyAction, Dispatch} from "redux";
import {AppRootStateT} from "./store";
import {TodolistActionType} from "./todolist-reducer";

const initialState: TaskStateType = {}

export const tasksReducer = (state = initialState, action: TasksActionType) => {
    switch (action.type) {
        case "set-tasks":
            return {...state, [action.todolistId]: action.tasks}
        case "add-task":
            return {...state, [action.task.todoListId]: [...state[action.task.todoListId], action.task]}
        case "remove-task":
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case "change-task-title":
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, title: action.title} : t)
            }
        default: {
            return state
        }
    }
}


//actions
export const setTasksAC = (todolistId: string, tasks: TaskType[]) => ({type: "set-tasks", todolistId, tasks} as const)
export const addTaskAC = (task: TaskType) => ({type: "add-task", task} as const)
export const removeTaskAC = (todolistId: string, taskId: string) => ({type: "remove-task", todolistId, taskId} as const)
export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) =>
    ({type: "change-task-title", todolistId, taskId, title} as const)


//thunks
export const changeTaskTitleTC = (todolistId: string, taskId: string, title: string) =>
    (dispatch: Dispatch, getState: () => AppRootStateT) => {
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (task) {
            const model: UpdateTaskRequestType = {
                title,
                status: task.status,
                deadline: task.deadline,
                description: task.description,
                priority: task.priority,
                startDate: task.startDate
            }
            todolistAPI.updateTask(todolistId, taskId, model)
                .then(res => {
                    if (res.data.resultCode === 0) {
                        dispatch(changeTaskTitleAC(todolistId, taskId, title))
                    }
                })
        }
    }

//types
export type TasksActionType =
    ReturnType<typeof addTaskAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof changeTaskTitleAC>

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

