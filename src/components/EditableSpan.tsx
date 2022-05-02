import React, {FC, useState} from "react";
import {TextField, Typography} from "@mui/material";


type EditableSpanPT = {
    title: string
    changeTitle: (title: string) => void
}
const EditableSpan: FC<EditableSpanPT> = (props) => {

    const [title, setTitle] = useState(props.title)
    const [editMode, setEditMode] = useState(false)

    const activateEditeMode = () => {
        setEditMode(true)
    }
    const deActivateEditeMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }

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
                    fullWidth
                />
                : <Typography onDoubleClick={activateEditeMode}>{title}</Typography>}
        </>
    );
};

export default EditableSpan;