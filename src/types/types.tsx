export interface Game {
    id: string,
    players: {
        white: {
            analysis: {
                inaccuracy: number,
                mistake: number,
                blunder: number
            }
        },
        black: {
            analysis: {
                inaccuracy: number,
                mistake: number,
                blunder: number
            }
        }
    },
    moves: string,
    analysis: [Analysis]
};

export interface Analysis {
    eval: number,
}

export interface AnnotatedAnalysis extends Analysis {
    best: string,
    variation: string,
    judgement: {
        name: string,
    }
}