import React from 'react';
import './App.css';
import {NavLink, Routes, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import {addPostAC, updatePostTitleAC} from './redux/profile-reducer';
import {addMessageAC, updateMessageTitleAC} from './redux/dialogs-reducer';
import {followAC, setUsersAC, unfollowAC} from './redux/users-reducer';
import photo from './img/user.png'

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
                <Route path={'/users'} element={<UsersContainer/>}/>
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


class Users extends React.Component<any> {
    componentDidMount() {
        if (this.props.users.length === 0) {
            axios.get('https://social-network.samuraijs.com/api/1.0/users')
                .then(response => {
                    console.log(response.data.items)
                    this.props.setUsers(response.data.items)
                })
        }
    }

    render() {
        return (
            <div>
                {this.props.users.map((u: any) => <div key={u.id}>
                    <div><img src={u.photos.small === null ? photo : u.photos.small} alt="1" style={{width: '40px'}}/>
                    </div>
                    <div>name: {u.name}</div>
                    <div>status: {u.status}</div>
                    {
                        u.followed
                            ? <button onClick={() => this.props.unfollow(u.id)}>follow</button>
                            : <button onClick={() => this.props.follow(u.id)}>unfollow</button>
                    }
                </div>)}
            </div>
        )
    }
}

function mapStateToProps3(state: any) {
    return {
        users: state.usersPage.users
    }
}

function mapDispatchToProps3(dispatch: any) {
    return {
        setUsers: (users: any) => {
            dispatch(setUsersAC(users))
        },
        follow: (userId: any) => {
            dispatch(followAC(userId))
        },
        unfollow: (userId: any) => {
            dispatch(unfollowAC(userId))
        },
    }


}

const UsersContainer = connect(mapStateToProps3, mapDispatchToProps3)(Users)