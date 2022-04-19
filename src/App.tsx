import './App.css';
import {useReducer, useState} from 'react';
import {addTaskAC, changeTaskStatusAC, removeTaskAC, tasksReducer} from './redux/tasks-reducer';

function App() {
    const [tasks, dispatch] = useReducer(tasksReducer, [])

    const addTask = (taskTitle: string) => {
        dispatch(addTaskAC(taskTitle))
    }
    const removeTask = (taskId: string) => {
        dispatch(removeTaskAC(taskId))
    }
    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(taskId, isDone))
    }
    return (
        <div className="App">
            <AddItemForm addItem={addTask}/>
            <ul>
                {tasks.map(t => {
                    return (

                        <li key={t.id}>
                            <button onClick={() => removeTask(t.id)}>x</button>
                            <input type="checkbox"
                                   onClick={(e) => changeTaskStatus(t.id, e.currentTarget.checked)}
                            />
                            {t.title}
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default App;


type AddItemPT = {
    addItem: (item: string) => void
}

const AddItemForm = (props: AddItemPT) => {
    const [item, setItem] = useState('enter text')
    return (
        <>
            <input type="text"
                   value={item}
                   onChange={e => setItem(e.currentTarget.value)}
            />
            <button onClick={() => props.addItem(item)}>+</button>
        </>
    )
}