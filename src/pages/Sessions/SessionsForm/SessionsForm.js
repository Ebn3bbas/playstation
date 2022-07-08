import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { addRoom, updateRoom } from '../../../actions/sessions';
import BackButton from '../../../components/Buttons/BackButton/BackButton';
import Error from '../../../components/Error/Error';
import Form from '../../../components/Form/Form';
import Input from '../../../components/Form/Input/Input';
import Select from '../../../components/Form/Select/Select';
import Success from '../../../components/Success/Success';
import { ADD_SESSION_RESET, UPDATE_SESSION_RESET } from '../../../constants/sessions';
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
                dispatch({ type: isNew ? ADD_SESSION_RESET : UPDATE_SESSION_RESET });
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
                    {isNew && (
                    <>
                    <Input label='Name' name='room_name' />
                    <Input label='Hours' name='hours' />
                    </>       )}
                    <Select
                        label='Device'
                        name='device'
                        options={[]}//not active Devices
                        mult={false}
                    />
                    <Select
                        label='Type'
                        name='type'
                        options={["Single", "Multi"]}
                        mult={false}
                    />
                    
                    
                    {!isNew && (
                        <>
                            <Input label='Added Hours' name='added_hours' />

                            <Select
                                label='Drinks'
                                name='drinks'
                                options={[]}//All drinks
                                mult={true}
                            />
                            
                        </>
                    )}
                </Form>
            </div>
        </>
    );
};

export default SessionsForm;
