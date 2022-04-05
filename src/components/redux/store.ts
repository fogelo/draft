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

    dispatch(action: any) {
        if (action.type === 'UPDATE-NEW-POST-TITLE') {
            this._state.profilePage.newPostTitle = action.newTitle
            this._callSubscribe()
        } else if (action.type === 'ADD-POST') {
            const newPost = {
                id: v1(),
                title: this._state.profilePage.newPostTitle
            }
            this._state.profilePage.posts = [newPost, ...this._state.profilePage.posts]
            this._state.profilePage.newPostTitle = ''
            this._callSubscribe()
        }
    },
    _callSubscribe() {
    },
    subscribe(observer: any) {
        this._callSubscribe = observer
    }

}