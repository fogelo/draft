import React from 'react';
import {connect} from 'react-redux';
import {
    followAC,
    setIsFetchingAC,
    setTotalUsersCountAC,
    setUsersAC,
    toggleCurrentPageAC,
    unfollowAC
} from './redux/users-reducer';
import axios from 'axios';
import {Preloader} from './common/Preloader';
import {NavLink} from 'react-router-dom';

class Users extends React.Component<any> {
    componentDidMount() {
        this.props.setIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=1&count=${this.props.usersCount}`)
            .then(response => {
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(response.data.totalCount)
                this.props.setIsFetching(false)
            })
    }

    onPageChanged(currentPage: any) {
        this.props.setIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${this.props.usersCount}`)
            .then(response => {
                this.props.setUsers(response.data.items)
                this.props.toggleCurrentPage(currentPage)
                this.props.setIsFetching(false)
            })
    }

    render() {
        const pagesCount = Array(Math.ceil((this.props.totalUsersCount / this.props.usersCount)))
            .fill(0)
            .map((e, i) => i + 1)
        return (
            <div className="Users">
                {this.props.isFetching ? <Preloader/> : ''}
                {pagesCount.map((p, i) => <span key={i}
                                                onClick={() => this.onPageChanged(p)}
                                                className={this.props.currentPage === p ? 'currentPage' : ''}>{p}</span>)}
                {this.props.users.map((u: any) => {
                    return (
                        <div key={u.id} style={{padding: '10px 0'}}>
                            <div>name: {u.name}</div>
                            <NavLink to={`/profile/${u.id}`}>
                                <div>photo: <img src={u.photos.small} alt="нет фото"/></div>
                            </NavLink>
                            <div>status: {u.status ? u.status : 'нет статуса'}</div>
                            {u.followed
                                ? <button onClick={() => {
                                    axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
                                        withCredentials: true,
                                        headers: {
                                            'API-KEY': 'e1a10142-bc6b-4db7-85fc-aa063d946841'
                                        }
                                    })
                                        .then((response: any) => {
                                            if (response.data.resultCode === 0) {
                                                this.props.unfollow(u.id)
                                            }
                                        })
                                }}>unfollow</button>
                                : <button onClick={() => {
                                    axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
                                        withCredentials: true,
                                        headers: {
                                            'API-KEY': 'e1a10142-bc6b-4db7-85fc-aa063d946841'
                                        }
                                    })
                                        .then(response => {
                                            if (response.data.resultCode === 0) {
                                                this.props.follow(u.id)
                                            }
                                        })
                                }}>follow</button>
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
        users: state.usersPage.users,
        totalUsersCount: state.usersPage.totalUsersCount,
        usersCount: state.usersPage.usersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching

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
        toggleCurrentPage: (currentPage: any) => {
            dispatch(toggleCurrentPageAC(currentPage))
        },
        setIsFetching: (isFetching: any) => {
            dispatch(setIsFetchingAC(isFetching))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)