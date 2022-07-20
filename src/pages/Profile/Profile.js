import React from "react";
import Form from "../../components/Form/Form";
import Image from "../../components/Image/Image";
import styles from "./Profile.module.css";
import profilePic from "../../utils/images/profilePic.jpg";
import Input from "../../components/Form/Input/Input";
import Error from "../../components/Error/Error";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../actions/users";
import Success from "../../components/Success/Success";

const Profile = ({ isNew }) => {
  const userI = JSON.parse(localStorage.getItem("userInfo"));
  const initialState = {
    username: userI?.username,
    password: undefined,
    phone_number: userI?.phone_number,
    email: userI?.email,
  };
  const dispatch = useDispatch();
  console.log(userI);
  const { userInfo } = useSelector((state) => state.login);
  const submitHandler = (e, form) => {
    e.preventDefault();
    dispatch(updateUserProfile(userInfo?.id, form));
  };

  const { user, loading, success, error } = useSelector(
    (state) => state.updateUser
  );

  return (
    <div className={styles.detailsContainer}>
      <div className={styles.form}>
        {error &&
          (Array.isArray(error) ? (
            error.map((e) => <Error>{e.msg}</Error>)
          ) : (
            <Error>{error}</Error>
          ))}
        {success && <Success>Profile updated successfully</Success>}
        <Form
          initialState={initialState}
          submitHandler={submitHandler}
          formName="Your Info"
          isNew={isNew}
          button="Submit"
        >
          <Input label="Username" name="username" />
          <Input label="Password" name="password" type="password" />
          <Input label="Email" name="email" />
          <Input label="Phone" name="phone_number" />
        </Form>
      </div>
    </div>
  );
};

export default Profile;
