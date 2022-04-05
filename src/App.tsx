import React from 'react';
import './App.css';
import {Main} from './components/Main/Main';
import {NavLink} from 'react-router-dom';

export function App(props: any) {

    return (
        <div className="App">
            <Header/>
            <div className={'content'}>
                <Menu/>
                <Main {...props}/>
            </div>
        </div>
    );
}

export function Header() {

    return (
        <div className="Header">
            Header
        </div>
    );
}

export function Menu() {

    return (
        <div className="Menu">
            <div>
                <NavLink to={'profile'}>profile</NavLink>
            </div>
            <div>
                <NavLink to={'users'}>users</NavLink>
            </div>
        </div>
    );
}

