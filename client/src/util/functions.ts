import { Player } from "@class/matrix-types";

export function oppositePlayer(player: Player) {
	return player === "X" ? "O" : "X";
}

export function titleCase(str: string) {
	return str
		.split(" ")
		.map((word) => word[0].toUpperCase() + word.slice(1))
		.join(" ");
}
