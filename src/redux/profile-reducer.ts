import {v1} from 'uuid';


export type PostType = {
    id: string
    title: string
}

type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
type PhotosType = {
    small: string
    large: string
}
export type ProfileType = {
    aboutMe?: string
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
}

export type ProfilePageType = {
    profile?: ProfileType
    posts: PostType[]
    newPostTitle: string
    status: string
}


const initState: ProfilePageType = {
    posts: [
        {id: v1(), title: 'post 1'},
        {id: v1(), title: 'post 2'},
        {id: v1(), title: 'post 3'},
        {id: v1(), title: 'post 4'},
    ],
    newPostTitle: 'hard',
    status: ''
}

export const profileReducer = (state = initState, action: ActionType): ProfilePageType => {
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
        case 'SET-PROFILE': {
            return {
                ...state,
                profile: action.profile
            }
        }
        case 'SET-STATUS': {
            return {
                ...state,
                status: action.status
            }
        }
        default: {
            return state
        }
    }
}
export const updateNewPostTitle = (newPostTitle: string): UpdateNewPostTitleAT => ({
    type: 'UPDATE-NEW-POST-TITLE',
    newPostTitle
})
export const addPost = (): AddPostAT => ({type: 'ADD-POST'})

export const setUserProfile = (profile: ProfileType): SetProfileAT => ({type: 'SET-PROFILE', profile})

export const setStatus = (status: string): SetStatusAT => ({type: 'SET-STATUS', status})

export type ActionType = UpdateNewPostTitleAT | AddPostAT | SetProfileAT | SetStatusAT

type SetStatusAT = {
    type: 'SET-STATUS'
    status: string
}

type SetProfileAT = {
    type: 'SET-PROFILE'
    profile: ProfileType
}

type UpdateNewPostTitleAT = {
    type: 'UPDATE-NEW-POST-TITLE'
    newPostTitle: string
}

type AddPostAT = {
    type: 'ADD-POST'
}
