import {authAPI, todolistAPI, UserDataType} from "../dal/todolist-api";
import {Dispatch} from "redux";
import {setTodolistsAC} from "./todolist-reducer";

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
export const setIsLoggedInAC = (isLoggedIn: boolean) => ({type: "set-is-logged-in", isLoggedIn} as const)

//thunks
export const loginTC = (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch) => {
    authAPI.login(email, password, rememberMe)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
            }
        })
}
export const logoutTC = () => (dispatch: Dispatch) => {
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
            }
        })
}


// types
type ActionType = ReturnType<typeof setUserDataAC> | ReturnType<typeof setIsLoggedInAC>
type InitAuthStateType = {
    userData: UserDataType
    isLoggedIn: boolean
}