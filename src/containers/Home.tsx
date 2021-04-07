import React, { useState } from "react";
import { Row, Col } from "antd";
import QueryBuilder from "../components/QueryBuilder";
import Puzzle from "../components/Puzzle";
import FullGame from "../components/FullGame";
import { PuzzleInfo } from "../types/puzzle-types";

const Home = () => {
  const [puzzles, setPuzzles] = useState<PuzzleInfo[]>([]);

  return (
    <>
      <Row>
        <Col flex={1}>
          <QueryBuilder puzzles={puzzles} setPuzzles={setPuzzles} />
        </Col>
        <Col flex={2}>
          <Puzzle />
        </Col>
        <Col flex={2}>
          <FullGame />
        </Col>
      </Row>
    </>
  );
};

export default Home;
