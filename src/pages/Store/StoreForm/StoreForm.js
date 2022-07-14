import React from "react";
import { useState } from "react";
import BackButton from "../../../components/Buttons/BackButton/BackButton";
import formStyles from "../../../components/Form/Form.module.css";
import style from "../../../components/Form/Input/Input.module.css";
import styles from "./StoreForm.module.css";

const StoreForm = ({ isNew }) => {
  const [formValues, setFormValues] = useState([{ name: "", price: "" }]);

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  let addFormFields = () => {
    setFormValues([...formValues, { name: "", price: "" }]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  let handleSubmit = (event) => {
    event.preventDefault();
    console.log(JSON.stringify(formValues));
  };

  return (
    <>
      <div className={styles.back}>
        <BackButton />
      </div>
      <div className={styles.StoreFormContainer}>
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
                    name="name"
                    value={element.name || ""}
                    onChange={(e) => handleChange(index, e)}
                  />
                </td>
                <td>
                  {" "}
                  <input
                    className={style.input}
                    placeholder="Enter price"
                    type="number"
                    name="email"
                    value={element.email || ""}
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
            <button type="button" onClick={() => addFormFields()}>
              Add
            </button>
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
