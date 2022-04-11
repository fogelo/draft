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

export type StoreType = {
    _state: StateType
    getState: () => StateType
    updateNewPostTitle: (newPostTitle: string) => void
    addPost: () => void
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
    updateNewPostTitle(newPostTitle) {
        this._state.profilePage.newPostTitle = newPostTitle
        this._callSubscriber(this)
    },
    addPost() {
        const newPost = {
            id: v1(),
            title: this._state.profilePage.newPostTitle
        }
        this._state.profilePage.posts = [newPost, ...this._state.profilePage.posts]
        this._state.profilePage.newPostTitle = ''
        this._callSubscriber(this)
    },
    _callSubscriber() {

    },
    subscribe(observer) {
        this._callSubscriber = observer
    }
}