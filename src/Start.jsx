import React, { useState, useRef } from "react";
import styled, { css, createGlobalStyle } from "styled-components";
import { useStore } from "./store";

const Start = () => {
  const inputOne = useRef();
  const inputTwo = useRef();
  const [start, setStart] = useState(true);
  const [chooseGame, setChooseGame] = useState(true);
  const [localGame, setLocalGame] = useState(false);
  const playerOneName = useStore((state) => state.namePlayerOne);
  const playerTwoName = useStore((state) => state.namePlayerTwo);

  const nextStep = (e) => {
    e.target.parentNode.classList.add("active");
    setLocalGame(true);
    setTimeout(() => {
      setChooseGame(false);
      e.target.parentNode.nextSibling.classList.add("active");
    }, 300);
  };

  const handleClick = () => {
    const nameOne = inputOne.current.value || "Player 1";
    const nameTwo = inputTwo.current.value || "Player 2";
    setStart(false);
    playerOneName(nameOne);
    playerTwoName(nameTwo);
  };

  return (
    <>
      {start && (
        <StartScene>
          <Title>
            <HandScript>r3f</HandScript>
            <GradientScript>Air Hockey</GradientScript>
          </Title>
          <BoxContainer>
            {chooseGame && (
              <Cards>
                <Card onClick={nextStep}>Local</Card>
                <Card disabled>Online Soon</Card>
              </Cards>
            )}
            {localGame && (
              <LocalGame>
                <Form onSubmit={handleClick}>
                  <Inputs>
                    <label>
                      Player 1 name :
                      <Input
                        ref={inputOne}
                        type="text"
                        name="name"
                        maxLength="14"
                      />
                    </label>
                    <label>
                      Player 2 name :
                      <Input
                        ref={inputTwo}
                        type="text"
                        name="name"
                        maxLength="14"
                      />
                    </label>
                  </Inputs>
                  <Button type="submit">Go!</Button>
                </Form>
              </LocalGame>
            )}
          </BoxContainer>
        </StartScene>
      )}
    </>
  );
};

export default Start;

const font = css`
  font-family: "RussoOne";
`;

const StartScene = styled.div`
  ${font}
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
  text-align: center;
  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(4px);
  @media only screen and (max-width: 900px) {
    font-size: 1.5em;
  }
`;

const Title = styled.div`
  font-size: 5rem;
  font-style: italic;
  font-weight: 900;
  line-height: 1.2em;
  text-transform: uppercase;
`;

const HandScript = styled.span`
  font-family: "Caveat", cursive;
  color: blue;
`;

const GradientScript = styled.div`
  padding: 0 2rem;
  background: linear-gradient(
    90deg,
    rgba(255, 0, 0, 1) 0%,
    rgba(180, 9, 9, 1) 35%,
    rgba(150, 0, 0, 1) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const BoxContainer = styled.div`
  width: 392px;
  height: 392px;
  margin-top: 40px;
  overflow: hidden;
`;

const Cards = styled.div`
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, opacity 0.4s ease;

  &.active {
    transform: translateX(-50%);
    opacity: 0;
  }
`;

const Card = styled.button`
  ${font}
  border: 0;
  padding: 10px 0;
  font-size: 1.8rem;
  color: #000000;
  background: none;
  outline: none;

  &:not([disabled]) {
    cursor: pointer;
  }

  &[disabled] {
    opacity: 0.6;
  }

  &:hover {
    color: blue;
  }
`;

const LocalGame = styled.div`
  height: 200px;
  opacity: 0;
  transform: translateX(50%);
  transition: transform 0.3s ease, opacity 0.4s ease;

  &.active {
    opacity: 1;
    transform: translateX(0);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  label {
    width: 45%;
  }
`;

const Inputs = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Input = styled.input`
  ${font}
  display: block;
  width: 100%;
  border: none;
  border-bottom: 2px solid #000000;
  font-size: 1.2rem;
  color: #000000;
  background: transparent;

  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  ${font}
  width: 30%;
  margin: 40px auto 0;
  border: 4px solid transparent;
  border-radius: 10px;
  padding: 0.2rem 0.8rem;
  font-size: 2.5rem;
  color: #ffffff;
  background: linear-gradient(
    90deg,
    rgba(255, 0, 0, 1) 0%,
    rgba(180, 9, 9, 1) 35%,
    rgba(150, 0, 0, 1) 100%
  );
  apppearance: none;
  cursor: pointer;

  &:hover {
    border: 4px solid red;
    color: red;
    background: #ffffff;
  }
`;
