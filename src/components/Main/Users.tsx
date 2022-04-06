import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import photo from '../../img/user.png'
import axios from 'axios';
import {
    followAC,
    setCurrentPageAC,
    setIsLoadingAC,
    setTotalUsersCountAC,
    setUsersAC,
    unfollowAC
} from '../../redux/users-reducer';
import {Preloader} from '../common/Preloader';
import {NavLink, useNavigate} from 'react-router-dom';

const mapStateToProps = (state: any) => {
    return {
        users: state.usersPage.users,
        totalUsersCount: state.usersPage.totalUsersCount,
        usersCount: state.usersPage.usersCount,
        currentPage: state.usersPage.currentPage,
        isLoading: state.usersPage.isLoading,
        login: state.auth.login
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
        },
        setIsLoading: (isLoading: any) => {
            dispatch(setIsLoadingAC(isLoading))
        }
    }
}


export class UsersAPI extends React.Component<any> {
    componentDidMount() {
        this.props.setIsLoading(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=1&count=${this.props.usersCount}`)
            .then(response => {
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(response.data.totalCount)
                this.props.setIsLoading(false)
            })
    }

    onPageChanged(currentPage: any) {
        this.props.setIsLoading(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${this.props.usersCount}`)
            .then(response => {
                this.props.setUsers(response.data.items)
                this.props.setCurrentPage(currentPage)
                this.props.setIsLoading(false)
            })
    }

    render() {
        return <Users {...this.props} onPageChanged={this.onPageChanged.bind(this)}/>
    }
}

const Users = (props: any) => {
    console.log('render users')
    const pagesCount = Math.ceil(props.totalUsersCount / props.usersCount)
    const pages = Array(pagesCount).fill(0).map((e, i) => i + 1)

    const navigate = useNavigate()
    useEffect(() => {
        if (!props.login) navigate('/login')
    }, [])

    return (
        <div className="Users">
            {props.isLoading ? <Preloader/> : ''}
            {pages.map(i => <span key={i} className={`page ${props.currentPage === i ? 'currentPage' : ''}`}
                                  onClick={() => props.onPageChanged(i)}>{i}</span>)}

            {props.users.map((u: any) => <div key={u.id} style={{margin: '10px 0'}}>
                <div>{u.name}</div>
                <div>{u.id}</div>
                <div>
                    <NavLink to={`/profile/${u.id}`}>
                        {u.photos.small
                            ? <img src={u.photos.small} alt="user" style={{width: '100px'}}/>
                            : <img src={photo} alt="user" style={{width: '100px'}}/>}
                    </NavLink>
                </div>
                <div>
                    {u.followed
                        ? <button onClick={() => {
                            props.unfollow(u.id)
                        }
                        }>unfollow</button>
                        : <button onClick={() => {
                            props.follow(u.id)
                        }}>follow</button>}
                </div>
            </div>)}
        </div>
    );
}

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersAPI)
