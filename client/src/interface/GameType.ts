export namespace GameType {
	// type GameType = "single" | "multiplayer" | "online";

	/* Select between "cpu" and "individual" */
	export type Mode = "individual" | "cpu";

	export type Online = "online";

	export type DifficultyLevel = "easy" | "medium" | "hard";

	export type MatchFinish<Winner, Tie> =
		| {
				/**
				 * winner of the match
				 */
				matchFinish: true;

				/**
				 * winner of the match
				 */
				winner: Winner;

				/**
				 * winner of the match
				 */
				tie: null;
		  }
		| {
				/**
				 * tie between the players
				 */
				matchFinish: true;

				/**
				 * tie between the players
				 */
				winner: null;

				/**
				 * tie between the players
				 */
				tie: Tie;
		  }
		| {
				/**
				 * match is not finish
				 */
				matchFinish: false;
		  };

	export interface SinglePlayerGame<Score, PlayerInfo> {
		/**
		 * play with cpu
		 */
		mode: PickUnion<Mode, "cpu">;

		/**
		 * score of the player with cpu
		 */
		score: Score;

		winner: PlayerInfo;

		/**
		 * set the difficulty level for cpu
		 */
		difficultyLevel: DifficultyLevel;
	}

	export type MultiPlayerGame<Score, PlayerInfo> =
		| {
				/**
				 * play with human
				 */
				mode: PickUnion<Mode, "individual">;

				/**
				 * score of the player with opposition.
				 */
				score: Score;

				currentTurn: PlayerInfo;

				choosenPlayer: PlayerInfo;
		  }
		| {
				/**
				 * play with cpu
				 */
				mode: PickUnion<Mode, "cpu">;

				/**
				 * score of the player with cpu.
				 */
				score: Score;

				/**
				 * set the difficulty level for cpu.
				 * @default "easy"
				 */
				difficultyLevel: DifficultyLevel;

				cpuPlayer: PlayerInfo;

				player: PlayerInfo;
		  };

	export interface OnlinePlayerGame<Score, PlayerInfo> {
		// play with human.
		// gameType: PickUnion<GameType, "online">;
		mode: Online;
		currentPlayer: { playerId: string; player: PlayerInfo };
		choosenPlayer: { playerId: string; player: PlayerInfo };
		score: Score;
	}
}
