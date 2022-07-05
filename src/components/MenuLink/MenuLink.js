import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MenuLink.module.css';

const MenuLink = ({ icon, path, name }) => {
    const navigate = useNavigate();
    return (
        <div className={styles.link} onClick={() => navigate(path)}>
            {icon}
            <p>{name}</p>
        </div>
    );
};

export default MenuLink;
