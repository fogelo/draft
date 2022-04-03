import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': 'e1a10142-bc6b-4db7-85fc-aa063d946841'
    }
})

export const usersAPI = {
    getUsers(usersCount: any, currentPage: any) {
        return instance.get(`users?page=1&count=${usersCount}`)
    },
}