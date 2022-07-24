import classNames from "classnames";
import React, { useEffect } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router";
import Footer from "../layout/Footer/Footer";
import Navbar from "../layout/Navbar/Navbar";

import styles from "./Main.module.css";
import { userRoutes, unlogedRoutes, logedRoutes } from "./routes";

const Main = ({ showSidebar, setShowSidebar, userInfo }) => {
  let routes = !userInfo
    ? unlogedRoutes
    : userInfo && userInfo.is_owner
    ? logedRoutes
    : userInfo && !userInfo.is_owner
    ? userRoutes
    : [];

  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(routes.find((r) => location.pathname === r.route));
    if (routes.find((r) => location.pathname === r.path) == undefined) {
      navigate("/not-found");
    }
  }, []);
  return (
    <>
      <div
        className={classNames(
          styles.mainContainer,
          !showSidebar ? styles.sidebarDisable : ""
        )}
      >
        <Navbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        <div className={styles.main}>
          <Routes>
            {routes.map((route, idx) => {
              return (
                <Route
                  key={idx}
                  path={route.path}
                  element={route.element}
                  exact={route.exact || false}
                />
              );
            })}
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Main;
