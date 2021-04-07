export enum InaccuracyType {
  Good = 0,
  Inacuracy = 1,
  Mistake = 2,
  Blunder = 3,
}

export interface PuzzleInfo {
  halfmoveNumber: number;
  fen: string;
  move: string;
  best: string;
  variation: string;
  inaccuracyType: InaccuracyType;
  gameId: string;
}
