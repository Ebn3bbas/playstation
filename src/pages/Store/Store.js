import React, { useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import styles from "./Store.module.css";
import EditButton from "../../components/Buttons/EditButton/EditButton";
import DeleteButton from "../../components/Buttons/DeleteButton/DeleteButton";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getAllStores, deleteStore } from "../../actions/store";
import Error from "../../components/Error/Error";
import Success from "../../components/Success/Success";

const Store = () => {
  let limit = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const updateHandler = (id) => {
    navigate(`/store-update-form/${id}`);
  };
  const deleteHandler = (id) => {
    dispatch(deleteStore(id));
  };

  const { stores, loading, error } = useSelector((state) => state.allStores);
  const {
    store: deletedStore,
    loading: deleteLoading,
    success: deleteSuccess,
    error: deleteError,
  } = useSelector((state) => state.deleteStore);
  console.log(stores);

  useEffect(() => {
    dispatch(getAllStores(7, 7));
  }, [dispatch, currentPage, limit, deletedStore]);

  const columns = ["Name", "Price", "edit", "delete"];
  const data = [];

  if (stores?.rows.length !== 0) {
    for (let u in stores?.rows) {
      data.push({
        ID: stores?.rows[u]?.id || "no data",
        Name: stores?.rows[u]?.title || "no data",
        price: stores?.rows[u]?.price || "no data",
        edit: (
          <EditButton updateHandler={() => updateHandler(stores?.rows[u].id)} />
        ),
        delete: (
          <DeleteButton
            deleteHandler={() => deleteHandler(stores?.rows[u].id)}
          />
        ),
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
      {error &&
        (Array.isArray(error) ? (
          error.map((e) => <Error>{e.msg}</Error>)
        ) : (
          <Error>{error}</Error>
        ))}
      {deleteError && <Error>{deleteError}</Error>}
      {deleteSuccess && <Success>User deleted successfully</Success>}
      <div className={styles.sessionsTable}>
        {loading ? (
          <p>loading...</p>
        ) : (
          <Table
            data={data}
            columns={columns}
            tableName="Store"
            showDetails={false}
            addNewButton={true}
          />
        )}
      </div>
    </div>
  );
};

export default Store;
