import React, {useEffect} from "react";
import {useFormik} from "formik";
import {Button, Checkbox, FormControlLabel, Stack, TextField} from "@mui/material";
import {authAPI} from "./dal/todolist-api";
import {useDispatch, useSelector} from "react-redux";
import {loginTC, setIsLoggedInAC} from "./redux/auth-reducer";
import {useNavigate} from "react-router-dom";
import {AppRootStateT} from "./redux/store";
import {ThunkDispatch} from "redux-thunk";

const LoginForm = () => {

    const isLoggedIn = useSelector<AppRootStateT, boolean>(state => state.auth.isLoggedIn)
    const dispatch: ThunkDispatch<any, any, any> = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/")
        }
    }, [isLoggedIn])

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
        onSubmit: values => {
            dispatch(loginTC(values.email, values.password, values.rememberMe))
        },
    });
    console.log("login form")
    return (

        <form onSubmit={formik.handleSubmit}>
            <Stack spacing={2} sx={{maxWidth: {xs: "90%", sm: "400px"}, margin: "16px auto 0"}}>
                <TextField
                    id="email"
                    name="email"
                    type="text"
                    size="small"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    placeholder={"enter email"}
                />
                <TextField
                    id="password"
                    name="password"
                    type="password"
                    size="small"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    placeholder={"enter password"}
                />
                <FormControlLabel control={<Checkbox onChange={formik.handleChange}
                                                     id="rememberMe"
                                                     name="rememberMe"
                                                     checked={formik.values.rememberMe}/>}
                                  label="remember me"/>
                <Button type={"submit"} variant="contained">Login</Button>
            </Stack>
        </form>


    );
};

export default LoginForm;