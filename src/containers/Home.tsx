import React from "react";
import { Row, Col } from "antd";
import QueryBuilder from "../components/QueryBuilder";
import Puzzle from "../components/Puzzle";
import FullGame from "../components/FullGame";

const Home = () => {
  return (
    <Row>
      <Col flex={1}>
        <QueryBuilder />
      </Col>
      <Col flex={2}>
        <Puzzle />
      </Col>
      <Col flex={2}>
        <FullGame />
      </Col>
    </Row>
  );
};

export default Home;
