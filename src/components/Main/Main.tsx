import React, {ChangeEvent} from 'react';
import {
    Routes,
    Route,
} from 'react-router-dom';

export function Main(props: any) {
    return (
        <div className="Main">
            <Routes>
                <Route path={'/'} element={<Profile/>}/>
                <Route path={'/profile'} element={<Profile posts={props.state.profilePage.posts}
                                                           newPostTitle={props.state.profilePage.newPostTitle}
                                                           updateNewPostTitle={props.updateNewPostTitle}/>}/>
                <Route path={'/users'} element={<Users/>}/>
            </Routes>
        </div>
    );
}

export function Profile(props: any) {

    const onTitleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.updateNewPostTitle(e.currentTarget.value)
    }

    return (
        <div className="Profile">
            <div style={{display: 'flex'}}>
                <textarea value={props.newPostTitle}
                          onChange={onTitleChange}/>
                <button>add post</button>
            </div>
            {props.posts.map((p: any) => <div key={p.title}>{p.title}</div>)}
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

