import React from 'react';
import {authMeAC} from '../redux/auth-reducer';
import {connect} from 'react-redux';
import axios from 'axios';
import {NavLink} from 'react-router-dom';

function Header(props: any) {

    return (
        <div className="Header">
            <div>Logo</div>
            <div>
                {props.auth.login
                    ? props.auth.login
                    : <NavLink to={'/login'}>login</NavLink>}
            </div>
        </div>
    );
}


class HeaderAPI extends React.Component<any, any> {
    componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.0/auth/me', {withCredentials: true})
            .then(response => {
                this.props.authMe(response.data.data)
            })
    }

    render() {
        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state: any) => {
    return {
        auth: state.auth
    }
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        authMe: (authData: any) => {
            dispatch(authMeAC(authData))
        }
    }
}

export const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(HeaderAPI)
