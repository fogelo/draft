import React from 'react';
import {RootState} from '../../redux/redux-store';
import {addPost, PostType, ProfileType, setUserProfile, updateNewPostTitle,} from '../../redux/profile-reducer';
import {connect} from 'react-redux';
import {MyPosts} from './MyPosts';
import axios from 'axios';
import {Preloader} from '../common/Preloader';
import {useMatch} from 'react-router-dom';
import photo from '../../img/user.png';
import {AuthDataType} from '../../redux/auth-reducer';
import ProfileStatus from './ProfileStatus';

type ProfilePropsType = {
    newPostTitle: string
    posts: PostType[]
    profile?: ProfileType
    auth: AuthDataType

    updateNewPostTitle: (value: string) => void
    addPost: () => void
}


const ProfileInfo = (props: ProfileType) => {
    console.log(props)
    return (
        <div className={'profile'}>
            <div>name: {props.fullName}</div>
            <div>id: {props.userId}</div>
            <div>
                <img src={props.photos.small ? props.photos.small : photo} alt="1" style={{width: '50px'}}/>
            </div>
            <div>about me: {props.aboutMe}</div>
            <ProfileStatus userId={props.userId}/>
        </div>
    )
}
const Profile = (props: ProfilePropsType) => {
    if (!props.profile) {
        return <Preloader/>
    }

    return (
        <div className={'profile'}>
            <ProfileInfo {...props.profile}/>
            <MyPosts newPostTitle={props.newPostTitle}
                     posts={props.posts}
                     updateNewPostTitle={props.updateNewPostTitle}
                     addPost={props.addPost}
            />
        </div>
    )
}


type ProfileAPIPropsType = ProfilePropsType & { setUserProfile: (profile: ProfileType) => void } & { userId?: string }


class ProfileAPI extends React.Component<ProfileAPIPropsType> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${this.props.userId}`, {
            withCredentials: true,
            headers: {
                'API-KEY': 'b1356b5e-074b-4608-a733-39db627817e8'
            }
        }).then(response => {
            this.props.setUserProfile(response.data)
        })
    }

    render() {
        return <Profile {...this.props}/>
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        newPostTitle: state.profilePage.newPostTitle,
        posts: state.profilePage.posts,
        profile: state.profilePage.profile,
        auth: state.auth
    }
}

const ProfileRouter = (props: ProfileAPIPropsType) => {
    const match = useMatch('/profile/:id');
    if (match) {
        return (
            <ProfileAPI {...props} userId={match.params.id}/>
        )
    } else {
        return (
            <ProfileAPI {...props} userId={'23196'}/>
        )
    }
}

export const ProfileContainer = connect(mapStateToProps, {updateNewPostTitle, addPost, setUserProfile})(ProfileRouter)

