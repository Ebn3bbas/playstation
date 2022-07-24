import React, { useEffect } from 'react';
import styles from './SessionsDetails.module.css';
import profilePic from '../../../utils/images/profilePic.jpg';
import List from '../../../components/List/List';
import Image from '../../../components/Image/Image';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { endSession, getSession } from '../../../actions/sessions';
import BackButton from '../../../components/Buttons/BackButton/BackButton';
import Error from '../../../components/Error/Error';
import PrimaryButton from '../../../components/Buttons/PrimaryButton/PrimaryButton';
import Success from '../../../components/Success/Success';

const RoomsDetails = () => {
    const dispatch = useDispatch();
    const params = useParams();

    const { session, error, loading } = useSelector(
        (state) => state.getSession
    );

    const {
        session: endedSession,
        error: endedSessionError,
        success: endedSessionSuccess,
        loading: endedSessionLoading,
    } = useSelector((state) => state.endSession);

    useEffect(() => {
        dispatch(getSession(params.id));
    }, [dispatch, params]);
    const data = [
        { name: 'Sessoin ID', value: session?.id },
        { name: 'Session ps', value: session?.playstation?.title },
        { name: 'Started At', value: session?.started_at?.substr(11, 8) },
        {
            name: 'Ended At',
            value: session?.ended_at?.substr(11, 8) || 'not ended yet',
        },
    ];

    if (session?.orders?.length > 0) {
        for (const o of session?.orders) {
            console.log(o);
            data.push({
                name: o?.product?.title,
                value: o.price,
            });
        }
        data.push({ name: 'Total Price', value: session?.total_price });
    } else {
        data.push({
            name: 'Orders',
            value: 'Empty',
        });
        data.push({ name: 'Total Price', value: session?.total_price });
    }

    const endSessionHandler = (e) => {
        e.preventDefault();
        dispatch(
            endSession({
                deviceId: session.playstation.id,
                sessionId: session.id,
            })
        );
    };

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
            <h3>Seesion Details</h3>
            {endedSessionSuccess && (
                <Success>Seesion ended successfully</Success>
            )}
            <div className={styles.detailsContainer}>
                <List data={data} className={styles.detailsList} />
            </div>
            <div
                style={{
                    width: '50px',
                    margin: 'auto',
                }}
                className={styles.end}
            >
                <PrimaryButton
                    onClick={endSessionHandler}
                    title={'End'}
                ></PrimaryButton>
            </div>
        </div>
    );
};

export default RoomsDetails;
