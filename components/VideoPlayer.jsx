import React from "react";
import styles from "../styles/videoPlayer.module.scss";

export const VideoPlayer = ({ src }) => {
  return (
    <div className={styles.playerWrapper}>
      <img className={styles.videoContainer} src={src} draggable="false" />
    </div>
  );
};
