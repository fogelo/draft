import React, {useState} from 'react';
import './App.css';


export function App() {
    return (
        <div className="App">
            <EditableSpan title={'hard'} changeTitle={() => {
            }}/>

        </div>
    );
}


type EditableSpanPT = {
    title: string
    changeTitle: (title: string) => void
}
const EditableSpan = (props: EditableSpanPT) => {
    const [title, setTitle] = useState(props.title)
    const [editMode, setEditMode] = useState(false)

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deActivateEditMode = () => {
        setEditMode(false)
    }
    return (
        <div>
            {editMode
                ? <input type="text" value={title}
                         autoFocus
                         onBlur={deActivateEditMode}
                         onChange={(e) => setTitle(e.currentTarget.value)}/>
                : <span onDoubleClick={activateEditMode}>{title}</span>
            }
        </div>
    )
}