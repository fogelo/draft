import React from 'react';
import './App.css';
import {NavLink, Route, Routes} from 'react-router-dom';
import {ProfileContainer} from './components/Profile';
import {UsersContainer} from './components/Users';


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