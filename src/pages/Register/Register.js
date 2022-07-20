import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { register } from "../../actions/users";
import Error from "../../components/Error/Error";
import Form from "../../components/Form/Form";
import Input from "../../components/Form/Input/Input";
import styles from "./Register.module.css";

const initialState = {
  username: undefined,
  password: undefined,
  phone_number: undefined,
  email: undefined,
  store_name: undefined,
};
const Register = ({ isNew }) => {
  const [message, setMessage] = useState(null);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, userInfo } = useSelector((state) => state.login);

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e, form) => {
    e.preventDefault();
    // if (form.password !== form.confirm_password) {
    //   setMessage("Passwords do not match");
    // } else {
    dispatch(register(form));
    setMessage(null);
    // }
  };

  return (
    <div className={styles.RegisterContainer}>
      {error &&
        (Array.isArray(error) ? (
          error.map((e) => <Error>{e.msg}</Error>)
        ) : (
          <Error>{error}</Error>
        ))}
      {message && <Error>{message}</Error>}
      {loading ? (
        <p>loading...</p>
      ) : (
        <Form
          initialState={initialState}
          submitHandler={submitHandler}
          isNew={isNew}
          formName="User"
          button={"Submit"}
        >
          <Input label="User Name" name="username" />
          <Input label="Email" name="email" type="email" />
          <Input label="Password" name="password" type="password" />
          <Input label="Phone" type="number" name="phone_number" />
          <Input label="Store Name" name="store_name" />
        </Form>
      )}
    </div>
  );
};

export default Register;
