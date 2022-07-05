import React from 'react';
import Form from '../../components/Form/Form';
import Image from '../../components/Image/Image';
import styles from './Profile.module.css';
import profilePic from '../../utils/images/profilePic.jpg';
import Input from '../../components/Form/Input/Input';
import Select from '../../components/Form/Select/Select';
import Error from '../../components/Error/Error';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../actions/users';
import Success from '../../components/Success/Success';

const initialState = {
    username: undefined,
    password: undefined,
    phone: undefined,
};
const Profile = ({ isNew }) => {
    const dispatch = useDispatch();

    const { userInfo } = useSelector((state) => state.login);
    const submitHandler = (e, form) => {
        e.preventDefault();
        dispatch(updateUser(userInfo?.info?._id, form));
    };

    const { user, loading, success, error } = useSelector(
        (state) => state.updateUser
    );

    return (
        <div className={styles.detailsContainer}>
            <div className={styles.image}>
                <h3>Name</h3>
                <Image
                    className={styles.detailsImg}
                    img={profilePic}
                    alt='profilePic'
                />
            </div>
            <div className={styles.form}>
                {error &&
                    (Array.isArray(error) ? (
                        error.map((e) => <Error>{e.msg}</Error>)
                    ) : (
                        <Error>{error}</Error>
                    ))}
                {success && <Success>Profile updated successfully</Success>}
                <Form
                    initialState={initialState}
                    submitHandler={submitHandler}
                    formName='Your Info'
                    isNew={isNew}
                >
                    <Input label='Username' name='username' />
                    <Input label='Password' name='password' type='password' />
                    <Input label='Phone' name='phone' />
                </Form>
            </div>
        </div>
    );
};

export default Profile;
