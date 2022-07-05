import React from 'react';
import { useNavigate } from 'react-router';
import styles from './BackButton.module.css';

const BackButton = () => {
    const navigate = useNavigate();
    const goBackHandler = () => {
        navigate(-1);
    };
    return (
        <button className={styles.backBtn} onClick={goBackHandler}>
            Go Back
        </button>
    );
};

export default BackButton;
