import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import {
    deleteSession,
    getAllEndedSessions,
    getAllNotEndedSessions,
    getAllSessions,
} from '../../actions/sessions';
import DeleteButton from '../../components/Buttons/DeleteButton/DeleteButton';
import EditButton from '../../components/Buttons/EditButton/EditButton';
import Table from '../../components/Table/Table';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Sessions.module.css';
import Error from '../../components/Error/Error';
import Success from '../../components/Success/Success';
import Timer from 'react-timer-wrapper';
import Timecode from 'react-timecode';
import { useTimer } from 'use-timer';
import PrimaryButton from '../../components/Buttons/PrimaryButton/PrimaryButton';

const Sessions = () => {
    let limit = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [currentEndedPage, setCurrentEndedPage] = useState(1);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const updateHandler = (sessionId) => {
        navigate(`/sessions-update-form/${sessionId}`);
    };

    const deleteHandler = (sessionId) => {
        dispatch(deleteSession(sessionId));
    };

    const { endedSessions, loading, error } = useSelector(
        (state) => state.allEndedSessions
    );

    const {
        notEndedSessions,
        loading: notEndedLoading,
        error: notEndeddError,
    } = useSelector((state) => state.allNotEndedSessions);
    const {
        session: deletedSession,
        loading: deleteLoading,
        success: deleteSuccess,
        error: deleteError,
    } = useSelector((state) => state.deleteSession);

    useEffect(() => {
        dispatch(getAllEndedSessions(currentEndedPage, limit));
        dispatch(getAllNotEndedSessions(currentPage, limit));
    }, [dispatch, currentPage, limit, deleteLoading, currentEndedPage]);

    const columns = [
        'Id',
        'PS',
        'Type',
        'Started At',
        'add_orders',
        'edit',
        'delete',
    ];
    const Endedcolumns = [
        'Id',
        'PS',
        'Type',
        'Started At',
        'Ended At',
        'edit',
        'delete',
    ];
    const data = [];
    const endedData = [];

    if (endedSessions && endedSessions?.rows?.length !== 0) {
        for (let r in endedSessions.rows) {
            endedData.push({
                id: endedSessions?.rows[r]?.id,
                ID: endedSessions?.rows[r]?.id || 'no data',
                PS: endedSessions?.rows[r]?.playstation?.title || 'no data',
                type: endedSessions?.rows[r]?.type || 'no data',
                started_at:
                    endedSessions?.rows[r]?.started_at?.substr(11, 8) ||
                    'no data',
                ended_at:
                    endedSessions?.rows[r]?.ended_at?.substr(11, 8) ||
                    'not ended yet',
                edit: (
                    <EditButton
                        updateHandler={() =>
                            updateHandler(endedSessions?.rows[r]?.id)
                        }
                    />
                ),
                delete: (
                    <DeleteButton
                        deleteHandler={() =>
                            deleteHandler(endedSessions?.rows[r]?.id)
                        }
                    />
                ),
            });
        }
    }

    if (notEndedSessions && notEndedSessions?.rows?.length !== 0) {
        for (let r in notEndedSessions.rows) {
            data.push({
                id: notEndedSessions?.rows[r]?.id,
                ID: notEndedSessions?.rows[r]?.id || 'no data',
                PS: notEndedSessions?.rows[r]?.playstation?.title || 'no data',
                type: notEndedSessions?.rows[r]?.type || 'no data',
                started_at:
                    notEndedSessions?.rows[r]?.started_at?.substr(11, 8) ||
                    'no data',

                add_orders: (
                    <PrimaryButton
                        title='Add Orders'
                        onClick={() =>
                            navigate(
                                `/sessions-add-orders/${notEndedSessions?.rows[r]?.id}`
                            )
                        }
                    />
                ),
                edit: (
                    <EditButton
                        updateHandler={() =>
                            updateHandler(notEndedSessions?.rows[r]?.id)
                        }
                    />
                ),
                delete: (
                    <DeleteButton
                        deleteHandler={() =>
                            deleteHandler(notEndedSessions?.rows[r]?.id)
                        }
                    />
                ),
            });
        }
    }

    console.log(endedSessions);

    const pageChangeHandler = (e, page) => {
        e.preventDefault();
        setCurrentPage(page);
    };

    const endedPageChangeHandler = (e, page) => {
        e.preventDefault();
        setCurrentEndedPage(page);
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
                {deleteSuccess && (
                    <Success>Seesion deleted successfully</Success>
                )}
                {loading ? (
                    <p>loading...</p>
                ) : (
                    <div>
                        <Table
                            data={data}
                            columns={columns}
                            tableName='Sessions'
                            showDetails={true}
                            addNewButton={true}
                            pageChangeHandler={pageChangeHandler}
                            currentPage={currentPage}
                            dataCount={notEndedSessions?.count}
                            limit={limit}
                        />
                        <Table
                            data={endedData}
                            columns={Endedcolumns}
                            tableName='Sessions'
                            showDetails={true}
                            addNewButton={false}
                            pageChangeHandler={endedPageChangeHandler}
                            currentPage={currentEndedPage}
                            dataCount={endedSessions?.count}
                            limit={limit}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sessions;
