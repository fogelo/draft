import {RootState} from '../redux/redux-store';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';

const Login = (props: any) => {
    const submit = (formData: any) => {
        console.log(formData)
    }
    return (
        <div>
            <LoginReduxForm onSubmit={submit}/>
        </div>
    )
}
const LoginForm = (props: any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={'input'} type="text" name="login"/>
            </div>
            <div>
                <Field component={'input'} type="password" name="password"/>
            </div>
            <div>
                remember me <Field component={'input'} type="checkbox" name={'rememberMe'}/>
            </div>
            <button type="submit">login</button>
        </form>
    )
}


const LoginReduxForm = reduxForm({
    // a unique name for the form
    form: 'loginForm'
})(LoginForm)


const mapStateToProps = (state: RootState) => {
    return {
        auth: state.auth
    }
}

export const LoginContainer = connect(mapStateToProps, {})(Login)
