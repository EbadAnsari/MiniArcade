import RouteAnimate from "@components/RouteAnimation";
import Base from "@components/ui/Base";
import ModeButton from "@components/ui/ModeButton";
import { useTicTacToe } from "@context/hooks/useGame";
import { GameType } from "@interface/GameType";
import { AppRoutes } from "@util/AppRoutes";

export default function Mode() {
	const { gameFunctions: game } = useTicTacToe();

	return (
		<RouteAnimate>
			<Base className="p-6">
				<h2 className="mb-8 text-center text-3xl font-bold text-arsenic-100">
					Select Mode
				</h2>
				<div className="space-y-7">
					{["easy", "medium", "hard"].map((level, index) => (
						<ModeButton
							to={AppRoutes.match}
							key={level}
							ball={index + 1}
							onClick={() => {
								// debugger;
								// console.log(game.mode);
								game.difficultyLevel =
									level as GameType.DifficultyLevel;
								game.run();
							}}
							text={level.toUpperCase()}
						/>
					))}
				</div>
			</Base>
		</RouteAnimate>
	);
}
