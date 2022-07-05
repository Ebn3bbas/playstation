import React, { useContext } from 'react';
import { FormContext } from '../Form';
import styles from './Input.module.css';

const Input = ({ label, type = 'text', name }) => {
    const { form, handleFormChange } = useContext(FormContext);

    return (
        <div className={styles.inputContainer}>
            <label className={styles.lable}>{label}</label>
            <input
                className={styles.input}
                type={type}
                name={name}
                value={form[name]}
                onChange={handleFormChange}
            />
        </div>
    );
};

export default Input;
