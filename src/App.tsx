import './App.css';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TaskStateType} from './redux/tasks-reducer';
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    FilterType,
    removeTodolistAC,
    TodolistType
} from './redux/todolists-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from './redux/store';
import {Todolist} from './components/Todolist';
import {AddItemForm} from './components/AddItemForm/AddItemForm';

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


