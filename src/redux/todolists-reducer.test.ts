import {v1} from 'uuid';
import {
    addTaskAC,
    addTodolistAC, changeTaskStatusAC,
    changeTaskTitleAC,
    changeTodolistTitleAC, RemoveTaskAC,
    removeTodolistAC,
    todolistsReducer
} from './todolists-reducer';

test('todolist should be added', () => {
    const startState = [
        {
            id: 'todolistId1', title: 'what to learn', tasks: [
                {id: '1', title: 'html', isDone: true},
                {id: '2', title: 'css', isDone: true},
                {id: '3', title: 'react', isDone: true},
                {id: '4', title: 'redux', isDone: false},]
        },
        {
            id: 'todolistId2', title: 'what to buy', tasks: [
                {id: '5', title: 'milk', isDone: true},
                {id: '6', title: 'meat', isDone: true},
                {id: '7', title: 'egs', isDone: false},]
        },
    ]

    const todolistTitle = 'new todolist'
    const action = addTodolistAC(todolistTitle)
    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(3)
})

test('correct todolist title should be changed', () => {
    const startState = [
        {
            id: 'todolistId1', title: 'what to learn', tasks: [
                {id: '1', title: 'html', isDone: true},
                {id: '2', title: 'css', isDone: true},
                {id: '3', title: 'react', isDone: true},
                {id: '4', title: 'redux', isDone: false},]
        },
        {
            id: 'todolistId2', title: 'what to buy', tasks: [
                {id: '5', title: 'milk', isDone: true},
                {id: '6', title: 'meat', isDone: true},
                {id: '7', title: 'egs', isDone: false},]
        },
    ]

    const todolistTitle = 'new todolist title'
    const action = changeTodolistTitleAC('todolistId1', todolistTitle)
    const endState = todolistsReducer(startState, action)

    expect(endState[0].title).toBe('new todolist title')
})
test('correct todolist should be removed', () => {
    const startState = [
        {
            id: 'todolistId1', title: 'what to learn', tasks: [
                {id: '1', title: 'html', isDone: true},
                {id: '2', title: 'css', isDone: true},
                {id: '3', title: 'react', isDone: true},
                {id: '4', title: 'redux', isDone: false},]
        },
        {
            id: 'todolistId2', title: 'what to buy', tasks: [
                {id: '5', title: 'milk', isDone: true},
                {id: '6', title: 'meat', isDone: true},
                {id: '7', title: 'egs', isDone: false},]
        },
    ]

    const action = removeTodolistAC('todolistId1')
    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(1)
})
test('task should be added', () => {
    const startState = [
        {
            id: 'todolistId1', title: 'what to learn', tasks: [
                {id: '1', title: 'html', isDone: true},
                {id: '2', title: 'css', isDone: true},
                {id: '3', title: 'react', isDone: true},
                {id: '4', title: 'redux', isDone: false},]
        },
        {
            id: 'todolistId2', title: 'what to buy', tasks: [
                {id: '5', title: 'milk', isDone: true},
                {id: '6', title: 'meat', isDone: true},
                {id: '7', title: 'egs', isDone: false},]
        },
    ]
    const taskTitle = 'new task'
    const action = addTaskAC('todolistId1', taskTitle)
    const endState = todolistsReducer(startState, action)

    expect(endState[0].tasks.length).toBe(5)
})
test('task title should be changed', () => {
    const startState = [
        {
            id: 'todolistId1', title: 'what to learn', tasks: [
                {id: '1', title: 'html', isDone: true},
                {id: '2', title: 'css', isDone: true},
                {id: '3', title: 'react', isDone: true},
                {id: '4', title: 'redux', isDone: false},]
        },
        {
            id: 'todolistId2', title: 'what to buy', tasks: [
                {id: '5', title: 'milk', isDone: true},
                {id: '6', title: 'meat', isDone: true},
                {id: '7', title: 'egs', isDone: false},]
        },
    ]
    const taskTitle = 'new task'
    const action = changeTaskTitleAC('todolistId1', '1', taskTitle)
    const endState = todolistsReducer(startState, action)

    expect(endState[0].tasks[0].title).toBe('new task')
})
test('task status should be changed', () => {
    const startState = [
        {
            id: 'todolistId1', title: 'what to learn', tasks: [
                {id: '1', title: 'html', isDone: true},
                {id: '2', title: 'css', isDone: true},
                {id: '3', title: 'react', isDone: true},
                {id: '4', title: 'redux', isDone: false},]
        },
        {
            id: 'todolistId2', title: 'what to buy', tasks: [
                {id: '5', title: 'milk', isDone: true},
                {id: '6', title: 'meat', isDone: true},
                {id: '7', title: 'egs', isDone: false},]
        },
    ]

    const action = changeTaskStatusAC('todolistId1', '1', false)
    const endState = todolistsReducer(startState, action)

    expect(endState[0].tasks[0].isDone).toBe(false)
})
test('task should be removed', () => {
    const startState = [
        {
            id: 'todolistId1', title: 'what to learn', tasks: [
                {id: '1', title: 'html', isDone: true},
                {id: '2', title: 'css', isDone: true},
                {id: '3', title: 'react', isDone: true},
                {id: '4', title: 'redux', isDone: false},]
        },
        {
            id: 'todolistId2', title: 'what to buy', tasks: [
                {id: '5', title: 'milk', isDone: true},
                {id: '6', title: 'meat', isDone: true},
                {id: '7', title: 'egs', isDone: false},]
        },
    ]

    const action = RemoveTaskAC('todolistId1', '1')
    const endState = todolistsReducer(startState, action)

    expect(endState[0].tasks.length).toBe(3)
})

