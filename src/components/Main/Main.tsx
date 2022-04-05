import React, {ChangeEvent} from 'react';
import {
    Routes,
    Route,
} from 'react-router-dom';
import {v1} from 'uuid';
import {addPostAC, updateNewPostTitleAC} from '../redux/profile-reducer';
import {StoreContext} from '../../index';

export function Main(props: any) {
    return (
        <div className="Main">
            <Routes>
                <Route path={'/'} element={<ProfileContainer/>}/>
                <Route path={'/profile'} element={<ProfileContainer/>}
                />
                <Route path={'/users'} element={<Users/>}/>
            </Routes>
        </div>
    );
}


function ProfileContainer(props: any) {

    return <StoreContext.Consumer>
        {
            (store: any) => {
                const posts = store.getState().profilePage.posts
                const newPostTitle = store.getState().profilePage.newPostTitle
                const dispatch = store.dispatch

                return <Profile posts={posts}
                                newPostTitle={newPostTitle}
                                dispatch={dispatch}
                />
            }
        }
    </StoreContext.Consumer>
}


export function Profile(props: any) {

    const onTitleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.dispatch(updateNewPostTitleAC(e.currentTarget.value))
    }

    const onAddPostClick = () => {
        props.dispatch(addPostAC())
    }
    return (
        <div className="Profile">
            <div style={{display: 'flex'}}>
        <textarea value={props.newPostTitle}
                  onChange={onTitleChange}/>
                <button onClick={onAddPostClick}>add post</button>
            </div>
            {props.posts.map((p: any) => <div key={v1()}>{p.title}</div>)}
        </div>
    );
}

export function Users() {

    return (
        <div className="Users">
            Users
        </div>
    );
}

