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
                <Main state={props.state}
                      dispatch={props.dispatch}
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
                <Route path={'/profile'} element={<Profile profilePage={props.state.profilePage}
                                                           dispatch={props.dispatch}
                />}/>
                <Route path={'/dialogs'} element={<Dialogs dialogsPage={props.state.dialogsPage}
                                                           dispatch={props.dispatch}/>}/>
            </Routes>
        </div>
    );
}

function Profile(props: any) {

    const textRef: any = React.createRef()

    const onChange = () => {
        props.dispatch(updatePostTitleAC(textRef.current.value))
    }
    const onClick = () => {
        props.dispatch(addPostAC())
    }
    return (
        <div className="Main">
            <div>ava+description</div>
            <div>My posts</div>
            <div style={{display: 'flex'}}>
                <textarea ref={textRef}
                          value={props.profilePage.newPostTitle}
                          onChange={onChange}/>
                <button onClick={onClick}>add post</button>
            </div>
            {
                props.profilePage.posts.map((p: any) => <div key={p.id}>{p.title}</div>)
            }

        </div>
    );
}

function Dialogs(props: any) {
    const textRef: any = React.createRef()

    const onChange = () => {
        props.dispatch(updateMessageTitleAC(textRef.current.value))
    }
    const onClick = () => {
        props.dispatch(addMessageAC())
    }
    return (
        <div className="Main">
            <div style={{display: 'flex'}}>
                <textarea ref={textRef}
                          value={props.dialogsPage.newMessageTitle}
                          onChange={onChange}/>
                <button onClick={onClick}>add post</button>
            </div>
            {
                props.dialogsPage.messages.map((m: any) => <div key={m.id}>{m.title}</div>)
            }

        </div>
    );
}


