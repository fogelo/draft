import React from "react";
import {AppBar, Avatar, Button, IconButton, Toolbar, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateT} from "../redux/store";
import {UserDataType} from "../dal/todolist-api";
import {deepOrange} from "@mui/material/colors";
import {logoutTC} from "../redux/auth-reducer";
import {ThunkDispatch} from "redux-thunk";

export const NavBar = () => {
    const userData = useSelector<AppRootStateT, UserDataType>(state => state.auth.userData)
    const dispatch: ThunkDispatch<any, any, any> = useDispatch()

    const onClickHandler = () => {
        dispatch(logoutTC())
    }
    console.log("navbar")
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Todolists
                    </Typography>
                    <Typography>
                        {userData.login}
                    </Typography>
                    <Avatar sx={{bgcolor: deepOrange[500], margin: "0 5px"}}>A</Avatar>
                    <Button color="inherit"
                            onClick={onClickHandler}
                    >
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
};
