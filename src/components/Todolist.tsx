import React, {ChangeEvent, FC, useEffect} from "react";
import {Button, Checkbox, List, ListItem, ListItemText, Stack, Typography} from "@mui/material";
import {grey} from "@mui/material/colors";
import {useDispatch} from "react-redux";
import {
    addTaskTC,
    changeTaskStatusTC,
    changeTaskTitleTC,
    fetchTasksTC,
    removeTaskTC,
    TasksActionType
} from "../redux/tasks-reducer";
import {TaskStatus, TaskType, TodolistType} from "../dal/todolist-api";
import {AddItemForm} from "./AddItemForm";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {changeTodolistTitleTC, removeTodolistTC, TodolistActionType} from "../redux/todolist-reducer";
import ClearIcon from "@mui/icons-material/Clear";
import EditableSpan from "./EditableSpan";
import {ThunkDispatch} from "redux-thunk";
import {AppRootStateT} from "../redux/store";

type TodolistPT = {
    todolist: TodolistType
    tasks: TaskType[]
}

const Todolist: FC<TodolistPT> = (props) => {
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

    return (
        <>
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
                {props.tasks && props.tasks.map(t => {
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
        </>
    );
};

export default Todolist;