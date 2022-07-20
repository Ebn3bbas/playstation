import React from "react";
import { useDispatch } from "react-redux";
import { creatSettings } from "../../actions/settings";
import BackButton from "../../components/Buttons/BackButton/BackButton";
import Form from "../../components/Form/Form";
import Input from "../../components/Form/Input/Input";
import styles from "./Settings.module.css";

const Settings = ({ isNew }) => {
  // const settings = JSON.parse(localStorage.getItem("settings"));
  //   const initialState = {
  //     ps4_single_hour: settings?.ps4_single_hour,
  //     ps4_multi_hour: settings?.ps4_multi_hour,
  //     ps4_match_hour: settings?.ps4_match_hour,
  //     ps5_single_hour: settings?.ps5_single_hour,
  //     ps5_multi_hour: settings?.ps5_multi_hour,
  //     ps5_match_hour: settings?.ps5_match_hour,
  //   };
  const dispatch = useDispatch();
  const submitHandler = (e, form) => {
    e.preventDefault();
    //dispatch(creatSettings(form));
  };

  return (
    <>
      <div className={styles.SettingsFormContainer}>
        <Form
          initialState={[]}
          submitHandler={submitHandler}
          isNew={isNew}
          formName="Setting"
          button="update"
        >
          <Input label="PS4 Single hour price" name="ps4_single_hour" />
          <Input label="PS4 Multi hour price" name="ps4_multi_hour" />
          <Input label="PS4 Match price" name="ps4_match_hour" />
          <Input label="PS5 Single hour price" name="ps5_single_hour" />
          <Input label="PS5 Multi hour price" name="ps5_multi_hour" />
          <Input label="PS5 Match price" name="ps5_match_hour" />
        </Form>
      </div>
    </>
  );
};

export default Settings;
