import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import styles from './DeleteButton.module.css';

const DeleteButton = ({ deleteHandler }) => {
    return (
        <button className={styles.button} onClick={deleteHandler}>
            <FaTrashAlt color='red' />
        </button>
    );
};

export default DeleteButton;
