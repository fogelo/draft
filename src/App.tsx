import React from 'react';
import './App.css';
import {NavLink, Routes, Route} from 'react-router-dom';


export function App() {

    return (
        <div className="App">
            <Header/>
            <div className={'content'}>
                <Menu/>
                <Main/>
            </div>
        </div>
    );
}

export function Header() {

    return (
        <div className="Header">
            header
        </div>
    );
}

export function Menu() {

    return (
        <div className="Menu">
            <div><NavLink to={'/profile'}>profile</NavLink></div>
            <div><NavLink to={'/dialogs'}>dialogs</NavLink></div>
            <div><NavLink to={'/users'}>users</NavLink></div>
        </div>
    );
}

export function Main() {

    return (
        <div className="Main">
            <Routes>
                <Route path={'/profile'} element={<Profile/>}/>
                <Route path={'/dialogs'} element={<Dialogs/>}/>
                <Route path={'/users'} element={<Users/>}/>
            </Routes>
        </div>
    );
}

export function Profile() {

    return (
        <div className="Profile">
            Profile
        </div>
    );
}

export function Dialogs() {

    return (
        <div className="Dialogs">
            Dialogs
        </div>
    );
}

export function Users() {

    return (
        <div className="Users">
            Users
        </div>
    );
}


