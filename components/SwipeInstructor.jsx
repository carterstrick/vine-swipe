import styles from "../styles/swipeInstructor.module.scss";

const SwipeInstructor = ({ size, viewportHeight, screenWidth }) => {
  // Card Size Calculations and Setup
  const cardHeight = size * 1.6;
  const cardWidth = cardHeight * 0.62;
  const styleWidth = screenWidth <= 500 ? cardWidth + 40 : cardWidth + 60;
  const styleHeight = cardHeight / 8.2 < 32 ? 32 : cardHeight / 8.2;
  console.log("styleHeight var = " + styleHeight);
  const getTopPosition = () => {
    const topOfCard = (1 - 0.9 / 1.5) * viewportHeight - cardHeight / 2;
    const styleTop = topOfCard - 8;
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
