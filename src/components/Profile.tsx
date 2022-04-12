import React, {ChangeEvent} from 'react';
import {ActionType, PostType} from '../redux/store';
import {RootState} from '../redux/redux-store';
import {addPostAC, updateNewPostTitleAC} from '../redux/profile-reducer';
import {connect} from 'react-redux';

type ProfilePropsType = {
    newPostTitle: string
    posts: PostType[]
    updateNewPostTitle: (value: string) => void
    addPost: () => void
}
const Profile = (props: ProfilePropsType) => {
    const onPostTitleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.updateNewPostTitle(e.currentTarget.value)
    }
    return (
        <div className={'profile'}>
            <div>
                <textarea value={props.newPostTitle}
                          onChange={onPostTitleChange}
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
const mapStateToProps = (state: RootState) => {
    return {
        newPostTitle: state.profilePage.newPostTitle,
        posts: state.profilePage.posts
    }
}

const mapDispatchToProps = (dispatch: (action: ActionType) => void) => {
    return {
        updateNewPostTitle: (newPostTitle: string) => {
            dispatch(updateNewPostTitleAC(newPostTitle))
        },
        addPost: () => {
            dispatch(addPostAC())
        },
    }
}
export const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile)