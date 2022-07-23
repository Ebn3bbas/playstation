import React, { useEffect, useState } from 'react';
import Table from '../../components/Table/Table';
import styles from './Users.module.css';
import DeleteButton from '../../components/Buttons/DeleteButton/DeleteButton';
import EditButton from '../../components/Buttons/EditButton/EditButton';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getAllUsers } from '../../actions/users';
import Error from '../../components/Error/Error';
import Success from '../../components/Success/Success';

const Users = () => {
    let limit = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const updateHandler = (id) => {
        navigate(`/users-update-form/${id}`);
    };
    const deleteHandler = (id) => {
        dispatch(deleteUser(id));
    };

  const { users, loading, error } = useSelector((state) => state.allUsers);
  const {
    room: deletedRoom,
    loading: deleteLoading,
    success: deleteSuccess,
    error: deleteError,
  } = useSelector((state) => state.deleteUser);
  useEffect(() => {
    dispatch(getAllUsers(7, 7));
  }, [dispatch, currentPage, limit]);
  console.log(users?.rows);
  const columns = ["ID", "User Name", "Email", "Edit", "Delete"];

    const data = [];

  if (users?.rows.length !== 0) {
    for (let u in users?.rows) {
      data.push({
        id: users?.rows[u].id,
        ID: users?.rows[u].id || "no data",
        "User Name": users?.rows[u].username || "no data",
        Email: users?.rows[u].email || "no data",
        Edit: (
          <EditButton updateHandler={() => updateHandler(users?.rows[u].id)} />
        ),
        Delete: (
          <DeleteButton
            deleteHandler={() => deleteHandler(users?.rows[u].id)}
          />
        ),
      });
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
      {deleteError && <Error>{deleteError}</Error>}
      {deleteSuccess && <Success>User deleted successfully</Success>}
      <div className={styles.sessionsTable}>
        {loading ? (
          <p>loading...</p>
        ) : (
          <Table
            data={data}
            columns={columns}
            tableName="Users"
            showDetails={false}
            addNewButton={true}
            pageChangeHandler={pageChangeHandler}
            currentPage={currentPage}
            dataCount={users?.count}
            limit={limit}
          />
        )}
      </div>
    </div>
  );
};

export default Users;
