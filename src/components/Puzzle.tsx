import React, { useState } from "react";
import Chessground from "react-chessground";
import { Key } from "chessground/types";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";

import "react-chessground/dist/styles/chessground.css";
import { PuzzleInfo } from "../types/puzzle-types";

import * as ChessJS from "chess.js";
const Chess = typeof ChessJS === "function" ? ChessJS : ChessJS.Chess;

interface Props {
  info: PuzzleInfo;
}

const DELAY_MS = 500;

const Puzzle = (props: Props) => {
  console.log(props.info.variation);
  const whiteToMove = props.info.halfmoveNumber % 2 === 1;

  const [completed, setCompleted] = useState(false);
  const [chess, _setChess] = useState(new Chess(props.info.fen));
  const [fen, setFen] = useState(props.info.fen);
  const [halfmove, setHalfmove] = useState(props.info.halfmoveNumber);
  const [xVisible, setXVisible] = useState(false);

  const onMove = (from: Key, to: Key) => {
    const correct = chess
      .moves({ verbose: true })
      .filter(
        (move) =>
          move.san ===
          props.info.variation[halfmove - props.info.halfmoveNumber]
      )[0];

    chess.move({ to: to as ChessJS.Square, from: from as ChessJS.Square });
    setFen(chess.fen());

    if (to === correct.to && from === correct.from) {
      if (
        halfmove + 1 - props.info.halfmoveNumber >=
        props.info.variation.length
      ) {
        setCompleted(true);
        return;
      }

      // Move opponent
      setTimeout(() => {
        chess.move(
          props.info.variation[halfmove + 1 - props.info.halfmoveNumber]
        );
        setFen(chess.fen());
        setHalfmove(halfmove + 2);
        if (
          halfmove + 2 - props.info.halfmoveNumber >=
          props.info.variation.length
        ) {
          setCompleted(true);
          return;
        }
      }, DELAY_MS);
    } else {
      setXVisible(true);
      setTimeout(() => {
        chess.undo();
        setFen(chess.fen());
        setXVisible(false);
      }, DELAY_MS);
    }
  };

  const getMoveable = () => {
    if (completed) {
      return {
        dests: new Map(),
      };
    }

    const dests = new Map();
    chess.SQUARES.forEach((s) => {
      const ms = chess.moves({ square: s, verbose: true });
      if (ms.length)
        dests.set(
          s,
          ms.map((m) => m.to)
        );
    });

    return {
      dests,
      free: false,
      color: whiteToMove ? "white" : "black",
      showDests: true,
    };
  };

  return (
    <>
      <h1>{whiteToMove ? "White" : "Black"} to move</h1>
      <div>
        <Chessground
          fen={fen}
          onMove={onMove}
          turnColor={chess.turn() === "w" ? "white" : "black"}
          movable={getMoveable()}
          premovable={{
            enabled: false,
          }}
          highlight={{
            lastMove: false,
            check: true,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            height: "100%",
            width: "100%",
            opacity: completed ? 1 : 0,
            visibility: completed ? "visible" : "hidden",
            transition: ".3s ease",
            zIndex: 999,
          }}
        >
          <CheckCircleTwoTone
            style={{
              fontSize: "196px",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
            }}
            twoToneColor="#52c41a"
          />
        </div>
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            height: "100%",
            width: "100%",
            opacity: xVisible ? 1 : 0,
            visibility: xVisible ? "visible" : "hidden",
            transition: ".3s ease",
            zIndex: 999,
          }}
        >
          <CloseCircleTwoTone
            style={{
              fontSize: "196px",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
            }}
            twoToneColor="#ff0000"
          />
        </div>
      </div>
    </>
  );
};

export default Puzzle;
