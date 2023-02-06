import React, { useEffect, useState } from "react";
import { animateIn } from "../modules/text";

import styles from "../styles/intro.module.scss";

import NavBar from "./NavBar";
import { Cards } from "./Cards";

const Intro = () => {
  const [value, setValue] = useState("");

  useEffect(() => {
    animateIn("line", "header");
  }, []);

  return (
    <div className={styles.main}>
      <video
        preload="auto"
        playsInline
        autoPlay
        loop
        muted
        className={styles.backgroundVideo}
        src={"/assets/colorComGlitch.mp4"}
      />
      <NavBar />

      <div className={styles.content}>
        <div className={styles.cardGrid}>
          <Cards id="myCards" col={1} row={1} />
        </div>
      </div>
    </div>
  );
};

export default Intro;
