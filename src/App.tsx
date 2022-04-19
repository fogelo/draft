import './App.css';
import {useReducer, useState} from 'react';
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer,
    TaskType
} from './redux/tasks-reducer';
import {addTodolistAC, removeTodolistAC, todolistsReducer} from './redux/todolists-reducer';

function App() {
    //==============================
    //tasks block
    //==============================
    const [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {})
    const [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [])
    const addTask = (taskTitle: string, todolistId: string) => {
        dispatchToTasksReducer(addTaskAC(taskTitle, todolistId))
    }
    const removeTask = (taskId: string, todolistId: string) => {
        dispatchToTasksReducer(removeTaskAC(taskId, todolistId))
    }
    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        dispatchToTasksReducer(changeTaskStatusAC(taskId, isDone, todolistId))
    }

    const changeTaskTitle = (taskId: string, taskTitle: string, todolistId: string) => {
        dispatchToTasksReducer(changeTaskTitleAC(taskId, taskTitle, todolistId))
    }

    //==============================
    //todolists block
    //==============================

    const addTodolist = (todolistTitle: string) => {
        const action = addTodolistAC(todolistTitle)
        dispatchToTodolistsReducer(action)
        dispatchToTasksReducer(action)
    }

    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatchToTodolistsReducer(action)
        dispatchToTasksReducer(action)
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {todolists.map(tl => {
                return (
                    <Todolist key={tl.id}
                              todolistTitle={tl.title}
                              todolistId={tl.id}
                              removeTodolist={removeTodolist}

                              tasks={tasks[tl.id]}
                              addTask={addTask}
                              changeTaskTitle={changeTaskTitle}
                              removeTask={removeTask}
                              changeTaskStatus={changeTaskStatus}/>
                )
            })}

        </div>
    );
}

export default App;

type TodolistPT = {
    todolistId: string
    todolistTitle: string
    removeTodolist: (todolistId: string) => void

    tasks: TaskType[]
    addTask: (taskTitle: string, todolistId: string) => void
    changeTaskTitle: (taskId: string, taskTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
}


const Todolist = (props: TodolistPT) => {
    const addTask = (taskTitle: string) => {
        props.addTask(taskTitle, props.todolistId)
    }
    return (
        <div>
            <div>{props.todolistTitle}</div>
            <AddItemForm addItem={addTask}/>
            <ul>
                {props.tasks.map(t => {
                    const changeTitle = (title: string) => {
                        props.changeTaskTitle(t.id, title, props.todolistId)
                    }
                    return (
                        <li key={t.id}>
                            <button onClick={() => props.removeTask(t.id, props.todolistId)}>x</button>
                            <input type="checkbox"
                                   onClick={(e) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.todolistId)}
                            />
                            <EditableSpan title={t.title} changeTitle={changeTitle}/>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}


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