import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { addOrders, getSession } from '../../../actions/sessions';
import { getAllStores } from '../../../actions/store';
import BackButton from '../../../components/Buttons/BackButton/BackButton';
import formStyles from '../../../components/Form/Form.module.css';
import style from '../../../components/Form/Input/Input.module.css';
import Success from '../../../components/Success/Success';
import styles from './AddOrders.module.css';

const AddOrders = () => {
    const [formValues, setFormValues] = useState([{ name: '', price: '' }]);

    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();

    console.log(params);

    const { stores } = useSelector((state) => state.allStores);
    const { session } = useSelector((state) => state.getSession);

    const {
        session: addedOrders,
        success,
        error,
    } = useSelector((state) => state.addSessionOrders);

    useEffect(() => {
        dispatch(getSession(params.id));
        dispatch(getAllStores(null, null, 'True'));
    }, [dispatch, params]);

    useEffect(() => {
        if (success) {
            setTimeout(() => {
                navigate('/sessions');
            }, 600);
        }
    }, [success, navigate, dispatch]);

    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
    };

    let addFormFields = () => {
        setFormValues([...formValues, { name: '', price: '' }]);
    };

    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues);
    };

    let handleSubmit = (event) => {
        event.preventDefault();
        formValues.forEach((v) => {
            const product = stores.find((s) => s.title === v.title);
            dispatch(
                addOrders({
                    productId: product.id,
                    sessionId: params.id,
                })
            );
        });
    };

    console.log(session);

    return (
        <>
            <div className={styles.back}>
                <BackButton />
            </div>
            <div className={styles.AddOrdersContainer}>
                <form
                    className={formStyles.formContainer}
                    onSubmit={handleSubmit}
                >
                    <table>
                        <h2>Add Orders</h2>
                        {success && (
                            <Success>Orders added successfully</Success>
                        )}
                        {formValues.map((element, index) => (
                            <tr key={index}>
                                <td>
                                    <label className={styles.lable}>
                                        Enter name
                                    </label>
                                    <select
                                        className={styles.select}
                                        name='title'
                                        onChange={(e) => handleChange(index, e)}
                                        value={element.title || ''}
                                    >
                                        <option>--select order</option>
                                        {stores?.length > 0 &&
                                            stores?.map((o, idx) => (
                                                <option
                                                    key={idx}
                                                >{`${o.title}`}</option>
                                            ))}
                                    </select>
                                </td>
                                {index ? (
                                    <td>
                                        <button
                                            type='button'
                                            onClick={() =>
                                                removeFormFields(index)
                                            }
                                        >
                                            X
                                        </button>
                                    </td>
                                ) : null}
                            </tr>
                        ))}
                        <button type='button' onClick={() => addFormFields()}>
                            Add
                        </button>
                        <button className='button submit' type='submit'>
                            Submit
                        </button>
                    </table>
                </form>
            </div>
        </>
    );
};

export default AddOrders;
//   return (
//     <>
//       <div className={styles.back}>
//         <BackButton />
//       </div>
//       <div className={styles.AddOrdersContainer}>
//         {/* we need new form to handele these data */}
//         <form className={formStyles.formContainer}>
//           <table>
//             <h2>
//               {isNew ? "Create" : isNew === null ? "" : "Update"} {"Store"}
//             </h2>
//             {items.map((item, idx) => (
//               <tr key={item.id}>
//                 <td>
//                   <input
//                     placeholder="Enter name"
//                     name={`${idx}`}
//                     className={style.input}
//                     onChange={(item, e) => handleChange(item, e)}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     placeholder="Enter price"
//                     type="number"
//                     name={`price${idx}`}
//                     className={style.input}
//                     onChange={(item, e) => handleChange(item, e)}
//                   />
//                 </td>
//               </tr>
//             ))}

//             <button type="button" onClick={(e) => submitHandler(e)}>
//               Add
//             </button>
//           </table>
//         </form>
//       </div>
//     </>
//   );
