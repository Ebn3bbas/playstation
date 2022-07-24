import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MenuLink.module.css";

const MenuLink = ({ icon, path, name, setShowSidebar }) => {
  const navigate = useNavigate();
  return (
    <div
      className={styles.link}
      onClick={() => {
        navigate(path);
        setShowSidebar(false);
      }}
    >
      {icon}
      <p>{name}</p>
    </div>
  );
};

export default MenuLink;
