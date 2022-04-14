const SET_USERS = 'SET-USERS'
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const FOLLOW_IN_PROGRESS = 'FOLLOW_IN_PROGRESS'


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
    isFetching: boolean
    error: string
    followingInProgress: any
}
const initState = {
    users: [],
    totalUsersCount: 0,
    usersCount: 15,
    currentPage: 1,
    isFetching: false,
    error: '',
    followingInProgress: []
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
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case FOLLOW: {
            return {
                ...state,
                users: state.users.map(u => u.id === action.userId
                    ? {...u, followed: true}
                    : u),
            }
        }
        case UNFOLLOW: {
            return {
                ...state,
                users: state.users.map(u => u.id === action.userId
                    ? {...u, followed: false}
                    : u)
            }
        }
        case FOLLOW_IN_PROGRESS: {
            return {
                ...state, followingInProgress: state.followingInProgress.some((id: any) => id === action.userId)
                    ? state.followingInProgress.filter((id:any) => id !== action.userId)
                    : [...state.followingInProgress, action.userId]

            }
        }
        default: {
            return state
        }
    }
}


export type ActionType =
    SetUsersAT
    | SetTotalUsersCountAT
    | SetCurrentPageAT
    | ToggleIsFetchingAT
    | FollowAT
    | UnfollowAT | FollowingInProgressAT


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

type ToggleIsFetchingAT = {
    type: 'TOGGLE_IS_FETCHING'
    isFetching: boolean
}
type FollowAT = {
    type: 'FOLLOW'
    userId: number
}
type UnfollowAT = {
    type: 'UNFOLLOW'
    userId: number
}

type FollowingInProgressAT = {
    type: 'FOLLOW_IN_PROGRESS'
    userId: number
}


export const setUsersAC = (users: UserType[]): SetUsersAT => ({type: SET_USERS, users})
export const setTotalUsersCountAC = (totalUsersCount: number): SetTotalUsersCountAT => ({
    type: SET_TOTAL_USERS_COUNT,
    totalUsersCount
})
export const setCurrentPageAC = (currentPage: number): SetCurrentPageAT => ({type: SET_CURRENT_PAGE, currentPage})
export const toggleIsFetchingAC = (isFetching: boolean): ToggleIsFetchingAT => ({type: TOGGLE_IS_FETCHING, isFetching})

export const followAC = (userId: number): FollowAT => ({type: FOLLOW, userId})
export const unfollowAC = (userId: number): UnfollowAT => ({type: UNFOLLOW, userId})

export const setFollowingInProgressAC = (userId: number): FollowingInProgressAT => ({type: FOLLOW_IN_PROGRESS, userId})