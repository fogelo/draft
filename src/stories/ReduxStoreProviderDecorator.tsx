import {Provider} from 'react-redux';
import {combineReducers, createStore} from 'redux';
import {RootStateType} from '../redux/store';
import {v1} from 'uuid';
import {todolistsReducer} from '../redux/todolists-reducer';
import {tasksReducer} from '../redux/tasks-reducer';


const rootState = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

const initGlobalDemonstratedState = {
    todolists: [
        {id: 'todolistId1', title: 'what to buy', filter: 'all'},
        {id: 'todolistId2', title: 'what to learn', filter: 'all'},
    ],
    tasks: {
        'todolistId1': [
            {id: v1(), title: 'milk', isDone: false},
            {id: v1(), title: 'bread', isDone: false},
            {id: v1(), title: 'boots', isDone: true},
        ],
        'todolistId2': [
            {id: v1(), title: 'book1', isDone: false},
            {id: v1(), title: 'book2', isDone: false},
            {id: v1(), title: 'book3', isDone: true},
        ],
    }
}

const store = createStore(rootState, initGlobalDemonstratedState as RootStateType)


export const ReduxStoreProviderDecorator = (story: any) => {
    return <Provider store={store}>
        {story()}
    </Provider>
}