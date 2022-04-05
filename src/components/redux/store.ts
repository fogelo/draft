import {v1} from 'uuid';

export const store = {
    _state: {
        profilePage: {
            posts: [
                {id: v1(), title: 'post 1'},
                {id: v1(), title: 'post 2'},
            ],
            newPostTitle: 'new post'
        }
    },
    getState() {
        return this._state
    },
    updateNewPostTitle(newTitle: any) {
        this._state.profilePage.newPostTitle = newTitle
        this._callSubscribe()
    },
    addPost() {
        const newPost = {
            id: v1(),
            title: this._state.profilePage.newPostTitle
        }
        this._state.profilePage.posts = [newPost, ...this._state.profilePage.posts]
        this._state.profilePage.newPostTitle = ''
        this._callSubscribe()
    },
    _callSubscribe() {
    },
    subscribe(observer: any) {
        this._callSubscribe = observer
    }

}