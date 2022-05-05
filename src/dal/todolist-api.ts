import axios from "axios"

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        "api-key": "b1356b5e-074b-4608-a733-39db627817e8",
    }
});


export const authAPI = {
    me() {
        return instance.get<ResponseType<UserDataType>>("auth/me")
    },
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post<ResponseType<{ userId: number }>>("auth/login", {email, password, rememberMe})
    },
    logout(){
        return instance.delete<ResponseType>("auth/login")
    }
}

export const todolistAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>("todo-lists")
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>("todo-lists", {title})
    },
    deleteTodolist(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`)
    },
    updateTodolist(id: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${id}`, {title})
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskRequestType) {
        return instance.put<ResponseType<{ item: UpdateTaskResponseType }>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
}


export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type ResponseType<D = {}> = {
    data: D,
    messages: string[],
    fieldsErrors?: number[],
    resultCode: number
}

export type UpdateTaskRequestType = {
    title: string
    description: null | string
    completed?: boolean
    status: TaskStatus
    priority: number
    startDate: null | string
    deadline: null | string
}
type UpdateTaskResponseType = {
    description: null | string
    title: string
    completed?: boolean
    status: TaskStatus
    priority: number
    startDate: null | string
    deadline: null | string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export enum TaskStatus {
    New,
    InProgress,
    Completed,
    Draft
}

export type TaskType = {
    id: string,
    title: string,
    description: null | string,
    todoListId: string,
    order: number,
    status: TaskStatus,
    priority: number,
    startDate: null | string,
    deadline: null | string,
    addedDate: string
}

type GetTasksResponseType = {
    items: TaskType[]
    totalCount: number,
    error: null | string
}

export type UserDataType = {
    id: number
    email: string
    login: string
}