import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, {AlertProps} from "@mui/material/Alert";
import {FC} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateT} from "../redux/store";
import {setErrorAC} from "../app-reducer";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const CustomizedSnackbars = () => {
    const error = useSelector<AppRootStateT, string | null>(state => state.app.error)
    const dispatch = useDispatch()
    const isOpen = error !== null
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        dispatch(setErrorAC(null))
    };
    console.log("snackbar")
    return (
        <Stack spacing={2} sx={{width: "100%"}}>
            <Snackbar open={isOpen} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{width: "100%"}}>
                    {error}
                </Alert>
            </Snackbar>

        </Stack>
    );
}

export default CustomizedSnackbars