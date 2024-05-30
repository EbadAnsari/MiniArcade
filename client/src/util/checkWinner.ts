import {
	CheckWinner,
	Coordinates,
	MatrixType,
	Player,
	Vector,
} from "./matrix-types";

export function checkWinner(matrix: MatrixType): CheckWinner {
	for (
		let coordinates: Coordinates = 0;
		coordinates < 3;
		coordinates = (coordinates + 1) as Coordinates
	) {
		const vector: Vector = [
			matrix[coordinates][0],
			matrix[coordinates][1],
			matrix[coordinates][2],
		];

		if (
			vector[0] === vector[1] &&
			vector[0] === vector[2] &&
			vector[0] !== 0
		) {
			return {
				type: "row",
				row: {
					coordinates,
					vector,
				},
				player: matrix[coordinates][0] as Player,
			};
		}
	}

	for (
		let coordinates: Coordinates = 0;
		coordinates < 3;
		coordinates = (coordinates + 1) as Coordinates
	) {
		const vector: Vector = [
			matrix[0][coordinates],
			matrix[1][coordinates],
			matrix[2][coordinates],
		];

		if (
			vector[0] === vector[1] &&
			vector[0] === vector[2] &&
			vector[0] !== 0
		) {
			return {
				type: "column",
				column: { coordinates, vector },
				player: matrix[0][coordinates] as Player,
			};
		}
	}

	{
		const vector: Vector = [matrix[0][0], matrix[1][1], matrix[2][2]];

		if (
			vector[0] === vector[1] &&
			vector[0] === vector[2] &&
			vector[0] !== 0
		) {
			return {
				type: "diagonal",
				diagonal: {
					vector,
				},
				player: vector[0],
			};
		}
	}

	{
		const vector: Vector = [matrix[0][2], matrix[1][1], matrix[2][0]];

		if (
			vector[0] === vector[1] &&
			vector[0] === vector[2] &&
			vector[0] !== 0
		) {
			return {
				type: "anti-diagonal",
				antiDiagonal: {
					vector,
				},
				player: vector[0],
			};
		}
	}

	return null;
}
