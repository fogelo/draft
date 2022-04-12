import {v1} from 'uuid';
import {profileReducer} from './profile-reducer';


export type PostType = {
    id: string
    title: string
}

export type ProfilePageType = {
    posts: PostType[]
    newPostTitle: string
}
type StateType = {
    profilePage: ProfilePageType
}

export type ActionType = UpdateNewPostTitleAT | AddPostAT

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

export type StoreType = {
    _state: StateType
    getState: () => StateType
    // updateNewPostTitle: (newPostTitle: string) => void
    // addPost: () => void
    dispatch: (action: ActionType) => void
    _callSubscriber: (store: StoreType) => void
    subscribe: (observer: (store: StoreType) => void) => void
}

export const store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: v1(), title: 'post 1'},
                {id: v1(), title: 'post 2'},
                {id: v1(), title: 'post 3'},
                {id: v1(), title: 'post 4'},
            ],
            newPostTitle: 'hard'
        }
    },
    getState() {
        return this._state
    },
    dispatch(action: ActionType) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._callSubscriber(this)
    },
    _callSubscriber() {
    },
    subscribe(observer) {
        this._callSubscriber = observer
    }
}