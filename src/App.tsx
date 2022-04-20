import './App.css';
import {useState} from 'react';
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    TaskStateType,
    TaskType
} from './redux/tasks-reducer';
import {
    addTodolistAC, changeFilterAC,
    changeTodolistTitleAC,
    FilterType,
    removeTodolistAC,
    TodolistType
} from './redux/todolists-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from './redux/store';

function App() {
    //==============================
    //tasks block
    //==============================
    // const [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {})
    // const [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [])

    const dispatch = useDispatch()
    const todolists = useSelector<RootStateType, TodolistType[]>(state => state.todolists)
    const tasks = useSelector<RootStateType, TaskStateType>(state => state.tasks)


    const addTask = (taskTitle: string, todolistId: string) => {
        dispatch(addTaskAC(taskTitle, todolistId))
    }
    const removeTask = (taskId: string, todolistId: string) => {
        dispatch(removeTaskAC(taskId, todolistId))
    }
    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todolistId))
    }

    const changeTaskTitle = (taskId: string, taskTitle: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(taskId, taskTitle, todolistId))
    }

    //==============================
    //todolists block
    //==============================

    const addTodolist = (todolistTitle: string) => {
        const action = addTodolistAC(todolistTitle)
        dispatch(action)
    }

    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    }

    const changeTodolistTitle = (title: string, todolistId: string) => {
        dispatch(changeTodolistTitleAC(title, todolistId))
    }

    const changeFilter = (filter: FilterType, todolistId: string) => {
        dispatch(changeFilterAC(filter, todolistId))
    }
    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            <div className={'todolists'}>
                {todolists.map(tl => {
                    return (
                        <Todolist key={tl.id}
                                  todolistTitle={tl.title}
                                  todolistId={tl.id}
                                  removeTodolist={removeTodolist}
                                  changeTodolistTitle={changeTodolistTitle}
                                  filter={tl.filter}
                                  changeFilter={changeFilter}

                                  tasks={tasks[tl.id]}
                                  addTask={addTask}
                                  changeTaskTitle={changeTaskTitle}
                                  removeTask={removeTask}
                                  changeTaskStatus={changeTaskStatus}/>
                    )
                })}
            </div>

        </div>
    );
}

export default App;

type TodolistPT = {
    todolistId: string
    todolistTitle: string
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (title: string, todolistId: string) => void
    filter: string
    changeFilter: (filter: FilterType, todolistId: string) => void

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
    const changeTitle = (title: string) => {
        props.changeTodolistTitle(title, props.todolistId)
    }

    let filteredTasks = props.tasks
    if (props.filter === 'active') {
        filteredTasks = filteredTasks.filter(t => !t.isDone)
    }
    if (props.filter === 'completed') {
        filteredTasks = filteredTasks.filter(t => t.isDone)
    }
    return (
        <div>
            <EditableSpan title={props.todolistTitle} changeTitle={changeTitle}/>
            <button onClick={() => props.removeTodolist(props.todolistId)}>x</button>
            <div>
                <AddItemForm addItem={addTask}/>
            </div>
            <ul>
                {filteredTasks.map(t => {
                    const changeTitle = (title: string) => {
                        props.changeTaskTitle(t.id, title, props.todolistId)
                    }
                    return (
                        <li key={t.id}>
                            <button onClick={() => props.removeTask(t.id, props.todolistId)}>x</button>
                            <input type="checkbox"
                                   checked={t.isDone}
                                   onChange={(e) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.todolistId)}
                            />
                            <EditableSpan title={t.title} changeTitle={changeTitle}/>
                        </li>
                    )
                })}
            </ul>
            <button onClick={() => props.changeFilter('all', props.todolistId)}>all</button>
            <button onClick={() => props.changeFilter('active', props.todolistId)}>active</button>
            <button onClick={() => props.changeFilter('completed', props.todolistId)}>completed</button>
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