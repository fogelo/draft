import React, {ChangeEvent} from 'react';
import {
    Routes,
    Route,
} from 'react-router-dom';
import {v1} from 'uuid';

export function Main(props: any) {
    return (
        <div className="Main">
            <Routes>
                <Route path={'/'} element={<Profile/>}/>
                <Route path={'/profile'} element={<Profile posts={props.state.profilePage.posts}
                                                           newPostTitle={props.state.profilePage.newPostTitle}
                                                           updateNewPostTitle={props.updateNewPostTitle}
                                                           addPost={props.addPost}/>}
                />
                <Route path={'/users'} element={<Users/>}/>
            </Routes>
        </div>
    );
}

export function Profile(props: any) {

    const onTitleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.updateNewPostTitle(e.currentTarget.value)
    }

    const onAddPostClick = () => {
        props.addPost()
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

