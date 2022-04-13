import React from 'react';
import {RootState} from '../../redux/redux-store';
import {
    addPost, PostType,
    ProfileType, setUserProfile, updateNewPostTitle,
} from '../../redux/profile-reducer';
import {connect} from 'react-redux';
import {MyPosts} from './MyPosts';
import axios from 'axios';
import {Preloader} from '../common/Preloader';

type ProfilePropsType = {
    newPostTitle: string
    posts: PostType[]
    profile?: ProfileType

    updateNewPostTitle: (value: string) => void
    addPost: () => void
}

const ProfileInfo = (props: ProfileType) => {
    return (
        <div className={'profile'}>
            <div>{props.fullName}</div>
            <div>{props.userId}</div>
            <div><img src={props.photos.small} alt="1"/></div>
            <div>{props.aboutMe}</div>
        </div>
    )
}
const Profile = (props: ProfilePropsType) => {
    if(!props.profile){
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


type ProfileAPIPropsType = ProfilePropsType & { setUserProfile: (profile: ProfileType) => void }


class ProfileAPI extends React.Component<ProfileAPIPropsType> {
    componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.0/profile/2', {
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
        profile: state.profilePage.profile
    }
}

export const ProfileContainer = connect(mapStateToProps, {updateNewPostTitle, addPost, setUserProfile})(ProfileAPI)