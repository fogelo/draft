import React from 'react';
import {connect} from 'react-redux';
import photo from '../../img/user.png'
import axios from 'axios';
import {followAC, setUsersAC, unfollowAC} from '../redux/users-reducer';

const mapStateToProps = (state: any) => {
    return {
        users: state.usersPage.users
    }
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        setUsers: (users: any) => {
            dispatch(setUsersAC(users))
        },
        follow: (userId: any) => {
            dispatch(followAC(userId))
        },
        unfollow: (userId: any) => {
            dispatch(unfollowAC(userId))
        }
    }
}


export class Users extends React.Component<any> {
    componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.0/users')
            .then(response => {
                this.props.setUsers(response.data.items)
            })
    }

    render() {
        console.log('render users')
        return (
            <div className="Users">
                {this.props.users.map((u: any) => <div key={u.id} style={{margin: '10px 0'}}>
                    <div>{u.name}</div>
                    <div>{u.photos.small || <img src={photo} alt="user" style={{width: '100px'}}/>}</div>
                    <div>
                        {u.followed
                            ? <button onClick={() => {

                                this.props.unfollow(u.id)

                            }
                            }>unfollow</button>
                            : <button onClick={() => {
                                this.props.follow(u.id)

                            }}>follow</button>}
                    </div>
                </div>)}
            </div>
        );
    }
}

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)
