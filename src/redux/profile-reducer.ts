import {v1} from 'uuid';


type PostType = {
    id: string
    title: string
}

export type ProfilePageType = {
    posts: PostType[]
    newPostTitle: string
}

export const updateNewPostTitleAC = (newPostTitle: string): UpdateNewPostTitleAT => ({
    type: 'UPDATE-NEW-POST-TITLE',
    newPostTitle
})
export const addPostAC = (): AddPostAT => ({type: 'ADD-POST'})

type UpdateNewPostTitleAT = {
    type: 'UPDATE-NEW-POST-TITLE'
    newPostTitle: string
}

type AddPostAT = {
    type: 'ADD-POST'
}
export type ActionType = UpdateNewPostTitleAT | AddPostAT

const initState = {
    posts: [
        {id: v1(), title: 'post 1'},
        {id: v1(), title: 'post 2'},
        {id: v1(), title: 'post 3'},
        {id: v1(), title: 'post 4'},
    ],
    newPostTitle: 'hard'
}

export const profileReducer = (state: ProfilePageType = initState, action: ActionType): ProfilePageType => {
    switch (action.type) {
        case 'UPDATE-NEW-POST-TITLE': {
            return {
                ...state,
                newPostTitle: action.newPostTitle
            }
        }
        case 'ADD-POST': {
            const newPost = {
                id: v1(),
                title: state.newPostTitle
            }
            return {
                ...state,
                posts: [newPost, ...state.posts]
            }
        }
        default: {
            return state
        }
    }
}