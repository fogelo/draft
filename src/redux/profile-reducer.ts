const initState = {
    posts: [],
    newPostTitle: ''
}
export const profileReducer = (state: any = initState, action: any) => {
    switch (action.type) {
        case 'SET-NEW-POST-TITLE': {
            return {...state, newPostTitle: action.title}
        }
        default: {
            return state
        }
    }

}

export const setNewPostTitleAC = (title: any) => ({type: 'SET-NEW-POST-TITLE', title})