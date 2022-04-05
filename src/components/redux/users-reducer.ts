const initState = {
    users: [
        {
            'name': 'Shubert',
            'id': 1,
            'photos': {
                'small': null,
                'large': null
            },
            'status': null,
            'followed': false
        },
        {
            'name': 'Hacker',
            'id': 2,
            'photos': {
                'small': null,
                'large': null
            },
            'status': null,
            'followed': false
        }
    ]
}

export const usersReducer = (state: any = initState, action: any) => {
    switch (action.type) {
        case '1': {
            return state
        }
        default: {
            return state
        }
    }
}