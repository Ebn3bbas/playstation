import React from 'react';
import { FaEdit } from 'react-icons/fa';
import styles from './EditButton.module.css';

const EditButton = ({ updateHandler }) => {
    return (
        <button className={styles.button} onClick={updateHandler}>
            <FaEdit color='#0088fe' />
        </button>
    );
};

export default EditButton;
