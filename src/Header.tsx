import React from 'react';
import {connect} from 'react-redux';
import {authMeAC} from './redux/auth-reducer';
import axios from 'axios';
import {NavLink} from 'react-router-dom';

class Header extends React.Component<any> {
    componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.0/auth/me', {withCredentials: true})
            .then(response => {
                this.props.authMe(response.data.data)
            })
    }

    render() {
        return (
            <div className="Header" style={{display: 'flex', justifyContent: 'space-between'}}>
                <div>logo</div>
                {this.props.auth.login
                    ? <div>{this.props.auth.login}</div>
                    : <NavLink to={'login'}>login</NavLink>}
            </div>
        );
    }
}


const mapStateToProps = (state: any) => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        authMe: (auth: any) => {
            dispatch(authMeAC(auth))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)