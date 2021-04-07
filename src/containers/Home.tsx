import React, { useState } from "react";
import { Row, Col } from "antd";
import QueryBuilder from "../components/QueryBuilder";
import Puzzle from "../components/Puzzle";
import FullGame from "../components/FullGame";
import { InaccuracyType, PuzzleInfo } from "../types/puzzle-types";

const Home = () => {
  const defaultPuzzle: PuzzleInfo = {
    fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    halfmoveNumber: 4,
    move: "d4",
    best: "e4",
    variation: "e4 e5",
    inaccuracyType: InaccuracyType.Good,
    gameId: "rNVJjuR3",
  };

  const [puzzle, setPuzzle] = useState<PuzzleInfo>(defaultPuzzle);

  return (
    <>
      <Row>
        <Col flex={1}>
          <QueryBuilder puzzle={puzzle} setPuzzle={setPuzzle} />
        </Col>
        <Col flex={2}>
          <Puzzle />
        </Col>
        <Col flex={2}>
          <FullGame
            gameId={puzzle.gameId}
            halfmoveNumber={puzzle.halfmoveNumber}
          />
        </Col>
      </Row>
    </>
  );
};

export default Home;
