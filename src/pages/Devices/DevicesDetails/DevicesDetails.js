import React, { useEffect } from 'react';
import styles from './DevicesDetails.module.css';
import profilePic from '../../../utils/images/profilePic.jpg';
import List from '../../../components/List/List';
import Image from '../../../components/Image/Image';
import BackButton from '../../../components/Buttons/BackButton/BackButton';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getAgency } from '../../../actions/agency';
import Error from '../../../components/Error/Error';

const DevicesDetails = ({ listName }) => {
    const dispatch = useDispatch();
    const params = useParams();

    const { agency, error, loading } = useSelector((state) => state.getAgency);

    useEffect(() => {
        dispatch(getAgency(params.id));
    }, [dispatch, params]);
    const data = [
        { name: 'Agency ID', value: agency?._id },
        { name: 'Name', value: agency?.name },
        { name: 'Created At', value: agency?.createdAt?.substr(0, 10) },
        { name: 'Total Balance', value: agency?.total_balance?.current_value },
        {
            name: 'Total Balance Exp Date',
            value: agency?.total_balance?.expire_date?.substr(0, 10),
        },
        {
            name: 'Golds',
            value: agency?.wallet?.golds,
        },
        {
            name: 'Beans',
            value: agency?.wallet?.beans,
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
            <h3>Agency Details</h3>
            <div className={styles.detailsContainer}>
                <Image
                    className={styles.detailsImg}
                    img={agency?.avatar}
                    alt='profilePic'
                />
                <List data={data} className={styles.detailsList} />
            </div>
        </div>
    );
};

export default DevicesDetails;
