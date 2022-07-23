import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { addStore, updateStore } from "../../../actions/store";
import BackButton from "../../../components/Buttons/BackButton/BackButton";
import formStyles from "../../../components/Form/Form.module.css";
import style from "../../../components/Form/Input/Input.module.css";
import { ADD_USER_RESET } from "../../../constants/users";
import styles from "./StoreForm.module.css";
import Success from "../../../components/Success/Success";
import Error from "../../../components/Error/Error";
import { ADD_STORE_RESET, UPDATE_STORE_RESET } from "../../../constants/store";

const StoreForm = ({ isNew }) => {
  const [formValues, setFormValues] = useState([{ title: "", price: "" }]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  let addFormFields = () => {
    setFormValues([...formValues, { title: "", price: "" }]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  let handleSubmit = (event) => {
    event.preventDefault();
    if (isNew) {
      for (let v in formValues) {
        dispatch(addStore(formValues[v]));
      }
    } else {
      dispatch(updateStore(params.id, formValues[0]));
    }
  };
  const { store, loading, success, error } = useSelector((state) => {
    if (isNew) {
      return state.addStore;
    } else {
      return state.updateStore;
    }
  });
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        dispatch({ type: isNew ? ADD_STORE_RESET : UPDATE_STORE_RESET });
        navigate("/store");
      }, 600);
    }
  }, [success, navigate, dispatch, isNew]);
  return (
    <>
      <div className={styles.back}>
        <BackButton />
      </div>
      <div className={styles.StoreFormContainer}>
        {error &&
          (Array.isArray(error) ? (
            error.map((e) => <Error>{e.msg}</Error>)
          ) : (
            <Error>{error}</Error>
          ))}
        {success && <Success>User created successfully</Success>}
        <form className={formStyles.formContainer} onSubmit={handleSubmit}>
          <table>
            <h2>
              {isNew ? "Create" : isNew === null ? "" : "Update"} {"Store"}
            </h2>
            {formValues.map((element, index) => (
              <tr key={index}>
                <td>
                  {" "}
                  <input
                    className={style.input}
                    placeholder="Enter name"
                    type="text"
                    name="title"
                    value={element.title || ""}
                    onChange={(e) => handleChange(index, e)}
                  />
                </td>
                <td>
                  {" "}
                  <input
                    className={style.input}
                    placeholder="Enter price"
                    type="number"
                    name="price"
                    value={element.price || ""}
                    onChange={(e) => handleChange(index, e)}
                  />
                </td>
                {index ? (
                  <td>
                    {" "}
                    <button
                      type="button"
                      onClick={() => removeFormFields(index)}
                    >
                      X
                    </button>
                  </td>
                ) : null}
              </tr>
            ))}
            {isNew && (
              <button type="button" onClick={() => addFormFields()}>
                Add
              </button>
            )}
            <button className="button submit" type="submit">
              Submit
            </button>
          </table>
        </form>
      </div>
    </>
  );
};

export default StoreForm;
//   return (
//     <>
//       <div className={styles.back}>
//         <BackButton />
//       </div>
//       <div className={styles.StoreFormContainer}>
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
