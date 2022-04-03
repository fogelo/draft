import React from 'react';

export function Profile() {

    return (
        <div className="Profile">
            <div>ava+description</div>
            <div>My posts</div>
            <div style={{display: 'flex'}}>
                <textarea/>
                <button>
                    add post
                </button>
            </div>
        </div>
    );
}