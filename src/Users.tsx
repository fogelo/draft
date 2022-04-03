import React from 'react';
import {connect} from 'react-redux';
import {followAC, setTotalUsersCountAC, setUsersAC, toggleCurrentPageAC, unfollowAC} from './redux/users-reducer';
import axios from 'axios';

class Users extends React.Component<any> {
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
                this.props.toggleCurrentPage(currentPage)
            })
    }

    render() {
        console.log(this.props.totalUsersCount)
        const usersCount = 5
        const pagesCount = Array(Math.ceil((this.props.totalUsersCount / usersCount)))
            .fill(0)
            .map((e, i) => i + 1)
        return (
            <div className="Users">
                {pagesCount.map((p, i) => <span key={i}
                                                onClick={() => this.onPageChanged(p)}
                                                className={this.props.currentPage === p ? 'currentPage' : ''}>{p}</span>)}
                {this.props.users.map((u: any) => {
                    return (
                        <div key={u.id} style={{padding: '10px 0'}}>
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
        toggleCurrentPage: (currentPage: any) => {
            dispatch(toggleCurrentPageAC(currentPage))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)