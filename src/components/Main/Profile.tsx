import {addPostAC, setUserProfileAC, updateNewPostTitleAC} from '../redux/profile-reducer';
import React, {ChangeEvent} from 'react';
import {connect} from 'react-redux';
import {v1} from 'uuid';
import axios from 'axios';
import photo from '../../img/user.png';

const mapStateToProps = (state: any) => {
    return {
        posts: state.profilePage.posts,
        newPostTitle: state.profilePage.newPostTitle,
        profile: state.profilePage.profile
    }
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        updatePostTitle: (newPostTile: any) => {
            dispatch(updateNewPostTitleAC(newPostTile))
        },
        addPost: () => {
            dispatch(addPostAC())
        },
        setUserProfile: (profile: any) => {
            dispatch(setUserProfileAC(profile))
        }
    }
}

class ProfileAPI extends React.Component<any> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
            .then(response => {
                console.log(response)
                this.props.setUserProfile(response.data)
            })
    }

    render() {
        return <Profile {...this.props}/>
    }
}

export const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileAPI)

export function Profile(props: any) {

    const onTitleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.updatePostTitle(e.currentTarget.value)
    }

    const onAddPostClick = () => {
        props.addPost()
    }
    return (
        <div className="Profile">
            <div>{props.profile.fullName}</div>
            <div>id: {props.profile.userId}</div>
            <div>
                {props.profile.photos.small
                    ? <img src={props.profile.photos.small} alt="1"/>
                    : <img src={photo} alt="user" style={{width: '100px'}}/>}
            </div>
            <div>about me: {props.profile.aboutMe}</div>
            <div style={{display: 'flex'}}>
                <textarea value={props.newPostTitle} onChange={onTitleChange}/>
                <button onClick={onAddPostClick}>add post</button>
            </div>
            {props.posts.map((p: any) => <div key={v1()}>{p.title}</div>)}
        </div>
    );
}