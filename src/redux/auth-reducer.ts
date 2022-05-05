import {UserDataType} from "../dal/todolist-api";

const initialState: InitAuthStateType = {
    userData: {
        id: 0,
        email: "",
        login: ""
    },
    isLoggedIn: false
}

export const authReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case "set-user-data":
            return {...state, userData: {id: action.id, email: action.email, login: action.login}}
        case "set-is-logged-in":
            return {...state, isLoggedIn: action.isLoggedIn}
        default: {
            return state
        }
    }
}

//actions
export const setUserDataAC = (id: number, email: string, login: string) =>
    ({type: "set-user-data", id, email, login} as const)
export const setIsLoggedIn = (isLoggedIn: boolean) => ({type: "set-is-logged-in", isLoggedIn} as const)

//thunks

// types
type ActionType = ReturnType<typeof setUserDataAC> | ReturnType<typeof setIsLoggedIn>
type InitAuthStateType = {
    userData: UserDataType
    isLoggedIn: boolean
}