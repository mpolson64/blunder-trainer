import React from "react";

interface Props {
  gameId: string;
  halfmoveNumber: number;
}

const FullGame = (props: Props) => {
  return (
    <iframe
      src={`https://lichess.org/embed/${props.gameId}#${
        props.halfmoveNumber - 1
      }?theme=auto&bg=auto`}
      width={600}
      height={397}
      frameBorder={0}
      title="full-game"
    ></iframe>
  );
};

export default FullGame;
