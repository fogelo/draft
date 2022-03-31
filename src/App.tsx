import React, {ChangeEvent, useReducer, useState} from 'react';
import './App.css';
import {v1} from 'uuid';
import {
    addTaskAC,
    addTodolistAC, changeTaskStatusAC, changeTaskTitleAC,
    changeTodolistTitleAC, removeTaskAC,
    removeTodolistAC,
    todolistsReducer
} from './redux/todolists-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from './redux/store';


type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistType = {
    id: string
    title: string
    tasks: TaskType[]
}

export type StateType = TodolistType[]

export function App() {
    // const [state, dispatch] = useReducer(todolistsReducer, [
    //     {
    //         id: v1(), title: 'what to learn', tasks: [
    //             {id: v1(), title: 'html', isDone: true},
    //             {id: v1(), title: 'css', isDone: true},
    //             {id: v1(), title: 'react', isDone: true},
    //             {id: v1(), title: 'redux', isDone: false},]
    //     },
    //     {
    //         id: v1(), title: 'what to buy', tasks: [
    //             {id: v1(), title: 'milk', isDone: true},
    //             {id: v1(), title: 'meat', isDone: true},
    //             {id: v1(), title: 'egs', isDone: false},]
    //     },
    // ])

    const state = useSelector<RootStateType, StateType>((state) => state.todolists)
    const dispatch = useDispatch()


    const addTodolist = (title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }
    const changeTodolistTitle = (todolistId: string, title: string) => {
        const action = changeTodolistTitleAC(todolistId, title)
        dispatch(action)
    }

    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    }

    const addTask = (todolistId: string, title: string) => {
        const action = addTaskAC(todolistId, title)
        dispatch(action)
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        const action = changeTaskTitleAC(todolistId, taskId, title)
        dispatch(action)
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        const action = changeTaskStatusAC(todolistId, taskId, isDone)
        dispatch(action)
    }
    const removeTask = (todolistId: string, taskId: string) => {
        const action = removeTaskAC(todolistId, taskId)
        dispatch(action)
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {state.map(tl => <Todolist key={tl.id}
                                       todolistTitle={tl.title}
                                       todolistId={tl.id}
                                       changeTodolistTitle={changeTodolistTitle}
                                       removeTodolist={removeTodolist}
                                       tasks={tl.tasks}
                                       changeTaskTitle={changeTaskTitle}
                                       addTask={addTask}
                                       changeTaskStatus={changeTaskStatus}
                                       removeTask={removeTask}/>)}
        </div>
    );
}

type TodolistPT = {
    todolistTitle: string
    todolistId: string
    changeTodolistTitle: (todolistId: string, title: string) => void
    removeTodolist: (todolistId: string) => void
    tasks: TaskType[]
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    removeTask: (todolistId: string, taskId: string) => void
}

const Todolist = (props: TodolistPT) => {
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.todolistId, title)
    }
    const addTask = (title: string) => {
        props.addTask(props.todolistId, title)
    }

    const removeTodolist = () => {
        props.removeTodolist(props.todolistId)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.todolistTitle} changeTitle={changeTodolistTitle}/>
                <button onClick={removeTodolist}>x</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            {props.tasks.map(t => {
                const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                    props.changeTaskStatus(props.todolistId, t.id, e.currentTarget.checked)
                }
                const changeTaskTitle = (title: string) => {
                    props.changeTaskTitle(props.todolistId, t.id, title)
                }
                const removeTask = () => {
                    props.removeTask(props.todolistId, t.id)
                }
                return (
                    <div key={t.id}>
                        <button onClick={removeTask}>x</button>
                        <input checked={t.isDone}
                               onChange={changeTaskStatus}
                               type="checkbox"/>
                        <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                    </div>
                )
            })}
        </div>
    )
}


type EditableSpanPT = {
    title: string
    changeTitle: (title: string) => void
}
const EditableSpan = (props: EditableSpanPT) => {
    const [title, setTitle] = useState(props.title)
    const [editMode, setEditMode] = useState(false)

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deActivateEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }
    return (
        <div>
            {editMode
                ? <input type="text"
                         value={title}
                         autoFocus
                         onBlur={deActivateEditMode}
                         onChange={(e) => setTitle(e.currentTarget.value)}/>
                : <span onDoubleClick={activateEditMode}>{title}</span>
            }
        </div>
    )
}

type AddItemFormPT = {
    addItem: (title: string) => void
}

const AddItemForm = (props: AddItemFormPT) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState(false)

    const addItem = () => {
        if (title) {
            props.addItem(title)
            setTitle('')
        } else {
            setError(true)
        }
    }

    const changeItem = (e: ChangeEvent<HTMLInputElement>) => {
        if (error) {
            setError(false)
        }
        setTitle(e.currentTarget.value)
    }

    const errorInputStyle = {
        border: '2px solid red'
    }
    const errorSpanStyle = {
        color: 'red'
    }
    return (
        <div>
            <input type="text"
                   value={title}
                   autoFocus
                   style={error ? errorInputStyle : {}}
                   onChange={changeItem}/>
            {error ? <div style={errorSpanStyle}>field is required</div> : ''}
            <button onClick={addItem}>+</button>
        </div>
    )
}