import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { deleteSession, getAllSessions } from "../../actions/sessions";
import DeleteButton from "../../components/Buttons/DeleteButton/DeleteButton";
import EditButton from "../../components/Buttons/EditButton/EditButton";
import Table from "../../components/Table/Table";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Sessions.module.css";
import Error from "../../components/Error/Error";
import Success from "../../components/Success/Success";

const Sessions = () => {
  let limit = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(45 * 60 * 1000);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const updateHandler = (roomId) => {
    navigate(`/sessions-update-form/${roomId}`);
  };

  const deleteHandler = (roomId) => {
    dispatch(deleteSession(roomId));
  };

  const { sessions, loading, error } = useSelector(
    (state) => state.allSessions
  );
  const {
    session: deletedSession,
    loading: deleteLoading,
    success: deleteSuccess,
    error: deleteError,
  } = useSelector((state) => state.deleteSession);

  // const onTimerUpdate = ({ time, duration }) => {
  //     setTime(time);
  //     setDuration(duration);
  // };
  useEffect(() => {
    dispatch(getAllSessions(currentPage, limit));
  }, [dispatch, currentPage, limit, deleteLoading]);

  const columns = ["Id", "PS", "Type", "edit", "delete", "time"];
  const Endedcolumns = ["Id", "PS", "Type", "edit", "delete"];
  const data = [];

  if (sessions && sessions?.rows?.length !== 0) {
    for (let r in sessions.rows) {
      data.push({
        _id: sessions?.rows[r]?.id,
        ID: sessions?.rows[r]?.id || "no data",
        PS: sessions?.rows[r]?.ps || "no data",
        type: sessions?.rows[r]?.type || "no data",
        edit: (
          <EditButton
            updateHandler={() => updateHandler(sessions?.rows[r]?.id)}
          />
        ),
        delete: (
          <DeleteButton
            deleteHandler={() => deleteHandler(sessions?.rows[r]?.id)}
          />
        ),
      });
    }
  }

  console.log(sessions);

  const pageChangeHandler = (e, page) => {
    e.preventDefault();
    setCurrentPage(page);
  };

  return (
    <div className={styles.RoomsContainer}>
      <div className={styles.RoomsTable}>
        {error &&
          (Array.isArray(error) ? (
            error.map((e) => <Error>{e.msg}</Error>)
          ) : (
            <Error>{error}</Error>
          ))}
        {deleteError && <Error>{deleteError}</Error>}
        {deleteSuccess && <Success>Room deleted successfully</Success>}
        {loading ? (
          <p>loading...</p>
        ) : (
          <div>
            <Table
              data={data}
              columns={columns}
              tableName="Sessions"
              showDetails={true}
              addNewButton={true}
              pageChangeHandler={pageChangeHandler}
              currentPage={currentPage}
              dataCount={sessions?.count}
              limit={limit}
            />
            <Table
              data={data}
              columns={Endedcolumns}
              tableName="Ended Sessions"
              showDetails={true}
              addNewButton={false}
              pageChangeHandler={pageChangeHandler}
              currentPage={currentPage}
              dataCount={sessions?.count}
              limit={limit}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Sessions;
