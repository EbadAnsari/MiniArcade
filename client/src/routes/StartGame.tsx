import { ChoosePlayer } from "@components/PickPlayer";
import RouteAnimate from "@components/RouteAnimation";
import { useTicTacToe } from "@context/hooks/useGame";
import { useUser } from "@context/hooks/useUser";
import { O } from "@icon/O";
import { X } from "@icon/X";
import IconButton from "@ui/IconButton";
import { AppRoutes } from "@util/AppRoutes";
import { dev } from "@util/development";
import { oppositePlayer } from "@util/functions";
import { Link } from "react-router-dom";

export function StartGame() {
	const { gameFunctions: game } = useTicTacToe();

	const { user } = useUser();

	function handleMultiplayerClick() {}
	handleMultiplayerClick();

	return (
		<RouteAnimate className="relative -top-3">
			<div className="flex w-full items-center justify-between gap-1 px-4 py-5">
				<div className="flex">
					<div className="w-8">
						<X className="fill-x" />
					</div>
					<div className="w-8">
						<O className="fill-o" />
					</div>
				</div>
				<Link
					tabIndex={0}
					autoFocus
					to={user.uid ? AppRoutes.profile : AppRoutes.login}
					className="rounded-sm p-1 focus-visible:outline-x"
				>
					<img
						src="/profile.svg"
						className="w-8"
						alt="Create user account."
						title="Create user account."
					/>
				</Link>
			</div>
			<ChoosePlayer
				player={game.choosenPlayer}
				onChange={(player) => {
					console.log("chose");
					game.choosenPlayer = player;
					game.run();
				}}
			/>
			<div className="mt-10 flex flex-col space-y-3">
				{/* Start game button. */}
				{/* <Link
					to={AppRoutes.mode}
					className="rounded-lg focus-visible:outline-o"
				> */}
				<IconButton
					O
					to={AppRoutes.mode}
					iconSrc="/processor.svg"
					onClick={() => {
						// game.mode = "cpu";

						game.gameInfo = {
							mode: "cpu",
							difficultyLevel: "easy",
							player: game.choosenPlayer,
							cpuPlayer: oppositePlayer(game.choosenPlayer),
							score: {
								X:
									game.choosenPlayer === "X"
										? user.score.you
										: user.score.cpu,
								O:
									game.choosenPlayer === "O"
										? user.score.you
										: user.score.cpu,
								ties: 0,
							},
						};

						// console.log(game.mode);

						game.run();
					}}
					text="New Game (vs CPU)"
					title="New game with bot."
				/>
				{/* </Link> */}
				{/* <Link
					to={AppRoutes.match}
					className="rounded-lg focus-visible:outline-x"
					> */}
				<IconButton
					X
					to={AppRoutes.match}
					iconSrc="/muiltiplayer-profile.svg"
					onClick={(event) => {
						event;
						// event.preventDefault();

						game.mode = "individual";
						game.score = {
							X: 0,
							O: 0,
							ties: 0,
						};
						game.gameInfo = {
							mode: "individual",
							choosenPlayer: game.choosenPlayer,
							currentTurn: game.choosenPlayer,
							score: {
								X: 0,
								O: 0,
								ties: 0,
							},
						};
						game.run();
					}}
					text="Multiplayer (vs Player)"
					title="New game with human."
				/>
				{dev && (
					<IconButton
						X
						to={AppRoutes.match}
						iconSrc="/online.svg"
						onClick={() => {
							console.log("online playing.");
						}}
						text="Multiplayer (vs Online)"
						title="New game with online player."
					/>
				)}
				{/* </Link> */}
				{/* <IconButton
					colorScheme="O"
					iconSrc="c/online.svg"
					to={AppRoutes.match}
					onClick={() => {
						gameFunctions.mode = null;
						gameFunctions.stage = "game";
						gameFunctions.run();
					}}
					title="New game with human."
				>
					Multiplayer (vs Online)
				</IconButton> */}
			</div>
		</RouteAnimate>
	);
}
