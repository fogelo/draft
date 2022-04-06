import {addPostAC, setUserProfileAC, updateNewPostTitleAC} from '../../redux/profile-reducer';
import React, {ChangeEvent, useEffect} from 'react';
import {connect} from 'react-redux';
import {v1} from 'uuid';
import axios from 'axios';
import photo from '../../img/user.png';
import {Preloader} from '../common/Preloader';
import {Navigate, useMatch, useNavigate} from 'react-router-dom';


const withRouter = (Component: any) => {
    const ComponentContainer = (props: any) => {
        const match = useMatch('/profile/:id')
        return <Component {...props} id={match ? match.params.id : '23196'}/>
    }
    return ComponentContainer
}

const mapStateToProps = (state: any) => {
    return {
        posts: state.profilePage.posts,
        newPostTitle: state.profilePage.newPostTitle,
        profile: state.profilePage.profile,
        login: state.auth.login
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
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${this.props.id}`)
            .then(response => {
                this.props.setUserProfile(response.data)
            })
    }

    render() {
        return <Profile {...this.props}/>
    }
}

const ProfileRouter = withRouter(ProfileAPI)

export const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileRouter)

export function Profile(props: any) {
    const onTitleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.updatePostTitle(e.currentTarget.value)
    }

    const onAddPostClick = () => {
        props.addPost()
    }

    // const navigate = useNavigate()
    // useEffect(() => {
    //     if (!props.login) navigate('/login')
    // }, [])

    if (!props.profile) {
        return <Preloader/>
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