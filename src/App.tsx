import React from 'react';
import './App.css';
import {NavLink, Route, Routes} from 'react-router-dom';
import Profile from './Profile';
import Users from './Users';
import Header from './Header';


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
                <Route path={'/profile/:id'} element={<Profile/>}/>
                <Route path={'/dialogs'} element={<Dialogs/>}/>
                <Route path={'/users'} element={<Users/>}/>
                <Route path={'/login'} element={<div>login</div>}/>
            </Routes>
        </div>
    );
}

export function Dialogs() {

    return (
        <div className="Dialogs">
            <div style={{display: 'flex'}}>
                <textarea/>
                <button>
                    add post
                </button>
            </div>
        </div>
    );
}


