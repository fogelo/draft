import React, {ChangeEvent, useState} from 'react';
import './App.css';
import {v1} from 'uuid';


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

    const [todolists, setTodolists] = useState<StateType>([
        {
            id: v1(), title: 'what to learn', tasks: [
                {id: v1(), title: 'html', isDone: true},
                {id: v1(), title: 'css', isDone: true},
                {id: v1(), title: 'react', isDone: true},
                {id: v1(), title: 'redux', isDone: false},]
        },
        {
            id: v1(), title: 'what to buy', tasks: [
                {id: v1(), title: 'milk', isDone: true},
                {id: v1(), title: 'meat', isDone: true},
                {id: v1(), title: 'egs', isDone: false},]
        },
    ])

    const addTodolist = (title: string) => {
        const newTodolist = {
            id: v1(),
            title: title,
            tasks: []
        }
        setTodolists([...todolists, newTodolist])
    }
    const changeTodolistTitle = (todolistId: string, title: string) => {
        const todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.title = title
        }
        setTodolists([...todolists])
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
    }

    const addTask = (todolistId: string, title: string) => {
        const newTask = {
            id: v1(),
            title: title,
            isDone: false
        }
        const todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.tasks = [...todolist.tasks, newTask]
            setTodolists([...todolists])
        }
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        const todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            const task = todolist.tasks.find(t => t.id === taskId)
            if (task) {
                task.title = title
            }
        }
        setTodolists([...todolists])
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        const todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            const task = todolist.tasks.find(t => t.id === taskId)
            if (task) {
                task.isDone = isDone
            }
        }
        setTodolists([...todolists])
    }
    const removeTask = (todolistId: string, taskId: string) => {
        const todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.tasks = todolist.tasks.filter(t => t.id !== taskId)
        }
        setTodolists([...todolists])
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {todolists.map(tl => <Todolist key={tl.id}
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