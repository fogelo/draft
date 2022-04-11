import {v1} from 'uuid';


type PostType = {
    id: string
    title: string
}

type ProfilePageType = {
    posts: PostType[]
    newPostTitle: string
}
type StateType = {
    profilePage: ProfilePageType
}

type ActionType = UpdateNewPostTitleAT | AddPostAT

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
        switch (action.type) {
            case 'UPDATE-NEW-POST-TITLE': {
                this._state.profilePage.newPostTitle = action.newPostTitle
                this._callSubscriber(this)
                return
            }
            case 'ADD-POST': {
                const newPost = {
                    id: v1(),
                    title: this._state.profilePage.newPostTitle
                }
                this._state.profilePage.posts = [newPost, ...this._state.profilePage.posts]
                this._state.profilePage.newPostTitle = ''
                this._callSubscriber(this)
            }
        }
    },
    _callSubscriber() {
    },
    subscribe(observer) {
        this._callSubscriber = observer
    }
}