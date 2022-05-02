import React, {FC} from "react";
import {useFormik} from "formik";
import {Button, Stack, TextField} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

type AddItemFormPT = {
    addItem: (title: string) => void
}
export const AddItemForm: FC<AddItemFormPT> = ({addItem, ...props}) => {
    const formik = useFormik({
        initialValues: {
            title: "",
        },
        onSubmit: values => {
            addItem(values.title)
            formik.values.title = ""
        },
    });
    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Stack direction={"row"}>
                    <TextField
                        variant={"outlined"}
                        size={"small"}
                        name={"title"}
                        onChange={formik.handleChange}
                        value={formik.values.title}
                        fullWidth

                    />
                    <Button
                        variant={"contained"}
                        size={"small"}
                        type={"submit"}
                    >
                        <AddIcon fontSize={"small"}/>
                    </Button>
                </Stack>
            </form>
        </>
    )
}