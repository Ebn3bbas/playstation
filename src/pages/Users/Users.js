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
    console.log(users);
    useEffect(() => {
        dispatch(getAllUsers(currentPage, limit));
    }, [dispatch, currentPage, limit]);

    const columns = [
        'ID',
        'First Name',
        'Last Name',
        'email',
        'gender',
        'isActive',
        'edit',
        'delete',
    ];

    const data = [];

    if (users?.users?.length !== 0) {
        for (let u in users?.users) {
            data.push({
                _id: users?.users[u]?._id,
                ID: users?.users[u]?._id || 'no data',
                'First Name': users?.users[u]?.first_name || 'no data',
                'Last Name': users?.users[u]?.last_name || 'no data',
                email: users?.users[u]?.email || 'no data',
                gender: users?.users[u]?.gender || 'no data',
                isActive: users?.users[u]?.isActive?.toString() || 'no data',
                edit: (
                    <EditButton
                        updateHandler={() =>
                            updateHandler(users?.users[u]?._id)
                        }
                    />
                ),
                delete: (
                    <DeleteButton
                        deleteHandler={() =>
                            deleteHandler(users?.users[u]?._id)
                        }
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
            {deleteError && <Error>{deleteError}</Error>}
            {deleteSuccess && <Success>User deleted successfully</Success>}
            <div className={styles.sessionsTable}>
                {loading ? (
                    <p>loading...</p>
                ) : (
                    <Table
                        data={data}
                        columns={columns}
                        tableName='Users'
                        showDetails={true}
                        addNewButton={true}
                        pageChangeHandler={pageChangeHandler}
                        currentPage={currentPage}
                        dataCount={users?.usersCount}
                        limit={limit}
                    />
                )}
            </div>
        </div>
    );
};

export default Users;
