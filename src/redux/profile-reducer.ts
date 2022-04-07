import {v1} from 'uuid';

const initState = {
    posts: [
        {id: v1(), title: 'post 1'},
        {id: v1(), title: 'post 2'},
    ],
    newPostTitle: 'new post',
    profile: null,
    userStatus: ''
}

export const profileReducer = (state: any = initState, action: any) => {
    switch (action.type) {
        case 'UPDATE-NEW-POST-TITLE': {
            return {...state, newPostTitle: action.newTitle}
        }
        case 'ADD-POST': {
            const newPost = {
                id: v1(),
                title: 'sss'
            }
            return {
                ...state,
                posts: [newPost, ...state.posts],
                newPostTitle: ''
            }
        }
        case 'SET-USER-PROFILE': {
            return {
                ...state,
                profile: action.profile
            }
        }
        case 'SET-USER-STATUS': {
            return {
                ...state,
                userStatus: action.status
            }
        }

        default: {
            return state
        }
    }
}

export const updateNewPostTitleAC = (newTitle: any) => ({type: 'UPDATE-NEW-POST-TITLE', newTitle})
export const addPostAC = () => ({type: 'ADD-POST'})

export const setUserProfileAC = (profile: any) => ({type: 'SET-USER-PROFILE', profile})

export const setUserStatusAC = (status: any) => ({type: 'SET-USER-STATUS', status})

export const updateStatusAC = (status: any) => ({type: 'UPDATE-STATUS', status})
