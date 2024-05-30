import {
	AttemptToWin,
	Coordinates,
	Player,
	Vector,
	VectorType,
} from "@class/matrix-types";

export function getAttemptToWin<T extends VectorType>(
	tripletType: T,
	tripletVector: Vector,
	player: Player,
	coordinates: Coordinates,
): AttemptToWin {
	let attemptToWin = 0;
	let chanceToWin = 0;
	let chance = true;

	const vector: Vector = tripletVector.map((cell) => {
		if (cell === 0 || cell === player) {
			attemptToWin++;
			if (cell === 0) chanceToWin++;
			return cell === 0 ? player : 0;
		} else if (chance) chance = false;
		return 0;
	}) as Vector;

	return {
		type: tripletType,
		player,
		data: {
			vector,
			coordinates,
		},
		attemptToWin: attemptToWin as Coordinates,
		chanceToWin: chanceToWin as Coordinates,
		chance,
	};
}
