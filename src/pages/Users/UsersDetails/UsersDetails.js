import React, { useEffect } from 'react';
import styles from './UsersDetails.module.css';
import profilePic from '../../../utils/images/profilePic.jpg';
import List from '../../../components/List/List';
import Image from '../../../components/Image/Image';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../../actions/users';
import { useParams } from 'react-router';
import BackButton from '../../../components/Buttons/BackButton/BackButton';
import Error from '../../../components/Error/Error';

const UsersDetails = ({ listName }) => {
    const dispatch = useDispatch();
    const params = useParams();

    const { user, error, loading } = useSelector((state) => state.getUser);

    useEffect(() => {
        dispatch(getUser(params.id));
    }, [dispatch, params]);
    const data = [
        { name: 'User ID', value: user?._id },
        { name: 'Name', value: user?.first_name + ' ' + user?.last_name },
        { name: 'Email', value: user?.email },
        { name: 'Role', value: user?.role },
        { name: 'Phone', value: user?.phone },
        { name: 'Gender', value: user?.gender },
        { name: 'Level', value: user?.level },
        { name: 'Country', value: user?.country },
        { name: 'Is Active', value: user?.isActive?.toString() },
        {
            name: 'Golds',
            value: user?.wallet?.golds,
        },
        {
            name: 'Beans',
            value: user?.wallet?.beans,
        },
        {
            name: 'Spends',
            value: user?.wallet?.spends,
        },
    ];

    return (
        <div className={styles.container}>
            <div className={styles.back}>
                <BackButton />
            </div>
            {error &&
                (Array.isArray(error) ? (
                    error.map((e) => <Error>{e.msg}</Error>)
                ) : (
                    <Error>{error}</Error>
                ))}
            <h3>User Details</h3>
            <div className={styles.detailsContainer}>
                <Image
                    className={styles.detailsImg}
                    img={profilePic}
                    alt='profilePic'
                />
                <List data={data} className={styles.detailsList} />
            </div>
        </div>
    );
};

export default UsersDetails;
