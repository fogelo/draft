import {
    ActionType,
    setCurrentPageAC,
    setTotalUsersCountAC,
    setUsersAC,
    toggleIsFetchingAC,
    UserType
} from '../redux/users-reducer';
import {RootState} from '../redux/redux-store';
import {connect} from 'react-redux';
import React from 'react';
import axios from 'axios';
import photo from '../img/user.png'
import {Preloader} from './common/Preloader';
import {NavLink} from 'react-router-dom';

type UsersPropsType = {
    users: UserType[]
    totalUsersCount: number
    usersCount: number
    currentPage: number
    isFetching: boolean

    setUsers: (users: UserType[]) => void
    setTotalUsersCount: (totalUsersCount: number) => void
    setCurrentPage: (currentPage: number) => void
    onPageChanged: (currentPage: number) => void
}

export class Users extends React.Component<UsersPropsType> {
    render() {
        const pagesCount = Array(Math.ceil(this.props.totalUsersCount / this.props.usersCount))
            .fill(0).map((e, i) => i + 1)

        if (this.props.isFetching){
            return <Preloader/>
        }
            return (
                <div className={'users'}>
                    <div>{this.props.totalUsersCount}</div>
                    {pagesCount.map(e => <span key={e}
                                               className={`page ${e === this.props.currentPage ? 'currentPage' : ''}`}
                                               onClick={() => this.props.onPageChanged(e)}
                    >
                    {e}
                </span>)}
                    {this.props.users.map(u => <div key={u.id} style={{margin: '10px 0px'}}>
                        <div>{u.name}</div>
                        <div>{u.id}</div>
                        <NavLink to={`/profile/${u.id}`}>
                            <div>
                                <img src={u.photos.small ? u.photos.small : photo} alt="1" style={{width: '50px'}}/>
                            </div>
                        </NavLink>
                        <div>{u.status}</div>
                    </div>)}
                </div>
            )
    }
}


type UsersAPIPropsType = {
    users: UserType[]
    totalUsersCount: number
    usersCount: number
    currentPage: number
    isFetching: boolean

    setUsers: (users: UserType[]) => void
    setTotalUsersCount: (totalUsersCount: number) => void
    setCurrentPage: (currentPage: number) => void
    toggleIsFetching: (isFetching: boolean) => void
}

export class UsersAPI extends React.Component<UsersAPIPropsType> {
    componentDidMount() {
        this.props.toggleIsFetching(true)
        axios.get('https://social-network.samuraijs.com/api/1.0/users', {
            withCredentials: true,
            headers: {
                'API-KEY': 'b1356b5e-074b-4608-a733-39db627817e8'
            }
        }).then(response => {
            this.props.setUsers(response.data.items)
            this.props.setTotalUsersCount(response.data.totalCount)
            this.props.toggleIsFetching(false)
        })
    }

    onPageChanged(currenPage: number) {
        this.props.toggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currenPage}&count=${this.props.usersCount}`, {
            withCredentials: true,
            headers: {
                'API-KEY': 'b1356b5e-074b-4608-a733-39db627817e8'
            }
        }).then(response => {
            this.props.setUsers(response.data.items)
            this.props.setTotalUsersCount(response.data.totalCount)
            this.props.setCurrentPage(currenPage)
            this.props.toggleIsFetching(false)
        })
    }

    render() {
        return <Users {...this.props} onPageChanged={this.onPageChanged.bind(this)}/>
    }
}


const mapStateToProps = (state: RootState) => {
    return {
        users: state.usersPage.users,
        totalUsersCount: state.usersPage.totalUsersCount,
        usersCount: state.usersPage.usersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching
    }
}
const mapDispatchToProps = (dispatch: (action: ActionType) => void) => {
    return {
        setUsers: (users: UserType[]) => dispatch(setUsersAC(users)),
        setTotalUsersCount: (totalUsersCount: number) => dispatch(setTotalUsersCountAC(totalUsersCount)),
        setCurrentPage: (currentPage: number) => dispatch(setCurrentPageAC(currentPage)),
        toggleIsFetching: (isFetching: boolean) => dispatch(toggleIsFetchingAC(isFetching))
    }
}
export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersAPI)