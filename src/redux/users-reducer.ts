const SET_USERS = 'SET-USERS'
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'


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
    usersCount: number
    currentPage: number
    error: string
}
const initState = {
    users: [],
    totalUsersCount: 0,
    usersCount: 15,
    currentPage: 1,
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
        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.currentPage
            }
        }
        default: {
            return state
        }
    }
}


export type ActionType = SetUsersAT | SetTotalUsersCountAT | SetCurrentPageAT


type SetUsersAT = {
    type: 'SET-USERS'
    users: UserType[]
}

type SetTotalUsersCountAT = {
    type: 'SET-TOTAL-USERS-COUNT'
    totalUsersCount: number
}

type SetCurrentPageAT = {
    type: 'SET-CURRENT-PAGE'
    currentPage: number
}

export const setUsersAC = (users: UserType[]): SetUsersAT => ({type: SET_USERS, users})
export const setTotalUsersCountAC = (totalUsersCount: number): SetTotalUsersCountAT => ({
    type: SET_TOTAL_USERS_COUNT,
    totalUsersCount
})
export const setCurrentPageAC = (currentPage: number): SetCurrentPageAT => ({type: SET_CURRENT_PAGE, currentPage})