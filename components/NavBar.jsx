import React from "react";
import styles from "../styles/navBar.module.scss";

const NavBar = () => {
  return (
    <div className={styles.navBarOuter}>
      <img className={styles.madIcon} src="/assets/madRealitiesLogoPlain.png" />
    </div>
  );
};

export default NavBar;
