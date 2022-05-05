import React, {FC, useEffect} from "react";
import {Container, Grid, Paper, Typography} from "@mui/material";
import Todolist from "./components/Todolist";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateT} from "./redux/store";
import {TaskStateType} from "./redux/tasks-reducer";
import Box from "@mui/material/Box";
import {grey} from "@mui/material/colors";
import {AddItemForm} from "./components/AddItemForm";
import {addTodolistTC, fetchTodolistsTC, TodolistDomainType} from "./redux/todolist-reducer";
import {RequestStatusType} from "./app-reducer";
import {useNavigate} from "react-router-dom";
import {NavBar} from "./components/NavBar";
import LinearProgress from "@mui/material/LinearProgress";
import {ThunkDispatch} from "redux-thunk";

type PropsType = any
export const TodolistList: FC<PropsType> = (props) => {
    const todolists = useSelector<AppRootStateT, Array<TodolistDomainType>>(state => state.todolists)
    // debugger
    const tasks = useSelector<AppRootStateT, TaskStateType>(state => state.tasks)
    const status = useSelector<AppRootStateT, RequestStatusType>(state => state.app.status)
    const isLoggedIn = useSelector<AppRootStateT, boolean>(state => state.auth.isLoggedIn)
    const navigate = useNavigate()
    const dispatch: ThunkDispatch<any, any, any> = useDispatch()

    console.log("Todolists")

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login")
        } else {
            dispatch(fetchTodolistsTC())
        }

    }, [isLoggedIn])


    const addTodolist = (title: string) => {
        dispatch(addTodolistTC(title))
    }

    return (
        <>
            <NavBar/>
            {status === "loading" && <LinearProgress/>}
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