import React from 'react';
import styles from './Image.module.css';

const Image = ({ img, alt }) => {
    return (
        <div className={styles.detailsImg}>
            <img src={img} alt={alt ? alt : 'profilePic'} />
        </div>
    );
};

export default Image;
