import axios from 'axios';

export const profileAPI = {
    getProfile(id: any) {
        return axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${id}`, {
            withCredentials: true,
            headers: {
                'API-KEY': 'b1356b5e-074b-4608-a733-39db627817e8'
            }
        })
    },
    getStatus(id: any) {
        return axios.get(`https://social-network.samuraijs.com/api/1.0/profile/status/${id}`, {
            withCredentials: true,
            headers: {
                'API-KEY': 'b1356b5e-074b-4608-a733-39db627817e8'
            }
        })
    },
    putStatus(status: any) {
        return axios.put(`https://social-network.samuraijs.com/api/1.0/profile/status`, {status: status}, {
            withCredentials: true,
            headers: {
                'API-KEY': 'b1356b5e-074b-4608-a733-39db627817e8'
            }
        })
    }
}

export const usersAPI = {
    getUsers(currentPage: any, usersCount: any) {
        return axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${usersCount}`, {
            withCredentials: true,
            headers: {
                'API-KEY': 'b1356b5e-074b-4608-a733-39db627817e8'
            }
        })
    },
    postFollow(id: any) {
        return axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${id}`, {}, {
            withCredentials: true,
            headers: {
                'API-KEY': 'b1356b5e-074b-4608-a733-39db627817e8'
            }
        })
    },
    deleteFollow(id: any) {
        return axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${id}`, {
            withCredentials: true,
            headers: {
                'API-KEY': 'b1356b5e-074b-4608-a733-39db627817e8'
            }
        })
    }

}

export const authAPI = {
    getAuth() {
        return axios.get('https://social-network.samuraijs.com/api/1.0/auth/me', {withCredentials: true})
    }
}