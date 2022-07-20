import React, { useEffect } from "react";
import styles from "./UsersDetails.module.css";
import profilePic from "../../../utils/images/profilePic.jpg";
import List from "../../../components/List/List";
import Image from "../../../components/Image/Image";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../actions/users";
import { useParams } from "react-router";
import BackButton from "../../../components/Buttons/BackButton/BackButton";
import Error from "../../../components/Error/Error";

const UsersDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const { user, error, loading } = useSelector((state) => state.getUser);

  useEffect(() => {
    dispatch(getUser(params.id));
  }, [dispatch, params]);
  const data = [
    { name: "Name", value: user?.username },
    { name: "Email", value: user?.email },
    { name: "Phone", value: user?.phone_number },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.back}>
        <BackButton />
      </div>
      {error &&
        (Array.isArray(error) ? (
          error.map((e) => <Error>{e.msg}</Error>)
        ) : (
          <Error>{error}</Error>
        ))}
      <h3>User Details</h3>
      <div className={styles.detailsContainer}>
        <Image
          className={styles.detailsImg}
          img={profilePic}
          alt="profilePic"
        />
        <List data={data} className={styles.detailsList} />
      </div>
    </div>
  );
};

export default UsersDetails;
