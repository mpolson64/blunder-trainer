import { Game, AnnotatedEval, Eval } from "../types/lichess-types";
import { InaccuracyType, PuzzleInfo } from "../types/puzzle-types";
import * as ChessJS from "chess.js";

const Chess = typeof ChessJS === "function" ? ChessJS : ChessJS.Chess;

const isAnnotatedEval = (evaluation: Eval): evaluation is AnnotatedEval => {
  return (evaluation as AnnotatedEval).best !== undefined;
};

const judgementNameToInaccuracyType = (name: string): InaccuracyType => {
  if (name === "Inaccuracy") {
    return InaccuracyType.Inacuracy;
  } else if (name === "Mistake") {
    return InaccuracyType.Mistake;
  } else if (name === "Blunder") {
    return InaccuracyType.Blunder;
  } else {
    return InaccuracyType.Good;
  }
};

const generatePuzzles = (
  games: Game[],
  username: string,
  minimumInacuracyType = InaccuracyType.Blunder
): PuzzleInfo[] => {
  return games.flatMap((game) => {
    const isWhite = game.players.white.user.id === username;
    const moves = game.moves.split(" ");

    return game.analysis.flatMap((evaluation, i) => {
      if (isAnnotatedEval(evaluation) && (i % 2 === 0) === isWhite) {
        const annotatedEval = evaluation as AnnotatedEval;
        const inacuracyType = judgementNameToInaccuracyType(
          annotatedEval.judgment.name
        );

        if (inacuracyType >= minimumInacuracyType) {
          const chess = new Chess();
          for (let j = 0; j < i; j += 1) {
            chess.move(moves[j]);
          }

          const fenBefore = chess.fen();
          const actualMove = moves[i];

          return {
            fen: fenBefore,
            move: actualMove,
            halfmoveNumber: i - 1,
            best: annotatedEval.best,
            variation: annotatedEval.variation,
            inaccuracyType: inacuracyType,
            gameId: game.id,
          };
        }
      }

      return [];
    });
  });
};

export { generatePuzzles };
