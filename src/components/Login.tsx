import {RootState} from '../redux/redux-store';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {maxLength, requiredField} from '../utils/validators/validators';
import {Input} from './common/Forms/ControlForms';

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

const maxLength40 = maxLength(40)
const LoginForm = (props: any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Input} type="text" name="login" validate={[requiredField, maxLength40]}/>
            </div>
            <div>
                <Field component={Input} type="password" name="password" validate={[requiredField, maxLength40]}/>
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
