import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { addRoom, updateRoom } from '../../../actions/rooms';
import BackButton from '../../../components/Buttons/BackButton/BackButton';
import Error from '../../../components/Error/Error';
import Form from '../../../components/Form/Form';
import Input from '../../../components/Form/Input/Input';
import Select from '../../../components/Form/Select/Select';
import Success from '../../../components/Success/Success';
import { ADD_ROOM_RESET, UPDATE_ROOM_RESET } from '../../../constants/rooms';
import styles from './SessionsForm.module.css';

const initialState = {
    room_name: undefined,
    announcement: undefined,
    room_BG: undefined,
    room_avatar: undefined,
    room_admins: undefined,
    room_members: undefined,
    room_generas: undefined,
    private: undefined,
    room_password: undefined,
};

const SessionsForm = ({ isNew }) => {
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();

    const submitHandler = (e, form) => {
        e.preventDefault();
        if (isNew) {
            dispatch(addRoom(form));
        } else {
            dispatch(updateRoom(params.id, form));
        }
    };

    const { room, loading, success, error } = useSelector((state) => {
        if (isNew) {
            return state.addRoom;
        } else {
            return state.updateRoom;
        }
    });

    useEffect(() => {
        if (success) {
            setTimeout(() => {
                dispatch({ type: isNew ? ADD_ROOM_RESET : UPDATE_ROOM_RESET });
                navigate('/sessions');
            }, 600);
        }
    }, [success, navigate, dispatch, isNew]);
    return (
        <>
            <div className={styles.back}>
                <BackButton />
            </div>
            <div className={styles.RoomsFormContainer}>
                {error &&
                    (Array.isArray(error) ? (
                        error.map((e) => <Error>{e.msg}</Error>)
                    ) : (
                        <Error>{error}</Error>
                    ))}
                {success && (
                    <Success>
                        {isNew
                            ? 'Room created successfully'
                            : 'Room updated successfully'}
                    </Success>
                )}
                <Form
                    initialState={initialState}
                    submitHandler={submitHandler}
                    isNew={isNew}
                    formName='Session'
                    button={"Start"}
                >
                    <Input label='Name' name='room_name' />
                    <Input label='Device' name='device' />
                    <Select
                        label='Type'
                        name='type'
                        options={["single", "Multi"]}
                    />

                    {!isNew && (
                        <>
                            <Select
                                label='Room Admins'
                                name='room_admins'
                                options={['1', '2', '3']}
                            />
                            <Select
                                label='Room Members'
                                name='room_members'
                                options={['1', '2', '3']}
                            />
                            <Select
                                label='Room_Generas'
                                name='room_generas'
                                options={['1', '2', '3']}
                            />
                        </>
                    )}
                </Form>
            </div>
        </>
    );
};

export default SessionsForm;
