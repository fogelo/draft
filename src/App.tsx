import React, {ChangeEvent} from 'react';
import './App.css';
import {NavLink, Routes, Route} from 'react-router-dom';
import {StoreContext} from './index';
import {addPostAC, updateNewPostTitleAC} from './redux/profile-reducer';
import {PostType} from './redux/store';


export const App = (props: any) => {
    return (
        <div className="App">
            <Header/>
            <div className={'main'}>
                <Menu/>
                <Content/>
            </div>
        </div>
    );

}

const Header = (props: any) => {
    return (
        <div className={'header'}>
            Header
        </div>
    )
}
const Menu = (props: any) => {
    return (
        <div className={'menu'}>
            <div><NavLink to={'/profile'}>profile</NavLink></div>
            <div><NavLink to={'/users'}>users</NavLink></div>
        </div>
    )
}
const Content = (props: any) => {
    return (
        <div className={'content'}>
            <Routes>
                <Route path={'/'} element={<ProfileContainer/>}/>
                <Route path={'/profile'} element={<ProfileContainer/>}/>
                <Route path={'/users'} element={<Users/>}/>
            </Routes>
        </div>
    )
}
const ProfileContainer = (props: any) => {
    return (
        <StoreContext.Consumer>
            {
                (store) => {
                    const state = store.getState()
                    const {posts, newPostTitle} = state.profilePage
                    const {dispatch} = store
                    const onPostTitleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
                        dispatch.bind(store)(updateNewPostTitleAC(e.currentTarget.value))
                    }
                    const addPost = () => {
                        dispatch.bind(store)(addPostAC())
                    }

                    return (
                        <Profile newPostTitle={newPostTitle}
                                 onPostTitleChange={onPostTitleChange}
                                 addPost={addPost}
                                 posts={posts}
                        />
                    )
                }
            }
        </StoreContext.Consumer>
    )
}


type ProfilePropsType = {
    newPostTitle: string
    posts: PostType[]
    onPostTitleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
    addPost: () => void
}

const Profile = (props: ProfilePropsType) => {
    return (
        <div className={'profile'}>
            <div>
                <textarea value={props.newPostTitle}
                          onChange={props.onPostTitleChange}
                />
            </div>
            <div>
                <button onClick={props.addPost}>add post</button>
            </div>
            {
                props.posts.map(p => <div key={p.id}>
                    {p.title}
                </div>)
            }
        </div>
    )
}


const Users = (props: any) => {
    return (
        <div className={'users'}>
            users
        </div>
    )
}

