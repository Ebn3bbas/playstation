import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.css";
import MenuLink from "../../components/MenuLink/MenuLink";
import classnames from "classnames";
import links from "./SidebarData";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/users";

const Sidebar = ({ showSidebar }) => {
  const [parentShow, setParentShow] = useState("");

  const { userInfo } = useSelector((state) => state.login);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <>
      <div
        className={classnames(
          styles.sidebarContainer,
          !showSidebar ? styles.sidebarDisable : ""
        )}
      >
        <div className={styles.sidebarLogo}>
          <h2>logo</h2>
        </div>
        <ul className={styles.sidebarList}>
          {links.map((l) => {
            return (
              <li>
                <MenuLink name={l.name} path={l.path} icon={l.icon} />
              </li>
            );
          })}
        </ul>
        <div className={styles.PersonalInfo}>
          <div className={styles.profile} onClick={() => navigate("/profile")}>
            <div className={styles.profileName}>
              <p className={styles.name}>{userInfo?.username}</p>
              <p className={styles.role}>{userInfo?.phone_number}</p>
            </div>
          </div>
          <div className={styles.logout}>
            {userInfo && <button onClick={logoutHandler}>Log out</button>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
