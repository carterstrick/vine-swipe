import { useState, useLayoutEffect, useRef } from "react";

export const useParentSize = () => {
  const parentRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    const handleSetHeight = () => {
      if (parentRef.current) {
        setHeight(parentRef.current.offsetHeight);
        console.log(`Height of screen is ${parentRef.current.offsetHeight}`);
        console.log(`Width of screen is ${parentRef.current.offsetWidth}`);
      }
    };

    function handleResize() {
      handleSetHeight();
    }

    window.addEventListener("resize", handleResize);

    handleSetHeight();
  }, []);

  return [parentRef, height];
};
