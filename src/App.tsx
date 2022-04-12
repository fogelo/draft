import React from 'react';
import './App.css';
import {NavLink, Route, Routes} from 'react-router-dom';
import {StoreContext} from './index';
import {ProfileContainer} from './components/Profile';
import {RootState} from './redux/redux-store';
import {ActionType, setUsersAC, UserType} from './redux/users-reducer';
import axios from 'axios';
import {connect} from 'react-redux';


export const App = (props: any) => {
    return (
        <div className="App">
            <Header/>
            <div className={'main'}>
                <Menu/>
                <Content/>
            </div>
        </div>
    );

}

const Header = (props: any) => {
    return (
        <div className={'header'}>
            Header
        </div>
    )
}
const Menu = (props: any) => {
    return (
        <div className={'menu'}>
            <div><NavLink to={'/profile'}>profile</NavLink></div>
            <div><NavLink to={'/users'}>users</NavLink></div>
        </div>
    )
}

type UsersPropsType = {
    users: UserType[]
    setUsers: (users: UserType[]) => void
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
        })
    }

    render() {
        return (
            <div className={'users'}>
                {this.props.users.map(u => <div key={u.id}>
                    {u.name}
                </div>)}
            </div>
        )
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        users: state.usersPage.users
    }
}

const mapDispatchToProps = (dispatch: (action: ActionType) => void) => {
    return {
        setUsers: (users: UserType[]) => dispatch(setUsersAC(users))
    }
}

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)

function Content(props: any) {
    return (
        <div className={'content'}>
            <Routes>
                <Route path={'/'} element={<ProfileContainer/>}/>
                <Route path={'/profile'} element={<ProfileContainer/>}/>
                <Route path={'/users'} element={<UsersContainer/>}/>
            </Routes>
        </div>
    )
}