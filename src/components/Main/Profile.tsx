import {
    addPostAC,
    setUserProfileAC,
    setUserStatusAC,
    updateNewPostTitleAC,
    updateStatusAC
} from '../../redux/profile-reducer';
import React, {ChangeEvent, useEffect} from 'react';
import {connect} from 'react-redux';
import {v1} from 'uuid';
import axios from 'axios';
import photo from '../../img/user.png';
import {Preloader} from '../common/Preloader';
import {Navigate, useMatch, useNavigate} from 'react-router-dom';
import {compose} from 'redux';


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
        login: state.auth.login,
        userStatus: state.profilePage.userStatus
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
        },
        setUserStatus: (userStatus: any) => {
            dispatch(setUserStatusAC(userStatus))
        },
        updateStatus: (status: any) => {
            dispatch(updateStatusAC(status))
        }
    }
}


class ProfileAPI extends React.Component<any> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${this.props.id}`, {
            withCredentials: true,
            headers: {
                'API-KEY': 'b1356b5e-074b-4608-a733-39db627817e8'
            }
        })
            .then(response => {
                console.log('setUserProfile')
                this.props.setUserProfile(response.data)
            })
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/status/${this.props.id}`, {
            withCredentials: true,
            headers: {
                'API-KEY': 'b1356b5e-074b-4608-a733-39db627817e8'
            }
        })
            .then(response => {
                console.log('setUserStatus')
                this.props.setUserStatus(response.data)
            })
    }

    render() {
        console.log('profileAPI')
        return <Profile {...this.props}/>
    }
}

//вот так без функции compose
const ProfileRouter = withRouter(ProfileAPI)
export const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileRouter)

//а вот так с функцией compose
// export const ProfileContainer = compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(ProfileAPI)

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
            <div>name: {props.profile.fullName}</div>
            <ProfileStatus userStatus={props.userStatus} updateStatus={props.updateStatus}/>
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

class ProfileStatus extends React.Component<any> {
    state = {
        status: this.props.userStatus,
        editMode: false
    }

    activateEditMode() {
        this.setState({
            editMode: true
        })
    }

    deActivateEditMode() {

        axios.put(`https://social-network.samuraijs.com/api/1.0/profile/status`, {status: this.state.status}, {
            withCredentials: true,
            headers: {
                'API-KEY': 'b1356b5e-074b-4608-a733-39db627817e8'
            }
        })
            .then(response => {
                if (response.data.resultCode === 0) {
                    this.props.updateStatus(this.state.status)
                    this.setState({
                        editMode: false
                    })
                }
            })
    }

    componentDidUpdate(prevProps: Readonly<any>) {
        if (this.props.userStatus !== prevProps.userStatus) {
            this.setState({status: this.props.userStatus})
        }
    }

    render() {
        console.log('ProfileStatus')
        console.log(this.props)
        // debugger
        return <div>
            {this.state.editMode
                ? <input type="text"
                         onBlur={this.deActivateEditMode.bind(this)}
                         value={this.state.status}
                         onChange={(e) => this.setState({status: e.currentTarget.value})}
                         autoFocus/>
                : <span onDoubleClick={this.activateEditMode.bind(this)}>status: {this.state.status}</span>}
        </div>
    }
}