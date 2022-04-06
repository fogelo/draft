import React from 'react';
import {Route, Routes,} from 'react-router-dom';
import {UsersContainer} from './Users';
import {ProfileContainer} from './Profile';

export function Main(props: any) {
    return (
        <div className="Main">
            <Routes>
                <Route path={'/'} element={<ProfileContainer/>}/>
                <Route path={'/profile/*'} element={<ProfileContainer/>}
                />
                <Route path={'/users'} element={<UsersContainer/>}/>
            </Routes>
        </div>
    );
}


