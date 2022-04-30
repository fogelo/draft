import React, {FC} from 'react';
import './App.css';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateT} from './redux/store';
import {addTaskAC, TaskType} from './redux/tasks-reducer';
import {useFormik} from 'formik';
import {Container, TextField} from '@mui/material';
import Box from '@mui/material/Box';
import {NavBar} from './components/NavBar';


function App() {
    const tasks = useSelector<AppRootStateT, Array<TaskType>>(state => state.tasks)
    const dispatch = useDispatch()

    const addTask = (title: string) => {
        dispatch(addTaskAC(title))
    }

    return (
        <>
            <NavBar/>
            <Container className="App">
                <AddItemForm addItem={addTask}/>
                <ul>
                    {tasks.map(t => <li key={t.id}>{t.title}</li>)}
                </ul>
            </Container>
        </>
    );
}

export default App;

type AddItemFormPT = {
    addItem: (title: string) => void
}

const AddItemForm: FC<AddItemFormPT> = ({addItem}) => {
    const formik = useFormik({
        initialValues: {
            title: '',
        },
        onSubmit: values => {
            addItem(values.title)
            formik.values.title = ''
        },
    });
    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    name={'title'}
                    onChange={formik.handleChange}
                    value={formik.values.title}
                />
                <button type={'submit'}>+</button>
            </form>
        </>
    )
}