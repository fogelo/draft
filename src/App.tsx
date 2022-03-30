import React from 'react';
import './App.css';
import {NavLink, Routes, Route} from 'react-router-dom';
import {addMessageAC, addPostAC, updateMessageTitleAC, updatePostTitleAC} from './redux/store';
import {StoreContext} from './index';
import {connect} from 'react-redux';

export function App() {
    return (
        <div className="App">
            <Header/>
            <div className={'content'}>
                <Menu/>
                <Main/>
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

function Main() {
    return (
        <div className="Main">
            <Routes>
                <Route path={'/profile'} element={<ProfileContainer/>}/>
                <Route path={'/dialogs'} element={<DialogsContainer/>}/>
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

function mapStateToProps(state: any) {
    return {
        newPostTitle: state.profilePage.newPostTitle,
        posts: state.profilePage.posts
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        updatePostTitle: (text: any) => {
            dispatch(updatePostTitleAC(text))
        },
        addPost: () => {
            dispatch(addPostAC())
        }
    }
}

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile)

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
    )
}

function mapStateToProps2(state: any) {
    return {
        newMessageTitle: state.dialogsPage.newMessageTitle,
        messages: state.dialogsPage.messages
    }
}

function mapDispatchToProps2(dispatch: any) {
    return {
        updateMessageTitle: (text: any) => {
            dispatch(updateMessageTitleAC(text))
        },
        addMessage: () => {
            dispatch(addMessageAC())
        }
    }
}

const DialogsContainer = connect(mapStateToProps2, mapDispatchToProps2)(Dialogs)

