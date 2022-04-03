const initState = {
    users: [],

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
        default: {
            return state
        }
    }
}


export const setUsersAC = (users: any) => ({type: 'SET-USERS', users})
export const followAC = (userId: any) => ({type: 'FOLLOW', userId})
export const unfollowAC = (userId: any) => ({type: 'UNFOLLOW', userId})
