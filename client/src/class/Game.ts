import { CustomDispatch } from "@class/HandleDispatch";
import { Matrix } from "@class/Matrix";
import {
	CPUMode,
	Coordinates,
	Cords,
	MatrixType,
	Player,
	Triplet,
	VectorData,
	Winner,
} from "@class/matrix-types";
import { GameType } from "@interface/GameType";
import { TicTacToe } from "@interface/TicTacToe";
import { generateStrategies } from "@util/generateStrategies";

export class TicTacToeGame extends Matrix implements TicTacToe.GameState {
	private _choosePlayer: Player = "X";

	private dispatch: CustomDispatch<TicTacToe.GameState>;

	private getRandomStrategy<T>(triplet: T[], mode: CPUMode): T {
		if (triplet.length === 0) throw new Error("No strategies found.");
		if (triplet.length === 1) return triplet[0] as T;
		const random =
			mode === "medium" ? 0 : Math.floor(Math.random() * triplet.length);
		return triplet[random];
	}

	private logCpuPlay(playerStrategy: Triplet) {
		if (playerStrategy.type === "row") {
			console.log(playerStrategy.type, playerStrategy.row.coordinates);
		} else if (playerStrategy.type === "column") {
			console.log(playerStrategy.type, playerStrategy.column.coordinates);
		} else if (playerStrategy.type === "diagonal") {
			console.log(
				playerStrategy.type,
				playerStrategy.diagonal.coordinates,
			);
		} else {
			console.log(
				playerStrategy.type,
				playerStrategy.antiDiagonal.coordinates,
			);
		}
	}

	private cpuMode(cpu: TicTacToe.Player, mode: GameType.DifficultyLevel) {
		if (mode === "easy") {
			super.setCell(
				this.getRandomStrategy(this.getEmptyCells(), mode),
				cpu,
			);
			return;
		}

		const cpuPossibleAttempt = generateStrategies(
			new Matrix(this.board),
			cpu,
		);

		const playerPossibleAttempt = generateStrategies(
			new Matrix(this.board),
			this.choosenPlayer,
		);

		const isPlayerWinning = Boolean(playerPossibleAttempt[0].length);
		const isCPUWinning = Boolean(cpuPossibleAttempt[0].length);

		if (isCPUWinning) {
			const cpuStrategy = this.getRandomStrategy(
				cpuPossibleAttempt[0],
				mode,
			);

			const cords = this.getVectorDataToCoordinate(cpuStrategy);
			super.setCell(cords, cpu);
		} else if (isPlayerWinning) {
			// this select random highest stragygy (i.e. from 0 index)
			const playerStrategy = this.getRandomStrategy(
				playerPossibleAttempt[0],
				mode,
			);

			this.logCpuPlay(playerStrategy);

			const cords = this.getVectorDataToCoordinate(playerStrategy);
			super.setCell(cords, cpu);
		} else {
			let cords: Cords | null = null;

			for (let index = 0; index < cpuPossibleAttempt.length; index++) {
				if (cpuPossibleAttempt[index].length === 0) continue;

				const cpuStrategy = this.getRandomStrategy(
					cpuPossibleAttempt[index],
					mode,
				);

				if (cpuStrategy) {
					cords = this.getVectorDataToCoordinate(cpuStrategy);
					break;
				}
			}

			super.setCell(
				cords || this.getRandomStrategy(this.getEmptyCells(), mode),
				cpu,
			);
		}
	}

	/*  */
	private _gameInfo: GameType.MultiPlayerGame<
		TicTacToe.Score,
		TicTacToe.Player
	>;
	public get gameInfo(): GameType.MultiPlayerGame<
		TicTacToe.Score,
		TicTacToe.Player
	> {
		return this._gameInfo;
	}
	public set gameInfo(
		value: GameType.MultiPlayerGame<TicTacToe.Score, TicTacToe.Player>,
	) {
		this._gameInfo = value;
		console.trace(this._gameInfo);
	}

	matchFinish: GameType.MatchFinish<Winner, true>;
	get board(): MatrixType {
		return super.board;
	}

	get mode(): GameType.Mode {
		return this.gameInfo.mode;
	}
	set mode(mode: GameType.Mode) {
		this.gameInfo.mode = mode;
	}

	get score(): TicTacToe.Score {
		return this.gameInfo.score;
	}

	set score(score: TicTacToe.Score) {
		this.gameInfo.score = score;
	}

	get tie(): true | null {
		return this.matchFinish.matchFinish ? this.matchFinish.tie : null;
	}

	set tie(tie: true | null) {
		if (tie) {
			this.matchFinish = {
				matchFinish: true,
				winner: null,
				tie: true,
			};
			this.gameInfo.score.ties++;
		} else if (this.winner) {
			this.matchFinish = {
				matchFinish: true,
				winner: this.winner,
				tie: null,
			};
		} else {
			this.matchFinish = {
				matchFinish: false,
			};
		}
	}

	get winner(): Winner | null {
		return this.matchFinish.matchFinish ? this.matchFinish.winner : null;
	}

