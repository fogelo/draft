const initState = {
    users: [],
    totalUsersCount: 0,
    usersCount: 5,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []

}
export const usersReducer = (state: any = initState, action: any) => {
    switch (action.type) {
        case 'SET-USERS': {
            return {...state, users: action.users}
        }
        case 'FOLLOW': {
            return {...state, users: state.users.map((u: any) => u.id === action.userId ? {...u, followed: true} : u)}
        }
        case 'UNFOLLOW': {
            return {...state, users: state.users.map((u: any) => u.id === action.userId ? {...u, followed: false} : u)}
        }
        case 'SET-TOTAL-USERS-COUNT': {
            return {...state, totalUsersCount: action.totalUsersCount}
        }
        case 'TOGGLE-CURRENT-PAGE': {
            return {...state, currentPage: action.currentPage}
        }
        case 'SET-IS-FETCHING': {
            return {...state, isFetching: action.isFetching}
        }
        case 'TOGGLE-FOLLOWING-IN-PROGRESS': {
            return {
                ...state, followingInProgress: state.followingInProgress.some((id: any) => id === action.id)
                    ? state.followingInProgress.filter((id: any) => id !== action.id)
                    : [...state.followingInProgress, action.id]
            }
        }
        default: {
            return state
        }

    }
}


export const setUsersAC = (users: any) => ({type: 'SET-USERS', users})
export const followAC = (userId: any) => ({type: 'FOLLOW', userId})
export const unfollowAC = (userId: any) => ({type: 'UNFOLLOW', userId})

export const setTotalUsersCountAC = (totalUsersCount: any) => ({type: 'SET-TOTAL-USERS-COUNT', totalUsersCount})
export const toggleCurrentPageAC = (currentPage: any) => ({type: 'TOGGLE-CURRENT-PAGE', currentPage})

export const setIsFetchingAC = (isFetching: any) => ({type: 'SET-IS-FETCHING', isFetching})

export const toggleFollowingInProgressAC = (id: any) => ({type: 'TOGGLE-FOLLOWING-IN-PROGRESS', id})