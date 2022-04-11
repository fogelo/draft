import React from 'react';
import './App.css';


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
            Menu
        </div>
    )
}
const Content = (props: any) => {
    return (
        <div className={'content'}>
            Main
        </div>
    )
}

