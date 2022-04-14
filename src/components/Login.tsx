import {RootState} from '../redux/redux-store';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {maxLength, requiredField} from '../utils/validators/validators';
import {Input} from './common/Forms/ControlForms';
import axios from 'axios';

const Login = (props: any) => {
    const submit = (formData: any) => {
        console.log(formData)
        axios.post(`https://social-network.samuraijs.com/api/1.0/auth/login`,{email: formData.login,
            password: formData.password, rememberMe:formData.rememberMe}, {
            withCredentials: true,
            headers: {
                'API-KEY': 'b1356b5e-074b-4608-a733-39db627817e8'
            }
        }).then(response => {
            console.log(response)
        })
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
                <Field component={Input} type="text" name="login" validate={[requiredField]}/>
            </div>
            <div>
                <Field component={Input} type="password" name="password" validate={[requiredField]}/>
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
