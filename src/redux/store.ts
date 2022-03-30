import {v1} from 'uuid';
import {profileReducer} from './profile-reducer';
import {dialogsReducer} from './dialogs-reducer';

export const store: any = {
    _state: {
        profilePage: {
            posts: [
                {id: v1(), title: 'post 1'},
                {id: v1(), title: 'post 2'},
                {id: v1(), title: 'post 3'},
                {id: v1(), title: 'post 4'},
            ],
            newPostTitle: 'hard'
        },
        dialogsPage: {
            messages: [
                {id: v1(), title: 'message 1'},
                {id: v1(), title: 'message 2'},
                {id: v1(), title: 'message 3'},
                {id: v1(), title: 'message 4'},
            ],
            newMessageTitle: 'hard'
        }
    },
    dispatch(action: any) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._callSubscriber(this._state)

    },
    getState() {
        return this._state
    },
    _callSubscriber(state: any) {

    },
    subscribe(observer: any) {
        this._callSubscriber = observer
    }
}

export const updatePostTitleAC = (postTitle: any) => {
    return {type: 'UPDATE-POST-TITLE', postTitle}
}
export const addPostAC = () => {
    return {type: 'ADD-POST'}
}
export const updateMessageTitleAC = (messageTitle: any) => {
    return {type: 'UPDATE-MESSAGE-TITLE', messageTitle}
}
export const addMessageAC = () => {
    return {type: 'ADD-MESSAGE'}
}