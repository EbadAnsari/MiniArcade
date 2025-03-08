import Board from "@components/Board";
import BoardHeader from "@components/BoardHeader";
import { MatchComplete } from "@components/MatchComplete";
import RouteAnimate from "@components/RouteAnimation";
import Score from "@components/Score";
import { useTicTacToe } from "@context/hooks/useGame";

export function Match() {
	const { gameFunctions: game } = useTicTacToe();

	console.log(game.mode);

	return (
		<RouteAnimate className="relative">
			<div className="flex flex-col items-center gap-5">
				<BoardHeader />
				<Board />
				<div className="flex w-full justify-between gap-5 uppercase">
					<Score player="X" side="You" score={game.score.X} />
					<Score player="ties" score={game.score.ties} />
					<Score player="O" side="CPU" score={game.score.O} />
				</div>
			</div>
			<MatchComplete />
		</RouteAnimate>
	);
}
