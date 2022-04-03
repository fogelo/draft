import React from 'react';
import {connect} from 'react-redux';
import {followAC, setUsersAC, unfollowAC} from './redux/users-reducer';
import axios from 'axios';

class Users extends React.Component<any> {
    componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.0/users/')
            .then(response => {
                this.props.setUsers(response.data.items)
            })
    }

    render() {
        return (
            <div className="Users">
                {this.props.users.map((u: any) => {
                    return (
                        <div style={{padding: '10px 0'}}>
                            <div>name: {u.name}</div>
                            <div>photo: <img src={u.photos.small} alt="нет фото"/></div>
                            <div>status: {u.status ? u.status : 'нет статуса'}</div>
                            {u.followed
                                ? <button onClick={() => this.props.unfollow(u.id)}>unfollow</button>
                                : <button onClick={() => this.props.follow(u.id)}>follow</button>
                            }
                        </div>
                    )
                })}
            </div>
        );
    }
}


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

export default connect(mapStateToProps, mapDispatchToProps)(Users)