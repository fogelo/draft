import React from 'react';
import {connect} from 'react-redux';
import photo from '../../img/user.png'
import axios from 'axios';
import {followAC, setCurrentPageAC, setTotalUsersCountAC, setUsersAC, unfollowAC} from '../redux/users-reducer';

const mapStateToProps = (state: any) => {
    return {
        users: state.usersPage.users,
        totalUsersCount: state.usersPage.totalUsersCount,
        usersCount: state.usersPage.usersCount,
        currentPage: state.usersPage.currentPage
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
        },
        setTotalUsersCount: (totalUsersCount: any) => {
            dispatch(setTotalUsersCountAC(totalUsersCount))
        },
        setCurrentPage: (currentPage: any) => {
            dispatch(setCurrentPageAC(currentPage))
        }
    }
}


export class Users extends React.Component<any> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=1&count=${this.props.usersCount}`)
            .then(response => {
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(response.data.totalCount)
            })
    }

    onPageChanged(currentPage: any) {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${this.props.usersCount}`)
            .then(response => {
                this.props.setUsers(response.data.items)
                this.props.setCurrentPage(currentPage)
            })
    }

    render() {
        console.log('render users')
        const pagesCount = Math.ceil(this.props.totalUsersCount / this.props.usersCount)
        const pages = Array(pagesCount).fill(0).map((e, i) => i + 1)
        return (
            <div className="Users">
                {pages.map(i => <span className={`page ${this.props.currentPage === i ? 'currentPage' : ''}`}
                                      onClick={() => this.onPageChanged(i)}>{i}</span>)}

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
