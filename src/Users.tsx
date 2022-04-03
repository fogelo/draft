import React from 'react';
import {connect} from 'react-redux';
import {setUsersAC} from './redux/users-reducer';
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)