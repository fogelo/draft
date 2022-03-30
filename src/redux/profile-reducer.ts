import {v1} from 'uuid';

export const profileReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'UPDATE-POST-TITLE': {
            state.newPostTitle = action.postTitle
            return state
        }
        case 'ADD-POST': {
            const newPost = {
                id: v1(),
                title: state.newPostTitle
            }
            state.posts.unshift(newPost)
            state.newPostTitle = ''
            return state
        }
        default: {
            return state
        }
    }
}