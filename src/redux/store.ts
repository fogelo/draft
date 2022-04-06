import {v1} from 'uuid';
import {profileReducer} from './profile-reducer';

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
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._callSubscribe()
    },
    _callSubscribe() {
    },
    subscribe(observer: any) {
        this._callSubscribe = observer
    }
}

