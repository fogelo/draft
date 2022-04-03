import {v1} from 'uuid';

const initState = {
    posts: [
        {id: v1(), title: 'hello'}
    ],
    newPostTitle: '',
    profile: null

}
export const profileReducer = (state: any = initState, action: any) => {
    switch (action.type) {
        case 'SET-NEW-POST-TITLE': {
            return {...state, newPostTitle: action.title}
        }
        case 'ADD-NEW-POST': {
            return {...state, posts: [...state.posts, {id: v1(), title: state.newPostTitle}]}
        }
        case 'SET-PROFILE': {
            return {...state, profile: action.profile}
        }
        default: {
            return state
        }
    }
}

export const setNewPostTitleAC = (title: any) => ({type: 'SET-NEW-POST-TITLE', title})
export const addNewPostAC = () => ({type: 'ADD-NEW-POST'})

export const setProfileAC = (profile: any) => ({type: 'SET-PROFILE', profile})