const initState: InitAppStateType = {
    status: "idle",
    isInitialized: false
}


export const appReducer = (state = initState, action: AppActionType) => {
    switch (action.type) {
        case "set-app-status":
            return {...state, status: action.status}
        case 'set-initialized':
            return {...state, isInitialized: action.init}
        default: {
            return state
        }
    }
}

// actions

export const setAppStatusAC = (status: RequestStatusType) => ({type: "set-app-status", status} as const)
export const setIsInitializedAC = (init: boolean) => ({type: "set-initialized", init} as const)
// thunks
// types

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"

type InitAppStateType = {
    status: RequestStatusType
    isInitialized: boolean
}

type AppActionType = ReturnType<typeof setAppStatusAC> | ReturnType<typeof setIsInitializedAC>