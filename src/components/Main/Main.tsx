import React, {ChangeEvent} from 'react';
import {Route, Routes,} from 'react-router-dom';
import {v1} from 'uuid';
import {addPostAC, updateNewPostTitleAC} from '../redux/profile-reducer';
import {StoreContext} from '../../index';
import {Users} from './Users';

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


const connect = (mapStateToProps: any, mapDispatchToProps: any) => {
    return (Component: any) => {
        const ContainerComponent = () => {
            return <StoreContext.Consumer>
                {
                    (store: any) => {
                        const state = store.getState()
                        const dispatch = store.dispatch
                        const date = {...mapStateToProps(state), ...mapDispatchToProps(dispatch)}
                        return <Component {...date}/>
                    }
                }
            </StoreContext.Consumer>
        }
        return ContainerComponent
    }
}


const mapStateToProps = (state: any) => {
    return {
        posts: state.profilePage.posts,
        newPostTitle: state.profilePage.newPostTitle

    }
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        updatePostTitle: (newPostTile: any) => {
            dispatch(updateNewPostTitleAC(newPostTile))
        },
        addPost: () => {
            dispatch(addPostAC())
        }
    }
}

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile)


export function Profile(props: any) {

    const onTitleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.updatePostTitle(e.currentTarget.value)
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

