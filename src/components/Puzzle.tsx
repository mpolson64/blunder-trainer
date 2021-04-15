import React from "react";
import Chessground from "react-chessground";
import { Dests, Key } from "chessground/types";

import "react-chessground/dist/styles/chessground.css";
import { PuzzleInfo } from "../types/puzzle-types";

import * as ChessJS from "chess.js";
const Chess = typeof ChessJS === "function" ? ChessJS : ChessJS.Chess;

interface Props {
  info: PuzzleInfo;
}

const getDests = (fen: string, best: string): Dests => {
  const chess = new Chess(fen);

  const correct = chess
    .moves({ verbose: true })
    .filter((move) => move.san === best)[0];

  return new Map<Key, Key[]>([[correct.from, [correct.to]]]);
};

const Puzzle = (props: Props) => {
  const whiteToMove = props.info.halfmoveNumber % 2 === 1;
  return (
    <>
      <h1>{whiteToMove ? "White" : "Black"} to move</h1>

      <Chessground
        fen={props.info.fen}
        turnColor={whiteToMove ? "white" : "black"}
        movable={{
          color: whiteToMove ? "white" : "black",
          free: false,
          dests: getDests(props.info.fen, props.info.variation[0]),
          showDests: true,
        }}
        premovable={{
          enabled: false
        }}
      />
    </>
  );
};

export default Puzzle;
