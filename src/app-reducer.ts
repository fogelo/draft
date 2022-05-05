import {Dispatch} from "redux";
import {authAPI} from "./dal/todolist-api";
import {setIsLoggedInAC, setUserDataAC} from "./redux/auth-reducer";

const initState: InitAppStateType = {
    status: "idle",
    isInitialized: false,
    error: null
}


export const appReducer = (state = initState, action: AppActionType) => {
    switch (action.type) {
        case "set-app-status":
            return {...state, status: action.status}
        case "set-initialized":
            return {...state, isInitialized: action.init}
        case "set-error":
            return {...state, error: action.error}
        default: {
            return state
        }
    }
}

// actions

export const setAppStatusAC = (status: RequestStatusType) => ({type: "set-app-status", status} as const)
export const setIsInitializedAC = (init: boolean) => ({type: "set-initialized", init} as const)
export const setErrorAC = (error: null | string) => ({type: "set-error", error} as const)

// thunks

export const initializingAppTC = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                const data = res.data.data
                dispatch(setIsLoggedInAC(true))
                dispatch(setUserDataAC(data.id, data.email, data.login))
            }
            dispatch(setIsInitializedAC(true))
        })
}
// types

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"

type InitAppStateType = {
    status: RequestStatusType
    isInitialized: boolean
    error: string | null
}

type AppActionType =
    ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setIsInitializedAC>
    | ReturnType<typeof setErrorAC>