import React from 'react';
import './App.css';
import {Main} from './components/Main/Main';
import {NavLink} from 'react-router-dom';

export class App extends React.Component<any> {
    render() {
        console.log('app')
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

