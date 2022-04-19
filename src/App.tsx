import './App.css';
import {useReducer, useState} from 'react';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './redux/tasks-reducer';

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

    const changeTaskTitle = (taskId: string, taskTitle: string) => {
        dispatch(changeTaskTitleAC(taskId, taskTitle))
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTask}/>
            <ul>
                {tasks.map(t => {
                    const changeTitle = (title: string) => {
                        changeTaskTitle(t.id, title)
                    }
                    return (
                        <li key={t.id}>
                            <button onClick={() => removeTask(t.id)}>x</button>
                            <input type="checkbox"
                                   onClick={(e) => changeTaskStatus(t.id, e.currentTarget.checked)}
                            />
                            <EditableSpan title={t.title} changeTitle={changeTitle}/>
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

type EditableSpanPT = {
    title: string
    changeTitle: (title: string) => void
}

const EditableSpan = (props: EditableSpanPT) => {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(props.title)

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deActivateEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }
    return (
        <>
            {editMode
                ? <input type="text"
                         autoFocus
                         value={title}
                         onChange={(e) => setTitle(e.currentTarget.value)}
                         onBlur={deActivateEditMode}
                />
                : <span onDoubleClick={activateEditMode}>{props.title}</span>}
        </>
    )
}