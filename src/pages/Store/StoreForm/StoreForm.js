import React from 'react';
import { useState } from 'react';
import BackButton from '../../../components/Buttons/BackButton/BackButton';
import Form from '../../../components/Form/Form';
import Input from '../../../components/Form/Input/Input';
import style from '../../../components/Form/Input/Input.module.css';
import styles from './StoreForm.module.css';

const StoreForm = ({ isNew }) => {
   const [initialState, setInitialState] = useState({
       name: undefined,
        price: undefined,
     });

    const submitHandler = (e, form) => {
        e.preventDefault();
        console.log(form);
        
    };
    let num = Number(prompt("How many item you will add")) 
    let items = new Array(num).fill(0)
    return (
        <>
            <div className={styles.back}>
                <BackButton />
            </div>
            <div className={styles.StoreFormContainer}>
            <table>
                 <Form
                    initialState={initialState}
                    submitHandler={submitHandler}
                    isNew={isNew}
                    formName='Store'
                    button={"Add"}
                >
                    {items.map(() => (<tr>
                        <td><input placeholder='Enter the name' name='name' className={style.input} /></td>
                        <td><input placeholder='Enter the price' type='number' name='price' className={style.input} /></td>
                    </tr>) ) } 
                </Form> 
            </table>
                
            </div>
        </>
    );
};

export default StoreForm;
