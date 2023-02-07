import React from "react";
import styles from "../styles/infoCard.module.scss";

export const InfoCard = ({ title, name, description, link }) => {
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.videoTitle}>{title}</div>
      <div className={styles.nameBadgeBar}>
        <div className={styles.nameLabel}>{name}</div>
        <div className={styles.verifyContainer}>
          <img className={styles.verifyIcon} src="/assets/verifyIcon.png" />
        </div>
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className={styles.playButton}
        >
          <img
            className={styles.image}
            src="/assets/playButtonBlue.svg"
            draggable="false"
            alt="Play Video"
          />
        </a>
      </div>

      <div className={styles.descriptionLabel}>{description}</div>
    </div>
  );
};
