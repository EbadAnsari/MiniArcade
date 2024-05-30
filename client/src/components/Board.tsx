import { BoardButton } from "@components/BoardButton";
import { useTicTacToe } from "@context/hooks/useGame";

export default function Board() {
	const { gameFunctions: game } = useTicTacToe();

	// const { currentTurn: turn, board } = game.gameState;

	return (
		<div className="grid aspect-square w-full grid-cols-3 grid-rows-3 gap-5">
			<BoardButton board={game.board} index={0} turn={game.currentTurn} />
		</div>
	);
}
