import React from "react";
import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={styles.container}>
      <h1>
        404 <a href="/">go back</a>
      </h1>
    </div>
  );
};

export default NotFound;
