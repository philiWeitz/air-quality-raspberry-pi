import logo from "./chocobo.gif";
import { animated, useSpring } from "react-spring";
import { useState } from "react";

export const ChocoboAnimation = () => {
  const [resetAnimation, setResetAnimation] = useState(false);

  const springProps = useSpring({
    delay: 1000,
    reset: resetAnimation,
    transform: "translateX(-500px)",
    config: {
      duration: 10000,
    },
    from: {
      transform: "translateX(2000px)",
    },
    onStart: () => {
      setResetAnimation(false);
    },
    onRest: () => {
      setTimeout(() => setResetAnimation(true), Math.random() * 10000);
    },
  });

  return <animated.img src={logo} alt="" style={{ ...springProps }} />;
};
