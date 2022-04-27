import React, {FC} from 'react';
import './App.css';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateT} from './redux/store';
import {TaskType} from './redux/tasks-reducer';


function App() {

    const tasks = useSelector<AppRootStateT, Array<TaskType>>(state => state.tasks)
    const dispatch = useDispatch()


    return (
        <div className="App">
            <input type="text"/>
            <button>+</button>
            <ul>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                {tasks.map(t => <li key={t.id}>{t.title}</li>)}
            </ul>
        </div>
    );
}

export default App;

type AddItemFormPT = {}
const AddItemForm: FC<AddItemFormPT> = () => {
    return (
        <>
            <input type="text"/>
            <button>+</button>
        </>
    )
}