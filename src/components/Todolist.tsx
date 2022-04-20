import {FilterType} from '../redux/todolists-reducer';
import {TaskType} from '../redux/tasks-reducer';
import {EditableSpan} from './EditableSpan';
import {AddItemForm} from './AddItemForm/AddItemForm';

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
export const Todolist = (props: TodolistPT) => {
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