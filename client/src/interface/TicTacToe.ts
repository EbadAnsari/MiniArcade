import { MatrixType, Triplet } from "@class/matrix-types";
import { GameType } from "./GameType";

export namespace TicTacToe {
	export type Player = "X" | "O";

	export type Winner = Triplet;

	export interface Score {
		O: number;
		X: number;
		ties: number;
	}

	export interface GameState {
		gameInfo: GameType.MultiPlayerGame<Score, Player>;
		matchFinish: GameType.MatchFinish<Winner, true>;
		board: MatrixType;
	}
}
