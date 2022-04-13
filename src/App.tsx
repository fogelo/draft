import React from 'react';
import './App.css';
import {NavLink, Route, Routes} from 'react-router-dom';
import {ProfileContainer} from './components/Profile/Profile';
import {UsersContainer} from './components/Users';
import axios from 'axios';
import {RootState} from './redux/redux-store';
import {connect} from 'react-redux';
import {AuthDataType, setAuthData} from './redux/auth-reducer';
import {LoginContainer} from './components/Login';


type AppPropsType = {
    auth: AuthDataType
    setAuthData: (authData: AuthDataType) => void
}

class App extends React.Component<AppPropsType> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true,
            headers: {
                'API-KEY': 'b1356b5e-074b-4608-a733-39db627817e8'
            }
        }).then(response => {
            this.props.setAuthData(response.data.data)
        })
    }

    render() {
        return (
            <div className="App">
                <Header login={this.props.auth.login}/>
                <div className={'main'}>
                    <Menu/>
                    <Content/>
                </div>
            </div>
        );

    }
}

const mapStateToProps = (state: RootState) => {
    return {
        auth: state.auth
    }
}

export const AppContainer = connect(mapStateToProps, {
    setAuthData
})(App)


const Header = (props: any) => {
    return (
        <div className={'header'} style={{display: 'flex', justifyContent: 'space-between'}}>
            <div>header</div>
            <div>{props.login ? props.login : 'login'}</div>
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

function Content(props: any) {
    return (
        <div className={'content'}>
            <Routes>
                <Route path={'/'} element={<ProfileContainer/>}/>
                <Route path={'/profile'} element={<ProfileContainer/>}/>
                <Route path={'/profile/:id'} element={<ProfileContainer/>}/>
                <Route path={'/users'} element={<UsersContainer/>}/>
                <Route path={'/login'} element={<LoginContainer/>}/>
            </Routes>
        </div>
    )
}