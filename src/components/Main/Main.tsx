import React from 'react';
import {
    Routes,
    Route,
} from "react-router-dom";

export function Main() {

    return (
        <div className="Main">
            <Routes>
                <Route path={'/'} element={<Profile/>}/>
                <Route path={'/profile'} element={<Profile/>}/>
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

export function Users() {

    return (
        <div className="Users">
            Users
        </div>
    );
}

