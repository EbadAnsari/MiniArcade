import {
	CPU,
	MatrixType,
	Player,
	Player as TicTacToePlayer,
	Winner,
} from "@class/matrix-types";

export interface TicTaoToeScore {
	O: number;
	X: number;
	ties: number;
}

export type GameStage = "start" | "game" | "end";

// const a: TicTacToe.GameState = {
// 	gameInfo: {
// 		mode: "cpu",
// 		cpuPlayer: "X",
// 		player: "O",
// 		score: {
// 			O: 0,
// 			X: 0,
// 			ties: 0,
// 		},
// 	},
// 	matchFinish: {
// 		matchFinish: false,
// 	},
// 	board: new MatrixType(3, 3, 0),
// };

export type TicTacToeWinTie =
	| { tie: true; winner: null }
	| { tie: false; winner: Winner }
	| { tie: false; winner: null }
	| { tie: null; winner: null };

export type TicTaoToeGameState = (
	| {
			stage: PickUnion<GameStage, "start" | "end">;
			currentTurn: null;
			score: null;
	  }
	| {
			stage: PickUnion<GameStage, "game">;
			currentTurn: Player;
			score: TicTaoToeScore;
	  }
) &
	TicTacToeWinTie & {
		choosePlayer: TicTacToePlayer;
		mode: CPU;
		board: MatrixType;
	};
