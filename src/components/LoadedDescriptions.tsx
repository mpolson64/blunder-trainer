import { Descriptions } from "antd";
import React from "react";
import { PuzzleInfo } from "../types/puzzle-types";

interface Props {
  puzzles: PuzzleInfo[];
}

const LoadedDescriptions = (props: Props) => {
  return (
    <Descriptions title="Status" column={1} bordered>
      <Descriptions.Item label="Games Loaded">
        {new Set(props.puzzles.map((puzzle) => puzzle.gameId)).size}
      </Descriptions.Item>
      <Descriptions.Item label="Puzzles Generated">
        {props.puzzles.length}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default LoadedDescriptions;
