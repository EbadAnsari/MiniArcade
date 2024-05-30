import { ShowPlayer } from "@components/ShowPlayer";
import { useTicTacToe } from "@context/hooks/useGame";
import { useUser } from "@context/hooks/useUser";
import IconButton from "@ui/IconButton";
import { AppRoutes } from "@util/AppRoutes";

import { motion } from "framer-motion";
import { useEffect } from "react";

export function MatchComplete() {
	const { gameFunctions: game } = useTicTacToe();
	const { user } = useUser();

	useEffect(() => {
		if (game.gameInfo.mode === "cpu" && user.email)
			user.updateScore({
				cpu: game.score[game.gameInfo.cpuPlayer],
				you: game.gameInfo.score[game.gameInfo.player],
			});
	}, [game.winner]);

	if (!game.matchFinish.matchFinish) return null;

	return (
		<section className="fixed left-0 top-0 flex h-d-screen w-d-screen items-center justify-center bg-black bg-opacity-40 transition-colors duration-300 [&:has(.scale-down:hover)]:bg-opacity-20">
			<motion.div
				initial={{
					opacity: 0,
					scale: 0.8,
				}}
				animate={{
					opacity: 1,
					scale: 1,
				}}
				exit={{
					opacity: 0,
					scale: 0.8,
				}}
				className="flex w-full items-center justify-center"
			>
				<div className="relative">
					<div
						className="absolute right-2 top-2 z-10 flex aspect-square w-4 cursor-pointer items-center justify-center rounded-full bg-arsenic-100 after:absolute after:left-1/2 after:top-1/2 after:aspect-square after:w-[55%] after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:bg-arsenic-950 after:transition-transform after:duration-100 sm:w-5"
						onClick={(event) => {
							(
								event.currentTarget as HTMLDivElement
							).classList.toggle("scale-down");
						}}
					></div>
					<div className="w-full rounded-xl bg-arsenic-800 px-10 py-5 text-arsenic-100 transition-all xs:px-14 sm:w-auto sm:px-20 sm:py-8 md:px-28 md:py-10">
						<div className="w-full">
							{game.matchFinish.tie && (
								<div className="px-10 py-5 text-center text-2xl font-bold uppercase text-arsenic-100 sm:px-20 sm:text-3xl md:text-4xl">
									It's a Tie
								</div>
							)}
							{game.matchFinish.winner && (
								<>
									<p className="text-center font-bold uppercase">
										You Won
									</p>
									<div className="flex items-center justify-center gap-3 py-5 text-center">
										<div className="w-8 text-2xl font-bold uppercase text-arsenic-100 sm:w-10 sm:text-3xl md:w-12 md:text-4xl">
											<ShowPlayer
												xStyle="fill-x"
												oStyle="fill-o"
												player={
													game.matchFinish.winner
														.player === "X"
														? "X"
														: "O"
												}
											/>
										</div>
										<p
											className={`text-2xl font-bold uppercase sm:text-3xl md:text-4xl ${
												game.matchFinish.winner
													.player === "X"
													? "text-x"
													: "text-o"
											}`}
											style={{
												lineHeight: "2.25rem",
												translate: "0 -5%",
											}}
										>
											Takes the round
										</p>
									</div>
								</>
							)}

							<div className="flex flex-col justify-center gap-2 text-sm sm:flex-row sm:gap-4 sm:text-base">
								<a
									href={AppRoutes.root}
									className="w-full"
									// className="rounded-lg border-b-4 border-b-arsenic-200 bg-arsenic-100 px-3 py-2 font-semibold uppercase text-arsenic-950"
								>
									<IconButton
										text="Quit"
										onClick={() => {
											game.hardReset();
										}}
										className="!py-3"
									/>
								</a>

								{game.matchFinish.tie && (
									<IconButton
										text="Next Round"
										onClick={() => {
											game.resetBoard();
										}}
										className="!border-arsenic-950 !bg-arsenic-200 !py-3 !text-arsenic-950"
									/>
								)}
								{game.matchFinish.winner && (
									<IconButton
										choosePlayer={
											game.matchFinish.winner.player
										}
										onClick={() => {
											game.resetBoard();
										}}
										className="!py-3"
									>
										Next Round
									</IconButton>
								)}
							</div>
						</div>
					</div>
				</div>
			</motion.div>
		</section>
	);
}
