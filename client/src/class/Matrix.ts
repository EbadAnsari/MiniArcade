import {
	Cell,
	CheckWinner,
	Coordinates,
	Cords,
	MatrixType,
	Player,
	Vector,
} from "@class/matrix-types";
import { checkWinner } from "@util/checkWinner";

export class Matrix {
	readonly row = 3;
	readonly column = 3;

	matrix: MatrixType = [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0],
	];

	get board(): MatrixType {
		return this.matrix;
	}

	constructor(matrix: MatrixType) {
		this.matrix = matrix;
	}

	protected setCell({ column, row }: Cords, player: Player) {
		if (this.board[row][column] !== 0)
			throw new Error(
				"Fu*k! Cell is already taken: " + this.board[row][column],
			);

		this.board[row][column] = player;
	}

	checkWinner(): CheckWinner {
		return checkWinner(this.board);
	}

	hardReset(): void {
		this.matrix = [
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0],
		];
	}

	getCell({ column, row }: Cords): Cell {
		return this.board[row][column];
	}

	getRow(row: Coordinates): Vector {
		return this.board[row];
	}

	getColumn(column: Coordinates): Vector {
		return this.board.map((row) => row[column]) as Vector;
	}

	getDiagonal(): Vector {
		return [this.board[0][0], this.board[1][1], this.board[2][2]];
	}

	getAntiDiagonal(): Vector {
		return [this.board[0][2], this.board[1][1], this.board[2][0]];
	}

	getEmptyCells(): Cords[] {
		const cells: Cords[] = [];
		for (
			let row: Coordinates = 0;
			row < this.row;
			row = (row + 1) as Coordinates
		) {
			for (
				let column: Coordinates = 0;
				column < this.column;
				column = (column + 1) as Coordinates
			) {
				if (this.board[row][column] === 0) {
					cells.push({ column, row });
				}
			}
		}
		return cells;
	}

	getCells(): Cords[] {
		const cells: Cords[] = [];
		for (
			let row: Coordinates = 0;
			row < this.row;
			row = (row + 1) as Coordinates
		) {
			for (
				let column: Coordinates = 0;
				column < this.column;
				column = (column + 1) as Coordinates
			) {
				cells.push({
					column,
					row,
				});
			}
		}
		return cells;
	}

	getCellsByPlayer(player: Player): Cords[] {
		const cells: Cords[] = [];
		for (
			let row: Coordinates = 0;
			row < this.row;
			row = (row + 1) as Coordinates
		) {
			for (
				let column: Coordinates = 0;
				column < this.column;
				column = (column + 1) as Coordinates
			) {
				if (this.board[row][column] === player) {
					cells.push({
						column,
						row,
					});
				}
			}
		}
		return cells;
	}

	getAllCellsValues(): Cell[] {
		const cells: Cell[] = [];
		for (
			let row: Coordinates = 0;
			row < this.row;
			row = (row + 1) as Coordinates
		) {
			for (
				let column: Coordinates = 0;
				column < this.column;
				column = (column + 1) as Coordinates
			) {
				cells.push(this.board[row][column]);
			}
		}
		return cells;
	}

	cordsToIndex(cords: Cords) {
		return cords.row * this.row + cords.column;
	}

	indexToCords(index: number): Cords {
		return {
			column: (index % this.row) as Coordinates,
			row: Math.floor(index / this.row) as Coordinates,
		};
	}
}
