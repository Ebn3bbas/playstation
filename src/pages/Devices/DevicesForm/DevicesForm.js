import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { addAgency, updateAgency } from '../../../actions/device';
import BackButton from '../../../components/Buttons/BackButton/BackButton';
import Error from '../../../components/Error/Error';
import Form from '../../../components/Form/Form';
import Input from '../../../components/Form/Input/Input';
import Select from '../../../components/Form/Select/Select';
import Success from '../../../components/Success/Success';
import {
    ADD_DEVICE_RESET,
    UPDATE_DEVICE_RESET,
} from '../../../constants/device';
import styles from './DevicesForm.module.css';

const initialState = {
    name: undefined,
    description: undefined,
    avatar: undefined,
};
const DevicesForm = ({ isNew }) => {
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();

    const submitHandler = (e, form) => {
        e.preventDefault();
        if (isNew) {
            dispatch(addAgency(form));
        } else {
            dispatch(updateAgency(params.id, form));
        }
    };

    const { agency, loading, success, error } = useSelector((state) => {
        if (isNew) {
            return state.addAgency;
        } else {
            return state.updateAgency;
        }
    });

    useEffect(() => {
        if (success) {
            setTimeout(() => {
                dispatch({
                    type: isNew ? ADD_DEVICE_RESET : UPDATE_DEVICE_RESET,
                });
                navigate('/devices');
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
                            ? 'Devices created successfully'
                            : 'Devices updated successfully'}
                    </Success>
                )}
                <Form
                    initialState={initialState}
                    submitHandler={submitHandler}
                    isNew={isNew}
                    formName='Devices'
                    button={"Add"}
                >
                    <Input label='Name' name='name' />
                    <Select
                        label='Type'
                        name='type'
                        options={['ps3', 'ps4', 'ps5']}
                        mult={false}
                    />
                    
                </Form>
            </div>
        </>
    );
};

export default DevicesForm;
