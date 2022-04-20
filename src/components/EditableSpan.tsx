import {useState} from 'react';

type EditableSpanPT = {
    title: string
    changeTitle: (title: string) => void
}
export const EditableSpan = (props: EditableSpanPT) => {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(props.title)

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deActivateEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }
    return (
        <>
            {editMode
                ? <input type="text"
                         autoFocus
                         value={title}
                         onChange={(e) => setTitle(e.currentTarget.value)}
                         onBlur={deActivateEditMode}
                />
                : <span onDoubleClick={activateEditMode}>{props.title}</span>}
        </>
    )
}