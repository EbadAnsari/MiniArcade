import { TicTaoToeScore as ScoreType } from "@interface/TicTacToeGame";
interface ScoreProps<T extends keyof ScoreType> {
	player: T;
	score: ScoreType[T];
	side?: "You" | "CPU";
}

export default function Score<T extends keyof ScoreType>({
	player,
	score,
	side,
}: Readonly<ScoreProps<T>>) {
	return (
		<div
			className={`flex w-full flex-col rounded-lg p-1 text-center text-sm ${
				(player === "O" && "bg-o") ||
				(player === "X" && "bg-x") ||
				(player === "ties" && "bg-arsenic-100")
			}`}
		>
			<p>{`${player.toUpperCase()} ${side ?? ""}`}</p>
			<p className="font-bold">{score}</p>
		</div>
	);
}
