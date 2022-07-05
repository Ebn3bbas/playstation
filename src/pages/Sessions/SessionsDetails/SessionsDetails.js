import React, { useEffect } from 'react';
import styles from './SessionsDetails.module.css';
import profilePic from '../../../utils/images/profilePic.jpg';
import List from '../../../components/List/List';
import Image from '../../../components/Image/Image';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getRoom } from '../../../actions/rooms';
import BackButton from '../../../components/Buttons/BackButton/BackButton';
import Error from '../../../components/Error/Error';

const RoomsDetails = () => {
    const dispatch = useDispatch();
    const params = useParams();

    const { room, error, loading } = useSelector((state) => state.getRoom);

    useEffect(() => {
        dispatch(getRoom(params.id));
    }, [dispatch, params]);
    const data = [
        { name: 'Room ID', value: room?.room_id },
        { name: 'Room Name', value: room?.room_name },
        { name: 'Announcement', value: room?.announcement },
        { name: 'Private', value: room?.private.toString() },
        {
            name: 'Owner',
            value:
                room?.room_owner.first_name + ' ' + room?.room_owner.last_name,
        },
        {
            name: 'Members',
            value: room?.room_members.map((m) => (
                <h5>{m.first_name + ' ' + m.last_name}</h5>
            )),
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
            <h3>Room Details</h3>
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

export default RoomsDetails;
