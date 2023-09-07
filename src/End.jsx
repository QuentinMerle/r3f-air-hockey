import React from "react";
import styled, { css, createGlobalStyle } from "styled-components";
import { useTransition, animated } from "@react-spring/web";
import { useStore } from "./store";

const End = () => {
  const endGame = useStore((state) => state.endGame);
  const winner = useStore((state) => state.winner);
  const transitions = useTransition(0, {
    from: { opacity: 0, transform: "translate3d(100%,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    leave: { opacity: 0, transform: "translate3d(-50%,0,0)" },
  });

  if (!endGame) {
    return;
  }
  return transitions((style, item) => (
    <EndScene as={animated.div} style={style}>
      <Title>
        {winner} <br />
        win!
      </Title>
    </EndScene>
  ));
};

export default End;

const EndScene = styled.div`
  position: fixed;
  z-index: 99;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "RussoOne", sans-serif;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(4px);
  @media only screen and (max-width: 900px) {
    font-size: 1.5em;
  }
`;

const Title = styled.div`
  padding: 0 2rem;
  font-size: 5rem;
  font-style: italic;
  font-weight: 900;
  line-height: 1.2em;
  text-transform: uppercase;
  background: linear-gradient(
    90deg,
    rgba(255, 0, 0, 1) 0%,
    rgba(180, 9, 9, 1) 35%,
    rgba(150, 0, 0, 1) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
