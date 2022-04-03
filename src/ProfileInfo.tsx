import React from 'react';
import photo from './img/user.png'

export const ProfileInfo = (props: any) => {
    return (

        props.profile ? <div>

            <div>fullName: {props.profile.fullName}</div>
            <div>
                <img src={props.profile.photos.small ? props.profile.photos.small : photo}
                     alt="111"
                style={{width: '100px'}}/>
            </div>
            <div>about me: {props.profile.aboutMe}</div>

        </div> : <div></div>

    )
}