	set winner(winner: Winner | null) {
		if (winner) {
			this.matchFinish = {
				matchFinish: true,
				winner: winner,
				tie: null,
			};

			this.gameInfo.score[winner.player]++;

			if (this.gameInfo.mode === "individual")
				this.currentTurn = winner.player;
		} else if (this.tie) {
			this.matchFinish = {
				matchFinish: true,
				tie: true,
				winner: null,
			};
		} else {
			this.matchFinish = {
				matchFinish: false,
			};
		}
	}

	get currentTurn(): Player {
		return this.gameInfo.mode === "individual"
			? this.gameInfo.currentTurn
			: this.gameInfo.player;
	}

	set currentTurn(currentTurn: Player) {
		if (this.gameInfo.mode === "individual")
			this.gameInfo.currentTurn = currentTurn;
		else throw new Error("Can't set current turn");
	}

	get choosenPlayer(): Player {
		return this.gameInfo.mode === "individual"
			? this.gameInfo.choosenPlayer
			: this.gameInfo.player;
	}

	set choosenPlayer(choosenPlayer: Player) {
		this.gameInfo = {
			mode: "individual",
			choosenPlayer,
			currentTurn: choosenPlayer,
			score: { O: 0, X: 0, ties: 0 },
		};
	}

	get difficultyLevel(): GameType.DifficultyLevel | null {
		return this.gameInfo.mode === "cpu"
			? this.gameInfo.difficultyLevel
			: null;
	}

	set difficultyLevel(difficultyLevel: GameType.DifficultyLevel) {
		if (this.gameInfo.mode === "cpu")
			this.gameInfo.difficultyLevel = difficultyLevel;
	}

	get cpuPlayer(): TicTacToe.Player | null {
		return this.gameInfo.mode === "cpu" ? this.gameInfo.cpuPlayer : null;
	}

	/*  */

	constructor(
		options: TicTacToe.GameState,
		dispatch: CustomDispatch<TicTacToe.GameState>,
	) {
		super(options.board);

		this._gameInfo = options.gameInfo;
		this.matchFinish = options.matchFinish;

		this.dispatch = dispatch;
	}

	run(force: boolean = true) {
		// console.trace(this.gameInfo);
		if (force)
			this.dispatch({
				board: this.board,
				gameInfo: this.gameInfo,
				matchFinish: this.matchFinish,
			});
	}

	getVectorDataToCoordinate(vectorData: VectorData): Cords {
		let row: Coordinates = 0;
		let column: Coordinates = 0;
		switch (vectorData.type) {
			case "row":
				return {
					row: vectorData.row.coordinates,
					column: vectorData.row.vector.findIndex(
						(cell) => cell !== 0,
					) as Coordinates,
				};
			case "column":
				return {
					column: vectorData.column.coordinates,
					row: vectorData.column.vector.findIndex(
						(cell) => cell !== 0,
					) as Coordinates,
				};
			case "diagonal":
				row = column = vectorData.diagonal.vector.findIndex(
					(cell) => cell !== 0,
				) as Coordinates;
				return { row, column };
			case "anti-diagonal":
				row = vectorData.antiDiagonal.vector.findIndex(
					(cell) => cell !== 0,
				) as Coordinates;
				column = (vectorData.antiDiagonal.vector.length -
					row -
					1) as Cords["row"];
				return { row, column };
		}
	}

	setCell(cords: Cords, player: Player, force: boolean = true): void {
		this.winner = null;

		// user played.
		super.setCell(cords, player);

		const winner = super.checkWinner();

		if (winner) {
			this.winner = winner;
			// this.setWinner(winner);
		} else if (super.getEmptyCells().length === 0) {
			this.tie = true;
		} else if (this.gameInfo.mode === "cpu") {
			this.tie = null;

			const cpu: Player = this.gameInfo.cpuPlayer;

			this.cpuMode(cpu, this.gameInfo.difficultyLevel);

			const winner = super.checkWinner();

			if (winner) {
				this.winner = winner;
			} else if (super.getEmptyCells().length === 0) {
				this.tie = true;
			}
		} else if (this.gameInfo.mode === "individual") {
			this.currentTurn = this.currentTurn === "X" ? "O" : "X";
		}

		this.run(force);
	}

	changeCurrentPlayer(player: Player, force: boolean = true) {
		this.currentTurn = player;
		this.run(force);
	}

	toggleChoosenPlayer(force: boolean = true) {
		this._choosePlayer = this._choosePlayer === "X" ? "O" : "X";
		this.run(force);
	}

	changePlayer(player: Player, force: boolean = true) {
		this._choosePlayer = player;
		this.currentTurn = player;
		this.run(force);
	}

	resetBoard(force: boolean = true) {
		super.hardReset();
		this.matchFinish.matchFinish = false;
		this.winner = null;
		this.run(force);
	}

	hardReset(force: boolean = true) {
		super.hardReset();
		this._choosePlayer = "X";

		this.gameInfo = {
			mode: "individual",
			currentTurn: "X",
			choosenPlayer: "X",
			score: {
				O: 0,
				X: 0,
				ties: 0,
			},
		};

		this.matchFinish = {
			matchFinish: false,
		};

		this.run(force);
	}
}
