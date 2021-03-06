import React, {FC, KeyboardEvent, useState} from "react";
import {TextField, Typography} from "@mui/material";


type EditableSpanPT = {
    title: string
    changeTitle: (title: string) => void
}
const EditableSpan: FC<EditableSpanPT> = React.memo((props) => {

    const [title, setTitle] = useState(props.title)
    const [editMode, setEditMode] = useState(false)

    const activateEditeMode = () => {
        setEditMode(true)
    }
    const deActivateEditeMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }

    const handleOnKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            deActivateEditeMode()
        }
    }

    console.log("editable span")
    return (
        <>
            {editMode
                ? <TextField
                    variant={"outlined"}
                    size={"small"}
                    name={"title"}
                    onChange={(e) => setTitle(e.currentTarget.value)}
                    value={title}
                    autoFocus
                    onBlur={deActivateEditeMode}
                    onKeyPress={handleOnKeyPress}
                    fullWidth
                />
                : <Typography onClick={activateEditeMode}>{title}</Typography>
            }
        </>
    );
});

export default EditableSpan;