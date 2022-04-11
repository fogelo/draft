import {ActionType, ProfilePageType} from './store';
import {v1} from 'uuid';

export const profileReducer = (state: ProfilePageType, action: ActionType) => {
    switch (action.type) {
        case 'UPDATE-NEW-POST-TITLE': {
            return {
                ...state,
                newPostTitle: action.newPostTitle
            }
        }
        case 'ADD-POST': {
            const newPost = {
                id: v1(),
                title: state.newPostTitle
            }
            return {
                ...state,
                posts: [newPost, ...state.posts]
            }
        }
        default: {
            return state
        }
    }
}