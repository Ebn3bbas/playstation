import React, { useContext } from 'react';
import styles from './Select.module.css';
import { FormContext } from '../Form';

const Select = ({ label, name, options }) => {
    const { form, handleFormChange } = useContext(FormContext);
    console.log(form[name]);
    return (
        <div className={styles.inputContainer}>
            <label className={styles.lable}>{label}</label>
            <select
                className={styles.select}
                name={name}
                onChange={handleFormChange}
                value={form[name]}
            >
                <option>--select {name}</option>
                {options.map((o, idx) => (
                    <option key={idx}>{`${o}`}</option>
                ))}
            </select>
        </div>
    );
};

export default Select;
