const initState = {
    users: [],

}
export const usersReducer = (state: any = initState, action: any) => {
    switch (action.type) {
        case 'SET-USERS': {
            return {...state, users: action.users}
        }
        default: {
            return state
        }
    }
}


export const setUsersAC = (users: any) => ({type: 'SET-USERS', users})