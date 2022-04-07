import React from 'react';
import {authMeAC} from '../redux/auth-reducer';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {authAPI} from '../DAL/api';

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
        authAPI.getAuth()
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
