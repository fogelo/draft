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
            return {...state, newPostTitle: action.postTitle}
        }
        case 'ADD-POST': {
            return {...state,
                posts: [...state.posts, {id: v1(), title: state.newPostTitle}],
                newPostTitle: ''}
        }
        default: {
            return state
        }
    }
}

export const updatePostTitleAC = (postTitle: any) => {
    return {type: 'UPDATE-POST-TITLE', postTitle}
}
export const addPostAC = () => {
    return {type: 'ADD-POST'}
}