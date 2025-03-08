import { TicTacToeGame } from "@class/Game";
import { useUser } from "@context/hooks/useUser";
import { TicTacToe } from "@interface/TicTacToe";
import { PropsWithChildren, createContext, useMemo, useState } from "react";

export const TicTacToeContext = createContext<{
	gameState: TicTacToe.GameState;
	gameFunctions: TicTacToeGame;
} | null>(null);

export default function TicTacToeProvider({
	children,
}: Readonly<PropsWithChildren>) {
	const { user } = useUser();
	user;

	const gameStateRef: TicTacToe.GameState = {
		board: [
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0],
		],
		matchFinish: {
			matchFinish: false,
		},
		gameInfo: {
			mode: "individual",
			currentTurn: "X",
			choosenPlayer: "X",
			score: {
				O: 0,
				X: 0,
				ties: 0,
			},
		},
	};

	const [gameState, setGameState] =
		useState<TicTacToe.GameState>(gameStateRef);

	// console.log(gameState, "here");

	const gameFunctions = new TicTacToeGame(gameState, setGameState);

	const game = useMemo(() => ({ gameState, gameFunctions }), [gameState]);

	return (
		<TicTacToeContext.Provider value={game}>
			{children}
		</TicTacToeContext.Provider>
	);
}
