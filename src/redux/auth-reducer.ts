export type AuthDataType = {
    id: number
    email: string
    login: string
}

export const authReducer = (state: AuthDataType, action: ActionType) => {
    switch (action.type) {
        case 'SET-AUTH-DATA': {
            return {
                ...state,
                ...action.authData
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}

type ActionType = SetAuthDataAT

type SetAuthDataAT = {
    type: 'SET-AUTH-DATA'
    authData: AuthDataType
}

export const setAuthData = (authData: AuthDataType): SetAuthDataAT => ({type: 'SET-AUTH-DATA', authData})

