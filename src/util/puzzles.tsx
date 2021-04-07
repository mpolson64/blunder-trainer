import { Game, AnnotatedEval, Eval } from "../types/lichess-types";
import { InaccuracyType, PuzzleInfo } from "../types/puzzle-types";

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
  // find games with inaccuracies
  return games.flatMap((game) => {
    const isWhite = game.players.white.user.id === username;

    return game.analysis.flatMap((evaluation, i) => {
      if (isAnnotatedEval(evaluation) && (i % 2 === 0) === isWhite) {
        const annotatedEval = evaluation as AnnotatedEval;
        const inacuracyType = judgementNameToInaccuracyType(
          annotatedEval.judgment.name
        );

        if (inacuracyType >= minimumInacuracyType) {
          const fenBefore = "";
          const actualMove = "";

          return {
            fen: fenBefore,
            move: actualMove,
            best: annotatedEval.best,
            variation: annotatedEval.variation,
            inaccuracyType: inacuracyType,
            gameId: game.id,
          } as PuzzleInfo;
        }
      }

      return [];
    });
  });
};

export { generatePuzzles };
