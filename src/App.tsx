import React from 'react';
import './App.css';
import {NavLink, Routes, Route} from 'react-router-dom';
import {addMessageAC, addPostAC, updateMessageTitleAC, updatePostTitleAC} from './redux/store';
import {StoreContext} from './index';

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

function ProfileContainer() {
    return <StoreContext.Consumer>
        {
            (store: any) => {
                const state = store.getState()
                const updatePostTitle = (text: any) => {
                    store.dispatch(updatePostTitleAC(text))
                }
                const addPost = () => {
                    store.dispatch(addPostAC())
                }
                return <Profile updatePostTitle={updatePostTitle}
                                addPost={addPost}
                                posts={state.profilePage.posts}
                                newPostTitle={state.profilePage.newPostTitle}/>

            }
        }

    </StoreContext.Consumer>
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
    )
}

function DialogsContainer(props: any) {

    return <StoreContext.Consumer>
        {
            (store: any) => {
                const state = store.getState()
                const updateMessageTitle = (text: any) => {
                    store.dispatch(updateMessageTitleAC(text))
                }
                const addMessage = () => {
                    store.dispatch(addMessageAC())
                }
                return <Dialogs updateMessageTitle={updateMessageTitle}
                                addMessage={addMessage}
                                messages={state.dialogsPage.messages}
                                newMessageTitle={state.dialogsPage.newMessageTitle}/>
            }
        }
    </StoreContext.Consumer>
}

