const initState = {}
export const authReducer = (state: any = initState, action: any) => {
    switch (action.type) {
        case 'AUTH-ME': {
            return {...state, ...action.auth}
        }
        default: {
            return state
        }
    }
}


export const authMeAC = (auth: any) => ({type: 'AUTH-ME', auth})