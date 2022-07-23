import React, { useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import styles from "./Store.module.css";
import EditButton from "../../components/Buttons/EditButton/EditButton";
import DeleteButton from "../../components/Buttons/DeleteButton/DeleteButton";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getAllStores } from "../../actions/store";

const Store = () => {
  const navigate = useNavigate();
  const updateHandler = () => {
    navigate("/store-update-form");
  };
  let limit = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();

  const deleteHandler = () => {
    console.log("data deleted");
  };

  const { stores, loading, error } = useSelector((state) => state.allStores);
  console.log(stores);
  useEffect(() => {
    dispatch(getAllStores(currentPage, limit));
  }, [dispatch, currentPage, limit]);
  const columns = ["Name", "Price", "edit", "delete"];
  const data = [];

  if (stores?.stores?.length !== 0) {
    for (let u in stores?.stores) {
      data.push({
        ID: stores?.stores[u]?._id || "no data",
        "First Name": stores?.stores[u]?.first_name || "no data",
        "Last Name": stores?.stores[u]?.last_name || "no data",
        email: stores?.stores[u]?.email || "no data",
        gender: stores?.stores[u]?.gender || "no data",
        isActive: stores?.stores[u]?.isActive?.toString() || "no data",
        edit: <EditButton updateHandler={updateHandler} />,
        delete: <DeleteButton deleteHandler={deleteHandler} />,
      });
    }
  }

  const pageChangeHandler = (e, page) => {
    e.preventDefault();
    setCurrentPage(page);
    console.log(currentPage);
  };

  return (
    <div className={styles.sessionsContainer}>
      <div className={styles.sessionsTable}>
        <Table
          data={data}
          columns={columns}
          tableName="Store"
          showDetails={false}
          addNewButton={true}
        />
      </div>
    </div>
  );
};

export default Store;
