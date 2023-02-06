import styles from "../styles/swipeInstructor.module.scss";

const SwipeInstructor = ({ size, viewportHeight }) => {
  const cardHeight = size * 1.6;
  const cardWidth = cardHeight * 0.62;
  const styleWidth = cardWidth + 60; // * 1.1
  const styleHeight = cardHeight / 8.2;

  const getTopPosition = () => {
    const topOfCard = (1 - 0.9 / 1.5) * viewportHeight - cardHeight / 2;
    const styleTop = topOfCard;
    return styleTop;
  };

  return (
    <div
      className={styles.outerContainer}
      style={{
        height: `${styleHeight}px`,
        top: getTopPosition(),
      }}
    >
      <div
        className={styles.grid}
        style={{
          width: styleWidth,
        }}
      >
        <img
          className={styles.swipeIcon}
          src="/assets/swipeLeft.svg"
          alt="<- Nah"
          draggable="false"
        />
        <div />
        <img
          className={styles.swipeIcon}
          src="/assets/swipeRight.svg"
          alt="Yea ->"
          draggable="false"
        />
      </div>
    </div>
  );
};

export default SwipeInstructor;
