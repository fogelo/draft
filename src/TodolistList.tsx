import React, {FC, useEffect} from "react";
import {Container, Grid, Paper, Typography} from "@mui/material";
import Todolist from "./components/Todolist";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateT} from "./redux/store";
import {todolistAPI, TodolistType} from "./dal/todolist-api";
import {TaskStateType} from "./redux/tasks-reducer";
import Box from "@mui/material/Box";
import {grey} from "@mui/material/colors";
import {AddItemForm} from "./components/AddItemForm";
import {addTodolistAC, setTodolistsAC} from "./redux/todolist-reducer";
import {setAppStatusAC} from "./app-reducer";

type PropsType = any
export const TodolistList: FC<PropsType> = (props) => {
    const isInitialized = useSelector<AppRootStateT, boolean>(state => state.app.isInitialized)
    const todolists = useSelector<AppRootStateT, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateT, TaskStateType>(state => state.tasks)
    const dispatch = useDispatch()


    useEffect(() => {
        todolistAPI.getTodolists()
            .then(res => {
                dispatch(setTodolistsAC(res.data))
            })
    }, [])


    const addTodolist = (title: string) => {
        dispatch(setAppStatusAC("loading"))
        todolistAPI.createTodolist(title)
            .then(res => {
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setAppStatusAC("succeeded"))
            })
    }

    return (
        <>
            <Box sx={{maxWidth: 500, margin: "16px auto 20px"}}>
                <Typography color={grey[700]}>Добавит список</Typography>
                <AddItemForm addItem={addTodolist}/>
            </Box>
            <Container>
                <Grid container spacing={2}
                      sx={{display: "flex", justifyContent: {xs: "center", sm: "flex-start"}}}
                >
                    {todolists.map(tl => (
                        <Grid key={tl.id}
                              item
                              xs={12} sm={6} md={4} lg={3}
                              sx={{maxWidth: {xs: 400, sm: 300}}}
                        >
                            <Paper elevation={3} sx={{padding: 1}}>
                                <Todolist tasks={tasks[tl.id]} todolist={tl}/>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    )
}