const initState = {
    users: [
        // {id: v1(), name: 'anton', followed: false, photo: userPhoto},
        // {id: v1(), name: 'vova', followed: false, photo: userPhoto},
        // {id: v1(), name: 'artem', followed: false, photo: userPhoto},
    ]
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
            return {...state, users:state.users.map((u: any) => u.id === action.userId ? {...u, followed: false} : u)}
        }
        default: {
            return state
        }
    }
}

export const setUsersAC = (users: any) => {
    return {type: 'SET-USERS', users}
}
export const followAC = (userId: any) => {
    return {type: 'FOLLOW', userId}
}
export const unfollowAC = (userId: any) => {
    return {type: 'UNFOLLOW', userId}
}
