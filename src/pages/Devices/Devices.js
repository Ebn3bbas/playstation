import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { deleteDevice, getAllDevices } from "../../actions/device";
import DeleteButton from "../../components/Buttons/DeleteButton/DeleteButton";
import EditButton from "../../components/Buttons/EditButton/EditButton";
import Error from "../../components/Error/Error";
import Success from "../../components/Success/Success";
import Table from "../../components/Table/Table";
import styles from "./Devices.module.css";

const Devices = () => {
  let limit = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const updateHandler = (id) => {
    navigate(`/devices-update-form/${id}`);
  };
  const deleteHandler = (id) => {
    dispatch(deleteDevice(id));
  };

  const { devices, loading, error } = useSelector((state) => state.allDevices);
  const {
    device: deletedDevice,
    loading: deleteLoading,
    success: deleteSuccess,
    error: deleteError,
  } = useSelector((state) => state.deleteUser);

  useEffect(() => {
    dispatch(getAllDevices(7, 7));
  }, [dispatch, currentPage, limit]);

  const columns = [
    "ID",
    "Name",
    "Type",
    "Single",
    "Multi",
    "Match",
    "isActive",
    "Edit",
    "Delete",
  ];
  const data = [];
  console.log(devices);
  for (let u in devices?.rows) {
    if (devices.rows.length !== 0) {
      data.push({
        id: devices?.rows[u].id,
        ID: devices?.rows[u].id || "no data",
        Name: devices?.rows[u].title || "no data",
        Type: devices?.rows[u].type || "no data",
        Single: devices?.rows[u].single_hour || "no data",
        Multi: devices?.rows[u].multi_hour || "no data",
        Match: devices?.rows[u].match_hour || "no data",
        isActive: devices?.rows[u].isActive?.toString() || "no data",
        Edit: (
          <EditButton
            updateHandler={() => updateHandler(devices?.rows[u].id)}
          />
        ),
        Delete: (
          <DeleteButton
            deleteHandler={() => deleteHandler(devices?.rows[u].id)}
          />
        ),
      });
    }
  }

  const pageChangeHandler = (e, page) => {
    e.preventDefault();
    setCurrentPage(page);
  };

  return (
    <div className={styles.sessionsContainer}>
      {error &&
        (Array.isArray(error) ? (
          error.map((e) => <Error>{e.msg}</Error>)
        ) : (
          <Error>{error}</Error>
        ))}
      {deleteError && <Error>{deleteError || "server error"}</Error>}
      {deleteSuccess && <Success>Device deleted successfully</Success>}
      <div className={styles.sessionsTable}>
        {loading ? (
          <p>loading...</p>
        ) : (
          <Table
            data={data}
            columns={columns}
            tableName="Devices"
            showDetails={false}
            addNewButton={true}
            pageChangeHandler={pageChangeHandler}
            currentPage={currentPage}
            limit={limit}
            dataCount={devices?.length}
          />
        )}
      </div>
    </div>
  );
};

export default Devices;
