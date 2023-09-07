import React from "react";
import styled, { css } from "styled-components";
import { useStore } from "../store";

export function Score() {
  const namePlayerOne = useStore((state) => state.playerOneName);
  const namePlayerTwo = useStore((state) => state.playerTwoName);
  const scorePlayerOne = useStore((state) => state.playerOne);
  const scorePlayerTwo = useStore((state) => state.playerTwo);

  return (
    <TableScore>
      <CellScoreOne>
        <span>{namePlayerOne}</span> <CellScore>{scorePlayerOne}</CellScore>
      </CellScoreOne>
      <CellScoreTwo>
        <span>{namePlayerTwo}</span> <CellScore>{scorePlayerTwo}</CellScore>
      </CellScoreTwo>
    </TableScore>
  );
}

const base = css`
  position: fixed;
  z-index: 89;
  font-family: "RussoOne";
  text-transform: uppercase;
  font-weight: 900;
  line-height: 1em;
  pointer-events: none;
  color: white;
`;

const TableScore = styled.div`
  ${base}
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  font-size: 1.5rem;
  font-style: italic;
  text-align: center;
  cursor: pointer;
  @media only screen and (max-width: 900px) {
    font-size: 1.5em;
  }
`;

const cellscorebase = css`
  display: flex;
  justify-content: space-between;
  min-width: 280px;
  padding: 15px 40px;
`;

const CellScoreOne = styled.div`
  ${cellscorebase}
  background: linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(180,9,9,1) 35%, rgba(150,0,0,1) 100%);
`;

const CellScoreTwo = styled.div`
  ${cellscorebase}
  flex-direction: row-reverse;
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(9, 9, 121, 1) 35%,
    rgba(0, 212, 255, 1) 100%
  );
`;

const CellScore = styled.div`
  font-size: 3rem;
`;
