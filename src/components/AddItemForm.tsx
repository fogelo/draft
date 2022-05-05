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
        validate(values) {
            const errors: any = {}
            if (!values.title) {
                errors.title = "Заполните поле"
            }
            return errors
        }
    });
    console.log('additem form')
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
                        error={!!formik.errors.title}
                        helperText={formik.errors.title}

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