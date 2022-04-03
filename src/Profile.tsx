import React from 'react';
import {connect} from 'react-redux';
import {addNewPostAC, setNewPostTitleAC} from './redux/profile-reducer';

function Profile(props: any) {
    const textRef: any = React.createRef()
    const updatePostTitle = () => {
        props.setNewPostTitle(textRef.current.value)
    }
    const addPost = () => {
        props.addNewPost()
    }
    return (
        <div className="Profile">
            <div>ava+description</div>
            <div style={{display: 'flex'}}>
                <textarea value={props.newPostTitle}
                          onChange={updatePostTitle}
                          ref={textRef}/>
                <button onClick={addPost}>
                    add post
                </button>
            </div>
            <h2>My posts</h2>
            {props.posts.map((p: any) => <div>{p.title}</div>)}
        </div>
    );
}


const mapStateToProps = (state: any) => {
    return {
        newPostTitle: state.profilePage.newPostTitle,
        posts: state.profilePage.posts
    }
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        setNewPostTitle: (title: any) => {
            dispatch(setNewPostTitleAC(title))
        },
        addNewPost: () => {
            dispatch(addNewPostAC())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile)