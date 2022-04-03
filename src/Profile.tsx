import React from 'react';
import {connect} from 'react-redux';
import {addNewPostAC, setNewPostTitleAC, setProfileAC} from './redux/profile-reducer';
import {ProfileInfo} from './ProfileInfo';
import axios from 'axios';
import {useMatch} from 'react-router-dom';


const ProfileHOC = (props: any) => {
    const match: any = useMatch('profile/:id')
    console.log(match)
    if (match) {
        return <Profile {...props} userId={match.params.id}/>
    } else {
        return <Profile {...props} userId={'2'}/>
    }
}

class Profile extends React.Component<any> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${this.props.userId}`)
            .then(response => {
                this.props.setProfile(response.data)
            })
    }

    render() {
        const textRef: any = React.createRef()
        const updatePostTitle = () => {
            this.props.setNewPostTitle(textRef.current.value)
        }
        const addPost = () => {
            this.props.addNewPost()
        }
        return (
            <div className="Profile">
                <ProfileInfo profile={this.props.profile}/>
                <div style={{display: 'flex'}}>
                <textarea value={this.props.newPostTitle}
                          onChange={updatePostTitle}
                          ref={textRef}/>
                    <button onClick={addPost}>
                        add post
                    </button>
                </div>
                <h2>My posts</h2>
                {this.props.posts.map((p: any) => <div>{p.title}</div>)}
            </div>
        );
    }
}


const mapStateToProps = (state: any) => {
    return {
        newPostTitle: state.profilePage.newPostTitle,
        posts: state.profilePage.posts,
        profile: state.profilePage.profile
    }
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        setNewPostTitle: (title: any) => {
            dispatch(setNewPostTitleAC(title))
        },
        addNewPost: () => {
            dispatch(addNewPostAC())
        },
        setProfile: (profile: any) => {
            dispatch(setProfileAC(profile))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileHOC)

