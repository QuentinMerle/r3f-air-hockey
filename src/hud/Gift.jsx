import React from "react";
import styled, { css } from "styled-components";
import { useStore } from "../store";

export function Gift() {
  const giftPlayerOne = useStore((state) => state.gift);
  if (!giftPlayerOne) {
    return;
  }

  return <GiftPlayer />;
}

const base = css`
  position: absolute;
  background-color: blue;
`;

const GiftPlayer = styled.div`
  ${base}
  bottom: 0;
  left: 0;
  width: 40px;
  height: 40px;
`;
