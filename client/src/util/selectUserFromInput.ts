import { SelectPlayer } from "@ui/Arrow";

export function selectUserFromInput(
	choosePlayer: SelectPlayer["choosePlayer"],
	X: SelectPlayer["X"],
	O: SelectPlayer["O"],
) {
	if (choosePlayer) return choosePlayer;
	else if (X) return "X";
	else if (O) return "O";
}
