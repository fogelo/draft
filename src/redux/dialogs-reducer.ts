import {v1} from 'uuid';


const initialState = {
    messages: [
        {id: v1(), title: 'message 1'},
        {id: v1(), title: 'message 2'},
        {id: v1(), title: 'message 3'},
        {id: v1(), title: 'message 4'},
    ],
    newMessageTitle: 'hard'
}

export const dialogsReducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        case 'UPDATE-MESSAGE-TITLE': {
            state.newMessageTitle = action.messageTitle
            return state
        }
        case 'ADD-MESSAGE': {
            const newMessage = {
                id: v1(),
                title: state.newMessageTitle
            }
            state.messages.unshift(newMessage)
            state.newMessageTitle = ''
            return state
        }
        default: {
            return state
        }
    }
}