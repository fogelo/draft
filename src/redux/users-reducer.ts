const SET_USERS = 'SET-USERS'


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
    totalCount: number
    error: string
}
const initState = {
    users: [],
    totalCount: 0,
    error: ''
}

export const usersReducer = (state: StateType = initState, action: ActionType) => {
    switch (action.type) {
        case SET_USERS: {
            return {
                ...state,
                users: action.users
            }
        }
        default: {
            return state
        }
    }
}


export type ActionType = SetUsersAT


type SetUsersAT = {
    type: 'SET-USERS'
    users: UserType[]
}

export const setUsersAC = (users: UserType[]): SetUsersAT => ({type: SET_USERS, users})