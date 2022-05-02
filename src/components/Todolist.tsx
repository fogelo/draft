import React, {FC, useEffect} from "react";
import {Checkbox, List, ListItem, ListItemText, Typography} from "@mui/material";
import {grey} from "@mui/material/colors";
import {useDispatch} from "react-redux";
import {addTaskAC, setTasksAC} from "../redux/tasks-reducer";
import {TaskType, todolistAPI, TodolistType} from "../dal/todolist-api";
import {AddItemForm} from "../AddItemForm";

type TodolistPT = {
    todolist: TodolistType
    tasks: TaskType[]
}

const Todolist: FC<TodolistPT> = (props) => {
    const dispatch = useDispatch()

    const addTask = (title: string) => {
        todolistAPI.createTask(props.todolist.id, title)
            .then(res => {
                dispatch(addTaskAC(res.data.data.item))
            })

    }

    useEffect(() => {
        todolistAPI.getTasks(props.todolist.id)
            .then(res => {
                dispatch(setTasksAC(props.todolist.id, res.data.items))
            })
    }, [])

    return (
        <>
            <Typography variant={"h5"} noWrap>{props.todolist.title}</Typography>
            <Typography color={grey[700]}>Создать Task</Typography>

            <AddItemForm addItem={addTask}/>
            <List>
                {props.tasks && props.tasks.map(t => (
                    <ListItem key={t.id}>
                        <ListItemText primary={t.title}/>
                        <Checkbox/>
                    </ListItem>
                ))}
            </List>
        </>
    );
};

export default Todolist;