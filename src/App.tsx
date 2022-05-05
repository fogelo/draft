import React, {useEffect} from "react";
import "./App.css";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateT} from "./redux/store";
import {NavBar} from "./components/NavBar";
import {authAPI} from "./dal/todolist-api";
import {RequestStatusType, setIsInitializedAC} from "./app-reducer";
import LinearProgress from "@mui/material/LinearProgress";
import {TodolistList} from "./TodolistList";
import CircularProgress from "@mui/material/CircularProgress";
import {setUserDataAC} from "./redux/auth-reducer";
import {Routes, Route} from "react-router-dom";
import Login from "./Login";


function App() {
    const isInitialized = useSelector<AppRootStateT, boolean>(state => state.app.isInitialized)
    const status = useSelector<AppRootStateT, RequestStatusType>(state => state.app.status)

    const dispatch = useDispatch()
    // const navigate = useNavigate()

    useEffect(() => {
        authAPI.me()
            .then(res => {
                if (res.data.resultCode === 0) {
                    const data = res.data.data
                    dispatch(setUserDataAC(data.id, data.email, data.login))
                    dispatch(setIsInitializedAC(true))
                }
            })
    }, [])

    if (!isInitialized) {
        return <CircularProgress/>
    }

    return (
        <>
            <NavBar/>
            {status === "loading" && <LinearProgress/>}
            <Routes>
                <Route path={"/"} element={<TodolistList/>}/>
                <Route path={"/login"} element={<Login/>}/>
            </Routes>

        </>
    );
}

export default App;

