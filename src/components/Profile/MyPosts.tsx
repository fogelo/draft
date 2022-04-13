import React, {ChangeEvent} from 'react';
import {PostType} from '../../redux/profile-reducer';

type MyPostsPropsType = {
    newPostTitle: string
    posts: PostType[]
    updateNewPostTitle: (value: string) => void
    addPost: () => void

}
export const MyPosts = (props: MyPostsPropsType) => {
    const onPostTitleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.updateNewPostTitle(e.currentTarget.value)
    }
    return (
        <div>
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