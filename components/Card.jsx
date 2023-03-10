//import React from "react";
import { motion, useSpring } from "framer-motion";

import { CardFace } from "./CardFace";
import SwipeInstructor from "./SwipeInstructor";
import swipeStyle from "../styles/swipeInstructor.module.scss";

// Spring configuration
const spring = {
  type: "spring",
  damping: 70,
  stiffness: 600, // was 600
  restDelta: 0.0001,
  restSpeed: 0.0001,
};

const Card = ({ i, length, size, rotateArray, cardIndex }) => {
  // Card is sized relatively to the height of the container,
  // just to maintain all ratios.
  const cardHeight = size * 1.6 * 1;
  const cardWidth = cardHeight * 0.62;

  // Bunch of helpers
  // to get the correct array slice
  const { isLeft, isFirst, isCenter, isRight } = {
    isLeft: i < length,
    isFirst: i === length,
    isCenter: i > length && i <= length * 2 - 1,
    isRight: i > length * 2 - 1 && i < length * 3,
  };

  // Another helper to start counting
  // from the "first visible" card
  const iFromFirst = i - length;

  // I usually work with hsl() model
  // bgLightness defines the l component of the background
  const bgLightness = 13;

  // I don't want any card to be darker
  // than the background itself
  const clampLightness = (value) => Math.max(value, bgLightness);

  // Helpers, helpers, helpers...
  const lightnessHSL = (value) => `hsl(0,0%,${clampLightness(value)}%)`;
  const offsetCalc = (start, step) => start * size + step * i;
  const backgroundCalc = (start, step) =>
    lightnessHSL(start + step * iFromFirst);

  // Actual styles for each card set.
  // I want to have control over:
  // – first card (the draggable one)
  // – center (visible cards)
  // – left (out of container but matters for exit animation)
  // – right (out of container but matters for initial animation)

  const styles = {
    [isLeft]: {
      posX: offsetCalc(-8.25, 0),
      posY: offsetCalc(-0.25, 1),
      posZ: offsetCalc(0, 1),
      rotX: 0,
      rotY: 45,
      rotZ: -90,
      background: backgroundCalc(95, 0),
    },
    [isFirst]: {
      posX: offsetCalc(-0.5, 1), // -0.25, -cardWidth / 6 / i
      posY: offsetCalc(-0.9, 1), // (-0.425, 1)
      posZ: offsetCalc(-0.5, 1),
      rotX: 0,
      rotY: 0,
      rotZ: 0,
      background: backgroundCalc(100, 0),
    },
    [isCenter]: {
      posX: offsetCalc(-1.27, 0.3 * cardWidth), // was 1.05
      posY: offsetCalc(-0.48, 2),
      posZ: offsetCalc(-0.25, -i * i * 0.65), // (-0.25, -i * i * 0.65),
      rotX: i * -1, // i * -1,
      rotY: i * -5, // i * -5,
      rotZ: -40 + i * 6.5, // -35 + i * 6.5,
      background: backgroundCalc(100, -25),
    },
    [isRight]: {
      posX: offsetCalc(10.5, 0),
      posY: offsetCalc(0.25, 0),
      posZ: offsetCalc(-0.25, -20),
      rotX: 0,
      rotY: 0,
      rotZ: 0,
      background: backgroundCalc(0, 0),
    },
  };

  // All cards are styled based on their index:
  const { posX, posY, posZ, background, rotX, rotY, rotZ } =
    styles[isLeft || isRight || isCenter || isFirst];

  // Springs for drag animation
  const dPosX = useSpring(posX, spring);
  const dPosY = useSpring(posY, spring);
  const dPosZ = useSpring(posZ, spring);

  const dRotX = useSpring(rotX, spring);
  const dRotY = useSpring(rotY, spring);
  const dRotZ = useSpring(rotZ, spring);

  // This function controlls the drag behavior
  // and constrains verical and horizontal drag force
  const setXY = (info, consX, consY) => {
    dPosX.set(posX + (info.offset.x * size * consX) / 500); // was 1000
    dPosY.set(posY + (info.offset.y * size * consY) / 1000); // was 1000
    dRotX.set(rotX + ((info.offset.y / size) * 400 * consY) / 1000); // ((info.offset.y / size) * 40000 * consY) / 1000);
    dRotY.set(rotY + ((info.offset.x / size) * -120000 * consY) / 1000);
    dRotZ.set(rotZ + ((info.offset.x / size) * 120 * consY) / 1000); // ((info.offset.x / size) * 120000 * consY) / 1000);
  };

  const handlePanEnd = (info) => {
    const minVelocity = Math.abs(info.velocity.x) > 80;
    const minDistance = Math.abs(info.offset.x) > size / 48;
    const direction = info.offset.x > 0 ? -1 : 1;

    if (minDistance && minVelocity && isFirst) {
      rotateArray(direction);
      setXY(info, 0, 0);
    } else {
      setXY(info, 0, 0);
    }
  };

  return (
    <motion.div
      onTap={() => {
        rotateArray(i - length);
      }}
      onPan={(_, info) => {
        isFirst ? setXY(info, 0.8, 0.35) : setXY(info, 0.15, 0.15);
      }}
      onPanEnd={(_, info) => {
        handlePanEnd(info);
      }}
      whileHover={{ scale: 1.05 }}
      transition={spring}
      animate={{
        x: posX,
        y: posY,
        z: posZ,
        rotateX: rotX,
        rotateY: rotY,
        rotateZ: rotZ,
        background: background,
        transition: {
          // delay: (iFromFirst + current) * 0.4, // was 0.025
          delay: 0.02,
        },
      }}
      style={{
        position: "absolute",
        x: dPosX,
        y: dPosY,
        z: dPosZ,
        rotateX: dRotX,
        rotateY: dRotY,
        rotateZ: dRotZ,
        width: `${cardWidth}px`, // was cardWidth
        height: `${cardHeight}px`, // was cardHeight
        top: `50%`,
        left: `50%`,
        zIndex: length - i,
        borderRadius: `${size * 0.04}px`,
        userSelect: "none",
        overflow: "hidden",
        cursor: isFirst ? "grab" : "pointer",
        boxShadow: `0 ${size * 0.025}px ${size * 0.05}px ${
          size * 0.025
        }px hsla(0,0%,13%,0.5),
        inset 2px 2px 0 0 hsla(0,0%,100%, 0.1)`,
        touchAction: "auto",
      }}
    >
      <CardFace index={cardIndex} />
    </motion.div>
  );
};

export default Card;
