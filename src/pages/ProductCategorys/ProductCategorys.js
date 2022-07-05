import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { getAllCategories } from '../../actions/productCategorys';
import DeleteButton from '../../components/Buttons/DeleteButton/DeleteButton';
import EditButton from '../../components/Buttons/EditButton/EditButton';
import Table from '../../components/Table/Table';
import styles from './ProductCategorys.module.css';

const ProductCategorys = () => {
    let limit = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const updateHandler = (roomId) => {
        navigate(`/pproduct-categorys-update-form/${roomId}`);
    };

    const deleteHandler = (roomId) => {
        // dispatch(deleteRoom(roomId));
    };

    const { categories, loading, error } = useSelector(
        (state) => state.allCategories
    );
    // const {
    //     room: deletedRoom,
    //     loading: deleteLoading,
    //     success: deleteSuccess,
    //     error: deleteError,
    // } = useSelector((state) => state.deleteRoom);
    console.log(categories);
    useEffect(() => {
        dispatch(getAllCategories(currentPage, limit));
    }, [dispatch, currentPage, limit]);
    const columns = ['Name', 'Avatar', 'edit', 'delete'];
    const data = [];

    if (categories && categories?.result?.length !== 0) {
        for (let c in categories.result) {
            data.push({
                _id: categories?.result[c]?._id,
                Name: categories?.result[c]?.name || 'no data',
                Avatar: categories?.result[c]?.avatar || 'no data',
                edit: (
                    <EditButton
                        updateHandler={() =>
                            updateHandler(categories?.result[c]?._id)
                        }
                    />
                ),
                delete: (
                    <DeleteButton
                        deleteHandler={() =>
                            deleteHandler(categories?.result[c]?._id)
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
        <div className={styles.sessionsContainer}>
            <div className={styles.sessionsTable}>
                <Table
                    data={data}
                    columns={columns}
                    tableName='Prouct Categories'
                    showDetails={true}
                    addNewButton={true}
                    pageChangeHandler={pageChangeHandler}
                    currentPage={currentPage}
                    dataCount={22}
                    limit={limit}
                />
            </div>
        </div>
    );
};

export default ProductCategorys;
