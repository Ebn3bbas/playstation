import React from 'react';
import styles from './List.module.css';

const List = ({ data }) => {
    return (
        <div className={styles.detailsList}>
            <ul>
                {data.map((d, idx) => (
                    <li key={idx}>
                        <h4>{d.name}</h4> : <p> {d.value} </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default List;
