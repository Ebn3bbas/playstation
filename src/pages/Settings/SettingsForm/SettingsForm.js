import React from 'react';
import BackButton from '../../../components/Buttons/BackButton/BackButton';
import Form from '../../../components/Form/Form';
import Input from '../../../components/Form/Input/Input';
import Select from '../../../components/Form/Select/Select';
import styles from './SettingsForm.module.css';

const SettingsForm = ({ isNew }) => {
    const initialState = {
        username: undefined,
        password: undefined,
        phone: undefined,
        role: undefined,
    };

    const submitHandler = (e, form) => {
        e.preventDefault();
        console.log(form);
    };

    return (
        <>
            <div className={styles.back}>
                <BackButton />
            </div>
            <div className={styles.SettingsFormContainer}>
                <Form
                    initialState={initialState}
                    submitHandler={submitHandler}
                    isNew={isNew}
                    formName='Setting'
                >
                    <Input label='Username' name='username' />
                    <Input label='Password' name='password' type='password' />
                    <Input label='Phone' name='phone' />
                    <Select
                        label='Role'
                        name='role'
                        options={['1', '2', '3']}
                    />
                </Form>
            </div>
        </>
    );
};

export default SettingsForm;
