import {v1} from 'uuid';

const initialState = {
    posts: [
        {id: v1(), title: 'post 1'},
        {id: v1(), title: 'post 2'},
        {id: v1(), title: 'post 3'},
        {id: v1(), title: 'post 4'},
    ],
    newPostTitle: 'hard'
}

export const profileReducer = (state: any = initialState, action: any) => {
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