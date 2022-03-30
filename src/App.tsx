import React from 'react';
import './App.css';
import {NavLink, Routes, Route} from 'react-router-dom';
import {addMessageAC, addPostAC, updateMessageTitleAC, updatePostTitleAC} from './redux/store';

export function App(props: any) {
    return (
        <div className="App">
            <Header/>
            <div className={'content'}>
                <Menu/>
                <Main store={props.store}
                />
            </div>
        </div>
    );
}

function Header() {
    return (
        <div className="Header">
            header
        </div>
    );
}

function Menu() {
    return (
        <div className="Menu">
            <div><NavLink to={'/profile'}>profile</NavLink></div>
            <div><NavLink to={'/dialogs'}>dialogs</NavLink></div>
            <div><NavLink to={'/users'}>users</NavLink></div>
            <div><NavLink to={'/news'}>news</NavLink></div>
        </div>
    );
}

function Main(props: any) {
    return (
        <div className="Main">
            <Routes>
                <Route path={'/profile'} element={<ProfileContainer store={props.store}/>}/>
                <Route path={'/dialogs'} element={<DialogsContainer store={props.store}/>}/>
            </Routes>
        </div>
    );
}

function Profile(props: any) {

    const textRef: any = React.createRef()

    const onChange = () => {
        props.updatePostTitle(textRef.current.value)
    }
    const onClick = () => {
        props.addPost()
    }
    return (
        <div className="Main">
            <div>ava+description</div>
            <div>My posts</div>
            <div style={{display: 'flex'}}>
                <textarea ref={textRef}
                          value={props.newPostTitle}
                          onChange={onChange}/>
                <button onClick={onClick}>add post</button>
            </div>
            {
                props.posts.map((p: any) => <div key={p.id}>{p.title}</div>)
            }

        </div>
    );
}

function ProfileContainer(props: any) {
    const state = props.store.getState()
    const updatePostTitle = (text: any) => {
        props.store.dispatch(updatePostTitleAC(text))
    }
    const addPost = () => {
        props.store.dispatch(addPostAC())
    }
    return <Profile updatePostTitle={updatePostTitle}
                    addPost={addPost}
                    posts={state.profilePage.posts}
                    newPostTitle={state.profilePage.newPostTitle}/>
}

function Dialogs(props: any) {
    const textRef: any = React.createRef()

    const onChange = () => {
        props.updateMessageTitle(textRef.current.value)
    }
    const onClick = () => {
        props.addMessage()
    }
    return (
        <div className="Main">
            <div style={{display: 'flex'}}>
                <textarea ref={textRef}
                          value={props.newMessageTitle}
                          onChange={onChange}/>
                <button onClick={onClick}>add post</button>
            </div>
            {
                props.messages.map((m: any) => <div key={m.id}>{m.title}</div>)
            }

        </div>
    );
}

function DialogsContainer(props: any) {
    const state = props.store.getState()
    const updateMessageTitle = (text: any) => {
        props.store.dispatch(updateMessageTitleAC(text))
    }
    const addMessage = () => {
        props.store.dispatch(addMessageAC())
    }
    return <Dialogs updateMessageTitle={updateMessageTitle}
                    addMessage={addMessage}
                    messages={state.dialogsPage.messages}
                    newMessageTitle={state.dialogsPage.newMessageTitle}
    />
}

