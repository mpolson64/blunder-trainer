import { info } from "node:console";
import React from "react";
import Chessground from "react-chessground";
import "react-chessground/dist/styles/chessground.css";
import { PuzzleInfo } from "../types/puzzle-types";

interface Props {
  info: PuzzleInfo;
}

const Puzzle = (props: Props) => {
  return <Chessground fen={props.info.fen} />;
};

export default Puzzle;
