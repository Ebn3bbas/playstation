import React, { createContext, useState } from 'react';
import styles from './Form.module.css';

export const FormContext = createContext({
    form: {}, // data look in provider
});

const Form = ({ children, initialState, submitHandler, isNew, formName ,button }) => {
    const [form, setForm] = useState(initialState);

    const handleFormChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

    };

    return (
        <div className={styles.formContainer}>
            <h2>
                {isNew ? 'Create' : isNew === null ? '' : 'Update'} {formName}
            </h2>
            <FormContext.Provider value={{ form, handleFormChange }}>
                <form className={styles.form}>
                    {children}
                    <button
                        type='button'
                        onClick={(e) => submitHandler(e, form)}
                    >
                        {button}
                    </button>
                </form>
            </FormContext.Provider>
        </div>
    );
};

export default Form;
