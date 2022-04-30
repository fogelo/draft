import React, {FC} from 'react';
import './App.css';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateT} from './redux/store';
import {addTaskAC, TaskType} from './redux/tasks-reducer';
import {useFormik} from 'formik';
import {
    Button, Checkbox,
    Container, List, ListItem, ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Stack,
    styled,
    TextField,
    Typography
} from '@mui/material';
import Box from '@mui/material/Box';
import {NavBar} from './components/NavBar';
import AddIcon from '@mui/icons-material/Add';
import {grey} from '@mui/material/colors';


function App() {
    const tasks = useSelector<AppRootStateT, Array<TaskType>>(state => state.tasks)
    const dispatch = useDispatch()

    const addTask = (title: string) => {
        dispatch(addTaskAC(title))
    }


    return (
        <>
            <NavBar/>
            <Box sx={{maxWidth: 500, margin: '0 auto 20px'}}>
                <Typography color={grey[700]}>Создать Todolist</Typography>
                <AddItemForm addItem={addTask}/>
            </Box>
            <Container className="App">
                <Paper elevation={3} sx={{maxWidth: 300, padding: 1}}>
                    <Typography color={grey[700]}>Создать Task</Typography>
                    <AddItemForm addItem={addTask}/>
                    <List>
                        {tasks.map(t => (
                            <ListItem key={t.id}>
                                <ListItemText primary={t.title}/>
                                <Checkbox/>
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Container>
        </>
    );
}

export default App;

type AddItemFormPT = {
    addItem: (title: string) => void
}

const AddItemForm: FC<AddItemFormPT> = ({addItem, ...props}) => {
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
                <Stack direction={'row'}>
                    <TextField
                        variant={'outlined'}
                        size={'small'}
                        name={'title'}
                        onChange={formik.handleChange}
                        value={formik.values.title}
                        fullWidth

                    />
                    <Button
                        variant={'contained'}
                        size={'small'}
                        type={'submit'}
                    >
                        <AddIcon fontSize={'small'}/>
                    </Button>
                </Stack>
            </form>
        </>
    )
}