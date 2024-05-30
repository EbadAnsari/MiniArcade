import { CPUScore } from "./user";

export type Player = "X" | "O";

export type CPUMode = "easy" | "medium" | "hard";

export type CPU = (
	| {
			playing: false;
			player?: undefined;
			mode?: undefined;
	  }
	| {
			playing: true;
			player: Player;
			mode: CPUMode;
	  }
) & {
	score: CPUScore;
};

export type Cell = 0 | Player;

// a row or column like ["X", 0, "O"]
// this vector is used when to know the value of the cell.
export type Vector = [Cell, Cell, Cell];

// this vector is used when to know the position of the row or either column.
export type Coordinates = 0 | 1 | 2;

export type Cords = { row: Coordinates; column: Coordinates };

export type MatrixType = [Vector, Vector, Vector];

export type Diagonal = { vector: Vector };

export type VectorData =
	| {
			type: "row";
			row: {
				coordinates: Coordinates;
			} & Diagonal;
	  }
	| {
			type: "column";
			column: {
				coordinates: Coordinates;
			} & Diagonal;
	  }
	| {
			type: "diagonal";
			diagonal: { coordinates?: undefined } & Diagonal;
	  }
	| {
			type: "anti-diagonal";
			antiDiagonal: { coordinates?: undefined } & Diagonal;
	  };

export type VectorType = VectorData["type"];

export type AttemptToWin = {
	type: VectorType;
	data: { coordinates: Coordinates } & Diagonal;
	player: Player;
} & {
	attemptToWin: Coordinates;
	chanceToWin: Coordinates;
	chance: boolean;
};

export type Triplet = VectorData & { player: Player };

export type CheckWinner = Triplet | null;

export type Winner = Triplet;
