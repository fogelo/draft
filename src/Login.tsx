import React from "react";
import {useFormik} from "formik";

const LoginForm = () => {
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
        onSubmit: values => {
            alert(JSON.stringify(values));
        },
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="firstName">First Name</label>
            <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
            />
            <label htmlFor="lastName">Last Name</label>
            <input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
            />
            <label htmlFor="email">Email Address</label>
            <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                onChange={formik.handleChange}
                checked={formik.values.rememberMe}
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default LoginForm;