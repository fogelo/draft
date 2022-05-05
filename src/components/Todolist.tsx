import React, {ChangeEvent, FC, useEffect} from "react";
import {Button, ButtonGroup, Checkbox, List, ListItem, ListItemText, Stack, Typography} from "@mui/material";
import {grey} from "@mui/material/colors";
import {useDispatch, useSelector} from "react-redux";
import {
    addTaskTC,
    changeTaskStatusTC,
    changeTaskTitleTC,
    fetchTasksTC,
    removeTaskTC,
    TasksActionType
} from "../redux/tasks-reducer";
import {TaskStatus, TaskType} from "../dal/todolist-api";
import {AddItemForm} from "./AddItemForm";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
    changeFilterAC,
    changeTodolistTitleTC,
    removeTodolistTC,
    TodolistActionType,
    TodolistDomainType
} from "../redux/todolist-reducer";
import ClearIcon from "@mui/icons-material/Clear";
import EditableSpan from "./EditableSpan";
import {ThunkDispatch} from "redux-thunk";
import {AppRootStateT} from "../redux/store";
import CustomizedSnackbar from "./ErrorSnackBar";

type TodolistPT = {
    todolist: TodolistDomainType
    tasks: TaskType[]
}

const Todolist: FC<TodolistPT> = (props) => {

    // const error = useSelector<AppRootStateT, string | null>(state => state.app.error)
    const dispatch = useDispatch<ThunkDispatch<AppRootStateT, void, TasksActionType | TodolistActionType>>()
    // const dispatch: ThunkActionDispatch<any> = useDispatch()

    useEffect(() => {
        dispatch(fetchTasksTC(props.todolist.id))
    }, [])

    const removeTodolist = (id: string) => {
        dispatch(removeTodolistTC(id))
    }

    const changeTodolistTitle = (title: string) => {
        dispatch(changeTodolistTitleTC(props.todolist.id, title))
    }

    const addTask = (title: string) => {
        dispatch(addTaskTC(props.todolist.id, title))
    }

    const removeTask = (todolistId: string, taskId: string) => {
        dispatch(removeTaskTC(todolistId, taskId))
    }


    const changeFilter = (filter: string) => {
        dispatch(changeFilterAC(props.todolist.id, filter))
    }

    let filteredTasks = props.tasks
    if (props.todolist.filter === "active") {
        filteredTasks = filteredTasks.filter(t => t.status === TaskStatus.New)
    }
    if (props.todolist.filter === "completed") {
        filteredTasks = filteredTasks.filter(t => t.status === TaskStatus.Completed)
    }
    console.log('todolist')
    return (
        <>
            {/*<CustomizedSnackbar/>*/}
            <Stack direction="row" justifyContent="space-between">
                <Typography variant={"h5"} noWrap gutterBottom>
                    <EditableSpan title={props.todolist.title} changeTitle={changeTodolistTitle}/>
                </Typography>
                <Button
                    variant={"text"}
                    size={"small"}
                    type={"submit"}
                    onClick={() => removeTodolist(props.todolist.id)}
                >
                    <DeleteOutlineIcon fontSize={"small"}/>
                </Button>
            </Stack>
            <Typography color={grey[700]}>Добавить задачу</Typography>

            <AddItemForm addItem={addTask}/>
            <List>
                {props.tasks && filteredTasks.map(t => {
                    const changeTaskTitle = (title: string) => {
                        dispatch(changeTaskTitleTC(props.todolist.id, t.id, title))
                    }
                    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                        dispatch(changeTaskStatusTC(props.todolist.id, t.id, e.target.checked ? TaskStatus.Completed : TaskStatus.New))
                    }
                    return (
                        <ListItem key={t.id}>
                            <Checkbox onChange={changeTaskStatus} checked={t.status !== TaskStatus.New}/>
                            <ListItemText
                                primary={<EditableSpan title={t.title} changeTitle={changeTaskTitle}/>}
                            />
                            <Button
                                variant={"text"}
                                size={"small"}
                                type={"submit"}
                                onClick={() => removeTask(props.todolist.id, t.id)}
                            >
                                <ClearIcon fontSize={"small"}/>
                            </Button>
                        </ListItem>
                    )
                })}
            </List>
            <ButtonGroup variant={"outlined"} >
                <Button onClick={() => changeFilter("all")}>all</Button>
                <Button onClick={() => changeFilter("active")}>active</Button>
                <Button onClick={() => changeFilter("completed")}>completed</Button>
            </ButtonGroup>

        </>
    );
};

export default Todolist;