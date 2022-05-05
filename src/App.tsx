import React, {useEffect} from "react";
import "./App.css";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateT} from "./redux/store";
import {authAPI} from "./dal/todolist-api";
import {initializingAppTC, setIsInitializedAC} from "./app-reducer";
import {TodolistList} from "./TodolistList";
import CircularProgress from "@mui/material/CircularProgress";
import {setIsLoggedInAC, setUserDataAC} from "./redux/auth-reducer";
import {Route, Routes} from "react-router-dom";
import LoginForm from "./LoginForm";
import {ThunkDispatch} from "redux-thunk";


function App() {
    const isInitialized = useSelector<AppRootStateT, boolean>(state => state.app.isInitialized)
    const dispatch: ThunkDispatch<any, any, any> = useDispatch()
    // const navigate = useNavigate()

    useEffect(() => {
                dispatch(initializingAppTC())
    }, [])

    if (!isInitialized) {
        return <CircularProgress/>
    }

    return (
        <>
            <Routes>
                <Route path={"/"} element={<TodolistList/>}/>
                <Route path={"/login"} element={<LoginForm/>}/>
            </Routes>

        </>
    );
}

export default App;

