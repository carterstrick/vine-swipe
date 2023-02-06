import React from "react";
React.useLayoutEffect = React.useEffect;
import styles from "../styles/_main.module.scss";

import Meta from "../components/Meta";
import Intro from "../components/Intro";

export default function Home() {
  return (
    <Meta>
      <main className={styles.main}>
        <Intro />
      </main>
    </Meta>
  );
}
