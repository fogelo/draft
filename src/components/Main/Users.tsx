import React from 'react';
import {connect} from 'react-redux';

const mapStateToProps = (state: any) => {
    return {
        users: state.usersPage.users
    }
}
const mapDispatchToProps = (dispatch: any) => {
    return {}
}


export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)

export function Users(props: any) {

    return (
        <div className="Users">
            {props.users.map((u: any) => <div key={u.id}>
                <div>{u.name}</div>
            </div>)}
        </div>
    );
}

