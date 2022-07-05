import React from 'react';
import { DOTS, usePagination } from '../../../Hooks/usePagination';
import styles from './Pagination.module.css';
import classnames from 'classnames';
const Pagination = ({
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
}) => {
    const paginationRange = usePagination({
        totalCount,
        pageSize,
        siblingCount,
        currentPage,
    });

    console.log(onPageChange, totalCount, currentPage, pageSize);

    // If there are less than 2 times in pagination range we shall not render the component
    if (currentPage === 0 || paginationRange?.length < 2) {
        return null;
    }

    const onNext = (e) => {
        onPageChange(e, currentPage + 1);
    };

    const onPrevious = (e) => {
        onPageChange(e, currentPage - 1);
    };
    console.log(paginationRange);
    let lastPage = paginationRange
        ? paginationRange[paginationRange?.length - 1]
        : 0;

    return (
        <div className={styles.pagination}>
            <ul className={styles.paginationList}>
                {/* Left navigation arrow */}
                <li
                    className={classnames(
                        styles.paginationItem,
                        currentPage === 1 ? styles.disabled : ''
                    )}
                    onClick={onPrevious}
                >
                    <button className={styles.paginationPrev}>Previous</button>
                </li>
                {paginationRange?.map((pageNumber) => {
                    // If the pageItem is a DOT, render the DOTS unicode character
                    if (pageNumber === DOTS) {
                        return (
                            <li
                                className={classnames(
                                    styles.paginationItem,
                                    styles.dots
                                )}
                            >
                                &#8230;
                            </li>
                        );
                    }

                    // Render our Page Pills
                    return (
                        <li
                            className={classnames(
                                styles.paginationItem,
                                pageNumber === currentPage
                                    ? styles.selected
                                    : ''
                            )}
                            onClick={(e) => onPageChange(e, pageNumber)}
                        >
                            {pageNumber}
                        </li>
                    );
                })}
                {/*  Right Navigation arrow */}
                <li
                    className={classnames(
                        styles.paginationItem,
                        currentPage === lastPage ? styles.disabled : ''
                    )}
                    onClick={onNext}
                >
                    <button className={styles.paginationNext}>Next</button>
                </li>
            </ul>
        </div>
    );
};

export default Pagination;
