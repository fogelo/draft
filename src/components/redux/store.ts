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
    _callSubscribe() {
    },
    subscribe(observer: any) {
        this._callSubscribe = observer
    }

}