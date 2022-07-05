import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { addRoom, updateRoom } from '../../../actions/rooms';
import { addUser, updateUser } from '../../../actions/users';
import BackButton from '../../../components/Buttons/BackButton/BackButton';
import Error from '../../../components/Error/Error';
import Form from '../../../components/Form/Form';
import Input from '../../../components/Form/Input/Input';
import Select from '../../../components/Form/Select/Select';
import Success from '../../../components/Success/Success';
import { ADD_USER_RESET, UPDATE_USER_RESET } from '../../../constants/users';
import styles from './UsersForm.module.css';

const initialState = {
    first_name: undefined,
    last_name: undefined,
    email: undefined,
    password: undefined,
    age: undefined,
    country: undefined,
    phone: undefined,
    gender: undefined,
    role: undefined,
};
const UsersForm = ({ isNew }) => {
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();

    const submitHandler = (e, form) => {
        e.preventDefault();
        if (isNew) {
            dispatch(addUser(form));
        } else {
            dispatch(updateUser(params.id, form));
        }
    };

    const { user, loading, success, error } = useSelector((state) => {
        if (isNew) {
            return state.addUser;
        } else {
            return state.updateUser;
        }
    });

    useEffect(() => {
        if (success) {
            setTimeout(() => {
                dispatch({ type: isNew ? ADD_USER_RESET : UPDATE_USER_RESET });
                navigate('/users');
            }, 600);
        }
    }, [success, navigate, dispatch, isNew]);

    return (
        <>
            <div className={styles.back}>
                <BackButton />
            </div>
            <div className={styles.UsersFormContainer}>
                {error &&
                    (Array.isArray(error) ? (
                        error.map((e) => <Error>{e.msg}</Error>)
                    ) : (
                        <Error>{error}</Error>
                    ))}
                {success && (
                    <Success>
                        {isNew
                            ? 'User created successfully'
                            : 'User updated successfully'}
                    </Success>
                )}
                <Form
                    initialState={initialState}
                    submitHandler={submitHandler}
                    isNew={isNew}
                    formName='User'
                    button={"Submit"}
                >
                    <Input label='First Name' name='first_name' />
                    <Input label='Last Name' name='last_name' />
                    <Input label='Email' name='email' type='email' />
                    <Input label='Password' name='password' type='password' />
                    <Input label='Age' name='age' />
                    <Input label='Country' name='country' />
                    <Select
                        label='Gender'
                        name='gender'
                        options={['Male', 'Female', 'Other']}
                    />
                    <Input label='Phone' name='phone' />
                    <Select
                        label='Role'
                        name='role'
                        options={['user', 'admin', 'reseller']}
                    />
                </Form>
            </div>
        </>
    );
};

export default UsersForm;
