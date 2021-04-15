import React, { Dispatch, SetStateAction, useState } from "react";
import { Button, Divider } from "antd";
import { PuzzleInfo } from "../types/puzzle-types";
import QueryBuilder from "./QueryBuilder";
import LoadedDescriptions from "./LoadedDescriptions";

interface Props {
  puzzle: PuzzleInfo;
  setPuzzle: Dispatch<SetStateAction<PuzzleInfo>>;
  setBlurred: Dispatch<SetStateAction<boolean>>;
}

const ControlPanel = (props: Props) => {
  const [puzzles, setPuzzles] = useState<PuzzleInfo[]>([]);

  const onPlayRandomPuzzle = () => {
    if (puzzles.length > 0) {
      props.setBlurred(true);
      props.setPuzzle(puzzles[Math.floor(Math.random() * puzzles.length)]);
    } else {
      alert("No puzzles loaded!");
    }
  };

  return (
    <>
      <QueryBuilder setPuzzles={setPuzzles} />
      <Divider />
      <LoadedDescriptions puzzles={puzzles} />
      <Divider />
      <Button type="primary" onClick={onPlayRandomPuzzle}>
        Play Random Puzzle
      </Button>
    </>
  );
};

export default ControlPanel;
