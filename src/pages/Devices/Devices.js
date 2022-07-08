import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { deleteAgency, getAllAgencys } from '../../actions/device';
import DeleteButton from '../../components/Buttons/DeleteButton/DeleteButton';
import EditButton from '../../components/Buttons/EditButton/EditButton';
import Error from '../../components/Error/Error';
import Success from '../../components/Success/Success';
import Table from '../../components/Table/Table';
import styles from './Devices.module.css';

const Devices = () => {
    let limit = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const updateHandler = (id) => {
        navigate(`/devices-update-form/${id}`);
    };
    const deleteHandler = (id) => {
        dispatch(deleteAgency(id));
    };

    const { agencys, loading, error } = useSelector(
        (state) => state.allAgencys
    );
    const {
        agency: deletedAgency,
        loading: deleteLoading,
        success: deleteSuccess,
        error: deleteError,
    } = useSelector((state) => state.deleteUser);

    useEffect(() => {
        dispatch(getAllAgencys(currentPage, limit));
    }, [dispatch, currentPage, limit]);

    const columns = [
        'ID',
        'Name',
        'Type',
        'isActive',
        'edit',
        'delete',
    ];

    const data = [];

    for (let u in agencys?.agencies) {
        if (agencys.agencies?.length !== 0) {
            data.push({
                _id: agencys?.agencies[u]?._id,
                ID: agencys?.agencies[u]?._id || 'no data',
                Name: agencys?.agencies[u]?.name || 'no data',
                Golds: agencys?.agencies[u]?.wallet?.golds,
                Beans: agencys?.agencies[u]?.wallet?.beans,
                isActive:
                    agencys?.agencies[u]?.isActive?.toString() || 'no data',
                edit: (
                    <EditButton
                        updateHandler={() =>
                            updateHandler(agencys?.agencies[u]?._id)
                        }
                    />
                ),
                delete: (
                    <DeleteButton
                        deleteHandler={() =>
                            deleteHandler(agencys?.agencies[u]?._id)
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
            {deleteError && <Error>{deleteError || 'server error'}</Error>}
            {deleteSuccess && <Success>Agency deleted successfully</Success>}
            <div className={styles.sessionsTable}>
                {loading ? (
                    <p>loading...</p>
                ) : (
                    <Table
                        data={data}
                        columns={columns}
                        tableName='Devices'
                        showDetails={true}
                        addNewButton={true}
                        pageChangeHandler={pageChangeHandler}
                        currentPage={currentPage}
                        limit={limit}
                        dataCount={agencys?.agenciesCount}
                    />
                )}
            </div>
        </div>
    );
};

export default Devices;
