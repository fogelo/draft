import {v1} from 'uuid';

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
    updatePostTitle(postTitle: any) {
        this._state.profilePage.newPostTitle = postTitle
        this._callSubscriber(this._state)
    },
    addPost() {
        const newPost = {
            id: v1(),
            title: this._state.profilePage.newPostTitle
        }
        this._state.profilePage.posts.unshift(newPost)
        this._state.profilePage.newPostTitle = ''
        this._callSubscriber(this._state)
    },
    updateMessageTitle(postTitle: any) {
        this._state.dialogsPage.newMessageTitle = postTitle
        this._callSubscriber(this._state)
    },
    addMessage() {
        const newMessage = {
            id: v1(),
            title: this._state.dialogsPage.newMessageTitle
        }
        this._state.dialogsPage.messages.unshift(newMessage)
        this._state.dialogsPage.newMessageTitle = ''
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