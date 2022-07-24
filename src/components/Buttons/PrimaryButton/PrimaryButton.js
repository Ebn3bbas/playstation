import React from 'react';
import styles from './PrimaryButton.module.css';

const PrimaryButton = ({ onClick, title }) => {
    return (
        <button className={styles.primaryBtn} onClick={onClick}>
            {title}
        </button>
    );
};

export default PrimaryButton;
