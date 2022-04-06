const initState = {
    // id: 2,
    // email: 'blabla@bla.bla',
    // login: 'samurai'
}

export const authReducer = (state: any = initState, action: any) => {
    switch (action.type) {
        case 'AUTH-ME': {
            return {
                ...state,
                ...action.authData
            }
        }
        default: {
            return state
        }
    }
}

export const authMeAC = (authData: any) => ({type: 'AUTH-ME', authData})