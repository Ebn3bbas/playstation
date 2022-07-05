import classNames from 'classnames';
import React from 'react';
import { Route, Routes } from 'react-router';
import Footer from '../layout/Footer/Footer';
import Navbar from '../layout/Navbar/Navbar';

import styles from './Main.module.css';
import routes from './routes';

const Main = ({ showSidebar, setShowSidebar }) => {
    return (
        <>
            <div
                className={classNames(
                    styles.mainContainer,
                    !showSidebar ? styles.sidebarDisable : ''
                )}
            >
                <Navbar
                    showSidebar={showSidebar}
                    setShowSidebar={setShowSidebar}
                />
                <div className={styles.main}>
                    <Routes>
                        {routes.map((route, idx) => (
                            <Route
                                key={idx}
                                path={route.path}
                                element={route.element}
                                exact={route.exact || false}
                            />
                        ))}
                    </Routes>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default Main;
