import React from "react";
import { VideoPlayer } from "./VideoPlayer";
import { InfoCard } from "./InfoCard";
import cardData from "../data.js";
import styles from "../styles/cardFace.module.scss";

export const CardFace = ({ index }) => {
  let currentCard = {};

  if (index === -1) {
    currentCard = (
      <div className={styles.outerVideoHolder}>
        <div className={styles.endCard}>
          Help Us Pick a Cast!
          <br />
          <div className={styles.firstCardText}>
            We're making a "Where Are They Now" series on old viner stars. Tell
            us who you want to see!
          </div>
        </div>
      </div>
    );
  } else if (index < cardData.length && index !== -1) {
    currentCard = (
      <div className={styles.outerVideoHolder}>
        <VideoPlayer src={cardData[index].src} />
        <InfoCard
          title={cardData[index].title}
          name={cardData[index].name}
          description={cardData[index].description}
          link={cardData[index].link}
        />
      </div>
    );
  } else {
    currentCard = (
      <div className={styles.outerVideoHolder}>
        <div className={styles.endCard}>
          ⭐️ 🎉 ⭐️
          <br />
          <br />
          You've reached the end!
          <br />
          <br />
        </div>
      </div>
    );
  }
  return currentCard;
};
