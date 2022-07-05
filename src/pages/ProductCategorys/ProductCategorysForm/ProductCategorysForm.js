import React from 'react';
import BackButton from '../../../components/Buttons/BackButton/BackButton';
import Form from '../../../components/Form/Form';
import Input from '../../../components/Form/Input/Input';
import styles from './ProductCategorysForm.module.css';

const ProductCategorysForm = ({ isNew }) => {
    const initialState = {
        name: undefined,
        avatar: undefined,
    };

    const submitHandler = (e, form) => {
        e.preventDefault();
        console.log(form);
    };

    return (
        <>
            <div className={styles.back}>
                <BackButton />
            </div>
            <div className={styles.ProductCategorysFormContainer}>
                <Form
                    initialState={initialState}
                    submitHandler={submitHandler}
                    isNew={isNew}
                    formName='Product Category'
                >
                    <Input label='Name' name='name' />
                    <Input label='Avatar' name='avatar' type='file' />
                </Form>
            </div>
        </>
    );
};

export default ProductCategorysForm;
