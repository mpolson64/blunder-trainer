export interface Game {
  id: string;
  players: {
    white: Side;
    black: Side;
  };
  moves: string;
  analysis: [Eval];
}

export interface Side {
  analysis: {
    inaccuracy: number;
    mistake: number;
    blunder: number;
  };
  user: {
    id: string;
    name: string;
  };
}

export interface Eval {
  eval: number;
}

export interface AnnotatedEval extends Eval {
  best: string;
  variation: string;
  judgment: {
    name: string;
  };
}
