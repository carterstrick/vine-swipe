import React, { useState, setState } from "react";
import { useParentSize } from "../modules/hooks";
import { emojisplosion } from "emojisplosion";

import { Tile } from "./Tile";
import Card from "./Card";
import SwipeInstructor from "./SwipeInstructor";

import styles from "../styles/cards.module.scss";
import cardData from "../data.js";

//  Create some data where each item
//  in the array will represent an unique card

const data = ["a"]; //  "c", "d", "e"
let cardIndex = -1;

// Mapping function to create duplicates with UIDs
const mapData = (data, prefix) =>
  data.map((item, i) => ({
    id: `${prefix}${i}`,
    content: item,
    index: i,
  }));

// Array we are going to work with
const dataClone = [
  // First 3 duplicates are going to be rendered:
  // One is for exit animations
  ...mapData(data, "1"),
  // Second one is being displayed on screen
  ...mapData(data, "2"),
  // Third one is for inital animation
  ...mapData(data, "3"),
  // Last one is to avoid cards animation
  // from the final position to the initial one
  ...mapData(data, "4"),
];

export const Cards = ({ col, row }) => {
  const [ref, size, screenWidth] = useParentSize();
  const [state, setState] = useState({ current: 0, arr: dataClone });

  const handleDidSwipeRight = (didSwipeRight) => {
    if (cardIndex !== -1 && cardIndex < cardData.length) {
      if (didSwipeRight) {
        cardData[cardIndex].upvoteCount++;
        handleEmojiOnSwipe(didSwipeRight);
      } else {
        cardData[cardIndex].downvoteCount++;
        handleEmojiOnSwipe(didSwipeRight);
      }
    }
  };

  const handleEmojiOnSwipe = (didSwipeRight) => {
    if (didSwipeRight) {
      emojisplosion({
        emojiCount: 32,
        emojis: [
          "✨",
          "👍",
          "❇️",
          "🎉",
          "👏",
          "❤️",
          "💖",
          "💙",
          "💚",
          "🥳",
          "☑️",
          "😝",
          "👀",
          "🔥",
          "❤️‍🔥",
          "🐐",
        ],
      });
    } else {
      emojisplosion({
        emojiCount: 32,
        emojis: [
          "⛔",
          "👎",
          "🙅‍♂️",
          "🙅‍♀️",
          "❌",
          "❎",
          "🚫",
          "〽️",
          "☠️",
          "💣",
          "📛",
          "🧢",
        ],
      });
    }
  };

  function rotateArray(n = 1) {
    const newArr = [...state.arr];
    if (n > 0) {
      for (let i = 0; i < n; i++) {
        const first = newArr.shift();
        newArr.push(first);
        // Handle Swipe Left
        handleDidSwipeRight(false);
        cardIndex++;
      }
      setState({ current: n, arr: newArr });
    } else {
      for (let i = 0; i < -n; i++) {
        const last = newArr.pop();
        newArr.unshift(last);
        // Handle Swipe Right
        handleDidSwipeRight(true);
        cardIndex++;
      }
      setState({ current: n, arr: newArr });
    }
  }

  const finalCardSize = size / 3 <= 290 ? 290 : size / 3;

  return (
    <Tile
      captionTop=""
      captionBot="Choose the Next Star"
      col={col}
      row={row}
      ref={ref}
      dark
      perspective
      // perspectiveDist is defined in relation
      // with the parent container
      perspectiveDist={size / 1.4}
    >
      <div>
        {state.arr.map(
          (item, i) =>
            // Render only first 3 copies of data.
            // The fourth copy should be out of render,
            // otherwise cards will also animate
            // from last to first position
            i < data.length * 3 && (
              <Card
                id="card"
                key={item.id}
                i={i}
                name={item.content}
                rotateArray={rotateArray}
                length={data.length}
                size={finalCardSize}
                style={state.style}
                cardIndex={cardIndex}
              />
            )
        )}
      </div>
      <SwipeInstructor
        className={styles.outerGrid}
        size={finalCardSize}
        viewportHeight={size}
        screenWidth={screenWidth}
      />
    </Tile>
  );
};
