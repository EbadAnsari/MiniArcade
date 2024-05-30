import { Matrix } from "@class/Matrix";
import { Coordinates, Player, Triplet, VectorType } from "@class/matrix-types";
import { getAttemptToWin } from "./getAttemptToWin";

/**
 *
 * [
 * 		[0, 0, 0],
 * 		[0, 0, 0],
 * 		[0, 0, 0],
 * ]
 *
 */

export function generateStrategies(matrixHandler: Matrix, player: Player) {
	const bestStrategy: [Triplet[], Triplet[], Triplet[]] = [[], [], []];

	// ! row
	for (
		let index: Coordinates = 0;
		index < 3;
		index = (index + 1) as Coordinates
	) {
		const row = matrixHandler.getRow(<Coordinates>index);
		const tripletType: VectorType = "row";
		const result = getAttemptToWin(tripletType, row, player, index);

		if (result.chance) {
			bestStrategy[result.chanceToWin - 1].push({
				player,
				type: "row",
				row: result.data,
			});
		} else if (result.type === "row") {
		}
	}

	// ! column
	for (
		let index: Coordinates = 0;
		index < 3;
		index = (index + 1) as Coordinates
	) {
		const column = matrixHandler.getColumn(<Coordinates>index);
		const tripletType: VectorType = "column";
		const result = getAttemptToWin(tripletType, column, player, index);

		if (result.chance) {
			bestStrategy[result.chanceToWin - 1].push({
				player,
				type: "column",
				column: result.data,
			});
		} else if (result.type === "column") {
		}
	}

	// ! diagonal
	{
		const diagonal = matrixHandler.getDiagonal();
		const tripletType: VectorType = "diagonal";
		const result = getAttemptToWin(tripletType, diagonal, player, 0);

		if (result.chance) {
			bestStrategy[result.chanceToWin - 1].push({
				player,
				type: "diagonal",
				diagonal: {
					vector: result.data.vector,
				},
			});
		}
	}

	// ! anti-diagonal
	{
		const antiDiagonal = matrixHandler.getAntiDiagonal();
		const tripletType: VectorType = "anti-diagonal";
		const result = getAttemptToWin(tripletType, antiDiagonal, player, 0);

		if (result.chance) {
			bestStrategy[result.chanceToWin - 1].push({
				player,
				type: "anti-diagonal",
				antiDiagonal: { vector: result.data.vector },
			});
		}
	}

	return bestStrategy;
}
