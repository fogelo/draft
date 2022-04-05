import {v1} from 'uuid';

const initState = {
    posts: [
        {id: v1(), title: 'post 1'},
        {id: v1(), title: 'post 2'},
    ],
    newPostTitle: 'new post'
}

export const profileReducer = (state: any = initState, action: any) => {
    switch (action.type) {
        case 'UPDATE-NEW-POST-TITLE': {
            return {...state, newPostTitle: action.newTitle}
        }
        case 'ADD-POST': {
            const newPost = {
                id: v1(),
                title: state.newPostTitle
            }

            return {
                ...state,
                posts: [newPost, ...state.posts],
                newPostTitle: ''
            }
        }
        default: {
            return state
        }
    }
}

export const updateNewPostTitleAC = (newTitle: any) => ({type: 'UPDATE-NEW-POST-TITLE', newTitle})
export const addPostAC = () => ({type: 'ADD-POST'})