import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { login } from '../../actions/users';
import Error from '../../components/Error/Error';
import Form from '../../components/Form/Form';
import Input from '../../components/Form/Input/Input';
import styles from './Login.module.css';

const Login = ({ isNew }) => {
    const initialState = {
        username: undefined,
        password: undefined,
    };
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, userInfo } = useSelector((state) => state.login);

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, userInfo, redirect]);

    const submitHandler = (e, form) => {
        e.preventDefault();
        dispatch(login(form));
    };

    return (
        <div className={styles.LoginContainer}>
            {error &&
                (Array.isArray(error) ? (
                    error.map((e) => <Error>{e.msg}</Error>)
                ) : (
                    <Error>{error}</Error>
                ))}
            {loading ? (
                <p>loading...</p>
            ) : (
                <>
                    <Form
                        initialState={initialState}
                        submitHandler={submitHandler}
                        isNew={isNew}
                        formName='Login'
                        button={'Login'}
                    >
                        <Input label='User Name' name='username' />
                        <Input
                            label='Password'
                            name='password'
                            type='password'
                        />
                        <p>
                            don't have account? <a href='/register'>register</a>
                        </p>
                    </Form>
                </>
            )}
        </div>
    );
};

export default Login;
