import React from 'react';
import { useNavigate } from 'react-router';
import DeleteButton from '../../components/Buttons/DeleteButton/DeleteButton';
import EditButton from '../../components/Buttons/EditButton/EditButton';
import Table from '../../components/Table/Table';
import styles from './Settings.module.css';

const Settings = () => {
    const navigate = useNavigate();
    const updateHandler = () => {
        navigate('/settings-update-form');
    };
    const deleteHandler = () => {
        console.log('data deleted');
    };
    const columns = ['Username', 'Phone', 'Role', 'edit', 'delete'];
    const data = [
        {
            s: 'sdf',
            a: 'sdf',
            ad: 'sdsa',
            edit: <EditButton updateHandler={updateHandler} />,
            delete: <DeleteButton deleteHandler={deleteHandler} />,
        },
        {
            s: 'sdf',
            a: 'sdf',
            ad: 'sdsa',
            edit: <EditButton updateHandler={updateHandler} />,
            delete: <DeleteButton deleteHandler={deleteHandler} />,
        },
        {
            s: 'sdf',
            a: 'sdf',
            ad: 'sdsa',
            edit: <EditButton updateHandler={updateHandler} />,
            delete: <DeleteButton deleteHandler={deleteHandler} />,
        },
        {
            s: 'sdf',
            a: 'sdf',
            ad: 'sdsa',
            edit: <EditButton updateHandler={updateHandler} />,
            delete: <DeleteButton deleteHandler={deleteHandler} />,
        },
        {
            s: 'sdf',
            a: 'sdf',
            ad: 'sdsa',
            edit: <EditButton updateHandler={updateHandler} />,
            delete: <DeleteButton deleteHandler={deleteHandler} />,
        },
    ];

    return (
        <div className={styles.sessionsContainer}>
            <div className={styles.sessionsTable}>
                <Table data={data} columns={columns} tableName='Settings' />
            </div>
        </div>
    );
};

export default Settings;
