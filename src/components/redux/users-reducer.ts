const initState = {
    users: [
        {
            'name': 'Shubert',
            'id': 1,
            'photos': {
                'small': null,
                'large': null
            },
            'status': null,
            'followed': false
        },
        {
            'name': 'Hacker',
            'id': 2,
            'photos': {
                'small': null,
                'large': null
            },
            'status': null,
            'followed': false
        }
    ],
    totalUsersCount: 0,
    usersCount: 100,
    currentPage: 1,
    idLoading: false
}

export const usersReducer = (state: any = initState, action: any) => {
    switch (action.type) {
        case 'SET-USERS': {
            return {
                ...state,
                users: action.users
            }
        }
        case 'FOLLOW': {
            return {
                ...state,
                users: state.users.map((u: any) => u.id === action.userId ? {...u, followed: true} : u)
            }
        }
        case 'UNFOLLOW': {
            return {
                ...state,
                users: state.users.map((u: any) => u.id === action.userId ? {...u, followed: false} : u)
            }
        }
        case 'SET-TOTAL-USERS-COUNT': {
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        }
        case 'SET-CURRENT-PAGE': {
            return {
                ...state,
                currentPage: action.currentPage
            }
        }
        case 'SET-IS-LOADING': {
            return {
                ...state,
                isLoading: action.isLoading
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
export const setCurrentPageAC = (currentPage: any) => ({type: 'SET-CURRENT-PAGE', currentPage})

export const setIsLoadingAC = (isLoading: any) => ({type: 'SET-IS-LOADING', isLoading})
