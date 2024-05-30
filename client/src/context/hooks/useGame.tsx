import { useContext } from "react";
import { TicTacToeContext } from "../providers/GameProvider";

export function useTicTacToe() {
	const game = useContext(TicTacToeContext);
	if (game === null)
		throw new Error("useGame must be used within a GameProvider");
	return game;
}
