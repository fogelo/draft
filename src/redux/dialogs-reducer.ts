import {v1} from 'uuid';

export const dialogsReducer = (state: any, action: any) => {
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