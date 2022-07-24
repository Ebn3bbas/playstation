import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { getAllDevices } from "../../../actions/device";
import {
  addSession,
  getSession,
  updateSession,
} from "../../../actions/sessions";
import BackButton from "../../../components/Buttons/BackButton/BackButton";
import Error from "../../../components/Error/Error";
import Form from "../../../components/Form/Form";
import Input from "../../../components/Form/Input/Input";
import Select from "../../../components/Form/Select/Select";
import Success from "../../../components/Success/Success";
import {
  ADD_SESSION_RESET,
  UPDATE_SESSION_RESET,
} from "../../../constants/sessions";
import styles from "./SessionsForm.module.css";

const initialState = {
  hours: undefined,
  type: undefined,
  device: undefined,
};

const SessionsForm = ({ isNew }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const submitHandler = (e, form) => {
    e.preventDefault();
    const newForm = {
      ...form,
      device: devices?.find((d) => d.title === form.device),
    };
    if (isNew) {
      dispatch(addSession(newForm));
    } else {
      console.log(newForm);
      dispatch(
        updateSession(params.id, sessionDetails.playstation.id, newForm)
      );
    }
  };

  const { session: sessionDetails } = useSelector((state) => state.getSession);

  const { session, loading, success, error } = useSelector((state) => {
    if (isNew) {
      return state.addSession;
    } else {
      return state.updateSession;
    }
  });

  const { devices } = useSelector((state) => state.allDevices);
  console.log(devices);
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        dispatch({
          type: isNew ? ADD_SESSION_RESET : UPDATE_SESSION_RESET,
        });
        navigate("/sessions");
      }, 600);
    }
  }, [success, navigate, dispatch, isNew]);

  useEffect(() => {
    dispatch(getSession(params.id));
  }, [dispatch, params]);

  useEffect(() => {
    dispatch(getAllDevices(null, null, "False"));
  }, [dispatch]);

  return (
    <>
      <div className={styles.back}>
        <BackButton />
      </div>
      <div className={styles.RoomsFormContainer}>
        {error &&
          (Array.isArray(error) ? (
            error.map((e) => <Error>{e.msg}</Error>)
          ) : (
            <Error>{error}</Error>
          ))}
        {success && (
          <Success>
            {isNew
              ? "Session created successfully"
              : "Session updated successfully"}
          </Success>
        )}
        <Form
          initialState={initialState}
          submitHandler={submitHandler}
          isNew={isNew}
          formName="Session"
          button={isNew ? "Start" : "Update"}
        >
          {isNew && (
            <Select
              label="Device"
              name="device"
              options={devices?.map((r) => r.title) || []} //not active Devices
              mult={false}
            />
          )}
          <Select
            label="Type"
            name="type"
            options={["Single", "Multi", "Match"]}
            mult={false}
          />
        </Form>
      </div>
    </>
  );
};

export default SessionsForm;
