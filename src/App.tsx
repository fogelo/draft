import React from 'react';
import './App.css';
import {NavLink, Routes, Route} from 'react-router-dom';


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
            <NavLink to={'/profile'}><Profile/></NavLink>
            <NavLink to={'/users'}><Users/></NavLink>
        </div>
    )
}
const Content = (props: any) => {
    return (
        <div className={'content'}>
            <Routes>
                <Route path={'/'} element={<Profile/>}/>
                <Route path={'/profile'} element={<Profile/>}/>
                <Route path={'/users'} element={<Users/>}/>
            </Routes>
        </div>
    )
}
const Profile = (props: any) => {
    return (
        <div className={'profile'}>
            profile
        </div>
    )
}
const Users = (props: any) => {
    return (
        <div className={'users'}>
            users
        </div>
    )
}

