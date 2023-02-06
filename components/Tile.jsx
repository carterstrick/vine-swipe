/* eslint-disable react/display-name */
import { useLayoutEffect, useRef, useState, forwardRef } from "react";

import styles from "../styles/tile.module.scss";

import Vectors from "../components/Vectors";

export const Tile = forwardRef(
  (
    {
      children,
      col = 1,
      row = 1,
      perspective = false,
      dark = false,
      perspectiveDist = 200,
      captionTop,
      captionBot,
    },
    ref
  ) => {
    const [set, getSet] = useState(false);

    useLayoutEffect(() => {
      function setupTile() {
        wrapperRef.current.setAttribute(
          "style",
          `--ts: ${wrapperRef.current.getBoundingClientRect().height}px;
         grid-column: span calc(${col} * var(--gridBase));
         grid-row: span calc(${row} * var(--gridBase));
        `
        );

        getSet(true);
      }

      function handleResize() {
        setupTile();
      }
      window.addEventListener("resize", handleResize);

      setupTile();
    });

    const wrapperRef = useRef();

    return (
      <div ref={wrapperRef} className={styles.tileWrapper}>
        {/* <div className={`${styles.caption} ${styles.top}`}>
          <p>{captionTop}</p>
        </div> */}
        <div
          className={styles.view}
          ref={ref}
          style={{
            opacity: set ? 1 : 0,
            //background: dark ? "hsla(0, 0%, 13%, 1)" : "#ffffff",
            perspective: perspective ? `${perspectiveDist * 3}px` : "none",
            touchAction: "none",
          }}
        >
          {/* <Vectors /> */}
          {children}
        </div>
      </div>
    );
  }
);

export const s = (number) => {
  return `calc(var(--ts) * ${number})`;
};
