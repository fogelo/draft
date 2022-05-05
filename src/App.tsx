import React, {useEffect} from "react";
import "./App.css";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateT} from "./redux/store";
import {initializingAppTC} from "./app-reducer";
import {TodolistList} from "./TodolistList";
import CircularProgress from "@mui/material/CircularProgress";
import {Route, Routes} from "react-router-dom";
import LoginForm from "./LoginForm";
import {ThunkDispatch} from "redux-thunk";
import CustomizedSnackbar from "./components/ErrorSnackBar";


function App() {

    const isInitialized = useSelector<AppRootStateT, boolean>(state => state.app.isInitialized)
    const error = useSelector<AppRootStateT, string | null>(state => state.app.error)

    const dispatch: ThunkDispatch<any, any, any> = useDispatch()


    useEffect(() => {
        dispatch(initializingAppTC())
    }, [])

    if (!isInitialized) {
        return <CircularProgress/>
    }
console.log('app')
    return (
        <>
            <CustomizedSnackbar/>
            <Routes>
                <Route path={"/"} element={<TodolistList/>}/>
                <Route path={"/login"} element={<LoginForm/>}/>
            </Routes>
        </>
    );
}

export default App;

