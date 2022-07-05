import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
// import { BsChevronLeft } from 'react-icons/bs';
import { FaAngleLeft, FaBars } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Navbar = ({ showSidebar, setShowSidebar }) => {
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.login);

    const closeMenuHandler = () => {
        // navigate(-1);
        setShowSidebar(false);
    };

    const openMenuHandler = () => {
        // navigate(-1);
        setShowSidebar(true);
    };

    useEffect(() => {
        if (!userInfo) {
            setShowSidebar(false);
        }
    }, [userInfo, setShowSidebar]);

    return (
        <>
            <div className={styles.navContainer}>
                <nav>
                    <div className={styles.headerLogo}>
                        {userInfo &&
                            (showSidebar ? (
                                <div
                                    className={styles.backBtn}
                                    onClick={closeMenuHandler}
                                >
                                    <FaAngleLeft />
                                </div>
                            ) : (
                                <div
                                    className={styles.burger}
                                    onClick={openMenuHandler}
                                >
                                    <FaBars />
                                </div>
                            ))}

                        <h1>Break App</h1>
                    </div>
                    <div className={styles.headerNav}>
                        <ul>
                            <li>{userInfo?.info?.name}</li>
                            {/* <li>
                                <NavLink to='/' className={styles.navHomeLink}>
                                    HOME
                                </NavLink>
                            </li> */}
                            <li>
                                {!userInfo && (
                                    <button
                                        className={styles.navBtn}
                                        onClick={() => navigate('/login')}
                                    >
                                        Login
                                    </button>
                                )}
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default Navbar;
