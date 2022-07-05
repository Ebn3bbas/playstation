import React from 'react';
import styles from './Success.module.css';

const Success = ({ children }) => {
    return (
        <div className={styles.success}>
            <p>{children}</p>
        </div>
    );
};

export default Success;
