const SET_USERS = 'SET-USERS'
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT'


type PhotosType = {
    small: string
    large: string
}

export type UserType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}

type StateType = {
    users: UserType[]
    totalUsersCount: number
    error: string
}
const initState = {
    users: [],
    totalUsersCount: 0,
    error: '',

}

export const usersReducer = (state: StateType = initState, action: ActionType) => {
    switch (action.type) {
        case SET_USERS: {
            return {
                ...state,
                users: action.users
            }
        }
        case SET_TOTAL_USERS_COUNT: {
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        }
        default: {
            return state
        }
    }
}


export type ActionType = SetUsersAT | SetTotalUsersCountAT


type SetUsersAT = {
    type: 'SET-USERS'
    users: UserType[]
}

type SetTotalUsersCountAT = {
    type: 'SET-TOTAL-USERS-COUNT'
    totalUsersCount: number
}

export const setUsersAC = (users: UserType[]): SetUsersAT => ({type: SET_USERS, users})
export const setTotalUsersCountAC = (totalUsersCount: number): SetTotalUsersCountAT => ({
    type: SET_TOTAL_USERS_COUNT,
    totalUsersCount
})