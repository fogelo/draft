import React from 'react';
import {connect} from 'react-redux';
import {
    followAC,
    setIsFetchingAC,
    setTotalUsersCountAC,
    setUsersAC,
    toggleCurrentPageAC, toggleFollowingInProgressAC,
    unfollowAC
} from './redux/users-reducer';
import axios from 'axios';
import {Preloader} from './common/Preloader';
import {NavLink} from 'react-router-dom';
import {usersAPI} from './api/api';

class Users extends React.Component<any> {
    componentDidMount() {
        this.props.setIsFetching(true)
        usersAPI.getUsers(this.props.usersCount, this.props.currentPage)
            .then(response => {
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(response.data.totalCount)
                this.props.setIsFetching(false)
            })
    }

    onPageChanged(currentPage: any) {
        this.props.setIsFetching(true)
        usersAPI.getUsers(this.props.usersCount, currentPage)
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
                                ? <button disabled={this.props.followingInProgress.some((id: any) => id === u.id)}
                                          onClick={() => {
                                              this.props.toggleFollowingInProgress(u.id)
                                              axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
                                                  withCredentials: true,
                                                  headers: {
                                                      'API-KEY': 'e1a10142-bc6b-4db7-85fc-aa063d946841'
                                                  }
                                              })
                                                  .then((response: any) => {
                                                      if (response.data.resultCode === 0) {
                                                          this.props.unfollow(u.id)
                                                          this.props.toggleFollowingInProgress(u.id)
                                                      }
                                                  })
                                          }}>unfollow</button>
                                : <button disabled={this.props.followingInProgress.some((id: any) => id === u.id)}
                                          onClick={() => {
                                    this.props.toggleFollowingInProgress(u.id)
                                    axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
                                        withCredentials: true,
                                        headers: {
                                            'API-KEY': 'e1a10142-bc6b-4db7-85fc-aa063d946841'
                                        }
                                    })
                                        .then(response => {
                                            if (response.data.resultCode === 0) {
                                                this.props.follow(u.id)
                                                this.props.toggleFollowingInProgress(u.id)
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
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
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
        },
        toggleFollowingInProgress: (id: any) => {
            dispatch(toggleFollowingInProgressAC(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)