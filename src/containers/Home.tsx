import React, { useState } from "react";
import { Row, Col } from "antd";
import ControlPanel from "../components/ControlPanel";
import Puzzle from "../components/Puzzle";
import FullGame from "../components/FullGame";
import { InaccuracyType, PuzzleInfo } from "../types/puzzle-types";

const Home = () => {
  const defaultPuzzle: PuzzleInfo = {
    fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    halfmoveNumber: 1,
    move: "d4",
    best: "e4",
    variation: ["e4", "e5"],
    inaccuracyType: InaccuracyType.Good,
    gameId: "rNVJjuR3",
  };

  const [puzzle, setPuzzle] = useState(defaultPuzzle);
  const [blurred, setBlurred] = useState(true);

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col flex={1}>
          <ControlPanel
            puzzle={puzzle}
            setPuzzle={setPuzzle}
            setBlurred={setBlurred}
          />
        </Col>
        <Col flex={2}>
          <Puzzle
            key={puzzle.gameId + puzzle.halfmoveNumber}
            info={puzzle}
            setBlurred={setBlurred}
          />
        </Col>
        <Col flex={2}>
          <FullGame
            key={puzzle.gameId + puzzle.halfmoveNumber}
            gameId={puzzle.gameId}
            halfmoveNumber={puzzle.halfmoveNumber}
            blurred={blurred}
            setBlurred={setBlurred}
          />
        </Col>
      </Row>
    </>
  );
};

export default Home;
