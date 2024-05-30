import {
	Cell,
	Coordinates,
	Cords,
	MatrixType,
	Player,
	Vector,
	Winner,
} from "@class/matrix-types";
import { ShowPlayer } from "@components/ShowPlayer";
import { useTicTacToe } from "@context/hooks/useGame";
import Base from "@ui/Base";

type PlayerButtonProps = (
	| {
			board: MatrixType;
			row?: false;
			column?: false;
			index: Coordinates;
	  }
	| { board: Vector; row: Coordinates; index: Coordinates; column?: false }
	| { board: Cell; row: Coordinates; column: Coordinates; index?: false }
) & {
	turn: Player;
};
export function BoardButton(props: PlayerButtonProps) {
	const { gameFunctions: game } = useTicTacToe();

	// const winner = game.winner;

	function handlePlayerButtonClick() {
		const { board: cell, row, column, turn } = props;
		if (!cell)
			game.setCell(
				{
					column,
					row,
				},
				turn,
			);
	}

	function isWinner(
		winner: Winner | null,
		{ column, row }: Cords,
	): winner is Winner {
		return (
			winner !== null &&
			((winner.type === "row" && row === winner.row.coordinates) ||
				(winner.type === "column" &&
					column === winner.column.coordinates) ||
				(winner.type === "diagonal" && column === row) ||
				(winner.type === "anti-diagonal" &&
					column + row === 2 &&
					(column !== row || (column === 1 && row === 1))))
		);
	}

	if (props.board instanceof Array) {
		return props.board.map((vector, index) =>
			vector instanceof Array ? (
				<BoardButton
					board={vector}
					row={index as Coordinates}
					index={index as Coordinates}
					turn={props.turn}
					key={`${index}+${index}`}
				/>
			) : (
				<BoardButton
					board={vector}
					row={props.row as Coordinates}
					column={index as Coordinates}
					turn={props.turn}
					key={`${index}+${index}`}
				/>
			),
		);
	} else {
		const { column, row, board: cell, turn } = props;

		return (
			<Base
				className={`base relative flex cursor-pointer items-center justify-center ${
					isWinner(game.winner, { column, row } as Cords) &&
					(game.winner.player === "O" ? "!bg-o" : "!bg-x")
				}`}
			>
				<button
					className="call w-8/12"
					onClick={handlePlayerButtonClick}
				>
					{(() => {
						if (isWinner(game.winner, { column, row } as Cords)) {
							return (
								<ShowPlayer
									player={game.winner.player}
									style="fill-arsenic-400 stroke-[35px]"
								/>
							);
						} else if (cell) {
							return (
								<ShowPlayer
									player={cell}
									oStyle="fill-o"
									xStyle="fill-x"
								/>
							);
						} else {
							return (
								<ShowPlayer
									player={turn}
									oStyle="o"
									xStyle="x"
								/>
							);
						}
					})()}
				</button>
			</Base>
		);
	}
}
