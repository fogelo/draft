import {ActionType, setTotalUsersCountAC, setUsersAC, UserType} from '../redux/users-reducer';
import {RootState} from '../redux/redux-store';
import {connect} from 'react-redux';
import React from 'react';
import axios from 'axios';
import photo from '../img/user.png'

type UsersPropsType = {
    users: UserType[]
    totalUsersCount: number
    setUsers: (users: UserType[]) => void
    setTotalUsersCount: (totalUsersCount: number) => void
}

export class Users extends React.Component<UsersPropsType> {
    componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.0/users', {
            withCredentials: true,
            headers: {
                'API-KEY': 'b1356b5e-074b-4608-a733-39db627817e8'
            }
        }).then(response => {
            this.props.setUsers(response.data.items)
            this.props.setTotalUsersCount(response.data.totalCount)
        })
    }

    render() {

        return (
            <div className={'users'}>
                {this.props.totalUsersCount}
                {this.props.users.map(u => <div key={u.id} style={{margin: '10px 0px'}}>
                    <div>{u.name}</div>
                    <div>{u.id}</div>
                    <div><img src={u.photos.small ? u.photos.small : photo} alt="1" style={{width: '50px'}}/></div>
                    <div>{u.status}</div>
                </div>)}
            </div>
        )
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        users: state.usersPage.users,
        totalUsersCount: state.usersPage.totalUsersCount
    }
}
const mapDispatchToProps = (dispatch: (action: ActionType) => void) => {
    return {
        setUsers: (users: UserType[]) => dispatch(setUsersAC(users)),
        setTotalUsersCount: (totalUsersCount: number) => dispatch(setTotalUsersCountAC(totalUsersCount))
    }
}
export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)