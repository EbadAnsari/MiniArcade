import TurnIndicator from "@components/TurnIndicator";
import { useTicTacToe } from "@context/hooks/useGame";
import { O } from "@icon/O";
import { Reset } from "@icon/Reset";
import { X } from "@icon/X";

export default function BoardHeader() {
	const { gameFunctions: game } = useTicTacToe();

	function handleResetButtonClick() {
		game.currentTurn = game.choosenPlayer;
		game.resetBoard();
	}

	return (
		<div className="flex w-full items-center justify-between">
			<div className="flex items-center justify-center gap-1">
				<div className="flex w-16">
					<div className="w-1/2">
						<X className="fill-x" />
					</div>
					<div className="w-1/2">
						<O className="fill-o" />
					</div>
				</div>
			</div>
			<TurnIndicator turn={game.currentTurn!} />
			<div
				className="flex h-fit w-8 cursor-pointer items-center justify-center rounded border-b-2 border-b-arsenic-950 bg-arsenic-100 p-1.5"
				onClick={handleResetButtonClick}
			>
				<Reset />
			</div>
		</div>
	);
}
