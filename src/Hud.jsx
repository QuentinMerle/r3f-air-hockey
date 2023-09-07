import React from "react";
import Start from "./Start";
import { Score } from "./hud/Score";
import { Gift } from "./hud/Gift";
import End from "./End";

const Hud = () => {
  return (
    <>
      <Start />
      <Score />
      <Gift />
      <End />
    </>
  );
};

export default Hud;
