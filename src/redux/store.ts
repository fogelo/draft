import {v1} from 'uuid';


type PostType = {
    id: string
    title: string
}

type ProfilePageType = {
    posts: PostType[]
}
type StateType = {
    profilePage: ProfilePageType
}

type StoreType = {
    _state: StateType
    getState: () => StateType
}

export const store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: v1(), title: 'post 1'},
                {id: v1(), title: 'post 2'},
                {id: v1(), title: 'post 3'},
                {id: v1(), title: 'post 4'},
            ]
        }
    },
    getState() {
        return this._state
    }
}