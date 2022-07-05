import React from 'react';
import styles from './ProductCategorysDetails.module.css';
import profilePic from '../../../utils/images/profilePic.jpg';
import List from '../../../components/List/List';
import Image from '../../../components/Image/Image';

const ProductCategorysDetails = () => {
    const data = [
        { name: 'userName', value: 'ahmed' },
        { name: 'userName', value: 'ahmed' },
        { name: 'userName', value: 'ahmed' },
        { name: 'userName', value: 'ahmed' },
        { name: 'userName', value: 'ahmed' },
        { name: 'userName', value: 'ahmed' },
        { name: 'userName', value: 'ahmed' },
        { name: 'userName', value: 'ahmed' },
        { name: 'userName', value: 'ahmed' },
        { name: 'userName', value: 'ahmed' },
        { name: 'userName', value: 'ahmed' },
        { name: 'userName', value: 'ahmed' },
        { name: 'userName', value: 'ahmed' },
        { name: 'userName', value: 'ahmed' },
        { name: 'userName', value: 'ahmed' },
        { name: 'userName', value: 'ahmed' },
        { name: 'userName', value: 'ahmed' },
    ];

    return (
        <div className={styles.container}>
            <h3>ProductCategory Details</h3>
            <div className={styles.detailsContainer}>
                <Image
                    className={styles.detailsImg}
                    img={profilePic}
                    alt='profilePic'
                />
                <List data={data} className={styles.detailsList} />
            </div>
        </div>
    );
};

export default ProductCategorysDetails;
