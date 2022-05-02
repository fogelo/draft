import React, {useEffect} from "react";
import "./App.css";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateT} from "./redux/store";
import {Container, Grid, Paper, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {NavBar} from "./components/NavBar";
import {grey} from "@mui/material/colors";
import {todolistAPI, TodolistType} from "./dal/todolist-api";
import {addTodolistAC, setTodolistsAC} from "./redux/todolist-reducer";
import {AddItemForm} from "./AddItemForm";
import Todolist from "./components/Todolist";
import {TaskStateType} from "./redux/tasks-reducer";


function App() {
    const tasks = useSelector<AppRootStateT, TaskStateType>(state => state.tasks)
    const todolists = useSelector<AppRootStateT, Array<TodolistType>>(state => state.todolists)
    const dispatch = useDispatch()

    useEffect(() => {
        todolistAPI.getTodolists()
            .then(res => {
                dispatch(setTodolistsAC(res.data))
            })
    }, [])

    const addTodolist = (title: string) => {
        todolistAPI.createTodolist(title)
            .then(res => {
                dispatch(addTodolistAC(res.data.data.item))
            })
    }

    return (
        <>
            <NavBar/>
            <Box sx={{maxWidth: 500, margin: "0 auto 20px"}}>
                <Typography color={grey[700]}>Добавит список</Typography>
                <AddItemForm addItem={addTodolist}/>
            </Box>
            <Container className="App">
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
    );
}

export default App;

