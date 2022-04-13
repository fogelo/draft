import {RootState} from '../redux/redux-store';
import {connect} from 'react-redux';

const Login = (props: any) => {
    return (
        <div>
            Login
        </div>
    )
}

const mapStateToProps = (state: RootState) => {
    return {
        auth: state.auth
    }
}

export const LoginContainer = connect(mapStateToProps, {
})(Login)
