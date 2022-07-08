import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { deleteRoom, getAllRooms } from '../../actions/sessions';
import DeleteButton from '../../components/Buttons/DeleteButton/DeleteButton';
import EditButton from '../../components/Buttons/EditButton/EditButton';
import Table from '../../components/Table/Table';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Sessions.module.css';
import Error from '../../components/Error/Error';
import Success from '../../components/Success/Success';

const Sessions = () => {
    let limit = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const updateHandler = (roomId) => {
        navigate(`/sessions-update-form/${roomId}`);
    };

    const deleteHandler = (roomId) => {
        dispatch(deleteRoom(roomId));
    };

    const { rooms, loading, error } = useSelector((state) => state.allRooms);
    const {
        room: deletedRoom,
        loading: deleteLoading,
        success: deleteSuccess,
        error: deleteError,
    } = useSelector((state) => state.deleteRoom);
    
    useEffect(() => {
        dispatch(getAllRooms(currentPage, limit));
    }, [dispatch, currentPage, limit, deleteLoading]);
    const columns = ['Id', 'Name', 'Owner', 'Type', 'edit', 'delete' , 'time'];
    const Endedcolumns = ['Id', 'Name', 'Owner', 'Type', 'edit', 'delete'];
    const data = [];

    

    if (rooms && rooms?.rooms?.length !== 0) {
        for (let r in rooms.rooms) {
            data.push({
                _id: rooms?.rooms[r]?._id,
                ID: rooms?.rooms[r]?.room_id || 'no data',
                Name: rooms?.rooms[r]?.room_name || 'no data',
                Owner:
                    rooms?.rooms[r]?.room_owner?.first_name +
                        ' ' +
                        rooms?.rooms[r]?.room_owner?.last_name || 'no data',
                Private: rooms?.rooms[r]?.private?.toString() || 'no data',
                edit: (
                    <EditButton
                        updateHandler={() =>
                            updateHandler(rooms?.rooms[r]?._id)
                        }
                    />
                ),
                delete: (
                    <DeleteButton
                        deleteHandler={() =>
                            deleteHandler(rooms?.rooms[r]?._id)
                        }
                    />
                ),
            });
        }
    }

    console.log(data);

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
                        tableName='Sessions'
                        showDetails={true}
                        addNewButton={true}
                        pageChangeHandler={pageChangeHandler}
                        currentPage={currentPage}
                        dataCount={rooms?.roomsCount}
                        limit={limit}
                    />
                    <Table
                        data={data}
                        columns={Endedcolumns}
                        tableName='Ended Sessions'
                        showDetails={true}
                        addNewButton={false}
                        pageChangeHandler={pageChangeHandler}
                        currentPage={currentPage}
                        dataCount={rooms?.roomsCount}
                        limit={limit}
                    />    
                </div>
                )}
            </div>
        </div>
    );
};

export default Sessions;