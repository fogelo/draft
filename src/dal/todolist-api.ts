import axios from "axios"

const instance = axios.create({
    baseURL: "'https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        "api-key": "b1356b5e-074b-4608-a733-39db627817e8"
    }
});

export const todolistAPI = {
    getTodolists() {
        return instance.get<TodolistType>("todo-lists")
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>("todo-lists", {title})
    },
    deleteTodolist(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`)
    },
    updateTodolist(id: string, title: string) {
        return instance.put<ResponseType>(`todo-list/${id}`)
    }
}

type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type ResponseType<D = {}> = {
    data: D,
    messages: string[],
    fieldsErrors: number[],
    resultCode: number
}