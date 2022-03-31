import React, {ChangeEvent, useCallback, useState} from 'react';
import './App.css';
import {
    addTaskAC,
    addTodolistAC, changeTaskStatusAC, changeTaskTitleAC,
    changeTodolistTitleAC, removeTaskAC,
    removeTodolistAC,
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
    const state = useSelector<RootStateType, StateType>((state) => state.todolists)
    const dispatch = useDispatch()


    const addTodolist = useCallback((title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }, [dispatch])
    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        const action = changeTodolistTitleAC(todolistId, title)
        dispatch(action)
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    }, [dispatch])

    const addTask = useCallback((todolistId: string, title: string) => {
        const action = addTaskAC(todolistId, title)
        dispatch(action)
    }, [dispatch])

    const changeTaskTitle = useCallback((todolistId: string, taskId: string, title: string) => {
        const action = changeTaskTitleAC(todolistId, taskId, title)
        dispatch(action)
    }, [dispatch])

    const changeTaskStatus = useCallback((todolistId: string, taskId: string, isDone: boolean) => {
        const action = changeTaskStatusAC(todolistId, taskId, isDone)
        dispatch(action)
    }, [dispatch])
    const removeTask = useCallback((todolistId: string, taskId: string) => {
        const action = removeTaskAC(todolistId, taskId)
        dispatch(action)
    }, [dispatch])

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
    console.log('Todolist')
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.todolistId, title)
    }, [props.changeTodolistTitle, props.todolistId])
    const addTask = useCallback((title: string) => {
        props.addTask(props.todolistId, title)
    }, [props.addTask, props.todolistId])

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
            {props.tasks.map(t => <Task changeTaskStatus={props.changeTaskStatus}
                                        changeTaskTitle={props.changeTaskTitle}
                                        removeTask={props.removeTask}
                                        todolistId={props.todolistId}
                                        task={t}/>
            )}
        </div>
    )
}


type EditableSpanPT = {
    title: string
    changeTitle: (title: string) => void
}
const EditableSpan = React.memo((props: EditableSpanPT) => {
    console.log('EditableSpan')
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
})

type AddItemFormPT = {
    addItem: (title: string) => void
}

const AddItemForm = React.memo((props: AddItemFormPT) => {
    console.log('AddItemForm')
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
})

type TaskPropsType = {
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    removeTask: (todolistId: string, taskId: string) => void
    todolistId: string
    task: TaskType
}

const Task = React.memo((props: TaskPropsType) => {
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.todolistId, props.task.id, e.currentTarget.checked)
    }
    const changeTaskTitle = useCallback((title: string) => {
        props.changeTaskTitle(props.todolistId, props.task.id, title)
    }, [props.changeTaskTitle, props.todolistId, props.task.id])
    const removeTask = () => {
        props.removeTask(props.todolistId, props.task.id)
    }
    return (
        <div key={props.task.id}>
            <button onClick={removeTask}>x</button>
            <input checked={props.task.isDone}
                   onChange={changeTaskStatus}
                   type="checkbox"/>
            <EditableSpan title={props.task.title} changeTitle={changeTaskTitle}/>
        </div>
    )
})