import { Button } from "antd";
import React, { Dispatch, SetStateAction } from "react";

interface Props {
  gameId: string;
  halfmoveNumber: number;
  blurred: boolean;
  setBlurred: Dispatch<SetStateAction<boolean>>;
}

const FullGame = (props: Props) => {
  return (
    <>
      <iframe
        src={`https://lichess.org/embed/${props.gameId}#${
          props.halfmoveNumber - 1
        }?theme=auto&bg=auto`}
        width={600}
        height={397}
        frameBorder={0}
        title="full-game"
        style={{ filter: props.blurred ? `blur(${24}px)` : `blur(${0})` }}
      ></iframe>
      <Button type="primary" onClick={() => props.setBlurred(!props.blurred)}>
        {props.blurred ? "Reveal" : "Hide"}
      </Button>
    </>
  );
};

export default FullGame;
