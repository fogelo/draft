import React from 'react';
import {PostType} from '../../redux/profile-reducer';
import {Field, reduxForm} from 'redux-form';

type MyPostsPropsType = {
    posts: PostType[]
    addPost: (newPostTitle: string) => void

}
export const MyPosts = (props: MyPostsPropsType) => {
    const addPost = (formData: any) => {
        props.addPost(formData.myPostTextarea)
    }
    return (
        <div>
            <MyPostsReduxForm onSubmit={addPost}/>
            {
                props.posts.map(p => <div key={p.id}>
                    {p.title}
                </div>)
            }
        </div>
    )
}

const MyPostsForm = (props: any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={'textarea'} name={'myPostTextarea'}/>
            </div>
            <div>
                <button>add post</button>
            </div>
        </form>
    )
}
const MyPostsReduxForm = reduxForm({
    form: 'myPostsForm'
})(MyPostsForm)